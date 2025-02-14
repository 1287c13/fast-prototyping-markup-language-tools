cursorContext = {autofillMenuIsHidden: true, activeOptionNumber: 0, noRealOptionsProvided: false};

function getObjectSpan(objName) {
  return `<span class="ide-code-obj" style="color: #e17b3b; font-weight: bold;">${objName}</span>`;
}

function getPropSpan(propName, accent=1) {
  if (accent === 1) {
  return `<span class="ide-code-prop" style="color: #0000FF;">${propName}</span>`;
  } else if (accent === 2) {
  return `<span class="ide-code-prop" style="color: #a20000;">${propName}</span>`;
  }
}

function getValueSpan(valName) {
  return `<span class="ide-code-val" style="color: #47913c;">${valName}</span>`;
}

function getUnparsedSpan(unparsedString) {
  return `<span class="unparsed-code" style="color: #505050;">${unparsedString}</span>`;
}

function defineObjectNameSynonym(objName) {
  /*todo move this to config file*/
  let ASCIITokens = [
  'wrapperform1c', 'select1c', 'checkbox1c', 'dbtable1c', 'block', 'button', 'name', 'x', 'y', 'width', 'actions',
  'options', 'header', 'data', 'color', 'col', 'row', 'controls', 'fill', 'value', 'uncoloredbutton1c',
  'yellowbutton1c', 'margin', 'textelem', 'tab1c', 'numOfTabs', 'activeTab', 'taxi', 'checked', 'bpmnpool', 'lanes',
  'bpmnevent', 'typeElemProp', 'eventLocation', 'isBreaking', 'isThrowing', 'timerEvent', 'escalationEvent', 'signalEvent',
  'conditionEvent', 'compensationEvent', 'startEvent', 'mediumEvent', 'endEvent', 'bpmntask', 'firstTaskActivity',
  'secondTaskActivity', 'text', 'userTask', 'serviceTask', 'manualTask', 'receiveTask', 'sendTask', 'subprocessTask',
  'sequentionalTask', 'parallelTask', 'loopTask', 'compensationTask', 'boundaryEvent', 'branch', 'noText',
  'bpmngateway', 'exclusive', 'parallel', 'role', 'column', 'tabs', 'selectButton', 'calendar', 'open', 'dialog',
  'noAction', 'elementFontSize', 'borderWidth', 'height', 'schemeGrid', 'manualArrowHandles', 'styling', '1c',
  'abstract', 'downOffset', 'rightOffset', 'contentMaxWidth', 'scrollPosition', 'orientation'
  ];
  let nonASCIITokens = [
  'форма', 'реквизит', 'чекбокс', 'таблица', 'блок', 'кнопка', 'имя', 'х', 'у', 'ширина', 'действия',
  'опции', 'заголовок', 'данные', 'цвет', 'колонок', 'строк', 'панель', 'заполнять', 'значение', 'кнопкаБезАкцента',
  'кнопкаГлавная', 'отступ', 'надпись', 'вкладка', 'количествоВкладок', 'номерАктивнойВкладки', 'такси', 'флагУстановлен',
  'процесс', 'дорожки', 'событие', 'тип', 'расположение', 'прерывающее', 'генерирующее', 'время', 'эскалация',
  'сигнал', 'условие', 'компенсация', 'начальное', 'промежуточное', 'завершающее', 'задача', 'маркер1', 'маркер2',
  'текст', 'пользователь', 'сервисная', 'ручная', 'получение', 'отправка', 'подпроцесс', 'последовательно',
  'параллельно', 'цикл', 'откат', 'граничноеСобытие', 'ветка', 'безТекста', 'шлюз', 'эксклюзивный', 'параллельный',
  'роль', 'колонка', 'вкладки', 'выбор', 'календарь', 'открыть', 'диалог', 'нетДействий', 'размерШрифта', 'рамка',
  'высота', 'ячейка', 'стрелка', 'стилизация', '1с', 'абстрактная', 'сдвигВниз', 'сдвигВправо', 'максШирина',
  'прокруткаВправо', 'расположениеИндикатора'
  ];
  return ASCIITokens[nonASCIITokens.findIndex(e => e === objName)];
}

function transformTextToSpanAndBrTags(text) {
  let _output = '';
  let i = 0;
  /*todo move this to config file*/
  validTokens = {
  obj: ['форма', 'реквизит', 'чекбокс', 'таблица', 'блок', 'кнопкаБезАкцента', 'кнопкаГлавная', 'отступ',
    'надпись', 'вкладка', 'процесс', 'событие', 'задача', 'граничноеСобытие', 'ветка', 'шлюз', 'колонка'],
  prop: {
    wrapperform1c: ['имя', 'такси', 'стилизация', 'ширина', 'высота'],
    checkbox1c: ['имя', 'флагУстановлен', 'х', 'у', 'ширина', 'расположениеИндикатора', 'тип'],
    select1c: ['имя', 'значение', 'действия', 'выбор', 'ширина', 'х', 'у'],
    dbtable1c: ['колонок', 'строк', 'цвет', 'панель', 'х', 'у', 'максШирина', 'прокруткаВправо'],
    uncoloredbutton1c: ['имя', 'х', 'у', 'ширина'],
    yellowbutton1c: ['имя', 'х', 'у', 'ширина'],
    block: ['заполнять', 'ширина', 'высота'],
    margin: ['х', 'у'],
    textelem: ['имя', 'цвет', 'размерШрифта', 'рамка', 'ширина', 'высота', 'х', 'у'],
    tab1c: ['количествоВкладок', 'номерАктивнойВкладки', 'вкладки', 'х', 'у', 'ширина', 'высота'],
    bpmnpool: ['имя', 'дорожки'],
    bpmnevent: ['тип', 'текст', 'расположение', 'прерывающее', 'генерирующее', 'роль', 'ячейка', 'стрелка', 'х', 'у',
    'ширина', 'высота'],
    bpmntask: ['тип', 'маркер1', 'маркер2', 'текст', 'роль', 'ячейка', 'стрелка', 'х', 'у', 'ширина', 'высота'],
    boundaryEvent: ['тип'],
    branch: ['безТекста', 'текст', 'х', 'у', 'ширина', 'высота'],
    bpmngateway: ['тип', 'текст', 'ячейка', 'стрелка', 'х', 'у', 'ширина', 'высота'],
    column: ['имя', 'данные', 'ширина']
  },
  val: {
    wrapperform1c: {name: null, taxi: ['да', 'нет'], x: null, y: null, styling: ['1с', 'абстрактная']},
    checkbox1c: {
    name: null, x: null, y: null, width: null, checked: ['да', 'нет'], options: null,
    typeElemProp: ['флаг', 'радио'], orientation: ['слева', 'справа']
    },
    select1c: {
    name: null, x: null, y: null, width: null, actions: ['календарь', 'открыть', 'диалог', 'нетДействий'],
    selectButton: ['да', 'нет'], options: null
    },
    dbtable1c: {x: null, y: null, color: ['да', 'нет'], col: null, row: null, controls: ['да', 'нет'],
    'contentMaxWidth': null, 'scrollPosition': null},
    uncoloredbutton1c: {name: null, x: null, y: null, width: null},
    yellowbutton1c: {name: null, x: null, y: null, width: null},
    block: {fill: ['слева-направо', 'сверху-вниз']},
    margin: {x: null, y: null},
    textelem: {name: null, color: null, elementFontSize: null, borderWidth: [0, 1]},
    tab1c: {numOfTabs: null, activeTab: null, tabs: null},
    bpmnpool: {name: null, lanes: null},
    bpmnevent: {typeElemProp: ['время', 'эскалация', 'сигнал', 'условие', 'компенсация'],
    eventLocation: ['начальное', 'промежуточное', 'завершающее'], isThrowing: ['да', 'нет'],
    'manualArrowHandles': ['вниз', 'вправо', 'вправо-вниз', 'вправо-вверх', 'вправо-вверх-вправо'],
    'schemeGrid': null, isBreaking: ['да', 'нет'], x: null, y: null},
    bpmntask: {typeElemProp: ['пользователь', 'сервисная', 'ручная', 'получение', 'отправка'], text: null,
    firstTaskActivity: ['подпроцесс', 'последовательно', 'параллельно', 'цикл', 'откат'],
    secondTaskActivity: ['подпроцесс', 'последовательно', 'параллельно', 'цикл', 'откат'],
    'manualArrowHandles': ['вниз', 'вправо', 'вправо-вниз', 'вправо-вверх', 'вправо-вверх-вправо'],
    'schemeGrid': null, x: null, y: null, width: null, height: null},
    boundaryEvent: {typeElemProp: ['время', 'эскалация', 'сигнал', 'условие', 'компенсация']},
    branch: {noText: ['да', 'нет'], text: null, x: null, y: null},
    bpmngateway: {typeElemProp: ['эксклюзивный', 'параллельный'], text: null,
    'manualArrowHandles': ['вниз', 'вправо', 'вправо-вниз', 'вправо-вверх', 'вправо-вверх-вправо'],
    'schemeGrid': null, x: null, y: null},
    column: {name: null, data: null, width: null},
  },
  accents: {2: ['ячейка', 'стрелка', 'х', 'у', 'ширина', 'высота']}
  };
  cursorContext.memoryString = '';
  cursorContext.expectedBreakChars = [' ', '\n'];
  cursorContext.expectedTokenType = 'obj';
  cursorContext.lastTokenType = '';
  cursorContext.lastObjectTokenValue = '';
  cursorContext.lastPropTokenValue = '';
  cursorContext.syntaxErrorFlag = false;
  cursorContext.activeOptionNumber = 0;
  while (i < text.length) {
  let parserHasReachedTheCaret = IDECodeInput.selectionStart <= i;
  if (!cursorContext.syntaxErrorFlag && !parserHasReachedTheCaret) {
    if (cursorContext.expectedTokenType === 'obj') {
    if (!cursorContext.expectedBreakChars.includes(text[i])) {
      if (text[i] === '.') {
      cursorContext.expectedTokenType = 'prop';
      cursorContext.expectedBreakChars = [' '];
      _output += getUnparsedSpan(cursorContext.memoryString);
      cursorContext.memoryString = '';
      } else {
      cursorContext.autofillMenuIsHidden = false;
      }
      cursorContext.memoryString += text[i];
    } else if (validTokens.obj.includes(cursorContext.memoryString
      .replaceAll(' ', '')
      .replaceAll('\n', ''))) {
      while (cursorContext.memoryString.includes('  ')) {
      _output += `<span class="tab">&nbsp;&nbsp;</span>`;
      cursorContext.memoryString = cursorContext.memoryString.replace('  ', '');
      }
      if (cursorContext.memoryString.includes('\n')) {
      _output += '<br>';
      cursorContext.memoryString = cursorContext.memoryString.replaceAll('\n', '');
      }
      _output += getObjectSpan(cursorContext.memoryString);
      cursorContext.lastObjectTokenValue = cursorContext.memoryString
      .replaceAll(' ', '')
      .replaceAll('\n', '');
      cursorContext.memoryString = text[i];
      cursorContext.expectedTokenType = '';
      cursorContext.expectedBreakChars = [];
    } else {
      if (cursorContext.memoryString.includes('\n')) {
      _output += '<br>';
      cursorContext.memoryString = cursorContext.memoryString.replaceAll('\n', '');
      }
      while (cursorContext.memoryString.includes('  ')) {
      _output += `<span class="tab">&nbsp;&nbsp;</span>`;
      cursorContext.memoryString = cursorContext.memoryString.replace('  ', '');
      }
      cursorContext.memoryString += text[i];
      if (cursorContext.memoryString
      .replaceAll(' ', '')
      .replaceAll('\n', '')
      .length) {
      cursorContext.syntaxErrorFlag = true;
      }
    }
    } else if (cursorContext.expectedTokenType === '') {
    if (text[i] === ' ') {
      cursorContext.memoryString += '&nbsp;';
    } else if (text[i] === '.') {
      _output += getUnparsedSpan(cursorContext.memoryString);
      cursorContext.memoryString = text[i];
      cursorContext.expectedTokenType = 'prop';
      cursorContext.expectedBreakChars = [' '];
    } else if (text[i] === '\n') {
      cursorContext.memoryString = text[i];
      cursorContext.expectedTokenType = 'obj';
      cursorContext.expectedBreakChars = [' ', '\n'];
    } else {
      cursorContext.memoryString += text[i];
      cursorContext.syntaxErrorFlag = true;
    }
    } else if (cursorContext.expectedTokenType === 'prop') {
    if (!cursorContext.expectedBreakChars.includes(text[i])) {
      cursorContext.memoryString += text[i];
    } else if (validTokens.prop[defineObjectNameSynonym(cursorContext.lastObjectTokenValue)]
      .includes(cursorContext.memoryString
      .replaceAll(' ', '')
      .replaceAll('.', ''))) {
      if (validTokens.accents[2].includes(cursorContext.memoryString.replace('.',''))) {
      _output += getPropSpan(cursorContext.memoryString, 2);
      } else {
      _output += getPropSpan(cursorContext.memoryString);
      }
      cursorContext.lastPropTokenValue = cursorContext.memoryString
      .replaceAll(' ', '')
      .replaceAll('\n', '')
      .replaceAll('.', '');
      cursorContext.memoryString = text[i];
      cursorContext.expectedTokenType = 'val';
      cursorContext.expectedBreakChars = ['\n', '.'];
    } else {
      cursorContext.memoryString += text[i];
      cursorContext.syntaxErrorFlag = true;
    }
    } else if (cursorContext.expectedTokenType === 'val') {
    if (!cursorContext.expectedBreakChars.includes(text[i])
      ||
      cursorContext.expectedBreakChars.includes(text[i])
      && text[i] === '.'
      && text[i - 1] !== ' ') {
      cursorContext.memoryString += text[i];
    } else {
      _output += getValueSpan(cursorContext.memoryString);
      cursorContext.memoryString = text[i];
      cursorContext.lastTokenType = 'val';
      if (text[i] === '.') {
      cursorContext.expectedTokenType = 'prop';
      cursorContext.expectedBreakChars = [' '];
      } else {
      cursorContext.expectedTokenType = 'obj';
      cursorContext.expectedBreakChars = [' ', '\n'];
      cursorContext.autofillMenuIsHidden = true;
      showIDEAutofillMenu();
      }
    }
    }
  } else {
    cursorContext.memoryString += text[i];
  }
  i++;
  }
  if (cursorContext.memoryString !== '') {
  _output += getUnparsedSpan(cursorContext.memoryString.replaceAll(' ', '&nbsp;'));
  }
  return _output.replaceAll('\n', '<br>');
}

