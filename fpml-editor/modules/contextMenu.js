function calcTickOpacity(id) {
  if (getState().activePageID === id) {
    return 1;
  } else {
    return 0;
  }
}

function makePageNameEditable(e) {
  let pageID = e.id || e[0].id;
  let pageNameInput = document.querySelector('#' + pageID + '_menu-item');
  pageNameInput.disabled = false;
  pageNameInput.focus();
  pageNameInput.select();
}

function removeContextMenu() {
  if (mockAppGlobals.pageNavIsEnabled && document.activeElement.className !== 'menu-item-input'
    && document.querySelector('.contextMenu')) {
    document.querySelectorAll('.contextMenu').forEach((e) => {
      e.remove();
    })
  }
}

document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('remove-context-menu-onclick')) {
    removeContextMenu();
    document.querySelectorAll('.remove-onclick-element').forEach((elem) => {
      elem.style.display = 'none';
    })
  }
  document.getSelection().removeAllRanges();
  if (!e.target.closest('.settings-panel')) {
    removeAllSettingPanels();
  }
});

function changePageName(page, newName) {
  page.querySelector('.page-name').innerHTML = newName;
}

function copyFormByID(id) {
  importedState = getState(true);
  let _e;
  importedState.elements.forEach((parent) => {
    parent.children.forEach((e) => {
      if (e.id === id) {
        _e = structuredClone(e);
        _e.id = `form-1c-${formCounter}`;
        _e.top = Number(_e.top.replace('px', '')) + 100 + 'px';
        _e.left = Number(_e.left.replace('px', '')) + 30 + 'px';
        formCounter++;
      }
    })
  });
  importedState.elements.forEach((e) => {
    if (e.id === importedState.activePageID) {
      e.children.unshift(_e);
    }
  });
  document.body.innerHTML = '<div style="font-family: \'JetBrains Mono\', serif; color: #FFFFFF;">.</div>';
  renderingNeeded = true;
}

function renderNavMenu() {
  let navMenuHTML = '';
  getState().pagesList.forEach((item) => {
    navMenuHTML += `
      <div 
        onmouseenter="this.querySelector('.pagename-edit-handle').style.opacity = '1'"
        onmouseleave="this.querySelector('.pagename-edit-handle').style.opacity = '0'">
      <div
        class="navMenuItem"
        style="height: 1.3rem; padding: 5px; width: 20rem; display: flex; flex-direction: row; 
             justify-content: space-between;"
        onmousedown="this.closest('.contextMenu').querySelectorAll('.navMenuItem').forEach((e)=>{
          if (mockAppGlobals.pageNavIsEnabled) {
            e.querySelector('.tick-box').style.opacity = '0;';
            this.querySelector('.tick-box').style.opacity = '1;';
          }
        });"
        onmouseup="this.closest('.contextMenu').querySelectorAll('.navMenuInnerWrapper').forEach(()=>{
          if (mockAppGlobals.pageNavIsEnabled) {
            switchToPage(${item.id})
          }
        });"
        onmouseenter="this.style.backgroundColor='#EEEEEE'"
        onmouseleave="this.style.backgroundColor='#FFFFFF'"
      >
        <span class="pagename-edit-handle"
          style="cursor: pointer; opacity: 0;"
          onmouseenter="mockAppGlobals.pageNavIsEnabled = false;"
          onmouseleave="mockAppGlobals.pageNavIsEnabled = true;"
          onclick="makePageNameEditable(${item.id})">&#9998;</span>
        <input 
          type="text" 
          id="${item.id + '_menu-item'}"
          class="menu-item-input"
          value="${item.name}"
          style="border-width: 0; background-color: transparent; font-family: 'JetBrains Mono', serif; 
            font-size: 12px; width: 16rem; cursor: default; caret-color: #FFFFFF;"
          onchange="changePageName(${item.id}, this.value)"
          onmousedown="this.closest('.contextMenu').querySelectorAll('.navMenuItem').forEach((e)=>{
            if (mockAppGlobals.pageNavIsEnabled) {
              e.querySelector('.tick-box').style.opacity = '0';
              this.closest('.navMenuItem').querySelector('.tick-box').style.opacity = '1';
            }
          });"
        >
        <div class="tick-box" style="position: relative; right: 20px; opacity: ${calcTickOpacity(item.id)};">
          &#10004</div>
      </div> 
      </div>
    `;
  });
  return navMenuHTML;
}

