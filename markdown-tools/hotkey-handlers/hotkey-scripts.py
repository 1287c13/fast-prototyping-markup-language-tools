import sys
import keyboard
import clipboard
import time

import config


def sleep(f):
  def wrapped(*args, **kwargs):
    f(*args, **kwargs)
    time.sleep(0.1)
  return wrapped


class ScriptHandler:

  def __init__(self):
    self.TEMPLATES_FOR_SCRIPT_NAMES = config.TEMPLATES_FOR_SCRIPT_NAMES
    self.HANDLERS_FOR_SCRIPT_NAMES = {
      'test': self.test}

    self.requested_script_name = ''

  @staticmethod
  @sleep
  def _switch_window():
    keyboard.send('alt+tab')

  @staticmethod
  @sleep
  def _cut_selection():
    keyboard.send('ctrl+x')

  @staticmethod
  @sleep
  def _paste_from_clipboard():
    keyboard.send('ctrl+v')

  def _replace_clipboard_content_via_template(self, handler_name):
    temp = self.TEMPLATES_FOR_SCRIPT_NAMES[handler_name]['tag_template']
    text = clipboard.paste()
    clipboard.copy(temp.format(text))

  def execute_requested_script(self):
    try:
      self.requested_script_name = sys.argv[1]
      self.HANDLERS_FOR_SCRIPT_NAMES[self.requested_script_name]()
    except IndexError:
      pass

  def test(self):
    self._switch_window()
    self._cut_selection()
    self._replace_clipboard_content_via_template('test')
    self._paste_from_clipboard()


if __name__ == '__main__':
  ScriptHandler().execute_requested_script()