function fillTextToPane() {
  let htmlRepr = transformTextToSpanAndBrTags(IDECodeInput.value);
  htmlRepr = htmlRepr.replaceAll(
  '<span class="unparsed-code" style="color: #505050;">  </span>',
  '<span class="tab">&nbsp;&nbsp;</span>');
  IDECodePane.innerHTML = htmlRepr;
}

function hiddenAutofillMenu() {
  return `
  <div style="padding: 4px 8px 4px 8px;" onclick="openContextMenuOnclick();">Alt &#x25BC</div>
  `;
}

function autofillOptionElement(optionText, isActive = false, optionNumber = null) {
  let backgroundColor = '#FFFFFF';
  let idMarkup = '';
  if (!isActive) {
  backgroundColor = '#EEEEEE';
  idMarkup = 'id="active-autofill-option"';
  }
  return `
    <div 
      class="autofill-option" 
      ${idMarkup}
      data-id="${optionNumber}"
      style="padding: 4px 8px 4px 8px; background-color: ${backgroundColor};"
      onclick="autofillOnclick(this);"
    >${optionText}</div>`;
}


function filterOptionsForUserInput(possibleOptions) {
  let userInput = cursorContext.memoryString
  .replaceAll('.', '')
  .trim()
  .split(' ')[0]
  .replaceAll('\n', '')
  .toLowerCase()

  let filteredOptions = possibleOptions.filter(s => {
  let searchResult = s.toLowerCase().match(userInput);
  if (!searchResult) {return false} else {return !searchResult.index}
  });

  possibleOptions.forEach(option => {
  if (!filteredOptions.includes(option)) {
    filteredOptions.push(option);
  }
  })

  return filteredOptions;
}

function getAutofillOptionsForContext() {
  if (cursorContext.expectedTokenType === 'obj') {
  if (cursorContext.lastTokenType === '') {
    return ['форма', 'процесс'];
  } else {
    let unfiltered;
    if (document.querySelector('#ide-code-pane').childNodes[0].innerHTML === 'форма') {
    unfiltered = ['реквизит', 'чекбокс', 'таблица', 'блок', 'кнопкаБезАкцента', 'кнопкаГлавная',
      'отступ', 'надпись', 'вкладка', 'колонка'];
    } else if (document.querySelector('#ide-code-pane').childNodes[0].innerHTML === 'процесс') {
    unfiltered = ['событие', 'задача', 'шлюз', 'ветка', 'граничноеСобытие'];
    }
    return filterOptionsForUserInput(unfiltered);
  }
  } else if (cursorContext.expectedTokenType === 'prop') {
  return filterOptionsForUserInput(
    validTokens.prop[defineObjectNameSynonym(cursorContext.lastObjectTokenValue)]);
  } else if (cursorContext.expectedTokenType === 'val') {
  let options =
    validTokens.val
    [defineObjectNameSynonym(cursorContext.lastObjectTokenValue)]
    [defineObjectNameSynonym(cursorContext.lastPropTokenValue)];
  if (options) {
    return filterOptionsForUserInput(options);
  } else {
    return [];
  }
  } else {
  return [];
  }
}

function openedAutofillMenu() {
  let i = 0;
  let options = getAutofillOptionsForContext();
  if (!options.length) {
  if (cursorContext.expectedTokenType !== 'val') {
    options = ['&ltнет вариантов&gt'];
  } else {
    options = ['&ltпроизвольное значение&gt'];
  }
  cursorContext.noRealOptionsProvided = true;
  i = 1;
  } else {
  cursorContext.noRealOptionsProvided = false;
  }
  cursorContext.activeOptionNumber = Math
  .max(0, Math.min(options.length - 1, cursorContext.activeOptionNumber));
  let optionsHtml = '';
  options.forEach((o) => {
  if (i === cursorContext.activeOptionNumber) {
    optionsHtml += autofillOptionElement(o, false, i)
  } else {
    optionsHtml += autofillOptionElement(o, true, i)
  }
  i++
  });
  return `
  <div>${optionsHtml}</div>
  `;
}

function renderIDEAutofillMenuHTML(cursorPositionY, cursorPositionX, noWrap=false, closed=false) {

  if (IDECodeInput.value[IDECodeInput.selectionStart] === '.') {
  cursorContext.autofillMenuIsHidden = true;
  }

  let content;
  if (!cursorContext || cursorContext.autofillMenuIsHidden || closed) {
  content = hiddenAutofillMenu();
  } else {
  content = openedAutofillMenu();
  }
  if (noWrap) {
  return content;
  } else {
  return `
    <div 
      id="ide-autofill-menu" 
      style="top: ${cursorPositionY * 17 + 3}px; left: ${cursorPositionX * 7.8}px; 
      z-index: 9999; position: absolute; background-color: #FFFFFF; display: flex; flex-direction: column; 
      font-weight: 400; font-size: 12px; border: 1px solid #9B9B9B;">
      ${content}
    </div>
    `;
  }
}

function showIDEAutofillMenu(closed=false) {
  let codeInput = document.querySelector('#ide-code-input');
  let markupLinesBeforeCaret = codeInput.value.slice(0, codeInput.selectionStart).split("\n");
  let cursorPositionY = markupLinesBeforeCaret.length;
  let cursorPositionX = markupLinesBeforeCaret[cursorPositionY - 1].length;
  let autofillMenu = document.querySelector('#ide-autofill-menu');
  if (autofillMenu) {
  autofillMenu.innerHTML = renderIDEAutofillMenuHTML(null, null, true);
  autofillMenu.style.top = cursorPositionY * 17 + 3 + 'px';
  autofillMenu.style.left = cursorPositionX * 7.8 + 'px';
  } else {
  document.querySelector('#ide-code-pane').innerHTML +=
    renderIDEAutofillMenuHTML(cursorPositionY, cursorPositionX, false, closed);
  }
}

function handleIDEInput(closed=false) {
  fillTextToPane();
  showIDEAutofillMenu(closed);
  cursorContext.autofillMenuIsHidden = closed || cursorContext.autofillMenuIsHidden;
}

function thereIsAHintAtAutofillMenu() {
  let autofillMenuOption = document.querySelector('.autofill-option');
  let autofillMenuContent = (autofillMenuOption) ? autofillMenuOption.innerHTML : '';
  return autofillMenuContent.match(/&lt[\d\D]*&gt/);
}

function autofillOnclick(elem) {
  cursorContext.activeOptionNumber = elem.getAttribute('data-id');
  showIDEAutofillMenu();
  document.querySelector('#ide-code-input').focus();
  document.querySelector('#ide-form-wrapper')
  .dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
}

function openContextMenuOnclick() {
  cursorContext.autofillMenuIsHidden = false;
  showIDEAutofillMenu();
}

