let autosaveIsOn = true;
let showTooltips = true;
let tooltipDaemonID = null;
let changesRegistered = false;
let stateDemonTimeout = 0.3;
let grid = 1;
let checkLocalStorageForMockupGUID = false;
let renderingNeeded = false;
let standaloneMode = true;
let importedState = {};
let formCounter = 0;
let IDECodeInput = null;
let IDECodePane = null;
let cursorContext = null;
let validTokens = null;
let mockAppGlobals = {pageNavIsEnabled: true, elemCounter: 0, initialArrowCoords: null, arrowParentElemID: null,
  arrowParentCoords: null, arrowParentHandleSide: null, resizeIsInProcess: false, settingsHideTimeout: 200,
  bpmnRendererConfig: {horIndent: 16, verIndent: 16}, associationDrawingIsInProcess: false,
  initialAssociationCoords: null, tooltipRotationTimeout: 999999999};
const regularSvgString = `
    <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.84362 12.1319L6.41752 18.4068C6.30158 18.9169 5.57921 18.929 5.44635 18.423L0.876216 1.01939L16.2339 9.72364C16.6704 9.97102 16.5113 10.6353 16.0101 10.6581L9.23821 10.9659C8.56396 10.9966 7.99321 11.4738 7.84362 12.1319Z" fill="white" stroke="black"/>
    </svg>`;
const clientAppURL = 'file:///D:/works/разработка/1c%20UI%20kit/constructor.html';
let elementsSelectingParams = {startPosition: [0, 0], mouseupExpected: false};

function getNextPageCounterValue() {
  let currentCounterValue = 1;
  getState().pagesList.forEach((page)=>{
    if (Number(page.id.replace('_', '')) > currentCounterValue) {
      currentCounterValue = Number(page.id.replace('_', ''));
    }
  });
  return currentCounterValue + 1;
}

function addPage(name=null, _id=null) {
  if (!_id) {
    _id = getNextPageCounterValue();
  }
  if (!name) {
    name = `Экран ${_id}`;
  }
  let newPageHTML = `
    <div style="display: none;" class="page" id=_${_id}>
      <div class="page-name" style="display: none;">${name}</div>
    </div>
  `;
  document.body.innerHTML += newPageHTML;
  return _id;
}

function deleteActivePage() {
  document.querySelector(`#${getState().activePageID}`).remove();
  if (getState().pagesList.length === 0) {
    addPage('Экран 1', 1);
    switchToPage({id: '_1'});
  } else {
    switchToPage(document.querySelector('.page'));
  }
}

function switchToPage(_id) {
  document.querySelectorAll('.page').forEach((e)=>{
    if (e.style.display === 'block') {
      e.style.display = 'none';
    }
    if (e.id === _id.id) {
      e.style.display = 'block';
    }
  })
}

