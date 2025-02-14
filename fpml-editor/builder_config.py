"""
Это вариант конфигурации сборщика по умолчанию. Собирает все исходники в 3 файла:
- main.html
- style.css
- fpml-editor-app_test-build.js.js

Настроенный вариант сборки предназначен для локального запуска main.html в браузере. Для корректной работы нужно
указать ваш локальный путь к constructor.html в TEST_CLIENTAPP_URL
Опции сборщика см ниже.
"""

USE_MINIFIER = False
UIKIT_CLIENT_APP_VERSION = 'test-build'
PREPARE_FOR_PRODUCTION = False
PARSE_EXISTING_JS_BUILD = False
CLIENT_APP_FILENAME_TEMPLATE = 'fpml-editor-app_{}.js'
MINIFIER_HTTP_SERVICE_URL = 'https://www.toptal.com/developers/javascript-minifier/api/raw'
JS_SCRIPTS_TO_COOK = ['elements/commonParts.js', 'elements/arrowHandle.js', 'elements/BPMN/bpmnPool.js',
                      'elements/BPMN/bpmnEvent.js', 'elements/BPMN/bpmnGateway.js', 'elements/BPMN/bpmnTask.js',
                      'elements/BPMN/bpmnDocArtifact.js', 'elements/arrow.js', 'elements/UI/yellowButton1c.js',
                      'elements/UI/checkbox1c.js', 'elements/UI/select1c.js', 'elements/UI/text.js',
                      'elements/UI/tab1c.js', 'elements/UI/table1c.js', 'elements/UI/uncoloredButton1c.js',
                      'elements/UI/wrapperForm1c.js', 'modules/contextMenu.js', 'modules/API.js',
                      'modules/keyManagement.js', 'modules/mainMenu.js', 'modules/main.js',
                      'modules/stateManagement.js', 'modules/tooltips.js', 'modules/editor.js']
ENCODING = 'utf-8'
REMOVE_COMMENTS = True
REMOVE_NEWLINES_AND_INDENTS = False # TODO: doesnt work for any reason (check ";" at .js files first)
TEST_HOST = 'http://127.0.0.1:8000'
PRODUCTION_HOST = '<your-production-host-here>' #  used for 'keykeeper' component integration, check the doc
TEST_CLIENTAPP_URL = 'file:///D:/<your-path-to-constructor.html-here>/constructor.html>'
PRODUCTION_CLIENTAPP_URL = '<your-production-clientapp-url-here>'
MANGLED_NAMES_USED = {}
NAMES_TO_MANGLE = []