function renderMainWindow() {
  removeTooltip();
  document.body.innerHTML += `
  <div id="ide-form-wrapper" 
    style="position: absolute; width: 95%; height: 98%; font-family: 'JetBrains Mono', serif; display: flex;
    justify-content: center; z-index: 9999">
    <div
      style="width: 95%; height: 100%; background-color: #FFFFFF; box-shadow: 0 3px 6px rgba(0, 0, 0, 1);
      position: absolute; font-weight: 400">
      <div id="ide-code-pane"
        style="margin-left: 10px; margin-top: 20px; width: 94%; height: 96%; border: transparent;
        position: absolute; font-size: 13px;"></div>
      <textarea id="ide-code-input" autofocus spellcheck="false" oninput="handleIDEInput();"
        onclick="handleIDEInput();"
        style="margin-left: 10px; margin-top: 20px; width: 94%; height: 96%; border: transparent;
        position: absolute; background-color: transparent; font-family: 'JetBrains Mono', serif;
        font-size: 13px; padding: 0; -webkit-text-fill-color: transparent;"></textarea>
      <div onmouseenter="this.style.backgroundColor = '#eeeeee'"
        onmouseleave="this.style.backgroundColor = '#ffffff'"
        onclick="clearAllManualLayout();"
        style="border: 1px solid #1a1a1a; border-radius: 3px; background-color: #ffffff; 
        cursor: pointer; color: #1a1a1a; height: 30px; width: 320px; position: absolute; top: calc(100% - 50px);
        left: calc(100% - 490px);">
        <span
          style="position: absolute; margin-left: 20px; margin-top: 6px; font-size: 14px;">
          Очистить ручное позиционирование
        </span>
      </div>
      <div class="button-dark" onmouseenter="this.style.backgroundColor = '#574545'"
        onmouseleave="this.style.backgroundColor = '#707070'"
        onclick="renderCode();"
        style="border: 1px solid transparent; border-radius: 3px; background-color: #707070; 
        cursor: pointer; color: #ffffff; height: 30px; width: 120px; position: absolute; top: calc(100% - 50px);
        left: calc(100% - 150px);">
        <span
          style="position: absolute; margin-left: 20px; margin-top: 6px; font-size: 14px;">
          Отобразить
        </span>
      </div>
      <span
        style="color: black; position: absolute; right: 20px; top: 10px; cursor: pointer; font-size: 22px;"
        onclick="this.closest('#ide-form-wrapper').remove();">
        &#10006;
      </span>
    </div>
  </div>
  `;
  IDECodePane = document.querySelector('#ide-code-pane');
  IDECodeInput = document.querySelector('#ide-code-input');
  document.querySelector('#ide-form-wrapper').addEventListener('keydown', function (e) {
  let target = document.querySelector('#ide-code-input');
  if (e.key === 'Tab') {
    e.preventDefault();
    let start = target.selectionStart;
    let end = target.selectionEnd;
    const markupTail = target.value.slice(end);
    if (cursorContext.autofillMenuIsHidden || cursorContext.noRealOptionsProvided) {
    target.value = target.value.substring(0, start) + '  ' + target.value.substring(end);
    target.selectionStart = target.selectionEnd = start + 2;
    } else {
    let codeInput = document.querySelector('#ide-code-input');
    let activeAutofillOption = {innerHTML: ''};
    let i = 0;
    document.querySelector('#ide-autofill-menu').querySelectorAll('.autofill-option')
      .forEach((option) => {
      if (i === cursorContext.activeOptionNumber) {
        activeAutofillOption = option;
      }
      i++;
      });
    if (activeAutofillOption) {
      if (cursorContext.expectedTokenType === 'obj') {
      if (cursorContext.memoryString.includes('\n')
        || cursorContext.memoryString.includes(' ')) {
        let regex = new RegExp(`([\\d\\D]{0,${end}} {2})([а-яА-Я\\w\\.]*)([\\d\\D]*)`,'m');
        codeInput.value = codeInput.value.replace(
        regex, '$1' + activeAutofillOption.innerHTML + '$3');
        if (!markupTail.length) {
        codeInput.value += ' .';
        }
      } else if (codeInput.value) {
        let regex = new RegExp(`([а-яА-Я\\w\\.]+)([\\d\\D]*)`,'m');
        codeInput.value = codeInput.value.replace(regex, activeAutofillOption.innerHTML + '$2');
        codeInput.value += ' .';
      } else {
        codeInput.value = activeAutofillOption.innerHTML + ' .';
      }
      } else if (cursorContext.expectedTokenType === 'prop') {
      let regex = new RegExp(`([\\d\\D]{0,${end}}\\.)([а-яА-Я\\w\\.]*)([\\d\\D]*)`,'m');
      codeInput.value = codeInput.value.replace(
        regex, '$1' + activeAutofillOption.innerHTML + '$3');
      if (!markupTail.length) {
        codeInput.value += ' .';
      }
      } else if (cursorContext.expectedTokenType === 'val') {
      if (markupTail.length) {
        codeInput.value = codeInput
          .value.slice(0, codeInput.value.length - cursorContext.memoryString.length)
        + ' ' + activeAutofillOption.innerHTML + ' .';
      } else {
        codeInput.value = codeInput
          .value.slice(0, codeInput.value.length - cursorContext.memoryString.length + 1)
        + activeAutofillOption.innerHTML + ' .' + codeInput
          .value.slice(codeInput.value.length - cursorContext.memoryString.length
          + (activeAutofillOption.innerHTML + ' .' + codeInput).length);
      }
      if (!cursorContext.autofillMenuIsHidden && !cursorContext.noRealOptionsProvided) {
        target.value += markupTail;
      }
      }
    }
    }

    let codeInput = document.querySelector('#ide-code-input');
    /* todo переместить каретку после автозаполнения : если не value то к ближайшему пробелу справа от каретки
    *   иначе к ближайшей точке */
    target.selectionStart = target.selectionEnd = codeInput.value.length - markupTail.length;
    target.oninput(undefined);
  } else if (e.key === 'Alt') {
    e.preventDefault();
    cursorContext.autofillMenuIsHidden = !cursorContext.autofillMenuIsHidden;
    showIDEAutofillMenu();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    cursorContext.autofillMenuIsHidden = true;
    showIDEAutofillMenu();
    document.querySelector('#ide-autofill-menu').style.display = 'none';
  } else if (e.keyCode === 40) {
    if (!cursorContext.autofillMenuIsHidden && !thereIsAHintAtAutofillMenu()) {
    e.preventDefault();
    cursorContext.activeOptionNumber++;
    showIDEAutofillMenu();
    } else {
    handleIDEInput(true);
    }
  } else if (e.keyCode === 38) {
    if (!cursorContext.autofillMenuIsHidden && !thereIsAHintAtAutofillMenu()) {
    e.preventDefault();
    cursorContext.activeOptionNumber--;
    showIDEAutofillMenu();
    } else {
    handleIDEInput(true);
    }
  } else if (e.keyCode === 39) {
    handleIDEInput(true);
  } else if (e.keyCode === 37) {
    handleIDEInput(true);
  }
  });
  showIDEAutofillMenu();
  IDECodeInput.focus();
  window.scrollTo(0, 0);
  IDECodeInput.value = updateMarkup();
  handleIDEInput();
}

function htmlReprToElementsArray() {
  let htmlReprElements = document.querySelector('#ide-code-pane').children;

  let flag = false;
  for (let i = htmlReprElements.length - 1; i > 0; i--) {
  let token = htmlReprElements[i];
  if (token.className ===  'ide-code-prop') {
    flag = true;
  } else if (token.tagName === 'BR' || token.className === 'tab') {
    if (flag) {
    token.parentNode.removeChild(token);
    }
  } else {
    flag = false;
  }
  }

  let mockupElements, context;
  mockupElements = [];
  context = {currentElem: {}, indent: 0};
  for (let i = 0; i < htmlReprElements.length; i++) {
  let token = htmlReprElements[i];
  if (token.className === 'ide-code-obj') {
    context.currentElem = {};
    context.currentElem.children = [];
    context.currentElem.indent = context.indent;
    context.indent = 0;
    context.currentElem.type = defineObjectNameSynonym(token.innerHTML.trim());
  } else if (token.className === 'ide-code-prop') {
    context.currentProp = defineObjectNameSynonym(token.innerHTML.replace('.', ''));
  } else if (token.className === 'ide-code-val') {
    context.currentElem[context.currentProp] = token.innerHTML.trim();
  } else if (token.tagName === 'BR') {
    mockupElements.push(structuredClone(context.currentElem));
  } else if (token.className === 'tab') {
    context.indent++;
  }
  }
  mockupElements.push(structuredClone(context.currentElem));
  return mockupElements;
}

function addDefaultValuesToElements(mockupElements) {
  /*todo move this to config file*/
  let defaultProps = {
  'select1c': {'nameResizeWidth': '169px', 'displayActionButton': 'checked', 'openObjectActionButton': 'checked',
    'pickDateActionButton': '', 'displaySelectButton': 'checked', 'noButtons': '', 'name': '',
    'options': {'selected': '', 'options': ['']}, 'leftMargin': 0, 'width': null,
    'pickObjectActionButton': '', 'value': '',},
  'checkbox1c': {'name': 'Чекбокс', 'nameResizeWidth': '80px', 'checked': '', 'typeElemProp': 'флаг',
    'orientation': 'слева'},
  'uncoloredbutton1c': {'name': 'Кнопка', 'nameResizeWidth': '124px'},
  'yellowbutton1c': {'name': 'Кнопка', 'nameResizeWidth': '124px'},
  'wrapperform1c': {'top': '50px', 'left': '100px', 'id': `form-1c-${formCounter}`, 'name': 'Имя формы',
    'nameResizeWidth': '240px', 'mainResizeHeight': '10px', 'mainResizeWidth': '426px', 'indent': 0,
    'fill': 'сверху-вниз', 'taxi': 'checked', 'styling': '1c'},
  'dbtable1c': {'removeControls': 'checked', 'coloredLines': '', 'paddingTop': 0, 'contentMaxWidth': '1000px',
    'scrollPosition': 0},
  'block': {'fill': 'сверху-вниз', 'initCursorPosition': [0, 0], 'contentSize': [0, 0]},
  'margin': {},
  'textelem': {'name': 'Текст', 'nameResizeWidth': '100px', 'nameResizeHeight': '1rem', 'elementFontSize': '14px',
    'color': '#000000', 'width': null, 'height': null,},
  'tab1c': {'mainResizeHeight': '100px', 'mainResizeWidth': '426px', 'tabs': '', 'activeTab': 0,
    'initCursorPosition': [20, 45], 'contentSize': [0, 0], 'fill': 'сверху-вниз'},
  'bpmnevent': {'isBreaking': 'checked', 'isThrowing': 'checked', 'eventLocation': 'начальное', 'eventType': '',
    isHandled: false, 'manualArrowHandles': 'вправо'},
  'bpmngateway': {'gatewayType': '', isHandled: false, 'manualArrowHandles': 'вправо', 'rightOffset': 0,
    'downOffset': 0},
  'bpmnpool': {'poolName': 'Процесс', 'lanes': [{'name': 'Пользователь', 'height': 100, 'width': 800}],
    'indent': 0, 'idPool': `bpmn-pool-${formCounter}`, 'top': '50px', 'left': '140px', 'arrows': []},
  'bpmntask': {'taskWidth': 130, 'taskHeight': 70, 'taskText': 'Описание задачи', 'taskType': '',
    'firstTaskActivity': '', 'secondTaskActivity': '', isHandled: false, 'manualArrowHandles': 'вправо'},
  'boundaryEvent': {'eventType': '', isHandled: false, 'manualArrowHandles': null},
  'branch': {},
  'column': {'width': null},
  };
  function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
  }
  for (let i = 0; i < mockupElements.length; i++) {
  let uniqueKeys, elem, key;
  uniqueKeys = [];
  elem = mockupElements[i];
  uniqueKeys.push(...Object.keys(elem));
  uniqueKeys.push(...Object.keys(defaultProps[elem.type]));
  uniqueKeys = uniqueKeys.filter(onlyUnique);
  for (let j = 0; j < uniqueKeys.length; j++) {
    key = uniqueKeys[j];
    elem[key] = elem[key] || defaultProps[elem.type][key];
  }
  if (!['bpmnpool', 'wrapperform1c'].includes(elem.type)) {
    elem.id = generateElementID(i, 0);
  }
  }
  return mockupElements;
}

