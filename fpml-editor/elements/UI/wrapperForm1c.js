function applyAbstractStyling(id) {
    let form = document.querySelector(`#${id}`);
    form.querySelector('.taxi-navbar-1c').remove();
    form.querySelector('.favorites-navbar-1c').remove();
    form.querySelector('.wrapperform1c-header-right').remove();
    form.querySelectorAll('.yellowbutton1c').forEach(btn => {
        btn.style.background = 'rgb(140,140,140)';
        btn.querySelector('textarea').style.color = '#FFFFFF';
    });
    form.querySelectorAll('.uncoloredbutton1c').forEach(btn => {
        btn.style.background = '';
    });
}

function wrapperForm1cRenderer(props) {

    props['taxi-display'] = 'block';
    if (props['taxi'] === '') {
        props['taxi-display'] = 'none';
    }

    return `
        <div
            class="wrapperform1c draggable element-main-wrapper"
            id="${props['id']}"
            onmouseout="this.querySelectorAll('.wrapperform1c-hover-visible').forEach((e)=>{e.style.display='none'})"
            onmouseover="this.querySelectorAll('.wrapperform1c-hover-visible').forEach((e)=>{e.style.display='flex'})"
            style="z-index: 0; position: absolute; top: ${props['top']}; left: ${props['left']}; display: flex;
                flex-direction: column; padding: 10px 10px 10px 10px; background: #ffffff; border: 1px solid #9B9B9B;
                box-shadow: 0 1px 0 rgba(74, 74, 74, 0.196473); border-radius: 4px;"
        >
            <div class="drag-handle" 
                ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)">
                <div class="wrapperform1c-hover-visible hide-command-senitive"
                    style="position: absolute; display: none; flex-direction: row-reverse; top: -25px; left: -107px; 
                        width: 150px; height: 40px; z-index: 9999;"
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
                    <div class="settings-wrapper" style="width: 150px; z-index: 9999;">
                        <div class="settings-icon-box"
                             style="display: flex; flex-direction: row-reverse; width: 100%; margin-top: -2px; opacity: 0;"
                        >
                            <svg fill="none" height="20" viewBox="0 0 33 33" width="20" xmlns="http://www.w3.org/2000/svg">
                            </svg>
                        </div>
                        <div class="settings-panel"
                             style="flex-direction: column; background-color: #FFFFFF; font-weight: 400; font-size: 10px; 
                                font-family: 'JetBrains Mono', serif; padding: 10px 4px 10px 0; display: none; 
                                margin: 6px -15px 0 0; border: solid 1px #999; border-radius: 5px; z-index: 9000;"
                        >
                            <div style="padding: 0 0 0 0; margin: 0 0 0 50px;">
                                <label style="cursor: pointer; display: flex; flex-direction: row;">
                                    <div style="padding: 3px 0 0 4px;">Такси:</div>
                                    <input ${props['taxi']} type="checkbox" class="display-taxi-navbar"
                                        onchange="
                                        if (this.checked) {
                                            this.closest('.wrapperform1c').querySelector('.taxi-navbar-1c').style.display = 'block';
                                        } else {
                                            this.closest('.wrapperform1c').querySelector('.taxi-navbar-1c').style.display = 'none';
                                        }
                                    ">
                                </label>
                            </div>
                            <div style="padding: 0 0 0 0; margin: 0 0 0 50px;">
                                <label style="cursor: pointer; display: flex; flex-direction: row;">
                                    <div style="padding: 3px 0 0 4px;">Не 1с:</div>
                                    <input ${props['abstractStyling']} type="checkbox" class="apply-abstract-styling">
                                </label>
                            </div>
                            <div style="display: flex; flex-direction: row-reverse;">
                                <button
                                        style="font-size: 10px; margin-top: 5px; font-family: 'JetBrains Mono', serif;
                                            cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                                            border-radius: 2px;"
                                        onclick="this.closest('.wrapperform1c').remove()"
                                        onmouseenter="this.style.backgroundColor = '#eeeeee'"
                                        onmouseout="this.style.backgroundColor = '#ffffff'"
                                >Удалить элемент</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wrapperform1c-header" style="display: flex; flex-direction: row; justify-content: space-between;">
                    <div class="wrapperform1c-header-left" style="display: flex; flex-direction: row;">
                        <div class="taxi-navbar-1c" style="height: 23px; width: 70px; padding: 0; 
                            border: 1px solid #9B9B9B; background: linear-gradient(180deg, #ffffff 62.5%, #E9E9E9 100%); 
                            border-radius: 3px; box-shadow: 0 1px 0 rgba(74, 74, 74, 0.196473); margin-right: 10px;
                            display: ${props['taxi-display']};"
                        >
                            <svg 
                                style="margin-left: 7px; margin-bottom: 1px;" 
                                width="53" height="24" viewBox="0 0 53 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.0762575 11.6169L7.5097 5.90014L7.64178 17.1577L0.0762575 11.6169Z" fill="#585858"/>
                                <rect x="6" y="10" width="10" height="3" fill="#585858"/>
                                <path d="M53 11.5L45.5 17.1292V5.87083L53 11.5Z" fill="#AEAEAE"/>
                                <rect x="38" y="10" width="10" height="3" fill="#AEAEAE"/>
                                <rect x="27" y="22" width="22" height="1" transform="rotate(-90 27 22)" fill="#D7D7D7"/>
                            </svg>
                        </div>
                        <div class="favorites-navbar-1c">
                            <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M11 10H3L9.5 15L6.5 23L14.5 18L22 23L19.5 15L25.5 10H17.5L14.5 2L11 10Z" 
                                    stroke="#CED2D2" stroke-width="1.5"/>
                            </svg>
                        </div>
                        <div class="textarea-container" style="display: flex; flex-direction: row-reverse;"
                            onmouseenter="handleOpacityOnmouseenter(this)"
                            onmouseleave="handleOpacityOnmouseout(this)"
                        >
                            ${getResizer('hor', '7px', '3px', 'element-textarea', 
                                    'relative', '', true, '#555')}
                            <textarea
                                class="element-textarea wrapperform1c-name-resize-textarea"
                                ondblclick="this.select()"
                                onchange="this.innerHTML = this.value"
                                spellcheck="false"
                                style="background-color: transparent; color: #2A4A4A; font-family: 'Arial', serif;
                                    font-weight: 500; font-size: 19px; text-align: start; overflow: hidden;
                                    border-width: 0; margin-top: 0; margin-left: 10px; margin-bottom: 3px; height: 2rem; 
                                    width: ${props['nameResizeWidth']}; resize: horizontal; outline: none;"
                            >${props['name']}</textarea>
                        </div>
                    </div>
                    <div class="wrapperform1c-header-right">
                        <svg style="margin-left: 15px;" width="80" height="24" viewBox="0 0 73 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.64655 4.64638L9.60712 2.48456C10.1758 1.85753 10.9829 1.49992 11.8294 1.49992L12.2575 1.49992C13.0531 1.49992 13.8162 1.81599 14.3788 2.3786L14.6214 2.62124C15.184 3.18385 15.5001 3.94691 15.5001 4.74256L15.5001 5.25727C15.5001 6.05293 15.184 6.81599 14.6214 7.3786L12.5 9.49999" stroke="#585858"/>
                            <path d="M9.327 12.2544L7.18548 14.2371C6.56434 14.8122 5.72915 15.0981 4.88588 15.0244L4.4594 14.987C3.66678 14.9177 2.93417 14.5363 2.42274 13.9268L2.20217 13.664C1.69074 13.0544 1.44237 12.2667 1.51172 11.4741L1.55658 10.9614C1.62593 10.1687 2.0073 9.43613 2.6168 8.9247L4.91493 6.99633" stroke="#585858"/>
                            <line x1="10.9063" y1="6.35568" x2="6.35142" y2="10.856" stroke="#585858"/>
                            <path d="M71.7591 5.24403L65.1677 11.8283" stroke="#585858"/>
                            <path d="M65.0058 4.99417L72.0163 12.0163" stroke="#585858"/>
                            <rect x="37" y="3" width="3" height="3" fill="#585858"/>
                            <rect x="37" y="11" width="3" height="3" fill="#585858"/>
                            <rect x="37" y="7" width="3" height="3" fill="#585858"/>
                        </svg>
                    </div>
                </div>
                <div class="textarea-container" style="display: flex;"
                    onmouseenter="handleOpacityOnmouseenter(this)"
                    onmouseleave="handleOpacityOnmouseout(this)"
                >
                    <textarea
                        class="element-textarea wrapperform1c-main-resize-textarea"
                        onchange="this.innerHTML = this.value"
                        style="background-color: transparent; overflow: hidden; border-width: 0; outline: none;
                            height: ${props['mainResizeHeight']}; width: ${props['mainResizeWidth']}; resize: none;"
                        disabled
                    ></textarea>
                    ${getResizer('both', 'calc(100% - 24px)', 'calc(100% - 16px)', 
                        'element-textarea', 'absolute', '', true, '#555')}
                </div>
            </div>
        </div>
    `;
}

function wrapperForm1c(
    _top = '30px',
    _left = '30px',
    _id = `form-1c-${formCounter}`,
    name='Имя формы',
    taxi = 'checked',
    nameResizeWidth='240px',
    mainResizeHeight='10px',
    mainResizeWidth='426px',
    abstractStyling = 'checked') {
    let props = {'top':_top, 'left': _left, 'id': _id, 'name': name, 'taxi': taxi, 'nameResizeWidth': nameResizeWidth,
                'mainResizeHeight': mainResizeHeight, 'mainResizeWidth': mainResizeWidth};
    formCounter += 1;
    document.querySelector(`#${getState().activePageID}`).innerHTML += wrapperForm1cRenderer(props);
    if (abstractStyling !== 'checked') {
        applyAbstractStyling(_id);
    }
}