function dragElement(elem) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (elem.classList.contains('drag-handle')) {
    elem.onmousedown = dragMouseDown;
  } else {
    (elem.querySelector('.drag-handle') || elem).onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    if (!e.target.closest('.settings-panel')) {
      e.preventDefault();
      if (!mockAppGlobals.resizeIsInProcess) {
        if (grid === 1) {
          pos3 = e.clientX;
          pos4 = e.clientY;
        } else {
          pos3 = (e.clientX / grid >> 0) * grid;
          pos4 = (e.clientY / grid >> 0) * grid;
        }
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }
    }
  }

  function elementDrag(e) {
    e.preventDefault();
    if (grid === 1) {
      pos1 = pos3 - e.clientX;
      pos3 = e.clientX;
      elem.style.left = (elem.offsetLeft - pos1) + "px";
      pos2 = pos4 - e.clientY;
      pos4 = e.clientY;
      elem.style.top = (elem.offsetTop - pos2) + "px";
    } else {
      if ((pos3 - e.clientX) / grid >> 0 === (pos3 - e.clientX) / grid) {
        pos1 = pos3 - e.clientX;
        pos3 = e.clientX;
        elem.style.left = (elem.offsetLeft - pos1) + "px";
      }
      if ((pos4 - e.clientY) / grid >> 0 === (pos4 - e.clientY) / grid) {
        pos2 = pos4 - e.clientY;
        pos4 = e.clientY;
        elem.style.top = (elem.offsetTop - pos2) + "px";
      }
    }
    markElemAsChanged(elem, 'shift');
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function render() {
  document.querySelectorAll('textarea').forEach((e) => {
    e.style.resize='none';
  });
}

function addOptionToSelect(e, n) {
  if (e.querySelectorAll('textarea').length + 1 > n) {
    let a = Array.from(e.querySelectorAll('.alt-option')).slice(0, n - 1);
    e.innerHTML = '';
    a.forEach((option)=>{
      e.innerHTML += option.outerHTML;
    })
  } else {
    let m = e.querySelectorAll('textarea').length + 1;
    for (let i = 0; i < n - m; i++) {
      e.innerHTML += `
        <div class="alt-option"
          onmouseenter="this.style.backgroundColor='#F3DB13'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          style="
            background-color: #FFFFFF; flex-direction: row; width: 100%; 
            transition: background-color 0.2s cubic-bezier(.14,1.13,.7,.95); height: 28px;"
        >
          <textarea
            class="element-textarea select1c-alt-option-textarea"
            ondblclick="this.select()"
            onchange="this.innerHTML = this.value"
            style="
              z-index: 9999; background-color: transparent; color: #4A4A4A; font-family: 'Arial', serif;
              font-weight: 400; font-size: 12px; text-align: start; overflow: hidden; border-width: 0;
              margin-top: 7px; margin-left: 7px; height: 1rem; width: 100%; resize: horizontal;
              outline: none;
            "
          >Альтернативная опция
          </textarea>
        </div>
      `;
    }
  }
}

function hideHandles() {
  document.querySelectorAll('.hide-command-senitive').forEach((e) => {
    e.style.opacity = '0';
  });
  document.querySelectorAll('textarea').forEach((e) => {
    e.onclick = () => '';
    e.disabled = true;
  });
  document.querySelectorAll('[class*=-handle], [class*=arrow-delete-button]').forEach((e) => {
    e.remove();
  });
  document.body.querySelectorAll('[class]').forEach((e) => {
    e.onmouseenter = () => "";
    e.onmouseleave = () => "";
    e.onmouseout = () => "";
    e.onmouseover = () => "";
  });
  document.querySelectorAll('.bpmnpool-lane').forEach((e) => {
    e.style.backgroundColor = 'white';
  });
  document.querySelector('#main-menu-panel').remove();
  renderContextMenu = () => '';
  dragElement = () => '';
  render();
}

function copyActivePage() {
  importedState = getState(true);
  let _e;
  let flag = true;
  importedState.elements.forEach((e) => {
    if (e.type === 'page' && e.id === importedState.activePageID && flag) {
      _e = structuredClone(e);
      let nextPageCounterValue = getNextPageCounterValue();
      _e.id = '_' + nextPageCounterValue;
      _e.name = _e.name.split('_')[0] + '_' + nextPageCounterValue;
      _e.children.forEach(c => {
        if (c.type === 'bpmnpool') {
          c.idPool = 'bpmn-pool-' + formCounter;
          formCounter++;
        } else if (c.type === 'wrapperform1c') {
          c.id = 'form-1c-' + formCounter;
          formCounter++;
        }
      });
      importedState.elements.unshift(_e);
      flag = false;
    }
  });
  document.body.innerHTML = `
    <div id="scroll-crutch" style="width: 3000px; height: 1000px; z-index: 0; position: absolute; 
        top: calc(120% + 1px); left: calc(120% + 1px);"></div>`;
  renderingNeeded = true;
}

function settingsIconOnclickHandler(triggeredElement) {
  triggeredElement.closest('.element-main-wrapper')
    .querySelector('.settings-panel').style.display = 'block';
}

function removeAllSettingPanels() {
  document.querySelectorAll('.settings-panel').forEach((e) => {
    e.style.display = 'none';
  })
}

function removeAllPopupElements() {
  document.querySelectorAll('.removable-popup').forEach((e) => {
    e.remove();
  })
}

function showNotification(notificationHTML, coords, width, notificationType, onclickFunction) {
  if (notificationType === 'dialog') {
    document.body.innerHTML += `
      <div class="pop-up-notification" style="
        position: absolute; display: flex; justify-content: start; font-size: 13px; 
        font-family: 'JetBrains Mono', serif; z-index: 9999">
        <div style="
          width: ${width}px; background-color: #FFFFFF; box-shadow: 0 3px 6px rgba(0, 0, 0, 1);
          position: absolute; font-weight: 400; left: ${coords[0]}px; top: ${coords[1]}px;">
          ${notificationHTML}
          <div class="button-dark" onmouseenter="this.style.backgroundColor = '#574545'"
            onmouseleave="this.style.backgroundColor = '#707070'" 
            onclick="${onclickFunction}"
            onmouseup="this.closest('.pop-up-notification').remove()"
            style="border: 1px solid transparent; border-radius: 3px; background-color: #707070; 
            cursor: pointer; color: #ffffff; height: 30px; width: 100px; position: absolute; top: calc(100% - 50px);
            left: calc(100% - 150px);">
            <span
              style="position: absolute; margin-left: 40px; margin-top: 6px; font-size: 14px;">
              Оk.
            </span>
          </div>
        </div>
      </div>
    `;
  }
}

function setExpandBodyOnscrollEvent() {
  document.onscroll = () => {
    let newXCoord = 'calc(120% + ' + (visualViewport.pageLeft + 100) + 'px)';
    let newYCoord = 'calc(120% + ' + (visualViewport.pageTop + 100) + 'px)';
    document.querySelector('#scroll-crutch').style.left = newXCoord;
    document.querySelector('#scroll-crutch').style.top = newYCoord;
  };
}

function svgToBase64Url(svgString, width, height) {
  const base64SVG = btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}px" height="${height}px">
        ${svgString}
      </svg>`
  );
  return `url('data:image/svg+xml;base64,${base64SVG}'), auto`;
}

function startSelectingElements(event) {
  if (event.target.tagName === 'HTML') {
    elementsSelectingParams.mouseupExpected = true;
    elementsSelectingParams.startPosition =
      [event.clientX + window.visualViewport.pageLeft, event.clientY + window.visualViewport.pageTop];
    let wrapper = document.createElement('div');
    wrapper.innerHTML =
      `<div 
        class="selected-area-frame" 
        style="background-color: #abc4e5; opacity: 0.3; position: absolute; z-index: 9999;">
      </div>`;
    document.body.appendChild(wrapper.firstChild);
  }
  document.querySelectorAll('.is-selected').forEach(el => {
    el.classList.remove("is-selected");
    el.style.backgroundColor = 'white';
    el.querySelectorAll('.color-selection').forEach(trg => {
        trg.style.backgroundColor = 'white';
        trg.style.fill = 'white';
      }
    );
  });
}

function endSelectingElements(event) {
  if (elementsSelectingParams.mouseupExpected) {
    let frameCoords = {
      top: Math.min(
        event.clientY + window.visualViewport.pageTop, elementsSelectingParams.startPosition[1]),
      right: Math.max(
        event.clientX + window.visualViewport.pageLeft, elementsSelectingParams.startPosition[0]),
      bottom: Math.max(
        event.clientY + window.visualViewport.pageTop, elementsSelectingParams.startPosition[1]),
      left: Math.min(
        event.clientX  + window.visualViewport.pageLeft, elementsSelectingParams.startPosition[0])
    };
    document.querySelector('body').childNodes.forEach(page => {
      if (!(page.nodeType === 3) && page.style.display === 'block') {
        page.querySelectorAll('.bpmnpool').forEach(parentElem => {
          parentElem.childNodes.forEach(node => {
            if (!(node.nodeType === 3)) {
              let nodeCoords = {
                left: Number(node.style.left.replace('px', ''))
                  + Number(parentElem.style.left.replace('px', '')),
                top: Number(node.style.top.replace('px', ''))
                  + Number(parentElem.style.top.replace('px', ''))
              };
              ['bpmnevent', 'bpmngateway', 'bpmntask', 'textelem', 'arrow']
                .forEach(className => {
                if (node.classList.contains(className)
                  && nodeCoords.left > frameCoords.left && nodeCoords.left < frameCoords.right
                  && nodeCoords.top > frameCoords.top && nodeCoords.top < frameCoords.bottom
                ) {
                  node.classList.add('is-selected');
                  if (['bpmntask', 'bpmnevent'].includes(className)) {
                    node.querySelector('.color-selection').style.backgroundColor = '#abc4e5';
                  } else if (['bpmngateway'].includes(className)) {
                    node.querySelector('.color-selection').style.fill = '#abc4e5';
                  } else {
                    node.style.backgroundColor = '#abc4e5';
                  }
                }
              });
            }
          });
        });
      }
    });
  }
  document.querySelectorAll('.selected-area-frame').forEach(el => el.remove());
  elementsSelectingParams.startPosition = [Infinity, Infinity];
  elementsSelectingParams.mouseupExpected = false;
}


function shiftSelectedElements(direction, shift) {
  if (direction === 'l') {
    document.querySelectorAll('.is-selected').forEach(el => {
      el.style.left = Number(el.style.left.replace('px', '')) + shift + 'px';
       if (el.classList.contains('arrow')) {
         el.querySelector('.arrow-start-coords-0').innerHTML
           = Number(el.querySelector('.arrow-start-coords-0').innerHTML) + shift;
         el.querySelector('.arrow-end-coords-0').innerHTML
          = Number(el.querySelector('.arrow-end-coords-0').innerHTML) + shift;
       }
    });
  } else {
    document.querySelectorAll('.is-selected').forEach(el => {
      el.style.top = Number(el.style.top.replace('px', '')) + shift + 'px';
      if (el.classList.contains('arrow')) {
         el.querySelector('.arrow-start-coords-1').innerHTML
           = Number(el.querySelector('.arrow-start-coords-1').innerHTML) + shift;
         el.querySelector('.arrow-end-coords-1').innerHTML
          = Number(el.querySelector('.arrow-end-coords-1').innerHTML) + shift;
       }
    });
  }
}

function resizeSelectedAreaFrame(e) {
  let selectedAreaFrame = document.querySelector('.selected-area-frame');
  if (selectedAreaFrame) {
    let frameCoords = {
      top: Math.min(e.clientY + window.visualViewport.pageTop, elementsSelectingParams.startPosition[1]),
      right: Math.max(e.clientX + window.visualViewport.pageLeft, elementsSelectingParams.startPosition[0]),
      bottom: Math.max(e.clientY + window.visualViewport.pageTop, elementsSelectingParams.startPosition[1]),
      left: Math.min(e.clientX + window.visualViewport.pageLeft, elementsSelectingParams.startPosition[0])
    };
    selectedAreaFrame.style.top = frameCoords.top + 'px';
    selectedAreaFrame.style.left = frameCoords.left + 'px';
    selectedAreaFrame.style.width = frameCoords.right - frameCoords.left + 'px';
    selectedAreaFrame.style.height = frameCoords.bottom - frameCoords.top + 'px';
  }
}

document.addEventListener('mousedown', (e)=>{
  startSelectingElements(e);
});

document.addEventListener('mousemove', (e)=>{
  resizeSelectedAreaFrame(e);
});

document.addEventListener('mouseup', (e)=>{
  endSelectingElements(e);
});

document.addEventListener('keydown', (e)=>{
  if (!document.querySelector('#ide-form-wrapper') && document.querySelector('.is-selected')) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      shiftSelectedElements('t', -5);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      shiftSelectedElements('l', 5);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      shiftSelectedElements('t', 5);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      shiftSelectedElements('l', -5);
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('html').style.cursor = svgToBase64Url(regularSvgString, 20, 23);
  renderKeyManagementForm();
  renderMainMenu();
  document.querySelectorAll('.draggable').forEach((e) => {
    dragElement(e);
  });
  setExpandBodyOnscrollEvent();
});

document.addEventListener('contextmenu', (e)=>{
  showContextMenu(e);
  e.preventDefault();
});
