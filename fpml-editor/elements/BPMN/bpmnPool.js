function resizeNeighbourLanes(e, pos1) {
  e.closest('.bpmnpool').querySelectorAll('.bpmnpool-lane').forEach((neighbour) => {
    if (neighbour !== e) {
      neighbour.style.width = (Number(neighbour.style.width.replace('px', '')) - pos1) + "px";
    }
  });
}

function getCurrentPoolWidth(elem) {
  return elem.closest('.bpmnpool').querySelector('.bpmnpool-lane').offsetWidth;
}

function getPoolLane(lane) {
  return `
  <div class="bpmnpool-lane" style="
      height: ${lane['height']}px; width: ${lane['width']}px; flex-direction: row; justify-content: start; 
      border: black solid; border-width: 1px 0 0 0;"
  >
    <div class="pool-lane-name-box" style="
      border: black solid; border-width: 0 0 0 1px; width: 26px; height: calc(100% - 1px); rotate: 180deg;
      writing-mode: vertical-rl; text-align: center; padding: 0 4px 0 0; background-color: white; z-index: 7950;
      position: relative;"
    >
      <span 
        class="pool-lane-name" 
        style="display: block; cursor: pointer;"
        onclick="this.closest('.bpmnpool-lane').querySelector('.remove-onclick-element').style.display = 'flex'">
        ${lane['name']}
      </span>
      <div class="remove-onclick-element" 
        style="rotate: 180deg; display: none; flex-direction: column-reverse; padding: 50% 0 0 0; justify-content: start;">
        <input 
          type="text"
          value="${lane['name']}"
          style="height: 16px;"
          onchange="this.closest('.pool-lane-name-box').querySelector('.pool-lane-name').innerHTML = this.value"
          ondblclick="this.select()">
        <span 
          style="display: block; height: 16px; cursor: pointer;" 
          onclick="this.closest('.remove-onclick-element').style.display = 'none'">
          &#10003
        </span>
      </div>
    </div>
    <div class="pool-lane-space" style="position: relative; bottom: 20px;">
      ${getResizer('both', 'calc(100% - 36px)', 'calc(100% - 16px)', 
        'bpmnpool-lane', 'relative', 'resizeNeighbourLanes')}
    </div>
  </div>
  `;
}


function getPoolLanes(lanes) {
  let lanesHTML = '';
  let kindOfAList;
  kindOfAList = [];
  kindOfAList.forEach.call(lanes, function(lane) {
    lanesHTML += getPoolLane(lane);
  });
  return lanesHTML;
}



