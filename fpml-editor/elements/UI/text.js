function textRenderer(props) {

    props['elementFontWeight'] = props['bold'] ? 'bold' : 'normal';
    let fontFamily = props['parentIdPrefix'] === 'form-1c-' ? 'Arial' : 'monospace';

    return `
        <div
            class="draggable textelem element-main-wrapper drag-handle" id="${props.id || generateElementID()}"
            onmouseout="this.querySelectorAll('.textelem-hover-visible').forEach((e)=>{e.style.display='none'})"
            onmouseover="this.querySelectorAll('.textelem-hover-visible').forEach((e)=>{e.style.display='flex'})"
            onmouseenter="handleOpacityOnmouseenter(this)"
            onmouseleave="handleOpacityOnmouseout(this)"
            style="position: absolute; top: ${props['top']}; left: ${props['left']}; font-weight: 400; display: flex;
                flex-direction: column; align-items: start; border-radius: 4px;"
        >
            <div class="textelem-hover-visible hide-command-senitive" 
                style="position: absolute; display: none; flex-direction: row-reverse; top: -20px; left: -240px; 
                width: 240px; height: 35px;  z-index: 9999;"
            >
                <div 
                    style="opacity: 0;  display: none;"
                    onmouseenter="dragElement(this.closest('.element-main-wrapper'))"
                >
                    <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                </div>
                <div class="settings-wrapper" style="width: 220px; z-index: 9999;">
                    <div class="settings-icon-box"
                         style="display: flex; flex-direction: row-reverse; width: 100%; margin-top: -2px; opacity: 0;"
                    >
                        <svg fill="none" height="20" viewBox="0 0 33 33" width="20" xmlns="http://www.w3.org/2000/svg">
                        </svg>
                    </div>
                    <div class="settings-panel"
                         style="flex-direction: column; background-color: #FFFFFF; font-weight: 400; font-size: 10px; 
                            font-family: 'JetBrains Mono', serif; padding: 10px 4px 10px 8px; display: none; 
                            margin: 0 10px 0 0; border: solid 1px #AAA; border-radius: 5px; z-index: 9000;"
                    >
                        <div class="element-text-color" style="padding: 2px 0 0 0; margin-left: 12px;">
                            <span>Цвет текста:</span>
                            <input type="color" value="${props['color']}" class="element-text-color-input" list="presetColors"
                                style="height: 1.2rem; width: 5rem;"
                                onchange="this.closest('.textelem').querySelector('textarea').style
                                    .color = this.value">
                            <datalist id="presetColors">
                                <option>#000000</option>
                                <option>#0000ff</option>
                                <option>#50be85</option>
                                <option>#ff0000</option>
                            </datalist>
                        </div>
                        <div class="element-text-font-size" style="padding: 4px 0 0 0; margin-left: 0;">
                            <span>Размер шрифта:</span>
                            <input
                                class="element-text-font-size-input" type="number" min="8" max="24" step="1"
                                value="${Number(props.elementFontSize.replace('px',''))}"
                                style="font-size: 10px; font-family: 'JetBrains Mono', serif;"
                                onchange="this.closest('.textelem').querySelector('textarea').style
                                    .fontSize = this.value + 'px'">
                        </div>
                        <div class="element-text-weight" style="padding: 4px 0 0 0; margin-left: 4px;">
                            <label style="cursor: pointer; display: flex; flex-direction: row;">
                                <div style="padding: 3px 0 0 4px;">Жирный шрифт:</div>
                                <input class="element-text-weight-input" type="checkbox" ${props.bold}
                                    onchange="
                                        if (this.checked) {
                                            this.closest('.textelem').querySelector('textarea').style.fontWeight = 'bold';
                                        }
                                        else {
                                            this.closest('.textelem').querySelector('textarea').style.fontWeight = 'normal';
                                    }">
                            </label>
                        </div>
                        <div style="display: flex; flex-direction: row-reverse;">
                            <button
                                    style="font-size: 10px; margin-top: 10px; font-family: 'JetBrains Mono', serif;
                                        cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                                        border-radius: 2px;"
                                    onclick="this.closest('.textelem').remove()"
                                    onmouseenter="this.style.backgroundColor = '#eeeeee'"
                                    onmouseout="this.style.backgroundColor = '#ffffff'"
                            >Удалить элемент</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="textelem-border-style-container" style="display: none;">${props['borderWidth']}</div>
            <div style="display: flex; flex-direction: row; z-index: 9000;">
                <div class="textarea-container" style="display: flex;" 
                    ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)">
                    <textarea
                        class="element-textarea textelem-name-resize-textarea"
                        ondblclick="this.select()"
                        onchange="this.innerHTML = this.value"
                        style="background-color: transparent; color: ${props['color']}; font-family: ${fontFamily}, serif;
                            font-weight: ${props['elementFontWeight']}; font-size: ${props['elementFontSize']};
                            overflow: hidden; border: ${props['borderWidth'] || 0}px solid #9B9B9B; outline: none; 
                            height: ${props['nameResizeHeight']}; width: ${props['nameResizeWidth']}; resize: none;"
                    >${props['name']}</textarea>
                    <div style="display: none;" class="parent-id-prefix-container">${props['parentIdPrefix']}</div>
                    ${getResizer('both', 'calc(100% - 12px)', '3px', 'element-textarea', 
                        'relative','', true, '#555')}
                </div>
            </div>
        </div>
    `;
}

function textElem(
  _top,
  _left,
  id,
  parentIdPrefix = 'form-1c-',
  color = '#000000',
  bold = '',
  elementFontSize = '14px',
  name = 'Текст',
  nameResizeWidth = '100px',
  nameResizeHeight = '14px',
  borderWidth = 0,
  markupID = generateElementID()
) {
    let props = {
        'top': _top, 'left': _left, 'id': markupID, 'name': name, 'nameResizeWidth': nameResizeWidth,
        'nameResizeHeight': nameResizeHeight, 'color': color, 'bold': bold, 'elementFontSize': elementFontSize,
        'borderWidth': borderWidth, 'parentIdPrefix': parentIdPrefix
    };
    document.querySelector(`#${parentIdPrefix + id}`).innerHTML += textRenderer(props);
}
