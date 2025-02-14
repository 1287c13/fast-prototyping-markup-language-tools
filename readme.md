# Документация по проекту

Проект предоставляет инструменты для работы с языком разметки ЯРБП (язык разметки для быстрого прототипирования).

Спецификация языка: https://verno.tech/spec/

Проект состоит из 3-х инструментов:

- **fpml-editor** - клиентское приложение, предоставляющее
  - текстовый редактор разметки (с подсветкой синтаксиса и автодополнением)
  - генерацию UI макетов и BPMN схем по введенной разметке
  - графический редактор макетов
- **1c-form-export** - внешняя обработка для решений на базе технологической платформы 1С, предоставляющее 
функционал выгрузки форм объектов конкретной конфигурации в текстовый формат ЯРБП
- **markdown-tools** - системный скрипт для интеграции языка в md документацию с помощью замены текста ЯРБП разметки 
на dataURI ссылку на картинку

⚠️Проект находится в разработке, на данный момент доступна бета версия веб приложения fpml-editor 
(находится здесь: https://verno.tech/).

Ниже расположена документация по каждой компоненте.

## fpml-editor

Ниже перечислены компоненты и дано их описание. Данный раздел описывает техническую структуру решения
(это не пользовательская инструкция, руководство пользователя по языку см. в спецификации, руководство 
по использованию приложения см. в бета версии).

### builder.py

Скрипт для сборки проекта. При запуске собирает все компоненты в каталог /build/, исходя из конфигурации определенной в 
'builder_config.py'.

Конфигурация сборщика позволяет настроить:
- Вариант сборки. По умолчанию приложение собирается в 'офлайн' варианте, не требующем сервера и хранящем схемы 
локально в localstorage браузера. Также доступен клиент-серверный вариат сборки. Для клиент-серверного варианта, 
нужно указать адрес компоненты, отвечающей на методы, описанные в модуле 'modules/API.js'. ⚠️Серверная компонента 
не предоставляется данным репозиторием, тем не менее локальный вариант сборки всегда доступен.
- использование замены имен по списку для сокращения размера файла, а также сбор списка миен из файла
- использование внешнего минификатора
- прочие минорные настройки

### Основные файлы

constructor.html , style.css - пустая родительская страница, подключение компонент, глобальные стили. В целом по 
проекту стили прописаны как inline стили внутри html компонентов. 

TODO в будущих версиях сборщика планируется добавить группировку инлайн-стилей в обфусцированные css классы 
и вынесение их в глобальный css файл.

### elements\BPMN, elements\UI

В каталоге содержатся модули, реализующие базовые элементы BPMN нотации:
- BPMN\bpmnEvent.js - событие
- BPMN\bpmnGateway.js - шлюз
- BPMN\bpmnTask.js - задача
- BPMN\bpmnPool.js - бассейн
- BPMN\bpmnDocArtifact.js - документ
- UI\checkbox1c.js - флаг / радиокнопка
- UI\select1c.js - поле формы
- UI\tab1c.js - вкладка
- UI\table1c.js - таблица
- UI\text.js - текст
- UI\uncoloredButton1c.js - кнопка
- UI\wrapperForm1c.js - форма
- UI\yellowButton1c.js - кнопка с акцентом

Для интеграции в приложение, каждый модуль элемента должен содержать 
- функцию-рендерер, принимающую объект 'props' и возвращающую полностью готовый для вставки в документ 
html код элемента.
- функцию для вставки html элемента на страницу : определяет значения свойств элемента по умолчанию, вызывает рендерер
и помещает результат в dom дерево.

#### Процесс добавления нового / обновления существующего элемента.

Процесс общий для всех элементов (и для BPMN и для UI макетов). В описании упоминаются модули,
описание которых отдельно приведено ниже.

To create a new element, you want to implement:

- that element's type renderer function which takes element's JSON representation and returns HTML for that element. All
  element's logic should be defined in html inline code or somewhere. To add a drag handler add a 'drag-handler' class
  to some part of your element
- some UI and logic for adding that element to document (by now elements are added via contextMenu.js elements
  onmousedown)
- that element's type parser function which takes a dom element and returns it's JSON representation
- then you want to add your new element's parser and renderer to stateManagement.js 'parsers' and 'renderers' consts
- also you want to add some logic for interpreter at ide.js
- you're done

full example of adding new simple element may be found at commit # 77f4650 'text element added'. Flow is up to date 
for beta version dev

how it works: when element is added, it's renderer called with specified in call default props. If state changes,
changesRegistered variable is set to true so the state will be parsed and sent to server. Parsing is implemented at
stateManagement.js treeCrawler() which is called via setState(), so your parser will be used automatically if your
element root tag have classname specified as a key at 'parsers' for your element's parser. Then, when you get state from
the server, it is interpreted from JSON representation to HTML using a renderer specified at 'renderers' via the reverse
process (treeGrower instead of treeCrawler used).

Процесс добавления свойства в уже существующий элемент
- добавить имя и синоним токена в словарь токенов (ASCIITokens, nonASCIITokens)
- обновить допустимые значения в параметрах редактора (validTokens)
- добавить в значения по умолчанию (defaultProps), если значения нет, то добавить как ''
- если свойство рассчитывается из других параметров, то прописать соответствующий код  в defineSpecialAttrs
- обновить рендерер элемента в модуле элемента. В каждом модуле 2 основных функции - рендерер и вызов добавления в dom.
Нужно:
  - в вызове добавления в dom прописать новые параметры
  - в рендерере прописать обработку этих параметров
- обновить парсер этого элемента в модуле stateManagement.js
- (опционно) подумать, а не надо ли что то изменить в commonParts.updateMarkup(). Будет работать без этого, 
но свойства могут обрабатываться там для улучшения польз. опыта в редакторе.

### elements\

Помимо подкаталогов с элементами, в каталоге elements\ содержатся файлы с общими компонентами, используемыми как 
в UI эскизах, так и в BPMN схемах. 

Модули arrow.js и arrowHandle.js реализуют стрелки и хэндлы для drag n drop механик добавления стрелок на схемы.

commonParts.js - это библиотека общих компонент, предоставляющая:
- компоненты-хэндлы для изменения размера элементов в графическом редакторе
- обработчики событий изменения размеров элементов в графическом редакторе
- генераторы ID
- инструменты для синхронизации dom представления схем в графическом редакторе 
с текстовым представлением в текстовом редакторе

### icons\

Каталог c исходниками SVG графики, используемой в приложении: иконки, неизменяемые части элементов и т.п.

SVG элементы вставлены непосредственно в HTML разметку, т.о., в этом каталоге хранятся именно исходники, их изменение
не влияет на приложение.

### modules\API.js

Программный интерфейс взаимодействия с серверной компонентой 'statekeeper' (документация по 'statekeeper' см ниже).

Также, в зависимости от варианта сборки (значения параметра 'standaloneMode' модуля main.js), этот программный 
интерфейс может получать/передавать данные не в 'statekeeper', а в localstorage браузера (для реализации бессерверного
режима работы)

TODO перевести выдержку из старой документации ниже на русский язык

Integration with a state keeper.

Client app is designed to work with a backend component called 'state-keeper' which is not provided by this repository.
State-keeper should respond on requests specified at API.js.

API.createState() should return a GUID key for a **new** empty mockup state kept at a server side.

API.setState() takes JSON representation and a GUID key for current mockup and saves it at a database.

API.getState() should return a JSON representation of a mockup were saved for this GUID key lately.

When setState() is called, the state is parsed from a dom tree via getState() defined at stateManagement.js.

By default, state keeper expected at '127.0.0.1:8000/keeper/' but it will be changed at built app as it is specified at
builder_config.py.

### modules\keyManagement.js

Реализация системы управления ключами:
- стартовое окно (показывается при отсутствии ключа в localstorage)
- вызов методов API для управления ключами (выпуск нового ключа, запрос схемы по ключу)
- механики для офлайн режима функционирования клиента
- механики для передачи ключа в составе ссылки (как URL параметра)

### modules\main.js

Глобальные механизмы и неклассифицированный функционал (TODO классифицировать и перенести в другие модули).

- глобальные переменные (TODO собрать в глобальную структуру)
- команды добавления элементов интерфейса и элементов схем
- команды для работы со страницами (менеджмент ID страниц, переключение между страницами)
- движок drag n drop (TODO перенести в commonParts)
- копирование схем и страниц
- управление видимостью отдельных элементов
- вывод уведослений
- dataURI конвертер
- прочий функционал


### modules\mainMenu.js

Реализация главного навигационного меню: 
- вызов контекстного меню
- вызов панели текстового редактора
- вызов панели ссылок и интеграций
- вызов панели настроек
- кнопка сохранения

### modules\stateManagement.js

Система управления состоянием схем. Содержит:
- структуры для регистрации функций-парсеров (читают DOM и возвращают json представление элемента) в разрезе типов 
элементов
- определения зарегистрированных функций - парсеров
- структура для регистрации функций-рендереров (принимают JSON и рендерят готовый HTML код элемента). Рендереры 
предоставляются модулями элементов, а в stateManagement.js только происходит подключение.
- рекурсивные алгоритмы парсинга DOM дерева и рендеринга HTML с применением функций-парсеров и функций-рендереров, 
соответственно

### modules\contextMenu.js

Реализация контекстного меню и его команд.

### modules\editor.js

Реализация функциональности графического редактора и конвертации ЯРБП -> json

### modules\tooltips.js

Реализация системы всплывающих подсказок пользователю

## 1c-form-export

В каталоге '1c-form-export' расположены исходники обработки 
"Выгрузка формы в формате ЯРБП", позволяющая экспортировать
формы из 1С в виде разметки на специальном языке для 
последующей генерации их макетов для редактирования и 
вставки в документацию.

### Для сборки обработки

1. Скачать содержимое репозитория
2. Скачать сборщик **v8unpack.exe** из репозитория https://github.com/e8tools/v8unpack/releases
3. Собрать обработку через терминал. Порядок действий для ОС Windows:
   - запустить терминал (⊞ Win + R) 
   - выполнить в терминале команду: 
   `v8unpack -E C:\<каталог в котором нужно собрать обработку>\ВыгрузкаЯРБП.epf 
   C:\<каталог в который скачан репозиторий>\fast-prototyping-markup-language-tools\`
   - в указанной папке появился рабочий файл обработки

### Процесс работы с обработкой.

- зайти в пользовательский режим конфигурации 1С из которой необходимо скопировать форму
- открыть обработку через меню "Файл -> Открыть"
- в открывшейся форме обработки выбрать 
  - тип объекта для разметки (документ либо справочник)
  - имя объекта для разметки (выбор из объектов конфигурации)
  - форма этого объекта, разметку которого необходимо получить
  - номера активных вкладок, которые нужно отобразить на форме
- нажать кнопку "Получить разметку"

### Работа с полученной разметкой

Спецификация языка находится по адресу: https://verno.tech/spec/

Приложение в котором можно сгенерировать макет по разметке находится по 
адресу: https://verno.tech/mockup/

## markdown-tools

В каталоге 'markdown-tools' хранятся python скрипты, предназначенные для упрощения 
работы с markdown документами через назначение этих скриптов на горячие 
клавиши.

### Как использвоать скрипты

> ниже описан процесс для ОС Windows  

1. Установить Python https://www.python.org/
2. Установить зависимости:
   1. clipboard `pip install clipboard`
   2. selenium `pip install selenium`
   3. selenium `pip install keyboard`
3. Каждый .bat файл в папке /hotkey-handlers/ соответствует отдельной команде (сочетанию горячих клавиш). 
Для того, чтобы привязать горячие клавиши к .bat файлам, необходимо 
   - Создать ярлыки к .bat файлам и разместить эти ярлыки в 
      `C:\ProgramData\Microsoft\Windows\Start Menu\Programs`
   - Назначить горячие клавиши для всех созданных ярлыков (нажать на ярлык правой кнопкой мыши
   -> свойства -> быстрый вызов)
5. Использовать горячие клавиши при работе с текстом markdown документов в 
соответствии с назначениями конкретных скриптов. Описание скриптов см. ниже.

### Описание скриптов

#### Скрипт "test"

Тестовый скрипт (будет удален после завершения разработки)
Обрамляет выделенный в документе фрагмент текста в тег `<test></test>`
