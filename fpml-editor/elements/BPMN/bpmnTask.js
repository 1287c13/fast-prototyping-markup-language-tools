function getTaskTypeIcon(type) {
  if (type === 'manualTask') {
    return `
      <path d="M52.8153 20.4932L52.8245 20.4938L52.8337 20.4945L56.6292 20.7475C57.729 20.8208 58.651 21.6058 58.8989 22.6798L59.1099 23.5942C59.2375 24.1472 59.1217 24.7285 58.7917 25.1904L58.3306 25.836C57.3223 27.2477 57.0503 29.0565 57.5989 30.7022C57.6462 30.8444 57.6147 31.001 57.5161 31.1137L56.2148 32.6009C55.1093 33.8643 54.5 35.486 54.5 37.1648C54.5 37.6768 54.2966 38.1679 53.9345 38.5299L53.6967 38.7678C52.2902 40.1743 51.5 42.0819 51.5 44.0711V44.544C51.5 45.0195 51.3644 45.4851 51.1092 45.8862L49.8644 47.8422C49.4055 48.5633 48.61 49 47.7553 49H6.94542C6.17394 49 5.44568 48.6438 4.97204 48.0349L4.02662 46.8193C3.68531 46.3805 3.5 45.8404 3.5 45.2845V22.7363C3.5 21.8839 3.93437 21.0902 4.65237 20.6307L13.6154 14.8943C14.0177 14.6368 14.4854 14.5 14.963 14.5H33.9098C34.8568 14.5 35.7224 15.035 36.1459 15.882L36.7639 17.118C37.4678 18.5259 38.8606 19.4595 40.4303 19.5758L52.8153 20.4932Z" stroke="black" stroke-width="4"/>
      <path d="M18.7733 21.1403C19.02 21.0485 19.3022 21 19.5898 21H57.768L58.9619 23.2199C59.1199 23.5137 58.7647 22.9129 58.2968 22.8041C57.7969 22.6879 57.2346 22.9681 57.7686 22.9681H19.5898C17.9801 22.9681 17.393 21.6537 18.7733 21.1403Z" fill="black"/>
      <path d="M32.6658 27.269C33.0105 27.0961 33.4645 27 33.9359 27H54.7084C55.9323 27 56.823 27.6236 56.5064 28.2587C56.2883 28.6959 55.551 29 54.7084 29H33.9359C32.2465 29 31.4308 27.8883 32.6658 27.269Z" fill="black"/>
      <path d="M32.087 33.7929C32.4604 33.6054 32.9667 33.5 33.4946 33.5H54.0083C55.3035 33.5 56.2537 34.1114 55.9396 34.7425C55.718 35.1877 54.9219 35.5 54.0083 35.5H33.4946C31.7211 35.5 30.833 34.4229 32.087 33.7929Z" fill="black"/>
      <path d="M33.3337 40.2999C33.7098 40.1081 34.2245 40 34.7618 40H51.0471C52.6865 40 53.6296 40.932 52.6584 41.5924C52.2816 41.8486 51.6833 42 51.0471 42H34.7618C32.9895 42 32.093 40.9327 33.3337 40.2999Z" fill="black"/>`;
  } else if (type === 'userTask') {
    return `
      <path d="M15.9285 31.3212L15.982 31.2998L16.0345 31.2759L20.464 29.2625C22.428 28.3698 23.1246 25.9299 21.9278 24.1348L20.5409 22.0545C20.0641 21.3392 19.7138 20.5472 19.5053 19.7132L19.3784 19.2058C19.1538 18.3075 19.0975 17.3754 19.2124 16.4566L19.6513 12.9452C19.8132 11.6501 20.3103 10.4196 21.0934 9.37548L21.7383 8.51562C22.1176 8.00984 22.5594 7.55405 23.0531 7.15911L25.3575 5.31557C26.1997 4.6418 27.1773 4.15761 28.2237 3.89602L29.9248 3.47074C31.0021 3.20141 32.1258 3.17467 33.2147 3.39245L36.1949 3.98848C37.3366 4.21683 38.4095 4.70786 39.3286 5.4227L40.3541 6.22038C41.1514 6.84049 41.8152 7.61525 42.3058 8.49819L42.8737 9.52049C43.3398 10.3595 43.6406 11.2802 43.7596 12.2326L44.2876 16.4566C44.4025 17.3754 44.3462 18.3075 44.1216 19.2058L43.9947 19.7132C43.7862 20.5472 43.4359 21.3392 42.9591 22.0545L41.5482 24.1707C40.3805 25.9224 41.0122 28.3012 42.8952 29.2427L46.0507 30.8204C46.7419 31.166 47.4637 31.4468 48.2068 31.6591L48.5896 31.7685C49.6869 32.082 50.6982 32.6418 51.5465 33.4052L54.7787 36.3142L57.3033 38.8388C58.7098 40.2454 59.5 42.153 59.5 44.1421V60.5H2.5V44.638C2.5 42.4319 3.4713 40.3376 5.15543 38.9126L8.05878 36.4559L12.9419 32.7936C13.4687 32.3985 14.0451 32.0745 14.6565 31.83L15.9285 31.3212Z" stroke="black" stroke-width="5"/>
      <line x1="15.5" y1="50" x2="15.5" y2="62" stroke="black" stroke-width="5"/>
      <line x1="47.5" y1="50" x2="47.5" y2="62" stroke="black" stroke-width="5"/>
      <path d="M30.5077 1.67249C31.3029 0.781215 32.6971 0.781215 33.4923 1.67249L43.7498 13.1685C44.8999 14.4574 43.985 16.5 42.2575 16.5H21.7425C20.015 16.5 19.1001 14.4574 20.2502 13.1685L30.5077 1.67249Z" fill="black"/>
      <path d="M30.5077 1.67249C31.3029 0.781215 32.6971 0.781215 33.4923 1.67249L43.7498 13.1685C44.8999 14.4574 43.985 16.5 42.2575 16.5H21.7425C20.015 16.5 19.1001 14.4574 20.2502 13.1685L30.5077 1.67249Z" fill="black"/>
      <path d="M30.5077 1.67249C31.3029 0.781215 32.6971 0.781215 33.4923 1.67249L43.7498 13.1685C44.8999 14.4574 43.985 16.5 42.2575 16.5H21.7425C20.015 16.5 19.1001 14.4574 20.2502 13.1685L30.5077 1.67249Z" fill="black"/>
      <path d="M21.1539 13.152L30.3399 15.9873L19.681 22.6521L21.1539 13.152Z" fill="black"/>
      <path d="M22 27V29.9672C22 31.9304 22.6682 33.8352 23.8946 35.3682V35.3682C25.2486 37.0607 27.1889 38.1829 29.3311 38.5125L30.9794 38.7661C31.9872 38.9211 33.0128 38.9211 34.0206 38.7661L35.7329 38.5026C37.8198 38.1816 39.6848 37.0217 40.8956 35.292V35.292C41.9324 33.8109 42.4178 32.0136 42.2677 30.2119L42 27" stroke="black" stroke-width="3"/>`;
  } else if (type === 'serviceTask') {
    return `
      <ellipse cx="23.5" cy="28" rx="16.5" ry="17" fill="black"/>
      <rect x="19" y="4" width="9" height="47" fill="black"/>
      <rect y="32" width="9" height="47" transform="rotate(-90 0 32)" fill="black"/>
      <rect x="3.70972" y="13.5757" width="7.94082" height="47.9481" transform="rotate(-45 3.70972 13.5757)" fill="black"/>
      <rect x="9.87939" y="47.3717" width="8.89902" height="47.3372" transform="rotate(-135 9.87939 47.3717)" fill="black"/>
      <ellipse cx="23" cy="28" rx="13.5" ry="14" fill="white"/>
      <rect x="21.5" y="7" width="4" height="41" fill="white"/>
      <rect x="3" y="29.5" width="4" height="41" transform="rotate(-90 3 29.5)" fill="white"/>
      <rect x="7.59009" y="14.4185" width="4" height="41" transform="rotate(-45 7.59009 14.4185)" fill="white"/>
      <rect x="10.4185" y="43.4099" width="4" height="41" transform="rotate(-135 10.4185 43.4099)" fill="white"/>
      <circle cx="23.5" cy="27.5" r="7.5" fill="white" stroke="black" stroke-width="4"/>
      <ellipse cx="33.5" cy="38" rx="16.5" ry="17" fill="black"/>
      <rect x="29" y="14" width="9" height="47" fill="black"/>
      <rect x="10" y="42" width="9" height="47" transform="rotate(-90 10 42)" fill="black"/>
      <rect x="13.7097" y="23.5757" width="7.94082" height="47.9481" transform="rotate(-45 13.7097 23.5757)" fill="black"/>
      <rect x="19.8794" y="57.3717" width="8.89902" height="47.3372" transform="rotate(-135 19.8794 57.3717)" fill="black"/>
      <ellipse cx="33" cy="38" rx="13.5" ry="14" fill="white"/>
      <rect x="31.5" y="17" width="4" height="41" fill="white"/>
      <rect x="13" y="39.5" width="4" height="41" transform="rotate(-90 13 39.5)" fill="white"/>
      <rect x="17.5901" y="24.4185" width="4" height="41" transform="rotate(-45 17.5901 24.4185)" fill="white"/>
      <rect x="20.4185" y="53.4099" width="4" height="41" transform="rotate(-135 20.4185 53.4099)" fill="white"/>
      <circle cx="33.5" cy="37.5" r="7.5" fill="white" stroke="black" stroke-width="4"/>`;
  } else if (type === 'sendTask') {
    return `
      <rect y="13" width="62" height="38" rx="3" fill="black"/>
      <path d="M31 41L1 18.5V14L61 14V18.5L31 41Z" fill="white"/>
      <path d="M31 29.5L1 14L2.84455 13L58.922 13C59.7307 13 60.4954 13.368 61 14V14L31 29.5Z" fill="black"/>
      <rect x="1" y="14" width="60" height="36" rx="2" stroke="black" stroke-width="2"/>`;
  } else if (type === 'receiveTask') {
    return `
      <rect y="13" width="62" height="38" rx="3" fill="white"/>
      <path d="M31 41L1 18.5V14L61 14V18.5L31 41Z" fill="black"/>
      <path d="M31 29.5L1 14L2.84455 13L58.922 13C59.7307 13 60.4954 13.368 61 14V14L31 29.5Z" fill="white"/>
      <mask id="path-4-inside-1" fill="white">
      <rect y="13" width="62" height="38" rx="3"/>
      </mask>
      <rect y="13" width="62" height="38" rx="3" stroke="black" stroke-width="10" mask="url(#path-4-inside-1)"/>`;
  } else {
    return '';
  }
}

