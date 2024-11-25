# 1c-form-export

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

# markdown-tools

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