function bpmnpoolRenderer(props) {
  return `
    <div
      class="draggable bpmnpool element-main-wrapper resizable"
      id="${props['idPool'] || props['id']}"
      onmouseout="this.querySelectorAll('.bpmnpool-hover-visible').forEach((e)=>{e.style.display='none'})"
      onmouseover="this.querySelectorAll('.bpmnpool-hover-visible').forEach((e)=>{e.style.display='flex'})"
      style="
        position: absolute;
        top: ${props['top']};
        left: ${props['left']};
        font-weight: 400;
        display: flex;
        flex-direction: column;
        align-items: start;
        border-radius: 4px;
        z-index: 7000;
      "
    >
      <div class="bpmnpool-hover-visible hide-command-senitive" style="
        position: absolute; display: none; flex-direction: row-reverse; top: -22px; left: -130px; width: 190px; 
        height: 35px; z-index: 9999;"
      >
        <div 
          style="margin-left: 5px; margin-right: 10px; opacity: 0;"
          onmouseenter="dragElement(this.closest('.element-main-wrapper'))"
        >
          <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
          </svg>
        </div>
        <div 
          style="cursor: pointer;"
          onclick="showContextMenu({target: this})"
        >
          <svg style="padding: 0 0 0 3px;" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 
            17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 
            16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z" fill="#0F0F0F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 
            1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 
            7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 
            3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="#555555"/>
          </svg>
        </div>
        <div class="settings-wrapper" style="width: 175px; z-index: 9999;">
          <div class="settings-icon-box"
             style="display: flex; flex-direction: row-reverse; width: 100%; margin-top: -2px; opacity: 0;"
          >
            <svg fill="none" height="20" viewBox="0 0 33 33" width="20" xmlns="http://www.w3.org/2000/svg">
            </svg>
          </div>
          <div class="settings-panel"
             style="
                flex-direction: column; background-color: #FFFFFF; 
                font-weight: 400; font-size: 10px; font-family: 'JetBrains Mono', serif; 
                padding: 10px 10px 10px 10px; display: none; margin: 5px 0 0 0; border: black solid 1px;
                border-radius: 5px;  z-index: 9000; position: relative;
            "
          >
            <div style="display: flex; flex-direction: row-reverse;">
              <button
                  style="font-size: 10px; margin-top: 5px; font-family: 'JetBrains Mono', serif;
                    cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                    border-radius: 2px;"
                  onclick="this.closest('.bpmnpool').querySelector('.pool-lanes-box').innerHTML += 
                    getPoolLanes([{
                      'name': 'Новая роль',
                      'height': '200',
                      'width': getCurrentPoolWidth(this)}])"
                  onmouseenter="this.style.backgroundColor = '#eeeeee'"
                  onmouseout="this.style.backgroundColor = '#ffffff'"
              >Добавить дорожку</button>
            </div>
            <div style="display: flex; flex-direction: row-reverse;">
              <button
                  style="font-size: 10px; margin-top: 5px; font-family: 'JetBrains Mono', serif;
                    cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                    border-radius: 2px;"
                  onclick="[''].forEach(()=>{
                    let allLanes = this.closest('.bpmnpool').querySelectorAll('.bpmnpool-lane');
                    allLanes[allLanes.length - 1].remove();
                  })"
                  onmouseenter="this.style.backgroundColor = '#eeeeee'"
                  onmouseout="this.style.backgroundColor = '#ffffff'"
              >Убрать дорожку</button>
            </div>
            <div style="display: flex; flex-direction: row-reverse;">
              <button
                  style="font-size: 10px; margin-top: 5px; font-family: 'JetBrains Mono', serif;
                    cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                    border-radius: 2px;"
                  onclick="this.closest('.bpmnpool').remove()"
                  onmouseenter="this.style.backgroundColor = '#eeeeee'"
                  onmouseout="this.style.backgroundColor = '#ffffff'"
              >Удалить элемент</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bpmnpool-wrapper drag-handle" 
        onmouseover="this.querySelectorAll('.resize-handle').forEach((e) => {
          e.style.opacity = '1';
        })"
        onmouseleave="this.querySelectorAll('.resize-handle').forEach((e) => {
          e.style.opacity = '0';
        })"
        ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)"
        onmouseup="document.querySelector('html').style.cursor = ''"
        style="
          border: black solid; border-width: 0 1px 1px 0; display: flex; 
          flex-direction: row;"
      >
        <div class="pool-name-box" style="border: black solid; border-width: 0 1px 1px 1px; width: 26px;
          writing-mode: vertical-rl; rotate: 180deg; text-align: center; 
          padding: 0 4px 0 0; background-color: white; z-index: 8000;"
        >
          <span 
            class="pool-name" 
            style="display: block; cursor: pointer;"
            onclick="this.closest('.pool-name-box').querySelector('.remove-onclick-element').style.display = 'flex'">
            ${props['poolName']}
          </span>
          <div class="remove-onclick-element" 
            style="rotate: 180deg; display: none; flex-direction: column-reverse; 
              padding: 47% 0 0 0; justify-content: start;"
          >
            <input 
              type="text"
              value="${props['poolName']}"
              style="height: 16px;"
              onchange="this.closest('.pool-name-box').querySelector('.pool-name').innerHTML = this.value"
              ondblclick="this.select()">
            <span 
              style="display: block; height: 16px; cursor: pointer;" 
              onclick="this.closest('.remove-onclick-element').style.display = 'none'">
              &#10003
            </span>
          </div>
        </div>
        <div class="pool-lanes-box" style="display: flex; flex-direction: column; width: calc(100% - 30px);">
          ${getPoolLanes(props.lanes)}
        </div>
      </div>
    </div>
  `;
}

function bpmnPool(
  idPool = `bpmn-pool-${formCounter}`,
  top= 100,
  left= 100,
  poolName = 'Процесс',
  lanes = [
    {'name': 'Роль 1', 'height': '200', 'width': '800'},
    {'name': 'Роль 2', 'height': '200', 'width': '800'}
  ]) {
  let props = {'id': idPool, 'top': top + 'px', 'left': left + 'px', 'lanes': lanes, 'poolName': poolName};
  formCounter += 1;
  document.querySelector(`#${getState().activePageID}`).innerHTML += bpmnpoolRenderer(props);
}