function getTaskActionIcon(actionType) {
  if (actionType === 'compensationTask') {
    return `
      <path d="M5.11122 16.6112L14.8612 10.9821L14.8612 22.2404L5.11122 16.6112Z" stroke="black" stroke-width="2"/>
      <path d="M16.1112 16.6112L25.8612 10.9821L25.8612 22.2404L16.1112 16.6112Z" stroke="black" stroke-width="2"/>`;
  } else if (actionType === 'loopTask') {
    return `
      <circle cx="16.5" cy="16.5" r="11.5" stroke="black" stroke-width="2"/>
      <rect x="6.24805" y="26.2236" width="7" height="6.52662" transform="rotate(-60 6.24805 26.2236)" fill="white"/>
      <path d="M10.811 26.811L2.21671 25.4715L9.4715 18.2167L10.811 26.811Z" fill="black"/>`;
  } else if (actionType === 'parallelTask') {
    return `
      <rect x="6.00024" y="29.0681" width="25" height="5" transform="rotate(-90 6.00024 29.0681)" fill="black"/>
      <rect x="14" y="29" width="25" height="5" transform="rotate(-90 14 29)" fill="black"/>
      <rect x="21.9995" y="28.9319" width="25" height="5" transform="rotate(-90 21.9995 28.9319)" fill="black"/>`;
  } else if (actionType === 'sequentionalTask') {
    return `
      <rect x="4" y="6" width="25" height="5" fill="black"/>
      <rect x="4" y="14" width="25" height="5" fill="black"/>
      <rect x="4" y="22" width="25" height="5" fill="black"/>`;
  } else if (actionType === 'subprocessTask') {
    return `
      <rect x="7.5" y="7.5" width="18" height="18" stroke="black" stroke-width="3"/>
      <rect x="15" y="11" width="3" height="11" fill="black"/>
      <rect x="11" y="18" width="3" height="11" transform="rotate(-90 11 18)" fill="black"/>`;
  } else {
    return '';
  }
}