function defineArrowHandlers(mockupElements, i) {
  if (mockupElements[i].manualArrowHandles === 'вниз') {
  mockupElements[i].arrowHandles = ['b', 't'];
  } else if (mockupElements[i].manualArrowHandles === 'вправо') {
  mockupElements[i].arrowHandles = ['r', 'l'];
  } else if (mockupElements[i].manualArrowHandles === 'вправо-вниз') {
  mockupElements[i].arrowHandles = ['r', 't'];
  } else if (mockupElements[i].manualArrowHandles === 'вправо-вверх') {
  mockupElements[i].arrowHandles = ['r', 'b'];
  } else if (mockupElements[i].manualArrowHandles === 'вправо-вверх-вправо') {
  mockupElements[i].arrowHandles = ['r', 'l'];
  }
}

function defineSchemeGrid(mockupElements, i) {
  if (mockupElements[i].schemeGrid) {
  mockupElements[i].schemeGrid = mockupElements[i].schemeGrid.split(',').map(s => Number(s));
  } else {
  mockupElements[i].schemeGrid = [null, null];
  }
}

function defineSpecialAttrs(mockupElements) {
  for (let i = 0; i < mockupElements.length; i++) {
  if (['branch'].includes(mockupElements[i].type)) {
    defineSchemeGrid(mockupElements, i);
  }
  if (mockupElements[i].type === 'select1c') {
    if (mockupElements[i].value) {
    mockupElements[i]['options'] = structuredClone(mockupElements[i]['options']);
    mockupElements[i]['options']['selected'] = mockupElements[i].value;
    }
    if (mockupElements[i].actions === 'календарь') {
    mockupElements[i].displayActionButton = 'checked';
    mockupElements[i].openObjectActionButton = '';
    mockupElements[i].pickDateActionButton = 'checked';
    mockupElements[i].pickObjectActionButton = '';
    }
    else if (mockupElements[i].actions === 'открыть') {
    mockupElements[i].displayActionButton = 'checked';
    mockupElements[i].openObjectActionButton = 'checked';
    mockupElements[i].pickDateActionButton = '';
    mockupElements[i].pickObjectActionButton = '';
    }
    else if (mockupElements[i].actions === 'диалог') {
    mockupElements[i].displayActionButton = 'checked';
    mockupElements[i].openObjectActionButton = '';
    mockupElements[i].pickDateActionButton = '';
    mockupElements[i].pickObjectActionButton = 'checked';
    }
    else if (mockupElements[i].actions === 'нетДействий') {
    mockupElements[i].displayActionButton = '';
    mockupElements[i].openObjectActionButton = 'checked';
    mockupElements[i].pickDateActionButton = '';
    mockupElements[i].pickObjectActionButton = '';
    }

    mockupElements[i].displaySelectButton = mockupElements[i].selectButton === 'да' ? 'checked' : '';

    if (mockupElements[i].displaySelectButton === '' && mockupElements[i].displayActionButton === '') {
    mockupElements[i].noButtons = 'checked';
    }

    let additionalSpaceForControls = 48;
    additionalSpaceForControls -= mockupElements[i].displaySelectButton ? 24 : 0;
    additionalSpaceForControls -= mockupElements[i].displayActionButton ? 24 : 0;
    mockupElements[i].nameResizeWidth = mockupElements[i].value !== ''
    ? `${Math.max(mockupElements[i].value.length * 7.5, 169 + additionalSpaceForControls)}px`
    : `${169 + additionalSpaceForControls}px`;

    if (mockupElements[i].width) {
    mockupElements[i].nameResizeWidth = `${mockupElements[i].width}px`;
    }

  } else if (mockupElements[i].type === 'dbtable1c') {
    let colTemplate = {'header':'Имя колонки', 'width':'195px', 'data':[]};
    let numOfRows = mockupElements[i].row || 2;
    let numOfCols = mockupElements[i].col || 2;
    for (let j = 0; j < Number(numOfCols); j++) {
    if (mockupElements[i].tableColumns
      && mockupElements[i].tableColumns.length && mockupElements[i].tableColumns[j]
    ) {
      let userDataForColumn =
      (mockupElements[i].tableColumns[j].data || "|".repeat(numOfCols - 1))
        .split('|');
      let maxWidthForGivenData = Math.max(
      mockupElements[i].tableColumns[j].name.length,
      ...userDataForColumn.map(d => d.length)
      );
      for (let k = 0; k < Number(numOfRows); k++) {
      colTemplate['data'].push(userDataForColumn[k] || '');
      }
      colTemplate['header'] = mockupElements[i].tableColumns[j].name;
      colTemplate['width'] = `${mockupElements[i].tableColumns[j].width || maxWidthForGivenData * 7.5}px`;
    } else {
      for (let j = 0; j < Number(numOfRows); j++) {
      colTemplate['data'].push('');
      }
    }
    if (!mockupElements[i]['columns']) {
      mockupElements[i]['columns'] = [];
    }
    mockupElements[i]['columns'].push(structuredClone(colTemplate));
    colTemplate = {'header':'Имя колонки', 'width':'195px', 'data':[]};
    }

    if (!mockupElements[i]['contentMaxWidth'].includes('px')) {
    mockupElements[i]['contentMaxWidth'] = mockupElements[i]['contentMaxWidth'] + 'px';
    }

    if (mockupElements[i]['color'] === 'да') {
    mockupElements[i]['coloredLines'] = 'checked';
    }

    if (mockupElements[i]['controls'] === 'да') {
    mockupElements[i]['removeControls'] = '';
    let numOfCols = mockupElements[i].columns.length;
    let columnsWidth = 0;
    mockupElements[i].columns.forEach(col => {
      columnsWidth += Number(col.width.replace('px', ''));
    });
    if (columnsWidth < 300) {
      mockupElements[i].columns[numOfCols - 1].width
      = Number(mockupElements[i].columns[numOfCols - 1].width.replace('px', ''))
      + (300 - columnsWidth) + 'px';
    }
    }

  } else if (mockupElements[i].type === 'yellowbutton1c' || mockupElements[i].type === 'uncoloredbutton1c') {
    mockupElements[i].nameResizeWidth = mockupElements[i].name !== ''
    ? `${mockupElements[i].name.length * 7.5}px` : '124px';
  } else if (mockupElements[i].type === 'tab1c') {
    if (mockupElements[i].tabs) {
    mockupElements[i].tabs = mockupElements[i].tabs.split('|');
    } else {
    mockupElements[i].tabs = [];
    for (let j = 0; j < Number(mockupElements[i]['numOfTabs']); j++) {
      mockupElements[i]['tabs'].push('Вкладка ' + (j + 1));
    }
    }
    mockupElements[i].activeTab = Number(mockupElements[i].activeTab) - 1;
    mockupElements[i].mainResizeWidth = mockupElements[i].width + 'px';
    mockupElements[i].mainResizeHeight = mockupElements[i].height + 'px';
  } else if (mockupElements[i].type === 'checkbox1c') {
    if (mockupElements[i]['checked'] === 'да') {
    mockupElements[i]['checked'] = 'checked';
    }
    mockupElements[i].nameResizeWidth = mockupElements[i].name !== ''
    ? `${mockupElements[i].name.length * 8}px` : '80px';
  } else if (mockupElements[i].type === 'wrapperform1c') {
    mockupElements[i].nameResizeWidth = mockupElements[i].name.length * 12 + 'px';
    if (mockupElements[i].taxi === 'да') {
    mockupElements[i].taxi = 'checked';
    } else if (mockupElements[i].taxi === 'нет') {
    mockupElements[i].taxi = '';
    }
    if (mockupElements[i].styling === 'абстрактная') {
    mockupElements[i].abstractStyling = 'checked';
    } else {
    mockupElements[i].abstractStyling = '';
    }
  } else if (mockupElements[i].type === 'textelem') {
    mockupElements[i].nameResizeWidth =
    (mockupElements[i].width || mockupElements[i].name.length * 7.5 / 13 * Number(mockupElements[i]
      .elementFontSize.replace('px', '')) + '').replace('px', '') + 'px';
    mockupElements[i].nameResizeHeight = ((mockupElements[i].height || mockupElements[i].elementFontSize || 16) + '')
    .replace('px', '') + 'px';
    mockupElements[i].elementFontSize = isNaN(mockupElements[i].elementFontSize)
    ? '13px' : `${mockupElements[i].elementFontSize}px`;
    mockupElements[i].parentIdPrefix = mockupElements[0].type === 'bpmnpool' ? 'bpmn-pool-' : 'form-1c-';
  } else if (mockupElements[i].type === 'bpmnevent' || mockupElements[i].type === 'boundaryEvent') {
    mockupElements[i]['eventLocation'] = defineObjectNameSynonym(mockupElements[i]['eventLocation']);
    mockupElements[i]['eventType'] = defineObjectNameSynonym(mockupElements[i]['typeElemProp']);
    delete mockupElements[i].typeElemProp;
    if (mockupElements[i]['isBreaking'] === 'да') {
    mockupElements[i]['isBreaking'] = 'checked';
    } else if (mockupElements[i]['isBreaking'] === 'нет') {
    mockupElements[i]['isBreaking'] = '';
    }
    if (mockupElements[i]['isThrowing'] === 'да') {
    mockupElements[i]['isThrowing'] = 'checked';
    } else if (mockupElements[i]['isThrowing'] === 'нет') {
    mockupElements[i]['isThrowing'] = '';
    }
    if (mockupElements[i].type === 'boundaryEvent') {
    mockupElements[i]['type'] = 'bpmnevent';
    mockupElements[i].boundaryEvent = true;
    }
    if (mockupElements[i].role) {
    mockupElements[i].role = Number(mockupElements[i].role) - 1;
    }
    defineArrowHandlers(mockupElements, i);
    defineSchemeGrid(mockupElements, i);
  } else if (mockupElements[i].type === 'bpmngateway') {
    mockupElements[i].isClosing = false;
    mockupElements[i]['gatewayType'] = defineObjectNameSynonym(mockupElements[i]['typeElemProp']);
    delete mockupElements[i].typeElemProp;
    if (mockupElements[i].role) {
    mockupElements[i].role = Number(mockupElements[i].role) - 1
    }
    defineArrowHandlers(mockupElements, i);
    defineSchemeGrid(mockupElements, i);
  } else if (mockupElements[i].type === 'bpmnpool') {
    mockupElements[i]['poolName'] = mockupElements[i]['name'] || mockupElements[i]['poolName'];
    delete mockupElements[i].name;
    mockupElements[i]['lanes'] = mockupElements[i]['lanes'].split('|').map((string) => {
    return {'name': string.trim(), 'height': 60, 'width': 80}
    });
    mockupElements[i]['indent'] = 0;
    mockupElements[i].currentGridCell = [0, 1];
    mockupElements[i].openedGateways = [];
    mockupElements[i].lastOpenedGateway = null;
  } else if (mockupElements[i].type === 'bpmntask') {
    mockupElements[i]['taskText'] = mockupElements[i]['text'] || mockupElements[i]['taskText'];
    delete mockupElements[i].text;
    mockupElements[i]['taskType'] = defineObjectNameSynonym(mockupElements[i]['typeElemProp']);
    delete mockupElements[i].typeElemProp;
    mockupElements[i]['firstTaskActivity'] = defineObjectNameSynonym(mockupElements[i]['firstTaskActivity']) || '';
    mockupElements[i]['secondTaskActivity'] = defineObjectNameSynonym(mockupElements[i]['secondTaskActivity']) || '';
    if (mockupElements[i].role) {
    mockupElements[i].role = Number(mockupElements[i].role) - 1
    }
    defineArrowHandlers(mockupElements, i);
    defineSchemeGrid(mockupElements, i);
  }
  }
  return mockupElements;
}

