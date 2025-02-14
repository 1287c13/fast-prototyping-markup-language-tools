function select1cRenderer(props) {

    props['radioButtonName'] = Math.floor(Math.random() * 1000000000);

    props['handleBoxDisplay'] = 'none';
    if (props['noButtons'] === '') {
        props['handleBoxDisplay'] = 'flex';
    }

    props['dropdownBoxDisplay'] = 'block';
    if (props['displaySelectButton'] === '') {
        props['dropdownBoxDisplay'] = 'none';
    }

    props['calendarPickerDisplay'] = 'margin-bottom: 5px; margin-left: 4px;';
    if (props['pickDateActionButton'] === '') {
        props['calendarPickerDisplay'] = 'display: none; margin-bottom: 5px; margin-left: 4px;';
    }

    props['objectPickerDisplay'] = '';
    if (props['pickObjectActionButton'] === '') {
        props['objectPickerDisplay'] = 'display: none;';
    }

    props['entityPickerDisplay'] = 'margin-bottom: 5px;';
    if (props['openObjectActionButton'] === '') {
        props['entityPickerDisplay'] = 'display: none; margin-bottom: 5px;';
    }

    props['actionButtonDisplay'] = 'block';
    if (props['displayActionButton'] === '') {
        props['actionButtonDisplay'] = 'none';
    }

    props['handlersWidth'] = '26px';

    if (props['displayActionButton'] && props['displaySelectButton']) {
        props['handlersWidth'] = '50px';
    }

    function renderOption(optionName) {
        return `
            <div class="alt-option"
                 onmouseenter="this.style.backgroundColor='#F3DB13'"
                 onmouseleave="this.style.backgroundColor='#FFFFFF'"
                 style="background-color: #FFFFFF; flex-direction: row; width: 100%;
                    transition: background-color 0.2s cubic-bezier(.14,1.13,.7,.95); height: 28px;
                "
            >
                <textarea
                    class="element-textarea select1c-alt-option-textarea"
                    ondblclick="this.select()"
                    onchange="this.innerHTML = this.value"
                    style="
                        background-color: transparent; color: #4A4A4A; font-family: 'Arial', serif; font-weight: 400;
                        font-size: 12px; text-align: start; overflow: hidden; border-width: 0; margin-top: 5px;
                        margin-left: 7px; height: 1rem; width: 100%; resize: horizontal; outline: none;
                    "
                >${optionName}</textarea>
            </div>
        `;
    }

    function renderOptions(optionsList) {
        let optionsHTML = '';
        optionsList.forEach((optionName)=>{
            optionsHTML += renderOption(optionName);
        });
        return optionsHTML;
    }

    return `
        <div
            class="draggable select1c element-main-wrapper drag-handle" id="${props.id || generateElementID()}"
            onmouseout="this.querySelectorAll('.select1c-hover-visible').forEach((e)=>{e.style.display='none'})"
            onmouseover="this.querySelectorAll('.select1c-hover-visible').forEach((e)=>{e.style.display='flex'})"
            onmouseenter="handleOpacityOnmouseenter(this)"
            onmouseleave="handleOpacityOnmouseout(this)"
            style="position: absolute; top: ${props['top']}; left: ${props['left']}; font-weight: 700; display: flex;
                flex-direction: column; align-items: start;border-radius: 4px;"
        >
            <div class="select1c-hover-visible hide-command-senitive" style="
                position: absolute; display: none; flex-direction: row-reverse; top: -22px; left: -273px; width: 300px; 
                height: 35px; z-index: 9999;"
            >
                <div 
                    style="margin-left: 5px; margin-right: 10px; opacity: 0;"
                    onmouseenter="dragElement(this.closest('.element-main-wrapper'))"
                >
                    <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                </div>
                <div class="settings-wrapper" style="width: 300px; z-index: 9999;">
                    <div class="settings-icon-box"
                         style="display: flex; flex-direction: row-reverse; width: 100%; margin-top: -2px; opacity: 0;"
                    >
                        <svg fill="none" height="20" viewBox="0 0 33 33" width="20" xmlns="http://www.w3.org/2000/svg">
                        </svg>
                    </div>
                    <div class="settings-panel"
                         style="flex-direction: column; background-color: #FFFFFF; font-weight: 400; font-size: 10px; 
                            font-family: 'JetBrains Mono', serif; padding: 10px 8px 10px 4px; display: none; 
                            margin: 4px -5px 0 0; border: solid 1px #999; border-radius: 5px; z-index: 9000;">
                        <div style="padding: 4px 0 0 0; margin-left: 18px;">
                            <span>Имя реквизита:</span>
                            <input
                                    style="font-size: 10px;"
                                    class="select-num-of-cols"
                                    value="${props['name']}"
                                    onchange="this.closest('.select1c').querySelectorAll('.select-name-label').forEach((e)=>{
                                        e.innerHTML = this.value;
                                        e.style.width = Math.min(this.value.length * 8, 200) + 'px';
                                    })"
                                    ondblclick="this.select()"
                            >   
                        </div>
                        <div style="padding: 4px 0 0 0; margin-left: 12px;">
                            <span>Отступ подписи:</span>
                            <input
                                style="font-size: 10px;"
                                class="input-label-margin" type="number" min="0" max="205" step="1"
                                value="${props['leftMargin']}"
                                onchange="this.closest('.select1c').querySelectorAll('.select-name-label').forEach((e)=>{
                                    e.style.left = -Number(e.style.width.split('px')[0]) - this.value + 'px';
                                })"
                            >
                        </div>
                        <div style="padding: 4px 0 0 0; margin-left: 0;">
                            <span>Количество опций:</span>
                            <input style="font-size: 10px;" 
                                    class="select-num-of-cols" type="number" min="2" max="99" step="1"
                                    value="${props['options']['options'].length + 1}"
                                    onchange="this.closest('.select1c').querySelectorAll('.alt-options-box').forEach((e)=>{
                                        addOptionToSelect(e, this.value);
                                    })"
                            >
                        </div>
                        <div style="padding: 2px 0 0 0; margin-left: 34px;">
                            <label style="cursor: pointer; display: flex; flex-direction: row;">
                                <div style="padding: 3px 0 0 4px;">Без кнопок:</div>
                                <input 
                                    class="select1c-no-buttons" 
                                    ${props['noButtons']} 
                                    type="checkbox" 
                                    onchange="if (this.checked) {
                                            this.closest('.select1c').querySelector('.select-dropdown-box').style.display = 'none';
                                        } else {
                                            this.closest('.select1c').querySelector('.select-dropdown-box').style.display = 'flex';
                                }">
                        </div>
                        <div style="padding: 2px 0 0 0; margin-left: 104px;">
                            <label style="cursor: pointer; display: flex; flex-direction: row;">
                                <input 
                                    class="select1c-display-select-button"
                                    style="font-size: 10px;"
                                    type="checkbox" 
                                    ${props['displaySelectButton']} 
                                    onchange="if (this.checked) {
                                            this.closest('.select1c').querySelector('.dropdown-icon-box').style.display = 'block';
                                            this.closest('.select1c').querySelector('.select-dropdown-box').style.width = '50px';
                                        } else {
                                            this.closest('.select1c').querySelector('.dropdown-icon-box').style.display = 'none';
                                            this.closest('.select1c').querySelector('.select-dropdown-box').style.width = '26px';
                                }">
                                <div style="padding: 3px 0 0 4px;">выбор из списка</div>
                            </label>
                        </div>
                        <div style="padding: 2px 0 0 0; margin-left: 104px;">
                            <label style="cursor: pointer; display: flex; flex-direction: row;">
                                
                                <input 
                                    class="select1c-display-action-button" 
                                    style="font-size: 10px;"
                                    type="checkbox" 
                                    ${props['displayActionButton']} 
                                    onchange="if (this.checked) {
                                            this.closest('.select1c').querySelector('.picker-icon-box').style.display = 'block';
                                            this.closest('.select1c').querySelector('.select-dropdown-box').style.width = '50px';
                                        } else {
                                            this.closest('.select1c').querySelector('.picker-icon-box').style.display = 'none';
                                            this.closest('.select1c').querySelector('.select-dropdown-box').style.width = '26px';
                                        
                                }">
                                <div style="padding: 3px 0 0 4px;">кнопка действия:</div>
                            </label>
                        </div>
                        <div style="padding: 2px 0 0 0; display: flex; flex-direction: row; margin-left: 107px;">
                            <div style="display: flex; flex-direction: row-reverse; font-weight: 400; font-size: 10px;">
                                <div style="font-size: 10px; margin-top: 3px;">открыть</div>
                                <input
                                    class="select1c-open-object-action-button" 
                                    ${props['openObjectActionButton']} 
                                    type="radio" 
                                    name="${props['radioButtonName']}" 
                                    value="1" 
                                    onchange="if (this.checked) {
                                            this.closest('.select1c').querySelector('.picker-icon-box-entity').style = 'margin-bottom: 5px;';
                                            this.closest('.select1c').querySelector('.picker-icon-box-calendar').style.display = 'none';
                                            this.closest('.select1c').querySelector('.picker-icon-box-object').style.display = 'none';
                                        }"
                                >
                            </div>
                            <div style="display: flex; flex-direction: row-reverse; font-weight: 400; font-size: 10px;">
                                <div style="font-size: 10px; margin-top: 3px;">дата</div>
                                <input 
                                    class="select1c-pick-date-action-button" 
                                    ${props['pickDateActionButton']} 
                                    type="radio" 
                                    name="${props['radioButtonName']}" 
                                    value="2"
                                    onchange="if (this.checked) {
                                            this.closest('.select1c').querySelector('.picker-icon-box-calendar').style = 'margin-bottom: 5px; margin-left: 4px;';
                                            this.closest('.select1c').querySelector('.picker-icon-box-entity').style.display = 'none';
                                            this.closest('.select1c').querySelector('.picker-icon-box-object').style.display = 'none';
                                        }"
                                >
                            </div>
                            <div style="display: flex; flex-direction: row-reverse; font-weight: 400; font-size: 10px;">
                                <div style="font-size: 10px; margin-top: 3px;">диалог</div>
                                <input 
                                    class="select1c-pick-object-action-button" 
                                    ${props['pickObjectActionButton']} 
                                    type="radio" 
                                    name="${props['radioButtonName']}" 
                                    value="3"
                                    onchange="if (this.checked) {
                                            this.closest('.select1c').querySelector('.picker-icon-box-object').style = '';
                                            this.closest('.select1c').querySelector('.picker-icon-box-calendar').style = 'margin-bottom: 5px; margin-left: 4px;';
                                            this.closest('.select1c').querySelector('.picker-icon-box-calendar').style.display = 'none';
                                            this.closest('.select1c').querySelector('.picker-icon-box-entity').style.display = 'none';
                                        }"
                                >
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row-reverse;">
                            <button
                                    style="font-size: 10px; margin-top: 10px; font-family: 'JetBrains Mono', serif;
                                        cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                                        border-radius: 2px;"
                                    onclick="this.closest('.select1c').remove()"
                                    onmouseenter="this.style.backgroundColor = '#eeeeee'"
                                    onmouseout="this.style.backgroundColor = '#ffffff'"
                            >Удалить элемент</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="select-input-field"
                style="z-index: 8000; background-color: #FFFFFF; display: flex; flex-direction: row; 
                    border: 1px solid #9B9B9B; border-radius: 4px; height: 23px;
                    box-shadow: 0 1px 0 rgba(74, 74, 74, 0.196473);
                "
                ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)"
            >
                <div class="textarea-container" style="display: flex; flex-direction: row-reverse;">
                    ${getResizer('hor', '3px', '3px', 'input-textarea', 'relative', 
                                '', true, '#555')}
                    <label
                        class="select-name-label"
                        style="position: absolute; font-weight: 400; font-size: 13px; height: 23px; display: flex;
                               width: ${Math.min(props['name'].length * 8, 200) + 'px'}; 
                               left: ${-props['name'].length * 8 - props['leftMargin'] + 'px'};
                               text-align: start; align-items: center; color: #4A4A4A">
                        ${props['name']}</label>
                    <textarea class="input-textarea select1c-name-resize-textarea"
                        ondblclick="this.select()"
                        onchange="this.innerHTML = this.value"
                        style="background-color: transparent; color: #1f1f1f; font-family: 'Arial', serif;
                            font-weight: 400; font-size: 13px; text-align: ${
                            (!isNaN(props['options']['selected'].replace(',','.').replace(/\s/g,'')) 
                                && props['options']['selected'].length) ? 'end' : 'start'
                            }; overflow: hidden;
                            border-width: 0; height: 1rem; width: ${props['nameResizeWidth']}; resize: none;
                            outline: none; margin-top: 3px; margin-left: 4px; display: block;"
                    >${props['options']['selected']}</textarea>
                </div>
                <div class="select-dropdown-box"
                     style="border-radius: 4px; display: ${props['handleBoxDisplay']}; flex-direction: row;
                        width: ${props['handlersWidth']}; cursor: pointer;"
                >
                    <div class="dropdown-icon-box" style="display: ${props['dropdownBoxDisplay']};"
                        onclick="this.closest('.select1c').querySelectorAll('.select-dropdown').forEach((e)=>{
                         if (e.style.display === 'block') {
                             e.style.display = 'none';
                         } else {
                             e.style.display = 'block';
                         }
                    })">
                        <svg width="1" height="20" viewBox="0 0 1 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style="margin-top: 2px;">
                            <path d="M0.5 0V26" stroke="#9B9B9B"/>
                        </svg>
                        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                            style="padding: 0 3px 2px 0; margin-top: 2px;"
                        >
                            <path d="M14 8L10 12.76L6 8H14Z" fill="#4A4A4A"/>
                        </svg>
                    </div>
                    <div class="picker-icon-box" style="display: ${props['actionButtonDisplay']}; width: 26.2px;">
                        <svg width="1" height="20" viewBox="0 0 1 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                            style="margin-top: 2px;">
                            <path d="M0.5 0V26" stroke="#9B9B9B"/>
                        </svg>
                        <svg class="picker-icon-box-entity" 
                            style="${props['entityPickerDisplay']}" 
                            width="15" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="0.5" width="5" height="5" stroke="#545454"/>
                            <path d="M2.5 3.5L1 3.5L1 8.5H6V7" stroke="#545454"/>
                        </svg>
                        <svg class="picker-icon-box-calendar" 
                            style="${props['calendarPickerDisplay']}" 
                            width="10" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="1.5" width="8" height="8" stroke="#545454"/>
                            <rect x="1" y="2" width="7" height="2" fill="#545454"/>
                            <line x1="3" y1="5.5" x2="2" y2="5.5" stroke="#545454"/>
                            <line x1="7" y1="1.5" x2="6" y2="1.5" stroke="white"/>
                            <line x1="7" y1="1.5" x2="6" y2="1.5" stroke="white"/>
                            <line x1="7" y1="1.5" x2="6" y2="1.5" stroke="white"/>
                            <line x1="3" y1="1.5" x2="2" y2="1.5" stroke="white"/>
                            <line x1="3" y1="1.5" x2="2" y2="1.5" stroke="white"/>
                            <line x1="3" y1="1.5" x2="2" y2="1.5" stroke="white"/>
                            <line x1="7" y1="7.5" x2="6" y2="7.5" stroke="#545454"/>
                            <line x1="5" y1="7.5" x2="4" y2="7.5" stroke="#545454"/>
                            <line x1="3" y1="7.5" x2="2" y2="7.5" stroke="#545454"/>
                            <line x1="7" y1="5.5" x2="6" y2="5.5" stroke="#545454"/>
                            <line x1="7" y1="0.5" x2="6" y2="0.5" stroke="#545454"/>
                            <line x1="3" y1="0.5" x2="2" y2="0.5" stroke="#545454"/>
                            <line x1="5" y1="5.5" x2="4" y2="5.5" stroke="#545454"/>
                        </svg>
                        <svg class="picker-icon-box-object" style="${props['objectPickerDisplay']}" 
                            width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5.5" y="12" width="1.5" height="1.5" fill="black"/>
                            <rect x="11.5" y="12" width="1.5" height="1.5" fill="black"/>
                            <rect x="8.5" y="12" width="1.5" height="1.5" fill="black"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="select-dropdown"
                 style="display: none; width: calc(100% - 2px); border: 1px solid #9B9B9B; border-top: none; z-index: 8000;"
            >
                <div class="select-chosen-option"
                     onmouseenter="this.style.backgroundColor='#F3DB13'"
                     onmouseleave="this.style.backgroundColor='#FFFFFF'"
                     style="background-color: #FFFFFF; flex-direction: row; width: 100%;
                        transition: background-color 0.2s cubic-bezier(.14,1.13,.7,.95); height: 28px;"
                >
                    <textarea
                        class="element-textarea"
                        ondblclick="this.select()"
                        onchange="this.innerHTML = this.value"
                        style="background-color: transparent; color: #4A4A4A; font-family: 'Arial', serif;
                            font-weight: 400; font-size: 12px; text-align: start; overflow: hidden; border-width: 0;
                            margin-top: 5px; margin-left: 7px; height: 1rem; width: 100%; resize: horizontal;
                            outline: none;"
                    >${props['options']['selected']}</textarea>
                </div>
                <div class="alt-options-box"
                    style="
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    "
                >${renderOptions(props['options']['options'])}
                </div>
            </div>
        </div>
    `;
}


function select1c(
  _top,
  _left,
  id,
  leftMargin = 0,
  name = 'Имя реквизита:',
  nameResizeWidth = '169px',
  displayActionButton = 'checked',
  openObjectActionButton = 'checked',
  pickDateActionButton = '',
  displaySelectButton = 'checked',
  noButtons = '',
  pickObjectActionButton = '',
  options = {'selected': 'Выбранная опция', 'options': ['Альтернативная опция']},
  markupID = generateElementID()) {
    let props = {
        'top': _top, 'left': _left, 'id': markupID, 'nameResizeWidth': nameResizeWidth, 'name': name,
        'displayActionButton': displayActionButton, 'openObjectActionButton': openObjectActionButton,
        'pickDateActionButton': pickDateActionButton, 'displaySelectButton': displaySelectButton,
        'noButtons': noButtons, 'options': options, 'leftMargin': leftMargin,
        'pickObjectActionButton': pickObjectActionButton
    };
    document.querySelector(`#form-1c-${id}`).innerHTML += select1cRenderer(props);
}