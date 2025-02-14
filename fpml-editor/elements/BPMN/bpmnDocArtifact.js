function bpmndocRenderer(props) {
  return `
    <div
      class="draggable resizable bpmndoc element-main-wrapper"
      id="${props.id || generateElementID()}"
      onmouseleave="this.querySelectorAll('.bpmndoc-hover-visible').forEach((e)=>{e.style.display='none'})"
      onmouseover="this.querySelectorAll('.bpmndoc-hover-visible').forEach((e)=>{e.style.display='flex'})"
      style="
        position: absolute;
        top: ${props['top']};
        left: ${props['left']};
        font-weight: 400;
        display: flex;
        flex-direction: column;
        align-items: start;
        border-radius: 4px;
      "
    >
      <div class="bpmndoc-hover-visible hide-command-senitive" style="
        position: absolute; display: none; flex-direction: row-reverse; top: -20px; left: -130px; width: 170px; 
        height: 20px; z-index: 9999;"
      >
        <div 
          style="margin: -1px 10px 0 5px; opacity: 0;"
          onmouseenter="dragElement(this.closest('.element-main-wrapper'))"
        >
          <svg fill="none" height="16" width="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          </svg>
        </div>
        <div class="settings-wrapper" style="width: 250px; z-index: 9999; height: 20px;">
          <div class="settings-icon-box"
             style="display: flex; flex-direction: row-reverse; width: 100%; margin-top: -2px; opacity: 0;"
          >
            <svg fill="none" height="18" width="18" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
            </svg>
          </div>
          <div class="settings-panel"
             style="
                flex-direction: column; background-color: #FFFFFF; 
                font-weight: 400; font-size: 10px; font-family: 'JetBrains Mono', serif; 
                padding: 10px 10px 10px 10px; display: none; margin: 0 10px 0 0; border: black solid 1px;
                border-radius: 5px; z-index: 9000;
            "
          >
            <div style="display: flex; flex-direction: row-reverse;">
              <button
                  style="font-size: 10px; margin-top: 5px; font-family: 'JetBrains Mono', serif;
                    cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                    border-radius: 2px;"
                  onclick="this.closest('.bpmndoc').remove()"
                  onmouseenter="this.style.backgroundColor = '#eeeeee'"
                  onmouseleave="this.style.backgroundColor = '#ffffff'"
              >Удалить элемент</button>
            </div>
          </div>
        </div>
      </div>
      <div style="z-index: 8000;"
        onmouseenter="handleOpacityOnmouseenter(this)"
        onmouseleave="handleOpacityOnmouseout(this)"
      >
        <div class="bpmndoc-wrapper drag-handle"
          ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)"
          style="width: 40px; height: 40px; z-index: 7900;"
        >
          <div style="width: 30px; height: 30px; margin: 0 0 0 0;">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.75 11.357V39C34.75 39.4142 34.4142 39.75 34 39.75H8C7.58579 39.75 7.25 39.4142 
              7.25 39V0.999999C7.25 0.585786 7.58579 0.25 8 0.25H25.5261C25.7511 0.25 25.9641 0.35097 
              26.1066 0.525072L34.5805 10.882C34.6901 11.016 34.75 11.1838 34.75 11.357Z" 
              stroke="black" stroke-width="1"/>
              <path d="M25.4999 0.499827L25.5 9.84164C25.5 10.3939 25.9477 10.8416 26.5 10.8416L34.4998 
              10.8415" stroke="black" stroke-width="1"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bpmnDoc(
  idPool,
  top,
  left,
  markupID = generateElementID()) {
  let props = {'idPool': idPool, 'top': top + 'px', 'left': left + 'px', 'id': markupID};
  mockAppGlobals.elemCounter += 1;
  document.querySelector(`#bpmn-pool-${idPool}`).innerHTML += bpmndocRenderer(props);
}