function cssPxValueToNum(val) {
  return Number(val.replace('px',''));
}

function defineElementSize(elem) {
  let x, y, z;
  if (elem.type === 'select1c') {
  let additionalSpaceForControls = 48;
  additionalSpaceForControls -= !elem.displaySelectButton ? 24 : 0;
  additionalSpaceForControls -= !elem.displayActionButton ? 24 : 0;
  x = cssPxValueToNum(elem['nameResizeWidth']) + 44 + additionalSpaceForControls;
  y = 38;
  if (elem.name.length || 0) {
    z = Math.min(elem.name.length * 7.5 + 5, 195);
  } else {
    z = 0;
  }
  } else if (elem.type === 'checkbox1c') {
  x = cssPxValueToNum(elem['nameResizeWidth']) + 30;
  y = 38;
  z = 0;
  } else if (elem.type === 'uncoloredbutton1c' || elem.type === 'yellowbutton1c') {
  x = cssPxValueToNum(elem['nameResizeWidth']) + 40;
  y = 38;
  z = 0;
  } else if (elem.type === 'dbtable1c') {
  let tabletMaxWidth = Number(elem['contentMaxWidth'].replace('px', ''));
  x = 0;
  elem['columns'].forEach((c) => {
    x += cssPxValueToNum(c['width']) + 34;
  });
  x = Math.min(x, tabletMaxWidth + 30);
  if (elem['removeControls']) {
    y = elem['columns'][0]['data'].length * 28 + 45;
  } else {
    y = elem['columns'][0]['data'].length * 28 + 66;
  }
  if (tabletMaxWidth === x - 30) {
    y += 16;
  }
  z = 0;
  } else if (elem.type === 'wrapperform1c') {
  x = elem.contentSize[0];
  y = elem.contentSize[1];
  z = 0;
  } else if (elem.type === 'block') {
  x = 0;
  y = 0;
  z = 0;
  } else if (elem.type === 'margin') {
  x = Number(elem.x) || 0;
  y = Number(elem.y) || 0;
  z = 0;
  } else if (elem.type === 'textelem') {
  x = cssPxValueToNum(elem['nameResizeWidth']) + 30;
  y = cssPxValueToNum(elem['nameResizeHeight']) + 24;
  z = 0;
  }  else if (elem.type === 'tab1c') {
  x = elem.contentSize[0];
  y = elem.contentSize[1] + 70;
  z = 0;
  }
  return [x, y, z];
}

function calcChildrenElemsSizes(parentIdx, mockupElements) {
  let sizes = [[], [], [], [], []]; /** z dim is for left margin and forth one is for child indexes
   so the 4rth one is for sum of x and z... forgive me lord */
  let flag = false;
  for (let i = 0; i < mockupElements.length; i++) {
  if (parentIdx === i) {
    flag = true;
  } else if (flag && mockupElements[i].indent === mockupElements[parentIdx].indent + 1) {
    if (mockupElements[i].contentSize) {
    sizes[0].push(//mockupElements[i].contentSize[0]
      (mockupElements[i].type === 'tab1c')
      ? mockupElements[i].contentSize[0] + 30
      : mockupElements[i].contentSize[0]
    );
    sizes[1].push(
      (mockupElements[i].type === 'tab1c')
      ? mockupElements[i].contentSize[1] + 70
      : mockupElements[i].contentSize[1]
    );
    sizes[2].push(mockupElements[i].contentSize[2]);
    sizes[3].push(i);
    sizes[4].push(mockupElements[i].contentSize[0] + mockupElements[i].contentSize[2]);
    } else {
    let elSize = defineElementSize(mockupElements[i]);
    sizes[0].push(elSize[0]);
    sizes[1].push(elSize[1]);
    sizes[2].push(elSize[2]);
    sizes[3].push(i);
    sizes[4].push(elSize[0]);
    }
  }
  if (i <  mockupElements.length - 1 && mockupElements[i+1].indent === mockupElements[parentIdx].indent) {
    flag = false;
  }
  }
  return sizes;
}

function assignStructuredClones(mockupElements) {
  for (let i = 0; i < mockupElements.length; i++) {
  let elem = mockupElements[i];
  if (elem.contentSize) {
    elem.contentSize = structuredClone(elem.contentSize);
  }
  if (elem.initCursorPosition) {
    elem.initCursorPosition = structuredClone(elem.initCursorPosition);
  }
  }
  return mockupElements;
}

function setLabelMarginsForSelect1cElems(childrenSizes, mockupElements) {
  for (let i = 0; i < childrenSizes[0].length; i++) {
  let elem = mockupElements[childrenSizes[3][i]];
  if (elem.type === 'select1c') {
    elem['leftMargin'] = Math.max(...childrenSizes[2]) - elem['name'].length * 8;
  }
  }
}

function calcSizeOfParent(parentIdx, mockupElements) {
  let parentSizes = [0, 0, 0];  /** z dim is for a left margin*/
  let childrenSizes = calcChildrenElemsSizes(parentIdx, mockupElements);
  if (mockupElements[parentIdx].fill === 'сверху-вниз') {
  parentSizes[0] = mockupElements[parentIdx].width ? Number(mockupElements[parentIdx].width) : Math.max(...childrenSizes[4]);
  parentSizes[0] += ['block', 'wrapperform1c', 'tab1c'].includes(mockupElements[parentIdx].type)
    ? Math.max(...childrenSizes[2]) : 0;
  parentSizes[1] = childrenSizes[1].reduce((partialSum, a) => partialSum + a, 0);
  parentSizes[2] = ['block', 'wrapperform1c', 'tab1c'].includes(mockupElements[parentIdx].type)
    ? Math.max(...childrenSizes[2]) : 0;
  setLabelMarginsForSelect1cElems(childrenSizes, mockupElements);
  if (mockupElements[parentIdx].type === 'tab1c') {
    parentSizes[0] += 10;
  }
  } else if (mockupElements[parentIdx].fill === 'слева-направо') {
  parentSizes[0] = mockupElements[parentIdx].width
    ? Number(mockupElements[parentIdx].width)
    : childrenSizes[0].reduce((partialSum, a) => partialSum + a, 0);
  parentSizes[1] = Math.max(...childrenSizes[1]);
  }
  return parentSizes;
}

function calcElementsSizes(mockupElements) {
  let maxIndent = Math.max(...mockupElements.map(e => e.indent));
  for (let currIndent = maxIndent - 1; currIndent > -1; currIndent--) {
  for (let i = 0; i < mockupElements.length; i++) {
    if (
    mockupElements[i].indent === currIndent
    && ['block', 'wrapperform1c', 'tab1c'].includes(mockupElements[i].type)
    ) {
    mockupElements[i].contentSize = calcSizeOfParent(i, mockupElements);
    }
  }
  }
  return mockupElements;
}

function defineUiElementsCoords(mockupElements) {
  let lastElementsIds = {0: 0};
  let mainFormSize = calcSizeOfParent(0, mockupElements);
  mockupElements[0].contentSize[2] = 0;
  mockupElements[0].mainResizeWidth = `${mainFormSize[0]}px`;
  mockupElements[0].mainResizeHeight = `${mainFormSize[1]}px`;
  mockupElements[0].initCursorPosition = [10, 50];
  mockupElements[0].fill = 'сверху-вниз';
  for (let i = 1; i < mockupElements.length; i++) {
  let elem = mockupElements[i];
  elem.fill = elem.fill || 'сверху-вниз';
  lastElementsIds[elem.indent] = i;
  let parent = mockupElements[lastElementsIds[elem.indent - 1]];
  elem.top = `${parent.initCursorPosition[1] + (elem['paddingTop'] || 0) }px`;
  let cursorVar = [0, 0];
  if (mockupElements[i].initCursorPosition) {
    cursorVar = structuredClone(mockupElements[i].initCursorPosition);
  }
  mockupElements[i].initCursorPosition = structuredClone(parent.initCursorPosition);
  mockupElements[i].initCursorPosition[0] += cursorVar[0];
  mockupElements[i].initCursorPosition[1] += cursorVar[1];
  if (parent.fill === 'сверху-вниз') {
    if (parent.type === 'tab1c') {
    elem.left = `${parent.initCursorPosition[0] + defineElementSize(elem)[2] || parent.contentSize[2]}px`;
    } else {
    if (elem.indent === 1) {
      elem.left = `${parent.initCursorPosition[0] + defineElementSize(elem)[2]}px`;
    } else {
      elem.left = `${parent.initCursorPosition[0] + parent.contentSize[2]}px`;
    }
    }
    try {
    parent.initCursorPosition[1] += defineElementSize(elem)[1] || elem.contentSize[1];
    } catch (err) {
    /* TODO: element #', i, ' has no .y dim' */
    }
  } else if (parent.fill === 'слева-направо') {
    elem.left = `${parent.initCursorPosition[0] + defineElementSize(elem)[2] || elem.contentSize[2]}px`;
    parent.initCursorPosition[0] += defineElementSize(elem)[0] || elem.contentSize[0];
    parent.initCursorPosition[0] += defineElementSize(elem)[2];
  }
  }
  return mockupElements;
}

function changeForcedParams(mockupElements) {
  for (let i = 1; i < mockupElements.length; i++) {
  let elem = mockupElements[i];
  if (elem.x && elem.y && !elem.isClosing) {
    elem.left = (typeof(elem.left) === 'string') ? `${elem.x}px` : Number(elem.x);
    elem.top = (typeof(elem.left) === 'string') ? `${elem.y}px` : Number(elem.y);
  }

  if (mockupElements[0].type === 'bpmnpool') {
    // if (mockupElements[i].type === 'bpmntask') {
    //   elem.taskWidth = elem.width;
    //   elem.taskHeight = elem.height;
    // }
    calcHandles(mockupElements, i);
  }
  }
  return mockupElements;
}

function structureElementsArray(mockupElements) {
  let tree = mockupElements[0];
  for (let i = 1; i < mockupElements.length; i++) {
  let elem = mockupElements[i];
  if (!['block', 'margin', 'branch'].includes(elem.type)) {
    mockupElements[0].children.push(mockupElements[i]);
  }
  }
  return tree;
}

function createRootPageElement() {
  let initialState = getState();
  let activePageID = initialState.activePageID || '_1';
  let activePageName = initialState.pagesList[initialState.pagesList.findIndex(e => e.id === activePageID)].name
  || 'Экран 1';
  return {type: 'page', id: activePageID, name: activePageName, children: []}
}

