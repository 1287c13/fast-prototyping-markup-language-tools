function getEventTypeIcon(type, throwing) {
  let iconColor = 'white';
  if (throwing) {
    iconColor = 'black';
  }
  if (type === 'signalEvent') {
    return `
      <rect width="30" height="30" fill="white"/>
      <path d="M15.433 6.75L22.3612 18.75C22.5537 19.0833 22.3131 19.5 21.9282 19.5H8.0718C7.6869 19.5 7.44633 
      19.0833 7.63878 18.75L14.567 6.75C14.7594 6.41667 15.2406 6.41667 15.433 6.75Z" fill="${iconColor}" stroke="black"/>`;
  } else if (type === 'timerEvent') {
    return `
        <circle cx="15.5" cy="14.5" r="9.25" stroke="black" stroke-width="0.5"/>
        <path d="M19.1201 15.8143L15.4192 15.4155C14.7244 15.3406 14.3187 14.5944 14.6336 13.9706L17.1427 9.00006" stroke="black"/>
        <rect x="15" y="6" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="15" y="22" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="23" y="14" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="22" y="10" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="11" y="21" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="8.5" y="18.5" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="19" y="21" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="22" y="18" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="8" y="10" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="11" y="7" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="19" y="7" width="1" height="1" rx="0.5" fill="black"/>
        <rect x="7" y="14" width="1" height="1" rx="0.5" fill="black"/>`;
  } else if (type === 'escalationEvent') {
    return `
      <rect width="30" height="30" fill="white"/>
      <path d="M13.7769 17.2975L9.68806 22.7493C9.34248 23.21 8.62012 22.8175 8.81873 22.2768L14.5038 
      6.80093C14.6658 6.35991 15.2915 6.36558 15.4455 6.80945L20.7213 22.0164C20.911 22.563 20.1754 22.9414 
      19.8409 22.4692L16.2009 17.3304C15.6131 16.5005 14.3871 16.4838 13.7769 17.2975Z" 
      fill="${iconColor}" stroke="black"/>`;
  } else if (type === 'compensationEvent') {
    return `
      <rect width="30" height="30" fill="white"/>
      <path d="M13.4952 10.4821L13.4952 20.0083C13.4952 20.3932 13.0785 20.6338 12.7452 20.4413L4.49519 
      15.6782C4.16186 15.4858 4.16186 15.0046 4.49519 14.8122L12.7452 10.049C13.0785 9.85659 13.4952 10.0971 
      13.4952 10.4821Z" fill="${iconColor}" stroke="black"/>
      <path d="M23.4952 10.4821L23.4952 20.0083C23.4952 20.3932 23.0785 20.6338 22.7452 20.4413L14.4952 
      15.6782C14.1619 15.4858 14.1619 15.0046 14.4952 14.8122L22.7452 10.049C23.0785 9.85659 23.4952 10.0971 
      23.4952 10.4821Z" fill="${iconColor}" stroke="black"/>`;
  } else if (type === 'conditionEvent') {
    return `
      <rect width="30" height="30" fill="white"/>
      <rect x="7.5" y="6.5" width="15" height="17" rx="1.5" stroke="black"/>
      <line x1="9" y1="10.5" x2="20" y2="10.5" stroke="black"/>
      <line x1="9" y1="13.5" x2="20" y2="13.5" stroke="black"/>
      <line x1="9" y1="16.5" x2="20" y2="16.5" stroke="black"/>
      <line x1="9" y1="19.5" x2="20" y2="19.5" stroke="black"/>`;
  } else {
    return '';
  }
}

function setEventBorderStyles(eventLocation, isBreaking, triggeredInput) {
  if (eventLocation === 'startEvent') {
    triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.border = 'black solid 1px';
    triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.outline = 'none';
  } else if (eventLocation === 'endEvent') {
    triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.border = 'black solid 1px';
    triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.outline = 'black solid 2px';
    triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.outlineOffset = '0';
  } else if (eventLocation === 'mediumEvent') {
    if (isBreaking) {
      triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.border = 'black solid 1px';
      triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.outline = 'black solid 1px';
      triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.outlineOffset = '3px';
    } else {
      triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.border = 'black dashed 1px';
      triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.outline = 'black dashed 1px';
      triggeredInput.closest('.bpmnevent').querySelector('.bpmnevent-wrapper').style.outlineOffset = '3px';
    }
  }
}

