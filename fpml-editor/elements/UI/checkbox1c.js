function checkbox1cRenderer(props) {
    props['opacity'] = 1;
    if (props['checked'] === '') {
        props['opacity'] = 0;
    }
    let boxView = `
        <svg style="margin-top: 2.5px; position: relative; left: ${props.orientation === 'справа' ? '10px' : '0'};" 
          width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="7.5" r="7" stroke="#9B9B9B"/>
            <circle class="tick" style="opacity: ${props['opacity']}" cx="7.5" cy="7.5" r="2.5" fill="#009646"/>
        </svg>`;
    if (props.typeElemProp === 'флаг') {
        boxView = `
        <svg style="margin-top: 2px; position: relative; left: ${props.orientation === 'справа' ? '10px' : '0'};"
          width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" fill="white" stroke="#9B9B9B"/>
            <path class="tick" fill-rule="evenodd" clip-rule="evenodd" style="opacity: ${props['opacity']};"
                d="M18 5.63368L8.36562 16L2 10.064L3.89148 8.30017L8.2257 12.3419L15.9786 4L18 5.63368Z" fill="#009646"/>
        </svg>`
    }
    return `
        <div
            class="draggable checkbox1c element-main-wrapper drag-handle" id="${props.id || generateElementID()}"
            onmouseout="this.querySelectorAll('.checkbox1c-hover-visible').forEach((e)=>{e.style.display='none'})"
            onmouseover="this.querySelectorAll('.checkbox1c-hover-visible').forEach((e)=>{e.style.display='flex'})"
            onmouseenter="handleOpacityOnmouseenter(this)"
            onmouseleave="handleOpacityOnmouseout(this)"
            style="position: absolute; top: ${props['top']}; left: ${props['left']}; font-weight: 400; display: flex;
                flex-direction: column; align-items: start; border-radius: 4px;"
        >
            <data id="orientation" style="display: none;">${props.orientation}</data>
            <data id="typeElemProp" style="display: none;">${props.typeElemProp}</data>
            <div class="checkbox1c-hover-visible hide-command-senitive" style="
                position: absolute; display: none; flex-direction: row-reverse; top: -22px; left: -149px; width: 175px; 
                height: 35px; z-index: 9999;"
            >
                <div 
                    style="margin-left: 5px; margin-right: 10px; opacity: 0;"
                    onmouseenter="dragElement(this.closest('.element-main-wrapper'))"
                >
                    <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
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
                         style="flex-direction: column; background-color: #FFFFFF; font-weight: 400; font-size: 10px; 
                            font-family: 'JetBrains Mono', serif; padding: 10px 4px 10px 0; display: none; 
                            margin: 5px -5px 0 0; border: solid 1px #999; border-radius: 5px; z-index: 9000;">
                        <div style="padding: 0 0 0 0; margin: 0 0 0 6px;">
                            <label style="cursor: pointer; display: flex; flex-direction: row;">
                                <div style="padding: 3px 0 0 10px;">Флаг установлен:</div>
                                <input type="checkbox" class="checkbox1c-value-container" ${props.checked}
                                    style="margin: 3px 0 3px 3px;"
                                    onchange="
                                    if (this.checked) {
                                        this.closest('.checkbox1c').querySelector('.tick').style.opacity = '1'
                                    }
                                    else {
                                        this.closest('.checkbox1c').querySelector('.tick').style.opacity = '0'
                                    }">
                            </label>
                        </div>
                        <div style="display: flex; flex-direction: row-reverse;">
                            <button
                                    style="font-size: 10px; margin: 5px 13px 0 0; font-family: 'JetBrains Mono', serif;
                                        cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                                        border-radius: 2px;"
                                    onclick="this.closest('.checkbox1c').remove()"
                                    onmouseenter="this.style.backgroundColor = '#eeeeee'"
                                    onmouseout="this.style.backgroundColor = '#ffffff'"
                            >Удалить элемент</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; flex-direction: row; z-index: 7000;"
                ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)"
            >
                ${props.orientation === 'слева' ? boxView : ''}
                <div class="textarea-container" style="display: flex; flex-direction: row-reverse;">
                    ${getResizer('hor', '3px', 'calc(100% - 16px)', 
                        'element-textarea', 'absolute', '', true, '#555')}
                    <textarea
                        class="element-textarea checkbox1c-name-resize-textarea"
                        spellcheck="false"
                        ondblclick="this.select()"
                        onchange="this.innerHTML = this.value"
                        style="background-color: transparent; color: #4A4A4A; font-family: 'Arial', serif; 
                            font-weight: 400; font-size: 13px; overflow: hidden; border-width: 0; resize: horizontal; 
                            outline: none; height: 0.85rem; margin-left: 5px; padding: 2px; 
                            width: ${props['nameResizeWidth']};"
                    >${props['name']}</textarea>
                </div>
                ${props.orientation === 'справа' ? boxView : ''}
            </div>
        </div>
    `;
}

function checkbox1c(
  _top,
  _left,
  id,
  typeElemProp = 'check',
  orientation = 'слева',
  checked = 'checked',
  name = 'Чекбокс',
  nameResizeWidth = '80px',
  markupID = generateElementID(),
) {
    let props = {
        'top': _top, 'left': _left, 'id': markupID, 'name': name, 'nameResizeWidth': nameResizeWidth,
        'checked': checked, 'typeElemProp': typeElemProp, 'orientation': orientation
    };
    document.querySelector(`#form-1c-${id}`).innerHTML += checkbox1cRenderer(props);
}