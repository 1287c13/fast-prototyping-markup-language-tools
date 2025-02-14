function getGatewayTypeIcon(type) {
  if (type === 'parallel') {
    return `
      <rect x="0.5" y="0.5" width="29" height="29" fill="white" stroke="white"/>
      <rect class="color-selection" x="1.70711" y="15.1421" width="19" height="19" rx="1.5" transform="rotate(-45 1.70711 15.1421)" fill="white" stroke="black"/>
      <rect x="7.51245" y="16.051" width="1.5" height="15" rx="0.75" transform="rotate(-90 7.51245 16.051)" fill="black"/>
      <rect x="16.0127" y="22.551" width="1.5" height="15" rx="0.75" transform="rotate(180 16.0127 22.551)" fill="black"/>`;
  } else if (type === 'exclusive') {
    return `
      <rect x="0.5" y="0.5" width="29" height="29" fill="white" stroke="white"/>
      <rect class="color-selection" x="1.70711" y="15.1421" width="19" height="19" rx="1.5" transform="rotate(-45 1.70711 15.1421)" fill="white" stroke="black"/>
      <rect x="9" y="10.4142" width="1.5" height="15" rx="0.75" transform="rotate(-45 9 10.4142)" fill="black"/>
      <rect x="10.4143" y="21.0209" width="1.5" height="15" rx="0.75" transform="rotate(-135 10.4143 21.0209)" fill="black"/>`;
  } else {
    return '';
  }
}

function bpmngatewayRenderer(props) {
  props.gatewayTypeSelectStatuses = ['selected', '', ''];
  if (props.gatewayType === 'parallel') {
    props.gatewayTypeSelectStatuses = ['', 'selected', ''];
  } else if (props.gatewayType === 'exclusive') {
    props.gatewayTypeSelectStatuses = ['', '', 'selected'];
  }
  return `
    <div
      class="draggable resizable bpmngateway element-main-wrapper"
      id="${props.id || generateElementID()}"
      onmouseleave="this.querySelectorAll('.bpmngateway-hover-visible').forEach((e)=>{e.style.display='none'})"
      onmouseover="this.querySelectorAll('.bpmngateway-hover-visible').forEach((e)=>{e.style.display='flex'})"
      style="position: absolute; top: ${props['top']};
        left: ${props['left']}; font-weight: 400; display: flex; flex-direction: column; align-items: start;
        border-radius: 4px;">
      <div class="bpmngateway-hover-visible hide-command-senitive" style="
        position: absolute; display: none; flex-direction: row-reverse; top: -20px; left: -202px; width: 250px; 
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
             style="flex-direction: column; background-color: #FFFFFF; font-weight: 400; font-size: 10px; 
              font-family: 'JetBrains Mono', serif; padding: 10px 10px 10px 10px; display: none; 
              margin: 0 10px 0 0; border: black solid 1px; border-radius: 5px; z-index: 9000; ">
            <div style="padding: 4px 0 0 12px; margin-left: 0;">
              <span>Тип шлюза:</span>
              <select 
                class="gateway-type-input" 
                style="font-size: 10px; font-family: 'JetBrains Mono', serif;"
                onchange="this.closest('.bpmngateway').querySelectorAll('.bpmn-gateway-type-box').forEach((e) => {
                  e.innerHTML = getGatewayTypeIcon(this.value);
                  this.innerHTML = getNewOptions(
                    this.children,
                    this.value
                  );
                })">
                <option value="parallel" ${props.gatewayTypeSelectStatuses[1]}>Параллельный</option>
                <option value="exclusive" ${props.gatewayTypeSelectStatuses[2]}>Эксклюзивный</option>
              </select>
            </div>
            <div style="display: flex; flex-direction: row-reverse;">
              <button
                  style="font-size: 10px; margin-top: 5px; font-family: 'JetBrains Mono', serif;
                    cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                    border-radius: 2px;"
                  onclick="this.closest('.bpmngateway').remove()"
                  onmouseenter="this.style.backgroundColor = '#eeeeee'"
                  onmouseleave="this.style.backgroundColor = '#ffffff'"
              >Удалить элемент</button>
            </div>
          </div>
        </div>
      </div>
      <div style="z-index: 8000;"
        onmouseenter="handleOpacityOnmouseenter(this)"
        onmouseleave="handleOpacityOnmouseout(this)">
        <div class="bpmngateway-wrapper drag-handle"
          ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)"
          style="width: 40px; height: 40px; border-radius: 3px; z-index: 8000;">
          <div style="width: 30px; height: 30px; margin: 0 0 0 0;">
            <svg class="bpmn-gateway-type-box" width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"
              style="margin: 0 0 0 0; border-radius: 30px;">
              ${getGatewayTypeIcon(props.gatewayType)}
            </svg>
          </div>
        </div>
        <div>
          ${getArrowHandle('-3px', 'calc(50% - 4px)', 'top')}
          ${getArrowHandle('calc(50% - 4px)', 'calc(100% - 4px)', 'right')}
          ${getArrowHandle('calc(100% - 4px)', 'calc(50% - 4px)', 'down')}
          ${getArrowHandle('calc(50% - 4px)', '-3px', 'left')}
        </div>
      </div>
    </div>
  `;
}

function bpmnGateway(
  idPool,
  top,
  left,
  bpmnGatewayID = '',
  gatewayType = 'exclusive',
  markupID = generateElementID()) {
  let props = {'idPool': idPool, 'top': top + 'px', 'left': left + 'px', 'gatewayType': gatewayType,
    'bpmnGatewayID': bpmnGatewayID, 'id': markupID};
  mockAppGlobals.elemCounter += 1;
  document.querySelector(`#bpmn-pool-${idPool}`).innerHTML += bpmngatewayRenderer(props);
}