function getTaskText(bpmnTaskText) {
  return `
    <textarea
      class="element-textarea textelem-name-resize-textarea"
      ondblclick="this.select()"
      onchange="this.innerHTML = this.value"
      spellcheck="false"
      style="
        background-color: transparent; font-weight: 500; font-size: 11px; overflow: hidden; border-width: 0; 
        outline: none; resize: none; margin: 0 4px 0 4px; padding: 0 0 0 0; width: calc(100% - 4px); 
        height: calc(100%); text-align: center;
      "
    >${bpmnTaskText}</textarea>
  `;
}

function bpmntaskRenderer(props) {

  props.firstActivityWidth = props.secondActivityWidth = 18;
  props.activityIconsStub = 4;
  if (!props.firstTaskActivity || !props.secondTaskActivity) {
    props.activityIconsStub = 0;
  }
  if (!props.firstTaskActivity) {
    props.firstActivityWidth = 0;
  }
  if (!props.secondTaskActivity) {
    props.secondActivityWidth = 0;
  }

  props.firstActivitySelectStatuses = props.secondActivitySelectStatuses = ['selected', '', '', '', '', ''];

  if (props.firstTaskActivity === 'subprocessTask') {
    props.firstActivitySelectStatuses = ['', 'selected', '', '', '', ''];
  } else if (props.firstTaskActivity === 'sequentionalTask') {
    props.firstActivitySelectStatuses = ['', '', 'selected', '', '', ''];
  } else if (props.firstTaskActivity === 'parallelTask') {
    props.firstActivitySelectStatuses = ['', '', '', 'selected', '', ''];
  } else if (props.firstTaskActivity === 'loopTask') {
    props.firstActivitySelectStatuses = ['', '', '', '', 'selected', ''];
  } else if (props.firstTaskActivity === 'compensationTask') {
    props.firstActivitySelectStatuses = ['', '', '', '', '', 'selected'];
  }
  if (props.secondTaskActivity === 'subprocessTask') {
    props.secondActivitySelectStatuses = ['', 'selected', '', '', '', ''];
  } else if (props.secondTaskActivity === 'sequentionalTask') {
    props.secondActivitySelectStatuses = ['', '', 'selected', '', '', ''];
  } else if (props.secondTaskActivity === 'parallelTask') {
    props.secondActivitySelectStatuses = ['', '', '', 'selected', '', ''];
  } else if (props.secondTaskActivity === 'loopTask') {
    props.secondActivitySelectStatuses = ['', '', '', '', 'selected', ''];
  } else if (props.secondTaskActivity === 'compensationTask') {
    props.secondActivitySelectStatuses = ['', '', '', '', '', 'selected'];
  }

  props.taskTypeSelectStatuses = ['selected', '', '', '', '', ''];

  if (props.taskType === 'userTask') {
    props.taskTypeSelectStatuses = ['', 'selected', '', '', '', ''];
  } else if (props.taskType === 'serviceTask') {
    props.taskTypeSelectStatuses = ['', '', 'selected', '', '', ''];
  } else if (props.taskType === 'manualTask') {
    props.taskTypeSelectStatuses = ['', '', '', 'selected', '', ''];
  } else if (props.taskType === 'receiveTask') {
    props.taskTypeSelectStatuses = ['', '', '', '', 'selected', ''];
  } else if (props.taskType === 'sendTask') {
    props.taskTypeSelectStatuses = ['', '', '', '', '', 'selected'];
  }

  return `
    <div
      class="draggable resizable bpmntask element-main-wrapper"
      id="${props.id || generateElementID()}"
      onmouseleave="this.querySelectorAll('.bpmntask-hover-visible').forEach((e)=>{e.style.display='none'})"
      onmouseover="this.querySelectorAll('.bpmntask-hover-visible').forEach((e)=>{e.style.display='flex'})"
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
      <div class="bpmntask-hover-visible hide-command-senitive" style="
        position: absolute; display: none; flex-direction: row-reverse; top: 4px; left: -222px; width: 295px; 
        height: 20px; z-index: 9999;"
      >
        <div
          style="margin: -1px 10px 0 5px; opacity: 0;"
          onmouseenter="dragElement(this.closest('.element-main-wrapper'))"
        >
          <svg fill="none" height="16" width="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          </svg>
        </div>
        <div class="settings-wrapper" style="width: 295px; z-index: 9999; height: 20px;">
          <div class="settings-icon-box"
             style="display: flex; flex-direction: row-reverse; width: 100%; margin-top: -2px;  opacity: 0;"
          >
            <svg fill="none" height="18" width="18" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
            </svg>
          </div>
          <div class="settings-panel"
             style="
                flex-direction: column; background-color: #FFFFFF; 
                font-weight: 400; font-size: 10px; font-family: 'JetBrains Mono', serif; 
                padding: 10px 10px 10px 10px; display: none; margin: -19px 39px 0 0; border: black solid 1px;
                border-radius: 5px;  z-index: 9000; position: relative;
            "
          >
            <div style="padding: 4px 0 0 0; margin-left: 0;">
              <span>Тип задачи:</span>
              <select 
                class="task-type-input" 
                style="font-size: 10px; font-family: 'JetBrains Mono', serif;"
                onchange="this.closest('.bpmntask').querySelectorAll('.bpmn-task-type-box').forEach((e) => {
                  e.innerHTML = getTaskTypeIcon(this.value);
                  this.innerHTML = getNewOptions(
                    this.children,
                    this.value
                  );
                })">
                <option value="" ${props.taskTypeSelectStatuses[0]}>(пусто)</option>
                <option value="userTask" ${props.taskTypeSelectStatuses[1]}>Пользователь</option>
                <option value="serviceTask" ${props.taskTypeSelectStatuses[2]}>Сервисная</option>
                <option value="manualTask" ${props.taskTypeSelectStatuses[3]}>Ручная</option>
                <option value="receiveTask" ${props.taskTypeSelectStatuses[4]}>Получение</option>
                <option value="sendTask" ${props.taskTypeSelectStatuses[5]}>Отправка</option>
              </select>
            </div>
            <div style="padding: 4px 0 0 13px; margin-left: 0;">
              <span>Маркер 1:</span>
              <select 
                class="first-task-activity-input" 
                style="font-size: 10px; font-family: 'JetBrains Mono', serif;"
                onchange="this.closest('.bpmntask').querySelectorAll('.first-task-activity-box').forEach((e) => {
                  if (this.value) {
                    e.style.width = '18px';
                  }
                  e.innerHTML = getTaskActionIcon(this.value);
                  this.innerHTML = getNewOptions(
                    this.children,
                    this.value
                  );
                })">
                <option value="" ${props.firstActivitySelectStatuses[0]}>(пусто)</option>
                <option value="subprocessTask" ${props.firstActivitySelectStatuses[1]}>Подпроцесс</option>
                <option value="sequentionalTask" ${props.firstActivitySelectStatuses[2]}>Последовательно</option>
                <option value="parallelTask" ${props.firstActivitySelectStatuses[3]}>Параллельно</option>
                <option value="loopTask" ${props.firstActivitySelectStatuses[4]}>Цикл</option>
                <option value="compensationTask" ${props.firstActivitySelectStatuses[5]}">Откат</option>
              </select>
            </div>
            <div style="padding: 4px 0 0 13px; margin-left: 0;">
              <span>Маркер 2:</span>
              <select class="second-task-activity-input" style="font-size: 10px; font-family: 'JetBrains Mono', serif;"
                onchange="this.closest('.bpmntask').querySelectorAll('.second-task-activity-box').forEach((e) => {
                  if (this.value) {
                    e.style.width = '18px';
                  }
                  e.innerHTML = getTaskActionIcon(this.value);
                  this.innerHTML = getNewOptions(
                    this.children,
                    this.value
                  );
                })">
                <option value="" ${props.secondActivitySelectStatuses[0]}>(пусто)</option>
                <option value="subprocessTask" ${props.secondActivitySelectStatuses[1]}>Подпроцесс</option>
                <option value="sequentionalTask" ${props.secondActivitySelectStatuses[2]}>Последовательно</option>
                <option value="parallelTask" ${props.secondActivitySelectStatuses[3]}>Параллельно</option>
                <option value="loopTask" ${props.secondActivitySelectStatuses[4]}>Цикл</option>
                <option value="compensationTask" ${props.secondActivitySelectStatuses[5]}>Откат</option>
              </select>
            </div>
            <div style="display: flex; flex-direction: row-reverse;">
              <button
                  style="font-size: 10px; margin-top: 5px; font-family: 'JetBrains Mono', serif;
                    cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                    border-radius: 2px;"
                  onclick="this.closest('.bpmntask').remove()"
                  onmouseenter="this.style.backgroundColor = '#eeeeee'"
                  onmouseleave="this.style.backgroundColor = '#ffffff'"
              >Удалить элемент</button>
            </div>
          </div>
        </div>
      </div>
      <div style="z-index: 7000;"          
        onmouseenter="handleOpacityOnmouseenter(this)"
        onmouseleave="handleOpacityOnmouseout(this)"
      >
        <div class="bpmntask-wrapper drag-handle is-selected color-selection"
          ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)"
          style="width: ${props.taskWidth}; height: ${props.taskHeight}; border: black solid 1px; border-radius: 5px; 
            background-color: white; z-index: 7000; position: relative;">
          <div style="height: 20px;">
            <svg class="bpmn-task-type-box" width="18" height="18" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg"
              style="margin: 1px 2px 0 2px;">
              ${getTaskTypeIcon(props.taskType)}
            </svg>
          </div>
          <div class="bpmn-task-textarea-box" style="height: calc(100% - 40px);">
            ${getTaskText(props.taskText)}
          </div>
          <div class="bpmn-task-actions-box" style="position: absolute; width: 100%; bottom: 0; display: flex; 
            flex-direction: row; justify-content: center;">
            <svg class="first-task-activity-box" width="${props.firstActivityWidth}" height="18" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              ${getTaskActionIcon(props.firstTaskActivity)}
            </svg>
            <div class="activity-icons-stub" style="${props.activityIconsStub}"></div>
            <svg class="second-task-activity-box" width="${props.secondActivityWidth}" height="18" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              ${getTaskActionIcon(props.secondTaskActivity)}
            </svg>
          </div>
          ${getResizer('both', 'calc(100% - 20px)', 'calc(100% - 20px)', 
            'bpmntask-wrapper', 'absolute')}
        </div>
        <div>
          ${getArrowHandle('-3px', 'calc(50% - 4px)', 'top')}
          ${getArrowHandle('calc(50% - 4px)', 'calc(100% - 4px)', 'right')}
          ${getArrowHandle('calc(100% - 4px)', 'calc(50% - 4px)', 'down')}
          ${getArrowHandle('calc(50% - 4px)', '-3px', 'left')}
        </div>
      </div>
    </div>
  `
}

function bpmnTask(
  idPool,
  top,
  left,
  bpmnTaskID = '',
  taskWidth = 130,
  taskHeight = 70,
  taskText = 'Описание задачи',
  taskType = 'userTask',
  firstTaskActivity = '',
  secondTaskActivity = '',
  markupID = generateElementID()) {
  let props = {'idPool': idPool, 'top': top + 'px', 'left': left + 'px', 'taskWidth': taskWidth + 'px',
    'taskHeight': taskHeight + 'px', 'taskText': taskText, 'taskType': taskType, 'firstTaskActivity': firstTaskActivity,
    'secondTaskActivity': secondTaskActivity, 'bpmnTaskID': bpmnTaskID, 'id': markupID};
  mockAppGlobals.elemCounter += 1;
  document.querySelector(`#bpmn-pool-${idPool}`).innerHTML += bpmntaskRenderer(props);
}