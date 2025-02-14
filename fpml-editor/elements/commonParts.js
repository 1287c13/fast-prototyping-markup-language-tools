function resizeElement(elem, afterAction = '', neighbourTarget = false) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (!neighbourTarget) {
    elem.querySelector('.resize-handle').onmousedown = resizeMouseDown;
  } else {
    elem.parentNode.querySelector('.resize-handle').onmousedown = resizeMouseDown;
  }
  function resizeMouseDown(e) {
    mockAppGlobals.resizeIsInProcess = true;
    e.preventDefault();
    if (grid === 1) {
      pos3 = e.clientX;
      pos4 = e.clientY;
    } else {
      pos3 = (e.clientX / grid >> 0) * grid;
      pos4 = (e.clientY / grid >> 0) * grid;
    }
    document.onmouseup = closeResizeElement;
    document.onmousemove = elementResize;
  }
  function elementResize(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    elem.style.width = (Number(elem.style.width.replace('px', '')) - pos1) + "px";
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;
    elem.style.height = (Number(elem.style.height.replace('px', '')) - pos2) + "px";
    if (Boolean(afterAction)) {
      window[afterAction](elem, pos1, pos2);
    }
    let elementMainWrapper = elem.closest('.element-main-wrapper');
    markElemAsChanged(elementMainWrapper, 'resize');
  }
  function closeResizeElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    changesRegistered = true;
    mockAppGlobals.resizeIsInProcess = false
  }
}

function getNewOptions(oldOptions, value) {
  let newOptions = '';
  let kindOfAList;
  kindOfAList = [];
  kindOfAList.forEach.call(oldOptions, function(option) {
    let selected = '';
    let optionInnerHtml = option.innerHTML;
    if (option.value === value) {
      selected = 'selected';
    }
    newOptions += '<option value="' + option.value + '" ' + selected + '>' + optionInnerHtml + '</option>';
  });
  return newOptions;
}

function getResizer(resizerType, _top, _left, targetClass, position,
          afterAction = '', neighbourTarget = false, color = 'black') {
  let resizerCursor = 'nwse-resize';
  if (resizerType === 'hor') {
     resizerCursor = 'ew-resize';
  } else if (resizerType === 'ver') {
    resizerCursor = 'ns-resize';
  }
  let selectorCode = `closest('.' + this.querySelector('.target-class-label').innerHTML)`;
  if (neighbourTarget) {
    selectorCode = `parentNode.querySelector('.' + this.querySelector('.target-class-label').innerHTML)`;
  }
  return `
    <div
      class="${resizerType}-handle-resizer handle-resizer resize-handle"
      style="position: ${position}; top: ${_top}; left: ${_left}; cursor: ${resizerCursor}; opacity: 0; 
      width: 16px;"
      onmouseenter="resizeElement(
        this.${selectorCode},
        '${afterAction}',
        ${neighbourTarget}
      )"
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0V6C10 8.20914 8.20914 10 6 10H-4.17233e-07" stroke="${color}"/>
        <path d="M8 3.5V5.5C8 6.60457 7.10457 7.5 6 7.5H4" stroke="${color}"/>
      </svg>
      <div class="target-class-label" style="display: none;">${targetClass}</div>
    </div>
  `;
}

function generateElementID(markupRow=0, isChanged='7') {
  /** <page id>-<is in markup>-<num of row at markup / time-based id>-<'changed' 32b status> */
  /* todo in the case of generating new ids for the whole scheme (e.g if this scheme has no ids at server state)
    this generator returns undefined as _pageID because page is not rendered yet when ids are generating */
  let _pageId = getState(false).activePageID;
  if (_pageId) {
    _pageId = _pageId.slice(1);
  }

  let isInMarkup = 1;
  if (!markupRow) {
    markupRow = Number(String(Date.now()).slice(3, 11)).toString(32);
    isInMarkup = 0;
  }
  return (_pageId || '0') + '-'+ isInMarkup +'-' + markupRow + '-' + isChanged;
}

function markElemAsChanged(el, markType) {

  if (['form', 'bpmn'].includes(el.id.slice(0,4))) {return false;}

  let binMask = parseInt(el.id[el.id.length - 1], 32).toString(2);
  let id_part;
  if (markType === 'shift') {
    id_part = binMask.slice(0, binMask.length - 1) + '1';
  } else if (markType === 'resize') {
    let binMaskTemplate = '000';
    binMask = binMaskTemplate.slice(binMask.length) + binMask;
    id_part = binMask.slice(0, binMask.length - 2) + '1' + binMask.slice(binMask.length - 1);
  } else if (markType === 'change') {
    let binMaskTemplate = '000';
    binMask = binMaskTemplate.slice(binMask.length) + binMask;
    id_part = binMask.slice(0, binMask.length - 3) + '1' + binMask.slice(binMask.length - 2);
  }
  id_part = parseInt(id_part, 2).toString(32);

  el.id = el.id.slice(0, el.id.length - 1) + id_part;
}

function getModifiedElements(state) {
  let elementsToUpdate = [];
  state.elements.forEach(page => {
    if (page.id === state.activePageID) {
      page.children[0].children.forEach(elem => {
        if (elem.id[elem.id.length - 1] !== '0' && !['arrow'].includes(elem.type)) {
          elementsToUpdate.push(elem);
        }
      })
    }
  })
  return elementsToUpdate;
}

