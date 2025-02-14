function yellowButton1cRenderer(props) {
    return `
        <div
            class="draggable yellowbutton1c element-main-wrapper drag-handle" id="${props.id || generateElementID()}"
            onmouseout="this.querySelectorAll('.yellowbutton1c-hover-visible').forEach((e)=>{e.style.display='none'})"
            onmouseover="this.querySelectorAll('.yellowbutton1c-hover-visible').forEach((e)=>{e.style.display='flex'})"
            onmouseenter="handleOpacityOnmouseenter(this)"
            onmouseleave="handleOpacityOnmouseout(this)"
            style="position: absolute; top: ${props['top']}; left: ${props['left']}; font-weight: 700;
                display: flex; flex-direction: row; align-items: center; padding: 3px 0 4px 0;
                background: linear-gradient(180deg, #FEE832 0%, #F9DA04 100%); border: 1px solid #9B9B9B;
                box-shadow: 0 1px 0 rgba(74, 74, 74, 0.196473); border-radius: 4px; z-index: 8000;"
        >
            <div class="yellowbutton1c-hover-visible hide-command-senitive" 
                style="position: absolute; display: none; flex-direction: row-reverse; top: -22px; left: -193px; 
                    width: 220px; height: 35px; z-index: 9999;"
            >
                <div 
                    style="margin-left: 5px; margin-right: 10px; opacity: 0;"
                    onmouseenter="dragElement(this.closest('.element-main-wrapper'))"
                >
                    <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                </div>
                <div class="settings-wrapper" style="width: 220px; z-index: 9999;">
                    <div class="settings-icon-box"
                         style="display: flex; flex-direction: row-reverse; width: 100%; margin-top: -2px;  opacity: 0;"
                    >
                        <svg fill="none" height="20" viewBox="0 0 33 33" width="20" xmlns="http://www.w3.org/2000/svg">
                        </svg>
                    </div>
                    <div class="settings-panel"
                         style="flex-direction: column; display: none;"
                    >
                        <div style="display: flex; flex-direction: row-reverse;">
                            <button
                                    style="font-size: 10px; margin-top: 5px; font-family: 'JetBrains Mono', serif;
                                        cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                                        border-radius: 2px;"
                                    onclick="this.closest('.yellowbutton1c').remove()"
                                    onmouseenter="this.style.backgroundColor = '#eeeeee'"
                                    onmouseout="this.style.backgroundColor = '#ffffff'"
                            >Удалить элемент</button>
                        </div>
                    </div>
                </div>
            </div>
            <div 
                class="textarea-container"
                style="display: flex; flex-direction: row-reverse;" 
                ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)"
            >
                ${getResizer('hor', '3px', '3px', 'element-textarea', 'relative', 
                            '', true, '#555')}
                <textarea
                    class="element-textarea yellowbutton1c-name-resize-textarea"
                    ondblclick="this.select()"
                    onchange="this.innerHTML = this.value"
                    style="background-color: transparent; color: #4A4A4A; font-family: 'Arial', serif; font-weight: 700;
                        text-align: center; font-size: 12px; overflow: hidden; border-width: 0; height: 0.8rem;
                        width: ${props['nameResizeWidth']}; resize: none; outline: none; margin: 0 0 0 10px;"
                >${props['name']}</textarea>
            </div>
        </div>
    `;
}

function yellowButton1c(
  _top,
  _left,
  id,
  name = 'Кнопка',
  nameResizeWidth = 124,
  markupID = generateElementID()
) {
    let props = {'top': _top, 'left': _left, 'id': markupID, 'name': name, 'nameResizeWidth': nameResizeWidth};
    document.querySelector(`#form-1c-${id}`).innerHTML += yellowButton1cRenderer(props);
}