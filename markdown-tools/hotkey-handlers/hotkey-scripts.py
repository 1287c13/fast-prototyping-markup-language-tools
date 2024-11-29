import sys
import keyboard
import clipboard
import time
import base64

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException

import config
from utils import sleep


class ScriptHandler:

  def __init__(self):
    self.TEMPLATES_FOR_SCRIPT_NAMES = config.TEMPLATES_FOR_SCRIPT_NAMES
    self.HANDLERS_FOR_SCRIPT_NAMES = {
      'test': self.test, 'mockup': self.mockup}
    self.KEY = config.KEY
    self.PIC_NAME = config.PIC_NAME

    self.requested_script_name = ''

  @staticmethod
  @sleep
  def _switch_window():
    keyboard.send('alt+tab')

  @staticmethod
  @sleep
  def _cut_selection():
    clipboard.copy('')
    keyboard.send('ctrl+x')

  @staticmethod
  @sleep
  def _copy_selection():
    clipboard.copy('')
    keyboard.send('ctrl+c')

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

  def mockup(self):

    def wait_for_it(tag_name, timeout=1):
      flag = False
      while not flag:
        try:
          flag = driver.find_element(By.ID, tag_name).get_attribute("innerHTML") or 1
        except (NoSuchElementException, StaleElementReferenceException):
          time.sleep(timeout)

    key = self.KEY
    pic_name = self.PIC_NAME

    self._switch_window()
    self._copy_selection()
    code = clipboard.paste()

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)

    driver.get(f'https://verno.tech/mockup?key={key}')
    code = code.replace('\r', '')
    code_for_web = code.replace('\n', '<%n>')

    if code[-1] != '\n':
      code += '\n'
    # code.replace('\n', '')

    driver.execute_script(f'displaySchemeForGivenCode("{code_for_web}")')
    time.sleep(1)
    wait_for_it('scroll-crutch')
    driver.execute_script('prepareGUIForScreenshot()')
    wait_for_it('form-size-tag')
    form_size_info = driver.find_element(By.ID, 'form-size-tag').get_attribute("innerHTML")
    driver.set_window_size(
      float(form_size_info.split(';')[0]) - 30,
      float(form_size_info.split(';')[1]) + 20)
    driver.save_screenshot(pic_name + '.png')

    file_path = 'screenshot.png'

    binary_file_content = open(file_path, 'rb').read()
    base64_utf8_str = base64.b64encode(binary_file_content).decode('utf-8')
    ext = file_path.split('.')[-1]
    dataurl = f'data:image/{ext};base64,{base64_utf8_str}'

    result = f'```\n{code}```\n<img alt="screenshot" src="{dataurl}">'
    clipboard.copy(result)
    self._paste_from_clipboard()
    keyboard.send('Home')


if __name__ == '__main__':
  ScriptHandler().execute_requested_script()