function getElementType(elemType) {
  let elementsTypes = {'textelem': 'надпись', 'select1c': 'реквизит', 'checkbox1c': 'чекбокс', 'tab1c': 'вкладка',
    'dbtable1c': 'таблица', 'uncoloredbutton1c': 'кнопкаБезАкцента', 'yellowbutton1c': 'кнопкаГлавная'}
  return (elementsTypes[elemType]) ? '  ' + elementsTypes[elemType] + ' ' : '';
}

function setMarkupCoords(el, row) {
  row = (row) ? row : getElementType(el.type);

  if (!row) { return '' }

  let binMask = parseInt(el.id[el.id.length - 1], 32).toString(2);
  if (Number(binMask[binMask.length - 1])) {
    row = row.replace(/( *\.х )[а-яА-Я\w]*( |)/, "");
    row = row.replace(/( *\.у )[а-яА-Я\w]*( |)/, "");
    row += ' .х ' + el.left.replace('px', '') + ' .у ' + el.top.replace('px', '');
  }
  return (el.id.slice(0,5) === 'clgtw') ? '' : row;
}

function setMarkupSizes(el, row) {
  row = (row) ? row : getElementType(el.type);

  let namesForTypes = {
    'checkbox1c': ['nameResizeWidth', ''],
    'textelem': ['nameResizeWidth', 'nameResizeHeight'],
    'tab1c': ['mainResizeWidth', 'mainResizeHeight'],
    'select1c': ['nameResizeWidth', ''],
    'dbtable1c': ['', ''],
    'uncoloredbutton1c': ['nameResizeWidth', ''],
    'yellowbutton1c': ['nameResizeWidth', ''],
    'wrapperform1c': ['mainResizeWidth', 'mainResizeHeight'],
    'bpmndoc': ['', ''],
    'bpmngateway': ['', ''],
    'bpmnevent': ['', ''],
    'bpmntask': ['taskWidth', 'taskHeight'],
  };

  let binMask = parseInt(el.id[el.id.length - 1], 32).toString(2);
  if (Number(binMask[binMask.length - 2])) {
    row = row.replace(/( *\.ширина )[а-яА-Я\w]*( |)/, "");
    row = row.replace(/( *\.высота )[а-яА-Я\w]*( |)/, "");

    row += (el[namesForTypes[el.type][0]]) ? (' .ширина ' + el[namesForTypes[el.type][0]].replace('px', '')) : '';
    row += (el[namesForTypes[el.type][1]]) ? (' .высота ' + el[namesForTypes[el.type][1]].replace('px', '')) : '';
    if (el.type === 'dbtable1c') {
      row += '<width_modified>';
    }
  }
  return row;
}

function updateMarkup() {

  let actualMarkup = localStorage.getItem('code' + getState().activePageID) || '';
  let actualState = getState(true);
  let updatedMarkup = '';

  actualMarkup = actualMarkup.replaceAll(/(\n)(\s*\.[а-яА-Я\w])/gm, '<newline>$2')
  let disassembledMarkup = actualMarkup.split('\n');
  let modifiedElements = getModifiedElements(actualState);
  let handlers = [setMarkupCoords, setMarkupSizes];

  modifiedElements.forEach(el => {
    let disassembled_elem_id = el.id.split('-');
    let markupRowIdx = disassembledMarkup.length;
    if (disassembled_elem_id[1] === '1') {
      markupRowIdx = Number(disassembled_elem_id[2]);
    } else {
      el.id = el.id.replace(/(\d-\d-)\d+(-\d)/, '$1' + markupRowIdx + '$2');
    }

    handlers.forEach(handler => {
      disassembledMarkup[markupRowIdx] = handler(el, disassembledMarkup[markupRowIdx] || '');
    });

    if (el.type === 'dbtable1c' && disassembledMarkup[markupRowIdx].match(/<width_modified>/) ) {
      let rowIdxCounter = 1;
      el.columns.forEach(col => {
        if (disassembledMarkup[markupRowIdx + rowIdxCounter].match(/колонка/)) {
          disassembledMarkup[markupRowIdx + rowIdxCounter]
            = disassembledMarkup[markupRowIdx + rowIdxCounter]
            .replace(/( *\.ширина )[а-яА-Я\w]*( |)/, "");
          disassembledMarkup[markupRowIdx + rowIdxCounter] += ' .ширина ' + col.width.replace('px', '');
          rowIdxCounter++;
        }
      });
      disassembledMarkup[markupRowIdx]
        = disassembledMarkup[markupRowIdx].replace(/<width_modified>/, '');
    }

  });

  disassembledMarkup.forEach(row => { updatedMarkup += (row === '') ? '' : row + '\n'; });
  updatedMarkup = updatedMarkup.replaceAll('<newline>', '\n')

  return updatedMarkup;
}

function clearAllManualLayout() {
  let IDECodeInput = document.querySelector('#ide-code-input');
  let markup = IDECodeInput.value;

  markup = markup.replaceAll(/\s*отступ\s*((\.х)|(\.у)) [а-яА-Я\w\.]+/gm,'');
  markup = markup.replaceAll(/\s*\.ширина [а-яА-Я\w\.]+/gm,'');
  markup = markup.replaceAll(/\s*\.высота [а-яА-Я\w\.]+/gm,'');
  markup = markup.replaceAll(/\s*\.х [а-яА-Я\w\.]+/gm,'');
  markup = markup.replaceAll(/\s*\.у [а-яА-Я\w\.]+/gm,'');

  IDECodeInput.value = markup;
  handleIDEInput();
}