function renderContextMenu(event) {
  let contextMenuHTML = '';
  let clickY = ((event.clientY + visualViewport.pageTop) / grid >> 0) * grid;
  let clickX = ((event.clientX + visualViewport.pageLeft) / grid >> 0) * grid;
  if (event.target.querySelector('body')) {
    contextMenuHTML += `
      <div class="contextMenu removable-popup"
      style="
        z-index: 9000; background-color: #FFFFFF; top: calc(${event.clientY + visualViewport.pageTop}px - 10px); 
        left: calc(${event.clientX + visualViewport.pageLeft}px - 10px); width: 23rem; position: absolute; display: flex;
        flex-direction: column; font-weight: 400; cursor: default; border: 1px solid #9B9B9B;
        font-family: 'JetBrains Mono', serif; font-size: 14px;
      " 
      onclick="removeContextMenu()"
    >
      <div class="navMenuInnerWrapper">
        <div
          style="height: 1.3rem; padding: 5px;"
          onmousedown="wrapperForm1c('${clickY}px', '${clickX}px', 'form-1c-${formCounter}')"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >
            <div style="margin-top: 1px;">Создать новую форму на этом экране</div>
        </div>
        <div
          style="height: 1.3rem; padding: 5px;"
          onmousedown="bpmnPool('bpmn-pool-${formCounter}',${clickY}, ${clickX})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >
            <div style="margin-top: 1px;">Создать новую BPMN-схему на этом экране</div>
        </div>
        <div
          style="height: 1.3rem; padding: 5px; display: flex; flex-direction: row; justify-content: space-between;"
          onmousedown=""
          onmouseup="removeContextMenu()"
          onmouseenter="this.querySelectorAll('.navMenu').forEach((e)=>{
            this.style.backgroundColor='#EEEEEE';
            e.style.display = 'block';
          });"
          onmouseleave="this.querySelectorAll('.navMenu').forEach((e)=>{
            this.style.backgroundColor='#FFFFFF';
            e.style.display = 'none';
          });"
          >
          <span style="margin-top: 1px;">Переключиться на другой экран</span>
          <div style="rotate: -90deg;">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 8L10 12.76L6 8H14Z" fill="#4A4A4A"/>
            </svg>
          </div>
          <div 
            class="navMenu" 
            style="position: absolute; left: 23rem; top: 3.9rem; background-color: #FFFFFF; display: none;
            border: 1px solid #9B9B9B; font-family: 'JetBrains Mono', serif; font-size: 13px;"
          >
            ${renderNavMenu()}
          </div>
        </div>
        <div
          style="height: 1.3rem; padding: 5px;"
          onmousedown="addPage()"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >
            <div style="margin-top: 1px;">Создать новый экран</div>
        </div>
        <div
          style="height: 1.3rem; padding: 5px;"
          onmousedown="copyActivePage()"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >
            <div style="margin-top: 1px;">Копировать этот экран</div>
        </div>
        <div
          style="height: 1.3rem; padding: 5px;"
          onmousedown="deleteActivePage()"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >
            <div style="margin-top: 1px;">Удалить этот экран</div>
        </div>
        <div
          style="height: 1.3rem; padding: 5px; display: flex; flex-direction: row;"
          onmousedown="document.querySelectorAll('body').forEach(() => {
            renderMainWindow()
            removeContextMenu()
          })"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >
            <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.8297 8.18077C22.3984 8.57887 22.3984 9.42113 21.8297 9.81923L17.2126 13.0512C16.3122 13.6814 15.2019 12.6091 15.8004 11.6874L17.1918 9.54461C17.4069 9.21339 17.4069 8.78661 17.1918 8.45539L15.8004 6.31263C15.2019 5.3909 16.3122 4.31855 17.2126 4.9488L21.8297 8.18077Z" fill="#545454"/>
              <path d="M1.17033 9.81923C0.601616 9.42113 0.601615 8.57887 1.17033 8.18077L5.78743 4.9488C6.68778 4.31855 7.79812 5.3909 7.19959 6.31263L5.80819 8.45539C5.59311 8.78661 5.59311 9.21339 5.80819 9.54461L7.19959 11.6874C7.79812 12.6091 6.68778 13.6814 5.78743 13.0512L1.17033 9.81923Z" fill="#545454"/>
              <line x1="13.9594" y1="0.282166" x2="8.95936" y2="17.2822" stroke="#545454" stroke-width="2"/>
            </svg>
            <div style="margin-left: 6px; margin-top: 1px;">Сгенерировать по описанию</div>
        </div>
        <div
          style="height: 1.3rem; padding: 5px;"
          onmousedown="hideHandles()"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >
            <div style="margin-top: 1px;">Отключить режим редактирования</div>
        </div>
      </div>
    </div>`;
  } else if (event.target.closest('.wrapperform1c')) {
    const currentForm = event.target.closest('.wrapperform1c');
    const _id = currentForm.id.split('-')[2];
    let clickYForChildNode = clickY - Number(currentForm.style.top.replace('px', ''));
    let clickXForChildNode = clickX - Number(currentForm.style.left.replace('px', ''));
    contextMenuHTML += `
      <div class="contextMenu"
        style="
          z-index: 9000; background-color: #FFFFFF; 
          top: calc(${(event.clientY + visualViewport.pageTop) || currentForm.style.top.replace('px', '')}px - 10px); 
          left: calc(${(event.clientX + visualViewport.pageLeft) || currentForm.style.left.replace('px', '')}px - 10px);
          width: 14rem; position: absolute; display: flex; flex-direction: column; font-weight: 400;
          cursor: default; border: 1px solid #9B9B9B; font-family: 'JetBrains Mono', serif; font-size: 14px;
        "
        onmouseleave="removeContextMenu()"
        onclick="removeContextMenu()"
      >
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="table1c('${clickYForChildNode}px', '${clickXForChildNode}px', ${_id})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить таблицу</div>
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="select1c('${clickYForChildNode}px', '${clickXForChildNode}px', ${_id})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить реквизит</div>
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="checkbox1c('${clickYForChildNode}px', '${clickXForChildNode}px', ${_id})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить чекбокс</div>
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="yellowButton1c('${clickYForChildNode}px', '${clickXForChildNode}px', ${_id})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить главную кнопку</div>
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="uncoloredButton1c('${clickYForChildNode}px', '${clickXForChildNode}px', ${_id})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить кнопку</div>
        <div  
          style="height: 1.5rem; padding: 5px;"
          onmousedown="tab1c('${clickYForChildNode}px', '${clickXForChildNode}px', ${_id})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить вкладки</div>
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="textElem('${clickYForChildNode}px', '${clickXForChildNode}px', ${_id})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить текст</div>
        <div 
          style="height: 1.5rem; padding: 5px; display: flex; flex-direction: row;"
          onmousedown="copyFormByID('form-1c-${_id}')"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
        >
          <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="#444444" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64
            0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"/>
            <path fill="#444444" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0
            0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1
            384 64z"/>
          </svg>
          <div style="padding: 0 0 2px 5px;">
            <span>Копировать эту форму</span>
          </div>
        </div>
      </div>
    `;
  } else if (event.target.closest('.bpmnpool')) {
    const currentForm = event.target.closest('.bpmnpool');
    const _id = currentForm.id.split('-')[2];
    let coords = [event.clientX, event.clientY];
    let clickYForChildNode = clickY - Number(currentForm.style.top.replace('px', ''));
    let clickXForChildNode = clickX - Number(currentForm.style.left.replace('px', ''));
    contextMenuHTML += `
      <div class="contextMenu"
        style="
          z-index: 9000; background-color: #FFFFFF; 
          top: calc(${(event.clientY + visualViewport.pageTop) || currentForm.style.top.replace('px', '')}px - 10px); 
          left: calc(${(event.clientX + visualViewport.pageLeft) || currentForm.style.left.replace('px', '')}px - 10px);
          width: 14rem; position: absolute; display: flex; flex-direction: column; font-weight: 400;
          cursor: default; border: 1px solid #9B9B9B; font-family: 'JetBrains Mono', serif; font-size: 14px;
        "
        onmouseleave="removeContextMenu()"
        onclick="removeContextMenu()"
      >
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="bpmnEvent('${_id}', ${clickYForChildNode}, ${clickXForChildNode})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить событие</div>
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="bpmnGateway('${_id}', ${clickYForChildNode}, ${clickXForChildNode})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить шлюз</div>
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="bpmnTask('${_id}', ${clickYForChildNode}, ${clickXForChildNode})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить задачу</div>
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="textElem('${clickYForChildNode}px', '${clickXForChildNode}px', ${_id}, parentIdPrefix = 'bpmn-pool-')"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить текст</div>
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="bpmnDoc('${_id}', ${clickYForChildNode}, ${clickXForChildNode})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить документ</div>
        <div 
          style="height: 1.5rem; padding: 5px;"
          onmousedown="handleBpmnAssociationDrawingEvent(${coords[0] + window.visualViewport.pageLeft}, ${coords[1] + window.visualViewport.pageTop}, ${_id})"
          onmouseup="removeContextMenu()"
          onmouseenter="this.style.backgroundColor='#EEEEEE'"
          onmouseleave="this.style.backgroundColor='#FFFFFF'"
          >Добавить ассоциацию</div>
      </div>
    `;
  }
  return contextMenuHTML;
}

function showContextMenu(event) {
  removeAllPopupElements();
  let wrapper = document.createElement('div');
  wrapper.innerHTML = renderContextMenu(event).trim();
  document.body.appendChild(wrapper.firstChild);
}
