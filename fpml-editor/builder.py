# !usr/bin/env
import os
import shutil
import string
import random
import re

import builder_config
if builder_config.USE_MINIFIER:
  import requests


class Builder(object):
  def __init__(self):
    self.UIKIT_CLIENT_APP_VERSION = builder_config.UIKIT_CLIENT_APP_VERSION
    self.PREPARE_FOR_PRODUCTION = builder_config.PREPARE_FOR_PRODUCTION
    self.PARSE_EXISTING_JS_BUILD = builder_config.PARSE_EXISTING_JS_BUILD
    self.CLIENT_APP_FILENAME_TEMPLATE = builder_config.CLIENT_APP_FILENAME_TEMPLATE
    self.USE_MINIFIER = builder_config.USE_MINIFIER
    self.MINIFIER_HTTP_SERVICE_URL = builder_config.MINIFIER_HTTP_SERVICE_URL
    self.JS_SCRIPTS_TO_COOK = builder_config.JS_SCRIPTS_TO_COOK
    self.ENCODING = builder_config.ENCODING
    self.REMOVE_COMMENTS = builder_config.REMOVE_COMMENTS
    self.REMOVE_NEWLINES_AND_INDENTS = builder_config.REMOVE_NEWLINES_AND_INDENTS
    self.TEST_HOST = builder_config.TEST_HOST
    self.PRODUCTION_HOST = builder_config.PRODUCTION_HOST
    self.TEST_CLIENTAPP_URL = builder_config.TEST_CLIENTAPP_URL
    self.PRODUCTION_CLIENTAPP_URL = builder_config.PRODUCTION_CLIENTAPP_URL
    self.MANGLED_NAMES_USED = builder_config.MANGLED_NAMES_USED

    self.mangled_names = {}

    if self.PARSE_EXISTING_JS_BUILD:
      self.single_js_file_content = self.read_file_code(
        'build/' + self.CLIENT_APP_FILENAME_TEMPLATE.format(self.UIKIT_CLIENT_APP_VERSION))
    else:
      print('creating single file content')

      def read_entirely(file):
        with open(file, 'r', encoding=self.ENCODING) as f:
          return f.read()

      self.single_js_file_content = '\n'.join(read_entirely(file) for file in self.JS_SCRIPTS_TO_COOK)
      if self.PREPARE_FOR_PRODUCTION:
        self.prepare_for_production()

    self.NAMES_TO_MANGLE = builder_config.NAMES_TO_MANGLE # self.collect_names() todo dev

  def main(self):
    if self.USE_MINIFIER:
      print('minifying via http service')
      self.single_js_file_content = self.minify_script_using_http_service(self.single_js_file_content)
    self.build_html_and_css()
    if self.REMOVE_COMMENTS:
      self.remove_comments()
    if self.REMOVE_NEWLINES_AND_INDENTS:
      self.remove_newlines_and_indents()
    self.prepare_mangled_names()
    self.overwrite_code_to_file('build/' + self.CLIENT_APP_FILENAME_TEMPLATE.format(self.UIKIT_CLIENT_APP_VERSION),
                  self.single_js_file_content)

  def collect_names(self):  # todo dev is not finished

    def _general_names_parser(fragment, separator, index, slice, garbage):
      substring = fragment[slice[0]:slice[1]]

      for regexp in garbage:
        substring = re.sub(regexp, '', substring)

      if index:
        substring = substring.split(separator)[index]
        result = [substring]
      else:
        result = substring.split(separator)

      return result

    def _js_objects_name_parser(fragment):
      result = set()
      objects_to_check = set()
      new_candidates = []

      pairs = fragment.split('{')[1].replace('}', '').split(',')
      for pair in pairs:
        if pair:
          key, val = pair.split(':')

          for candidate in key, val:
            check_sum = 0
            for symbol in '[', ']', '{', '}', ' ':
              check_sum += candidate.strip().find(symbol)
            if check_sum == -5:
              result.add(candidate.replace('"', '').replace("'", ''))

          objects_to_check.add(fragment.split(' ')[1])
          if not (key.find('"') + 1 or key.find("'") + 1):
            objects_to_check.add(key)

      for obj in objects_to_check:
        new_candidates += _get_js_obj_attrs_declared_via_dot_notation(obj)
      for candidate in new_candidates:
        result.add(candidate)

      return list(result)

    def _js_function_args_parser(fragment):
      substring = fragment.split('(')[1]
      substring = substring[:-1]
      return substring.split(',')

    def _get_js_obj_attrs_declared_via_dot_notation(obj_name):
      result = set()
      idx = 0
      match = 'start'
      while match:
        match = re.search(r'(\s{}\.[\s*\w+\.*]+?\s*?=\s*?)|(\s*{}(\[[\'|\"]\w+[\'|\"]\])+?)'
                  .format(obj_name, obj_name), self.single_js_file_content[idx:])
        if match:
          idx += match.end()
          substring = match.group().split('=')[0]
          for candidate in substring.split('.')[1:]:
            result.add(candidate)

      return list(result)

    js_and_html_name_declaration_patterns = [
      [r'\s(let|var)\s+\S+;',           [' ', 1, [1, -1], []]],
      [r'\s(let|var)\s+\S+\s*=',          [' ', 1, [1, -1], []]],
      [r'\s(let|var)\s(\S+,\s*)+\S+;',      [',', None, [5, -1], []]],

      [r'\sconst\s+\S+;',             [' ', 1, [1, -1], []]],
      [r'\sconst\s+\S+\s*=',            [' ', 1, [1, -1], []]],
      [r'\sconst\s(\S+,\s*)+\S+;',        [',', None, [7, -1], []]],

      [r'\sfunction\s+\S+\s*\(',          [' ', 1, [1, -1], []]],
      [r'\sfunction\s+\S+\s*\([\s\S]+?\)',    _js_function_args_parser],

      [r'\s(class|id)\s*=\s*"\s*[\S\s]+?"',     [' ', None, [0, -1], [r'\s(class|id)[\s]*=[\s]*"']]],

      [r'(let|const|var)\s+\S+\s+=\s+{[\s\S]+?}', _js_objects_name_parser],
    ]

    names = set()
    for pattern in js_and_html_name_declaration_patterns:
      idx = 0
      match = 'start'
      while match:
        match = re.search(pattern[0], self.single_js_file_content[idx:])
        if match:
          idx += match.end()
          if type(pattern[1]) == list:
            candidates = _general_names_parser(match.group(), *pattern[1])
          else:
            candidates = pattern[1](match.group())

          for name in candidates:
            name = name.strip()
            if len(name) > 3 and not re.search(r'[\W]+', name.replace('-', '')):
              names.add(name)

    return names

  def read_file_code(self, file_relative_path):
    print('{} is minimizing'.format(file_relative_path))
    file_full_path = os.path.join(os.path.dirname(__file__), file_relative_path)
    try:
      with open(file_full_path, 'r', encoding=self.ENCODING) as file:
        return file.read()
    except FileNotFoundError:
      return ''
    except UnicodeDecodeError:
      print('smth went wrong with {}'.format(file_full_path))
      raise UnicodeDecodeError

  def minify_script_using_http_service(self, original_script_code):
    res = requests.post(self.MINIFIER_HTTP_SERVICE_URL, data=dict(input=original_script_code))
    res.encoding = self.ENCODING
    return res.text

  def overwrite_code_to_file(self, relative_path, code):
    with open(os.path.join(os.path.dirname(__file__), relative_path), 'w', encoding=self.ENCODING) as output_file:
      output_file.write(code)

  def build_html_and_css(self):
    print('building html+css')
    css_src = os.path.join(os.path.dirname(__file__), 'style.css')
    css_build = os.path.join(os.path.dirname(__file__), 'build/style.css')
    shutil.copyfile(css_src, css_build)

    html_code = self.read_file_code('constructor.html')
    first_script_tag_position = html_code.find('<script')
    last_script_tag_position = html_code.find('</html>')
    new_script_tag_code = '<script src="' + self.CLIENT_APP_FILENAME_TEMPLATE.format(
      self.UIKIT_CLIENT_APP_VERSION) + '"></script>\n'
    html_code = html_code[:first_script_tag_position] + new_script_tag_code + html_code[last_script_tag_position:]
    self.overwrite_code_to_file('build/main.html', html_code)

  def remove_newlines_and_indents(self):
    print('removing indents and newlines')
    self.single_js_file_content = self.single_js_file_content.replace('\n', ' ').replace('\t', ' ')
    for i in range(12):
      self.single_js_file_content = self.single_js_file_content.replace('  ', '')

  def remove_comments(self):
    print('removing comments')
    self.single_js_file_content = re.sub(r'[/][*]+[^*]+[*][/]', '', self.single_js_file_content)

  def prepare_mangled_names(self, name_length=2):
    def suggest_name():
      name_ = ''
      for i in range(name_length):
        name_ += random.choice(string.ascii_letters)
      return name_

    def name_is_already_used(name_):
      if self.single_js_file_content.find(name_) + 1:
        return True
      else:
        return False

    def get_already_existing_alias(name_):
      try:
        return self.MANGLED_NAMES_USED[name_]
      except KeyError:
        return ''

    print('preparing new names')
    self.NAMES_TO_MANGLE = list(set(self.NAMES_TO_MANGLE))
    self.NAMES_TO_MANGLE.sort(key=lambda x: len(x), reverse=True)
    for name in self.NAMES_TO_MANGLE:
      existing_alias_used = True
      new_name = get_already_existing_alias(name)
      if not new_name:
        existing_alias_used = False
        new_name = suggest_name()
      print('suggested name: {}, existing alias used: {}'.format(new_name, existing_alias_used))
      while not existing_alias_used and name_is_already_used(new_name):
        new_name = suggest_name()
        print('this name is already used')
      self.single_js_file_content = self.single_js_file_content.replace(name, new_name)
      print('name "{}" was replaced with "{}"'.format(name, new_name))
      self.mangled_names[name] = new_name

  def prepare_for_production(self):
    print('preparing for production')
    self.single_js_file_content = self.single_js_file_content.replace(self.TEST_HOST, self.PRODUCTION_HOST)
    self.single_js_file_content = self.single_js_file_content.replace(self.TEST_CLIENTAPP_URL,
                                      self.PRODUCTION_CLIENTAPP_URL)
    self.single_js_file_content = self.single_js_file_content.replace('let standaloneMode = true',
                                      'let standaloneMode = false')


if __name__ == '__main__':
  Builder().main()