function calcSizesOfRealParentElems(mockupElements) {
  if (mockupElements[0].type === 'wrapperform1c') {
  for (let i = mockupElements.length-1; i > -1; i--) {
    if (mockupElements[i].type === 'tab1c') {
    if (!mockupElements[i].height) {
      mockupElements[i].mainResizeWidth = `${mockupElements[i].contentSize[0]}px`;
      mockupElements[i].mainResizeHeight = `${mockupElements[i].contentSize[1]}px`;
    }
    mockupElements[i].contentSize[1] += 55;
    }
  }
  }
  return mockupElements;
}

function splitElementsToPoolLanes(mockupElements) {
  /** Check for each elem if there is no .lane specified for it. If so - specify it. */
  let lanes = mockupElements[0].lanes;
  let lastOpenedGateway = null;
  lanes.forEach(lane => {
  lane.elements = [];
  });
  let currLaneIdx = 0;
  for (let i = 1; i < mockupElements.length; i++) {
  if (mockupElements[i].role || mockupElements[i].role === 0) {
    currLaneIdx = mockupElements[i].role;
  } else {
    if (mockupElements[i - 1].branchID
    && mockupElements[i].branchID
    && mockupElements[i - 1].branchID !== mockupElements[i].branchID
    ) {
    /** if element is the first elem of a second gateway branch AND its role was not defined explicitly
     * so its role is equal to this gateway role */
    mockupElements[i].role = mockupElements[lastOpenedGateway].role;
    currLaneIdx = mockupElements[i].role;
    } else {
    /** else element's role is equal to the role of previous element */
    mockupElements[i].role = currLaneIdx;
    }
  }
  if (mockupElements[i].type === 'bpmngateway') {
    lastOpenedGateway = i;
  }
  if (mockupElements[i].type !== 'bpmnpool') {
    lanes[currLaneIdx].elements.push(mockupElements[i]);
  }
  }

  mockupElements[0].lanes = lanes;

  /** distribute elements for different lanes grid */
  let l = mockupElements[0].lanes.length;
  while (l) {
  mockupElements[0].lanes[l - 1].elements.forEach((e) => {
    e.schemeGrid[1] += 20 * (l - 1);
  });
  l--;
  }
  mockupElements[0].lanes[0].elements[0].testProp = '12';

  return mockupElements;
}

function calcBpmnTaskSize(index, mockupElements) {
  /*TODO what if this task element is a nested task element? write it here somehow */
  let fontWidthSize = 6;
  let fontHeightSize = 13;
  let taskText = mockupElements[index].taskText;
  let optimalWidth = 60;
  let words = taskText.split(' ');
  let currentRowWidth = 0;
  let resultWidth = 0;
  let numOfRows = 0;
  while (words.length) {
  currentRowWidth += (words.shift().length + 1) * fontWidthSize;
  if (currentRowWidth >= optimalWidth) {
    resultWidth = Math.max(resultWidth, currentRowWidth);
    currentRowWidth = 0;
    numOfRows++;
  }
  }

  let heightSpaceForMarkers = 38;
  mockupElements[index].taskWidth = mockupElements[index].width = Math.max(resultWidth, 50);
  mockupElements[index].taskHeight = mockupElements[index].height
  = Math.max(numOfRows * fontHeightSize + heightSpaceForMarkers, 55);
  return mockupElements[index];
}

function calcBpmnElementSize(index, mockupElements) {
  let sizeCalculators = {
  'bpmntask': calcBpmnTaskSize,
  'bpmnevent':
    (index, mockupElements) => {mockupElements[index].width = 40; mockupElements[index].height = 40; return mockupElements[index]},
  'bpmngateway':
    (index, mockupElements) => {mockupElements[index].width = 40; mockupElements[index].height = 40; return mockupElements[index]},
  };
  if (sizeCalculators.hasOwnProperty(mockupElements[index].type) && !mockupElements[index].width && !mockupElements[index].height) {
  return sizeCalculators[mockupElements[index].type](index, mockupElements);
  } else {
  mockupElements[index].width = Number(mockupElements[index].width);
  mockupElements[index].taskWidth = mockupElements[index].width;

  mockupElements[index].height = Number(mockupElements[index].height);
  mockupElements[index].taskHeight = mockupElements[index].height;

  return mockupElements[index];
  }
}

function calcSizesOfBpmnElements(mockupElements) {
  for (let i = 1; i < mockupElements.length; i++) {
  mockupElements[i] = calcBpmnElementSize(i, mockupElements);
  }
  return mockupElements;
}

function calcGrid(els) {
  /**  gridSizes is for x,y where x is a number of columns and y is a num of rows
   *   lineSizes[0] is a container for columns widths array
   *   so lineSizes[1] is for rows heights
   *   cellParams is an object where fields names are strings like '1,5'
   *    and fields values are {sizes: [<width>, <height>], coords: [<x>, <y>]} */
  els[0].gridParams = {gridSizes: [0, 0], lineSizes: [[], []], cellParams: {}};

  [{axis: 0, param: 'width'}, {axis: 1, param: 'height'}].forEach(p => {
  els[0].gridParams.gridSizes[p.axis] =
    els.slice(1).reduce((acc, e) => Math.max(acc, e.schemeGrid[p.axis]), 0);

  for (let j = 1; j <= els[0].gridParams.gridSizes[p.axis]; j++) {
    let elsOfThisAxis = els.slice(1).filter(e => e.schemeGrid[p.axis] === j);
    els[0].gridParams.lineSizes[p.axis].push(
    elsOfThisAxis.reduce((acc, e) => Math.max(acc, e[p.param]), 0)
    );
  }
  });

  let cumulativeWidth = mockAppGlobals.bpmnRendererConfig.horIndent + 64;
  for (let col = 0; col < els[0].gridParams.gridSizes[0]; col++) {
  let cumulativeHeight = mockAppGlobals.bpmnRendererConfig.verIndent;
  for (let row = 0; row < els[0].gridParams.gridSizes[1]; row++) {
    els[0].gridParams.cellParams['' + (col + 1) + ',' + (row + 1)] = {
    sizes: [els[0].gridParams.lineSizes[0][col], els[0].gridParams.lineSizes[1][row]],
    coords: [cumulativeWidth, cumulativeHeight]
    };
    cumulativeHeight = (els[0].gridParams.lineSizes[1][row])
    ? cumulativeHeight + els[0].gridParams.lineSizes[1][row] + mockAppGlobals.bpmnRendererConfig.verIndent
    : cumulativeHeight;
  }
  cumulativeWidth = (els[0].gridParams.lineSizes[0][col])
    ? cumulativeWidth + els[0].gridParams.lineSizes[0][col] + mockAppGlobals.bpmnRendererConfig.horIndent
    : cumulativeWidth;
  }
  return els;
}

function calcHandles(els, i) {
  els[i].handles = {
    't': [els[i].left + els[i].width / 2, els[i].top],
    'r': [els[i].left + els[i].width,   els[i].top + els[i].height / 2],
    'b': [els[i].left + els[i].width / 2, els[i].top + els[i].height],
    'l': [els[i].left,          els[i].top + els[i].height / 2]
  };
}

function calcBpmnElementCoords(i, mockupElements) {
  for (let i = 1; i < mockupElements.length; i++) {
  let elemGridParams =
    mockupElements[0].gridParams.cellParams[mockupElements[i].schemeGrid[0] + ',' + mockupElements[i].schemeGrid[1]]
    || {coords: [null, null], sizes: [null, null]};

  let innerShift = [
    (elemGridParams.sizes[0] - mockupElements[i].width) / 2,
    (elemGridParams.sizes[1] - mockupElements[i].height) / 2
  ];

  mockupElements[i].left = elemGridParams.coords[0] + innerShift[0];
  mockupElements[i].top = elemGridParams.coords[1] + innerShift[1];

  calcHandles(mockupElements, i);

  mockupElements[i].isHandled = true;
  }
  return mockupElements;
}

function defineArrows(mockupElements) {
  const mockupElementsLength = mockupElements.length;
  let openedGateways = [];
  for (let i = 2; i < mockupElementsLength; i++) {
  /** draw an arrow*/
  let prevHandleKey = mockupElements[i].arrowHandles[0];
  let thisHandleKey = mockupElements[i].arrowHandles[1];
  let handleTypes = ['leftright', 'leftright'];
  if (prevHandleKey === 't' || prevHandleKey === 'b') {
    handleTypes[0] = 'topdown';
  }
  if (thisHandleKey === 't' || thisHandleKey === 'b') {
    handleTypes[1] = 'topdown';
  }

  /** if this element is an opening gateway then add it to an array of opened gateways*/
  (mockupElements[i].type === 'bpmngateway' && !mockupElements[i].isClosing) ? openedGateways.push(i) : null;
  /** if this element is a first elem of a second branch, so the previous element is the last opened gateway
   * else just a previous element*/
  let lastElementIdx
    = (mockupElements[i - 1].branchID && mockupElements[i].branchID && mockupElements[i - 1].branchID !== mockupElements[i].branchID)
    ? openedGateways[openedGateways.length - 1]
    : i - 1;

  if (lastElementIdx === i) {
    lastElementIdx = openedGateways[openedGateways.length - 2];
  }

  if (mockupElements[i].type !== 'bpmngateway' || !mockupElements[i].isClosing) {
    let newArrowElement = {
    'children': [],
    'type': 'arrow',
    'idPool': mockupElements[0].idPool,
    'startCoords': mockupElements[lastElementIdx].handles[prevHandleKey],
    'endCoords': mockupElements[i].handles[thisHandleKey],
    'pathType': 'manhattan',
    'id': '',
    'handleTypes': handleTypes,
    'arrowMarker': 'checked'
    };
    mockupElements[0].arrows.push(structuredClone(newArrowElement));
  } else {
    try {
    let firstArrowStartElemBranchId = mockupElements[i].branches[0].branchID;
    let firstArrowStartElem = mockupElements.slice(0, i)
      .filter(e => e.branchID === firstArrowStartElemBranchId)
      [mockupElements.slice(0, i).filter(e => e.branchID === firstArrowStartElemBranchId).length - 1];
    if (!firstArrowStartElem) {
      firstArrowStartElemBranchId = mockupElements[i].branchID;
      firstArrowStartElem = mockupElements.slice(0, i)
      .filter(e => e.branchID === firstArrowStartElemBranchId)
      [mockupElements.slice(0, i).filter(e => e.branchID === firstArrowStartElemBranchId).length - 1];
    }
    let prevElemHandle =
      (firstArrowStartElem.schemeGrid[1] > mockupElements[i].schemeGrid[1]) ? ['t', 'topdown']
      : (firstArrowStartElem.schemeGrid[1] < mockupElements[i].schemeGrid[1]) ? ['b', 'topdown']
        : ['r', 'leftright'];
    let firstClosingGatewayArrow = {
      'children': [],
      'type': 'arrow',
      'idPool': mockupElements[0].idPool,
      'startCoords': firstArrowStartElem.handles[prevElemHandle[0]],
      'endCoords': mockupElements[i].handles['l'],
      'pathType': 'manhattan',
      'id': '',
      'handleTypes': [prevElemHandle[1], 'leftright'],
      'arrowMarker': 'checked'
    };
    mockupElements[0].arrows.push(structuredClone(firstClosingGatewayArrow));

    mockupElements[i].branches.slice(1).forEach(branch => {
      let secondArrowStartElemBranchId = branch.branchID;
      let secondArrowStartElem = mockupElements.slice(0, i)
      .filter(e => e.branchID === secondArrowStartElemBranchId)
      [mockupElements.slice(0, i).filter(e => e.branchID === secondArrowStartElemBranchId).length - 1];
      let secondClosingGatewayArrow = {
      'children': [],
      'type': 'arrow',
      'idPool': mockupElements[0].idPool,
      'startCoords': secondArrowStartElem.handles['r'],
      'endCoords': mockupElements[i].handles['b'],
      'pathType': 'manhattan',
      'id': '',
      'handleTypes': ['leftright', 'topdown'],
      'arrowMarker': 'checked'
      };
      mockupElements[0].arrows.push(structuredClone(secondClosingGatewayArrow));
    })

    } finally {
    /* todo remove, its a crutch */
    }
  }
  }
  return mockupElements;
}