function getEventBorderStyles(eventLocation, isBreaking) {
  if (eventLocation === 'startEvent') {
    return 'border: black solid 1px; outline: none;';
  } else if (eventLocation === 'endEvent') {
    return 'border: black solid 1px; outline: black solid 2px; outline-offset: 0;';
  } else if (eventLocation === 'mediumEvent') {
    if (isBreaking === 'checked') {
      return 'border: black solid 1px; outline: black solid 1px; outline-offset: 3px;';
    } else {
      return 'border: black dashed 1px; outline: black dashed 1px; outline-offset: 3px;';
    }
  }
}

function bpmneventRenderer(props) {

  props.eventLocationSelectStatuses = ['selected', '', '', '', '', ''];
  if (props.eventLocation === 'startEvent') {
    props.eventLocationSelectStatuses = ['', 'selected', ''];
  } else if (props.eventLocation === 'mediumEvent') {
    props.eventLocationSelectStatuses = ['selected', '', ''];
  } else if (props.eventLocation === 'endEvent') {
    props.eventLocationSelectStatuses = ['', '', 'selected'];
  }

  props.eventTypeSelectStatuses = ['selected', '', '', '', '', ''];
  if (props.eventType === 'timerEvent') {
    props.eventTypeSelectStatuses = ['', 'selected', '', '', '', ''];
  } else if (props.eventType === 'escalationEvent') {
    props.eventTypeSelectStatuses = ['', '', 'selected', '', '', ''];
  } else if (props.eventType === 'signalEvent') {
    props.eventTypeSelectStatuses = ['', '', '', 'selected', '', ''];
  } else if (props.eventType === 'conditionEvent') {
    props.eventTypeSelectStatuses = ['', '', '', '', 'selected', ''];
  } else if (props.eventType === 'compensationEvent') {
    props.eventTypeSelectStatuses = ['', '', '', '', '', 'selected'];
  }

  return `
    <div
      class="draggable resizable bpmnevent element-main-wrapper"
      id="${props.id || generateElementID()}"
      onmouseleave="this.querySelectorAll('.bpmnevent-hover-visible').forEach((e)=>{e.style.display='none'})"
      onmouseover="this.querySelectorAll('.bpmnevent-hover-visible').forEach((e)=>{e.style.display='flex'})"
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
      <div class="bpmnevent-hover-visible hide-command-senitive" style="
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
             style="
                flex-direction: column; background-color: #FFFFFF; 
                font-weight: 400; font-size: 10px; font-family: 'JetBrains Mono', serif; 
                padding: 10px 10px 10px 10px; display: none; margin: 0 10px 0 0; border: black solid 1px;
                border-radius: 5px; z-index: 9000;
            "
          >
            <div style="padding: 4px 0 0 12px; margin-left: 0;">
              <span>Тип события:</span>
              <select 
                class="event-type-input" 
                style="font-size: 10px; font-family: 'JetBrains Mono', serif;"
                onchange="this.closest('.bpmnevent').querySelectorAll('.bpmn-event-type-box').forEach((e) => {
                  e.innerHTML = getEventTypeIcon(this.value)
                  this.innerHTML = getNewOptions(
                    this.children,
                    this.value
                  )
                })">
                <option value="" ${props.eventTypeSelectStatuses[0]}>(пусто)</option>
                <option value="timerEvent" ${props.eventTypeSelectStatuses[1]}>Время</option>
                <option value="escalationEvent" ${props.eventTypeSelectStatuses[2]}>Эскалация</option>
                <option value="signalEvent" ${props.eventTypeSelectStatuses[3]}>Сигнал</option>
                <option value="conditionEvent" ${props.eventTypeSelectStatuses[4]}>Условие</option>
                <option value="compensationEvent" ${props.eventTypeSelectStatuses[5]}>Компенсация</option>
              </select>
            </div>
            <div style="padding: 4px 0 0 0; margin-left: 0;">
              <span>Расположение:</span>
              <select
                class="event-location-input" 
                style="font-size: 10px; font-family: 'JetBrains Mono', serif;"
                onchange="this.closest('.bpmnevent').querySelectorAll('.event-location-input').forEach((e) => {
                  setEventBorderStyles(
                    e.value,
                    document.querySelector('.event-is-breaking-input').checked,
                    e
                  );
                  this.innerHTML = getNewOptions(
                    this.children,
                    this.value
                  );
                })">
                <option value="mediumEvent" ${props.eventLocationSelectStatuses[0]}>Промежуточное</option>
                <option value="startEvent" ${props.eventLocationSelectStatuses[1]}>Начальное</option>
                <option value="endEvent" ${props.eventLocationSelectStatuses[2]}>Завершающее</option>
              </select>
            </div>
            <div style="padding: 0 0 0 0; margin: 2px 0 0 2px;">
              <label style="cursor: pointer; display: flex; flex-direction: row;">
                <div style="padding: 3px 0 0 4px;">Прерывающее:</div>
                <input type="checkbox" class="event-is-breaking-input" ${props.isBreaking}
                  style="margin: 3px 0 3px 6px;"
                  onchange="this.closest('.bpmnevent').querySelectorAll('.event-is-breaking-input').forEach((e) => {
                  setEventBorderStyles(
                    this.closest('.bpmnevent').querySelector('.event-location-input').value,
                    e.checked,
                    e);
                })">
              </label>
            </div>
            <div style="padding: 0 0 0 0; margin: 0 0 0 -4px;">
              <label style="cursor: pointer; display: flex; flex-direction: row;">
                <div style="padding: 3px 0 0 4px;">Генерирующее:</div>
                <input type="checkbox" class="event-is-throwing-input" ${props.isThrowing}
                  style="margin: 3px 0 3px 6px;"
                  onchange="this.closest('.bpmnevent').querySelectorAll('.event-is-throwing-input').forEach(() => {
                    this.closest('.bpmnevent').querySelector('.bpmn-event-type-box').innerHTML = getEventTypeIcon(
                      this.closest('.bpmnevent').querySelector('.event-type-input').value,
                      this.closest('.bpmnevent').querySelector('.event-is-throwing-input').checked
                    );
                  })">
              </label>
            </div>
            <div style="display: flex; flex-direction: row-reverse;">
              <button
                  style="font-size: 10px; margin-top: 5px; font-family: 'JetBrains Mono', serif;
                    cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                    border-radius: 2px;"
                  onclick="this.closest('.bpmnevent').remove()"
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
        <div class="bpmnevent-wrapper drag-handle"
          ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)"
          style="width: 40px; height: 40px; border-radius: 9999px; background-color: white; z-index: 7900; 
              ${getEventBorderStyles(props.eventLocation, props.isBreaking)}">
          <div style="width: 30px; height: 30px; margin: 0 0 0 0;">
            <svg class="bpmn-event-type-box color-selection" width="40" height="40" viewBox="0 0 30 30" fill="none" 
              xmlns="http://www.w3.org/2000/svg" style="margin: 0 0 0 0; border-radius: 30px;">
              ${getEventTypeIcon(props.eventType, props.isThrowing)}
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

function bpmnEvent(
  idPool,
  top,
  left,
  bpmnEventID = '',
  eventType = '',
  eventLocation = 'startEvent',
  isThrowing = 'checked',
  isBreaking = 'checked',
  markupID = generateElementID()) {
  let props = {'idPool': idPool, 'top': top + 'px', 'left': left + 'px', 'eventType': eventType,
    'eventLocation': eventLocation, 'isThrowing': isThrowing, 'isBreaking': isBreaking,
    'bpmnEventID': bpmnEventID, 'id': markupID};
  mockAppGlobals.elemCounter += 1;
  document.querySelector(`#bpmn-pool-${idPool}`).innerHTML += bpmneventRenderer(props);
}