function defineBpmnElementsCoords(mockupElements) {
  mockupElements = calcGrid(mockupElements);
  for (let i = 1; i < mockupElements.length; i++) {
  mockupElements = calcBpmnElementCoords(i, mockupElements);
  }

  return mockupElements;
}

function addPostfixToCoordsAndSizesProps(mockupElements) {
  for (let i = 1; i < mockupElements.length; i++) {
  ['top', 'left', 'height', 'width', 'taskWidth', 'taskHeight']
    .forEach(prop => {
    if (typeof mockupElements[i][prop] === 'number'
      || typeof mockupElements[i][prop] === 'string'
      && mockupElements[i][prop].slice(mockupElements[i][prop].length - 2) === 'px')
      mockupElements[i][prop] = Math.round(mockupElements[i][prop]) + 'px';
    });
  }
  return mockupElements;
}

function adjustPoolShapeForElements(mockupElements) {
  let poolWidth = 0;
  for (let key in mockupElements[0].gridParams.cellParams) {
  let cellParams = mockupElements[0].gridParams.cellParams[key];
  poolWidth = Math.max(
    cellParams.sizes[0] + cellParams.coords[0],
    poolWidth
  );
  }
  /** release the memory (this prop could be big, so we don't want to send it to server) */
  mockupElements[0].gridParams = {};

  let laneId = 0;
  mockupElements[0].lanes.forEach(lane => {
  let thisLaneTop = lane.elements.filter(e => e.isHandled)
    .reduce((acc, e) => Math.min(acc, e.handles['t'][1]), 999999);
  let thisLaneBottom = lane.elements.filter(e => e.isHandled)
    .reduce((acc, e) => Math.max(acc, e.handles['b'][1]), 0);
  let calculatedLaneHeight = laneId
    ? thisLaneBottom + mockAppGlobals.bpmnRendererConfig.verIndent - mockupElements[0].lanes.slice(0, laneId)
    .reduce((acc, l) => acc + l.height, 0)
    : thisLaneBottom - thisLaneTop + mockAppGlobals.bpmnRendererConfig.verIndent * 2;
  lane.height = Math.max(
    calculatedLaneHeight - mockAppGlobals.bpmnRendererConfig.verIndent / 2
  );
  lane.width = poolWidth;
  lane.marginCoords = {
    't': thisLaneTop,
    'b': thisLaneTop + lane.height
  };
  laneId++;
  });
  return mockupElements;
}

function restructureUiTablesElem(mockupElements) {
  /** remove column tags from mockupElements list and add them to their tables into 'columns' property */
  let lastTable = null;
  let elementsToSplice = [];
  for (let i = 1; i < mockupElements.length; i++) {
  if (mockupElements[i].type === 'dbtable1c') {
    lastTable = mockupElements[i];
    lastTable.tableColumns = [];
  } else if (mockupElements[i].type === 'column') {
    lastTable.tableColumns.push(structuredClone(mockupElements[i]));
    elementsToSplice.push(i);
  }
  }
  elementsToSplice.sort((a,b) => b - a);
  elementsToSplice.forEach(idx => {
  mockupElements.splice(idx, 1);
  });
  return mockupElements;
}

function getStub(indent) {
  return {schemeGrid: [null, null], type: 'bpmnevent', isStub: true, children: [], indent: indent};
}

function restructureBpmnGateways(mockupElements) {
  /** 1. assign IDs to branches
   *  2. move branches inside their gateways
   *  3. assign branch ID to mockupElements placed in that branches
   *  4. add a closing gateway*/
  let lastGateways = [];
  let lastBranchID = null;
  mockupElements[1].schemeGrid = [1, 1];
  for (let i = 1; i < mockupElements.length; i++) {
  if (mockupElements[i].type === 'bpmngateway' || ['bpmngateway', 'bpmnevent', 'bpmntask'].includes(mockupElements[i].type)) {
    let lastGateways = mockupElements.slice(0, i).filter(e => e.type === 'bpmngateway');
    let lastGateway = lastGateways[lastGateways.length - 1];
    if (lastGateway && lastGateway.indent >= mockupElements[i].indent) {
    mockupElements.splice(i, 0, getStub(mockupElements[i].indent));
    i++;
    }
  }
  }
  for (let i = 1; i < mockupElements.length; i++) {

  if (lastGateways.length && mockupElements[i].type !== 'bpmngateway'
    && mockupElements[i].indent <= lastGateways[lastGateways.length - 1].indent
    && mockupElements[i].indent < mockupElements[i - 1].indent
  ) {
    mockupElements[i].previousElements = [];
    let k = -1;
    let countOfGatewaysToClose = lastGateways.filter(e => e.indent >= mockupElements[i].indent).length;
    for (let j = countOfGatewaysToClose - 1; j > -1; j--) {
    k++;
    let gateway = lastGateways.pop();
    let lastElementsOfThisGatewayBranches = [];
    gateway.branches.forEach(branch => {
      let arrayOfElementsOfThisBranch = mockupElements.slice(0, i).filter(e =>
      e.branchID === branch.branchID && !isNaN(e.schemeGrid[0]) && e.type !== 'branch');
      let lastElementOfThisBranch = (arrayOfElementsOfThisBranch.length)
      ? arrayOfElementsOfThisBranch[arrayOfElementsOfThisBranch.length - 1]
      : {schemeGrid: [0]};
      lastElementsOfThisGatewayBranches.push(lastElementOfThisBranch);
    });
    let nearestElementGridCoordX
      = lastElementsOfThisGatewayBranches.reduce((acc, e) => Math.max(acc, e.schemeGrid[0]), 1);
    let closingGateway = structuredClone(gateway);
    closingGateway.id = 'clgtw-0';
    mockupElements[i].previousElements.push(closingGateway);
    mockupElements[i].previousElements[mockupElements[i].previousElements.length - 1].isHandled = false;
    mockupElements[i].previousElements[mockupElements[i].previousElements.length - 1].isClosing = true;
    mockupElements[i].previousElements[mockupElements[i].previousElements.length - 1].schemeGrid
      = [nearestElementGridCoordX + 1 + k, gateway.schemeGrid[1]];
    if (j === 0 && mockupElements[i].indent >= mockupElements[i - 1].indent) {
      mockupElements[i].schemeGrid = [nearestElementGridCoordX + 2 + k, gateway.schemeGrid[1]];
    }
    }
  }

  if (mockupElements[i].type === 'bpmngateway') {
    lastGateways.push(mockupElements[i]);
    lastGateways[lastGateways.length - 1].branches = []; /* todo why not use mockupElements[i].branches = [] ? */
    lastGateways[lastGateways.length - 1].texts
    = {mainText: lastGateways[lastGateways.length - 1].text, branchesTexts: []};
    mockupElements[i].branchID = lastBranchID;
  } else if (mockupElements[i].type === 'branch') {
    mockupElements[i].branchID = i;
    lastBranchID = i;
    lastGateways[lastGateways.length - 1].branches.push(structuredClone(mockupElements[i]));
    lastGateways[lastGateways.length - 1].texts.branchesTexts.push(mockupElements[i].text);
  } else {
    if (lastBranchID && mockupElements[lastBranchID].indent > mockupElements[i].indent) {
    let branchesCandidates = structuredClone(mockupElements).splice(0, i).filter(
      e => e.type === 'branch' && e.indent < mockupElements[i].indent);
    if (branchesCandidates.length) {
      lastBranchID = branchesCandidates[branchesCandidates.length - 1].branchID;
    } else {
      lastBranchID = null;
    }
    }
    mockupElements[i].branchID = lastBranchID;
  }

  let lastGateway;
  let allGateways = structuredClone(mockupElements).slice(0, i).filter(e => e.type === 'bpmngateway' && !e.isClosing);
  if (mockupElements[i].type === 'bpmngateway') {
    lastGateway = lastGateways[lastGateways.length - 2];
  } else {
    lastGateway = lastGateways[lastGateways.length - 1];
  }
  if (lastGateway) {
    let lowerBranchesOfLastGateway
    = structuredClone(lastGateway.branches.map(branch => branch.branchID)).slice(1);
    if (lowerBranchesOfLastGateway.includes(mockupElements[i - 1].branchID) && mockupElements[i].type !== 'branch') {
    if (allGateways[allGateways.length - 1].indent === mockupElements[i].indent) {
      /*  */
    } else {
      let lastRenderedElements = structuredClone(mockupElements).slice(0, i).filter(
      e => !['boundaryEvent', 'branch', 'bpmnpool'].includes(e.type)
      );
      let lastRenderedElement = lastRenderedElements[lastRenderedElements.length - 1];
      if (lastRenderedElement.type !== 'bpmngateway'
      && lastRenderedElement.branchID === mockupElements[i].branchID) {
      mockupElements[i].schemeGrid = [lastRenderedElement.schemeGrid[0] + 1, lastRenderedElement.schemeGrid[1]];
      mockupElements[i].arrowHandles = ['r', 'l'];
      } else {
      mockupElements[i].schemeGrid = [lastGateway.schemeGrid[0], lastGateway.schemeGrid[1] + 1];
      if (mockupElements[i].branchID === i - 1) {
        mockupElements[i].arrowHandles = ['b', 'l'];
      } else {
        mockupElements[i].arrowHandles = ['b', 't'];
      }
      }
    }
    }
  }

  if (!['boundaryEvent', 'branch', 'bpmnpool'].includes(mockupElements[i].type)
    && !mockupElements[i].schemeGrid[0]) {
    let isTheFirstElemOfTheFirstBranch = false;
    if (lastGateway) {
    isTheFirstElemOfTheFirstBranch
      = lastGateway.branches[0].branchID === mockupElements[i].branchID
      && mockupElements[i - 1].type === 'branch';
    }
    if (mockupElements[i].indent === mockupElements[i - 1].indent) {
    mockupElements[i].schemeGrid[0] = mockupElements[i - 1].schemeGrid[0] + 1;
    mockupElements[i].schemeGrid[1] = mockupElements[i - 1].schemeGrid[1];
    } else if (isTheFirstElemOfTheFirstBranch) {
    mockupElements[i].schemeGrid[0] = lastGateway.schemeGrid[0] + 1;
    mockupElements[i].schemeGrid[1] = lastGateway.schemeGrid[1];
    /* mockupElements[i].arrowHandles = ['r', 'l']; */
    } else if (mockupElements[i].indent < mockupElements[i - 1].indent) {
    let lastElementOfSameIndent = mockupElements[i].previousElements.filter(e => e.indent === mockupElements[i].indent);
    mockupElements[i].schemeGrid[0]
      = lastElementOfSameIndent[lastElementOfSameIndent.length - 1].schemeGrid[0] + 1;
    mockupElements[i].schemeGrid[1]
      = lastElementOfSameIndent[lastElementOfSameIndent.length - 1].schemeGrid[1];
    }
  } else if (i !== 1) {
    /* mockupElements[i].schemeGrid = structuredClone(mockupElements[i - 1].schemeGrid); */
  }

  }
  let k = 1;
  while (k) {
  k = 0;
  for (let i = 1; i < mockupElements.length; i++) {
    if (mockupElements[i].previousElements && k === 0) {
    const numOfSplicedElements = mockupElements[i].previousElements.length;
    mockupElements.splice(i, 0, ...structuredClone(mockupElements[i].previousElements));
    for (let j = numOfSplicedElements; j > 0; j--) {
      if (mockupElements[i + j]) {
      mockupElements[i + j].previousElements = null;
      }
    }
    k = 1;
    }
  }
  }

  for (let i = mockupElements.length - 1; i > -1; i--) {
  if (mockupElements[i].type === 'branch' || mockupElements[i].isStub) {
    mockupElements.splice(i, 1);
  }
  }

  return mockupElements;
}

function splitToSubgrid(mockupElements) {

  function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
  }

  function isGateway(value, index, array) {
  return array[index].type === 'bpmngateway';
  }

  let branchAccordances = {};
  mockupElements.filter(isGateway).forEach(g => {
  let outcomingBranch = g.branches[0].branchID;
  let incomingBranch = g.branchID;
  branchAccordances[outcomingBranch] = incomingBranch;
  });

  /** calc branches structure = {<branch_id>: <>, ..} */
  let branchesIds = mockupElements.map((e) => e.branchID);
  let branchesStructure = {};
  let i = 1;
  mockupElements.forEach(e => {
  if (e.type === 'bpmngateway') {
    branchesIds.push(...e.branches.map(b => b.branchID))
  }
  });
  branchesIds = branchesIds.filter(onlyUnique).splice(2).sort((a, b) => a - b);
  branchesIds.unshift(...[undefined, null]);

  branchesIds.forEach((b) => {
  branchesStructure[b] = i;
  if (b !== undefined && b !== null) {
    i++;
  }
  });
  let numOfBranches = Object.keys(branchesStructure).length - 2;

  /** decrease first branches indexes to place them to the same level as incoming to that gateway branches*/
  Object.keys(branchesStructure).forEach((structureKey) => {
  if (branchAccordances[structureKey]) {
    branchesStructure[structureKey] = branchesStructure[branchAccordances[structureKey]];
  }
  });

  /** calc subgrid for each mockup element */
  let n = mockupElements.length;
  while (n) {
  let e = mockupElements[n - 1];
  let g = e.schemeGrid;
  if (g) {
    g[0] = (g[0] - 1) * numOfBranches + branchesStructure[e.branchID];
    if (e.type === 'bpmngateway') {
    g[1] = (g[1] - 1) * numOfBranches + branchesStructure[e.branches[0].branchID];
    } else {
    g[1] = (g[1] - 1) * numOfBranches + branchesStructure[e.branchID];
    }
  }
  n--;
  }
  return mockupElements;
}

function reDefineArrowHandles(mockupElements) {
  let i = 2;
  while (i < mockupElements.length) {
  let thisE = mockupElements[i];
  let prevE = mockupElements[i - 1];
  if (thisE.schemeGrid[0] === prevE.schemeGrid[0] && thisE.schemeGrid[1] > prevE.schemeGrid[1]) {
    thisE.arrowHandles = ['b', 't'];
  } else if (thisE.schemeGrid[0] === prevE.schemeGrid[0] && thisE.schemeGrid[1] < prevE.schemeGrid[1]) {
    thisE.arrowHandles = ['t', 'b'];
  } else if (thisE.schemeGrid[0] > prevE.schemeGrid[0] && thisE.schemeGrid[1] > prevE.schemeGrid[1]) {
    thisE.arrowHandles = ['b', 'l'];
  } else if (thisE.schemeGrid[0] > prevE.schemeGrid[0] && thisE.schemeGrid[1] === prevE.schemeGrid[1]) {
    thisE.arrowHandles = ['r', 'l'];
  } else if (thisE.schemeGrid[0] > prevE.schemeGrid[0] && thisE.schemeGrid[1] < prevE.schemeGrid[1]) {
    thisE.arrowHandles = ['t', 'l'];
  }
  i++;
  }
  return mockupElements;
}

function addStubs(mockupElements) {
  let permittedIndents = mockupElements.filter(
  e => ['bpmngateway', 'bpmnevent', 'bpmntask'].includes(e.type)
  ).map(e => e.indent);

  for (let i = 1; i < mockupElements.length; i++) {
  let indentGap = mockupElements[i - 1].indent - mockupElements[i].indent;
  if (indentGap > 1) {
    for (let j = indentGap - 1; j > 1; j--) {
    if (permittedIndents.includes(mockupElements[i].indent + j)) {
      mockupElements.splice(i, 0, getStub(mockupElements[i].indent + j));
      i++;
    }
    }
  }
  }

  return mockupElements;
}

function getTextElem(top, left, text, rowNumber, width = null, height = null) {
  let nameResizeWidth = (!width) ? Math.min(text.length * 8, 270) : width;
  let nameResizeHeight = (!height) ? 12 : height;
  return {
  type: 'textelem', children: [], top: top + 'px', left: left + 'px', id: generateElementID(rowNumber, 0),
  name: text, nameResizeWidth: nameResizeWidth + 'px', nameResizeHeight: nameResizeHeight + 'px', color: '#000000',
  bold: '', elementFontSize: '13px', borderWidth: 0, parentIdPrefix: 'bpmn-pool-',
  };
}

function addBpmnTexts(mockupElements) {
  mockupElements[0].texts = [];
  for (let i = 1; i < mockupElements.length; i++) {
  if (mockupElements[i].type === 'bpmngateway' && !mockupElements[i].isClosing) {
    if (mockupElements[i].texts.mainText) {
    mockupElements[0].texts.push(
      getTextElem(mockupElements[i].top - 14, mockupElements[i].left + 24,
      mockupElements[i].texts.mainText, i)); /** id шлюза */
    }
    for (let j = 0; j < mockupElements[i].branches.length; j++) {
    if (mockupElements[i].texts.branchesTexts[j]) {
      let branchElem = mockupElements[i].branches[j];
      let defaultTextShifts = (!j) ? [42, 24] : [-14, 36 * j];
      let textCoords = (branchElem.x && branchElem.y)
      ? [branchElem.x, branchElem.y]
      : [null, null];
      mockupElements[0].texts.push(
      getTextElem(
        textCoords[1] || mockupElements[i].top + defaultTextShifts[1],
        textCoords[0] || mockupElements[i].left + defaultTextShifts[0],
        mockupElements[i].texts.branchesTexts[j],
        mockupElements[i].branches[j].branchID,
        mockupElements[i].branches[j].width,
        mockupElements[i].branches[j].height)); /** id ветки шлюза для поиска строки в разметке */
    }
    }
  } else if (mockupElements[i].type === 'bpmnevent') {
    if (mockupElements[i].text) {
    mockupElements[0].texts.push(
      getTextElem(mockupElements[i].top + 42, mockupElements[i].left,
      mockupElements[i].text, i));
    }
  }
  }

  return mockupElements;
}

function interpret() {
  /** this is the main function which transpiles inner markup language to a json*/
  let root, mockupElements, tree;
  root = createRootPageElement();
  mockupElements = htmlReprToElementsArray();
  let mainParentType = mockupElements[0].type;
  mockupElements = addDefaultValuesToElements(mockupElements);
  if (mainParentType === 'wrapperform1c') {
  mockupElements = restructureUiTablesElem(mockupElements);
  }
  mockupElements = defineSpecialAttrs(mockupElements);
  if (mainParentType === 'wrapperform1c') {
  mockupElements = calcElementsSizes(mockupElements);
  } else {
  mockupElements = addStubs(mockupElements);
  }
  mockupElements = assignStructuredClones(mockupElements);
  if (mainParentType === 'wrapperform1c') {
  mockupElements = defineUiElementsCoords(mockupElements);
  mockupElements = changeForcedParams(mockupElements);
  mockupElements = calcSizesOfRealParentElems(mockupElements);
  } else {
  mockupElements = restructureBpmnGateways(mockupElements);
  mockupElements = splitElementsToPoolLanes(mockupElements);
  mockupElements = splitToSubgrid(mockupElements);
  mockupElements = reDefineArrowHandles(mockupElements);
  mockupElements = calcSizesOfBpmnElements(mockupElements);
  mockupElements = defineBpmnElementsCoords(mockupElements);
  mockupElements = changeForcedParams(mockupElements);
  mockupElements = addBpmnTexts(mockupElements);
  mockupElements = addPostfixToCoordsAndSizesProps(mockupElements);
  mockupElements = defineArrows(mockupElements);
  mockupElements = adjustPoolShapeForElements(mockupElements);
  mockupElements = mockupElements.concat(mockupElements[0].arrows);
  mockupElements = mockupElements.concat(mockupElements[0].texts);
  }
  tree = structureElementsArray(mockupElements);
  root.children.push(tree);
  return root;
}

function renderCode() {
  formCounter++;
  let jsonReprOfAPage = interpret();
  localStorage.setItem('code' + jsonReprOfAPage.id, document.querySelector('#ide-code-input').value);
  API.setState(jsonReprOfAPage).then(
  () => window.location.href = window.location.pathname + '?no_tooltips=1');
  document.querySelector('#ide-form-wrapper').remove();
}

function displaySchemeForGivenCode(code) {
  document.querySelector('#scroll-crutch').remove();
  code = code.replaceAll('<%n>', '\n');
  let _id = addPage();
  switchToPage(_id);
  document.querySelectorAll('.navMenuItem').forEach((e) => {
  e.querySelector('.tick-box').style.opacity = '0';
  });
  showContextMenu({target: document.querySelector('html'), clientY: 25, clientX: 60});
  document.querySelector('#_' + _id).style.display = 'block';
  document.querySelector('#_'+ _id + '_menu-item')
  .closest('.navMenuItem')
  .querySelector('.tick-box').style.opacity = '1';
  renderMainWindow();
  let codeInputField = document.querySelector("#ide-code-input");
  codeInputField.value = code;
  codeInputField.selectionStart = codeInputField.selectionEnd = code.length;
  fillTextToPane();
  renderCode();
}

function prepareGUIForScreenshot() {
  document.querySelector('#scroll-crutch').remove();
  document.querySelector('#main-menu-panel').remove();
  document.body.id = 'no-scrollbars';
  let mainParentElement = document.querySelector('.wrapperform1c');
  mainParentElement.style.top = '5px';
  mainParentElement.style.left = '5px';
  let resizerElementCoords = mainParentElement.querySelector('.both-handle-resizer').getBoundingClientRect();
  let size_x = resizerElementCoords.x;
  let size_y = resizerElementCoords.y + 223;
  document.body.innerHTML += `<div id="form-size-tag">${'' + size_x + ';' + size_y}</div>`;
}
