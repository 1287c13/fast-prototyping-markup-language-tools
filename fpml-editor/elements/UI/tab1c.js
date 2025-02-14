function getTab(styles, tab) {
    return `
        <div class="tab-name ${styles[2]}" id="${styles[3]}" 
            style="padding: 5px 10px 3px 10px; background: ${styles[0]}; border: 1px solid #9B9B9B; 
                border-bottom: none; border-radius: 3px 3px 0 0;"
        >
            <textarea class="input-textarea tab1c-name-textarea"
                ondblclick="this.select()"
                onchange="this.innerHTML = this.value"
                style="font-family: 'Arial', serif; font-weight: 400;  font-size: 13px; 
                    background-color: transparent; color: #4A4A4A; text-align: start; overflow: hidden;
                    border-width: 0; height: 15px; width: ${tab.trim().length * 9}px; resize: none;
                    outline: none; padding: 0;"
            >${tab}</textarea>
            <div class="active-tab-bottom-border" style="position: relative; background: ${styles[1]}; 
                width: calc(100% + 20px); height: 1px; left: -10px; bottom: -4px;"
            >
            </div>
        </div>
    `;
}

function addTab(elem) {
    elem.closest('.tab1c').querySelector('.tab1c-header').innerHTML +=
        getTab(['#ececec', '', '', ''], 'Новая вкладка');
}

function removeTab(elem) {
    let allTabs = elem.closest('.tab1c').querySelectorAll('.tab-name');
    allTabs[allTabs.length - 1].remove();
}

function tab1cRenderer(props) {

    function getTabs() {
        let tabs = '';
        let i = 0;
        let styles = '';
        props['tabs'].forEach((tab) => {
            if (i === Number(props['activeTab'])) {
                styles = ['#ffffff', '#ffffff', 'active-tab', 'active-tab_' + i];
            } else {
                styles = ['#ececec', '', '', ''];
            }
            tabs += getTab(styles, tab);
            i++;
        });
        return tabs;
    }

    return `
        <div
            class="tab1c draggable element-main-wrapper drag-handle" id="${props.id || generateElementID()}"
            onmouseout="this.querySelectorAll('.tab1c-hover-visible').forEach((e)=>{e.style.display='none'})"
            onmouseover="this.querySelectorAll('.tab1c-hover-visible').forEach((e)=>{e.style.display='flex'})"
            onmouseenter="handleOpacityOnmouseenter(this)"
            onmouseleave="handleOpacityOnmouseout(this)"
            style="position: absolute; top: ${props['top']}; left: ${props['left']}; display: flex; 
                flex-direction: column; padding: 0 0 5px 0;"
            ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)"
        >
            <div class="tab1c-hover-visible hide-command-senitive" style="position: absolute; display: none; 
                flex-direction: row-reverse; top: -22px; left: -193px; width: 220px; height: 35px; z-index: 9999;"
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
                         style="display: flex; flex-direction: row-reverse; width: 100%; margin-top: -2px; opacity: 0;"
                    >
                        <svg fill="none" height="20" viewBox="0 0 33 33" width="20" xmlns="http://www.w3.org/2000/svg">
                        </svg>
                    </div>
                    <div class="settings-panel"
                         style="flex-direction: column; background-color: #FFFFFF; font-weight: 400; font-size: 10px; 
                                font-family: 'JetBrains Mono', serif; padding: 10px 4px 10px 4px; display: none; 
                                margin: 4px -10px 0 0; border: solid 1px #999; border-radius: 5px; z-index: 9000;"
                    >
                        <div class="element-text-font-size" style="padding: 4px 0 0 0; margin-left: 13px;">
                            <span>Активная вкладка:</span>
                            <input class="select-active-tab" max="99" min="0" step="1" type="number" 
                                    value="${props.activeTab}"
                                    style="font-size: 10px;"
                                    onchange="this.closest('.tab1c').querySelectorAll('.tab1c-header').forEach((h)=>{
                                        let i = 0;
                                        let activeTab = this.value;
                                        h.childNodes.forEach((e) => {
                                            if (e.className && e.className.split(' ').includes('active-tab')) {
                                                e.style.background = '#ececec';
                                                e.querySelector('.active-tab-bottom-border').style.background = '';
                                            }
                                            if (i === activeTab * 2 + 1) {
                                                e.classList.add('active-tab');
                                                e.style.background = '#ffffff';
                                                e.querySelector('.active-tab-bottom-border').style.background = '#ffffff';
                                            }
                                            i++;
                                        })
                                    })">
                        </div>
                        <div style="display: flex; flex-direction: row-reverse;">
                            <button style="font-size: 10px; margin: 10px 10px 0 0; font-family: 'JetBrains Mono', serif;
                                        cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                                        border-radius: 2px;"
                                    onclick="addTab(this)"
                                    onmouseenter="this.style.backgroundColor = '#eeeeee'"
                                    onmouseout="this.style.backgroundColor = '#ffffff'"
                            >Добавить вкладку</button>
                        </div>
                        <div style="display: flex; flex-direction: row-reverse;">
                            <button style="font-size: 10px; margin: 10px 10px 0 0; font-family: 'JetBrains Mono', serif;
                                        cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                                        border-radius: 2px;"
                                    onclick="removeTab(this)"
                                    onmouseenter="this.style.backgroundColor = '#eeeeee'"
                                    onmouseout="this.style.backgroundColor = '#ffffff'"
                            >Удалить вкладку</button>
                        </div>
                        <div style="display: flex; flex-direction: row-reverse;">
                            <button style="font-size: 10px; margin: 10px 10px 0 0; font-family: 'JetBrains Mono', serif;
                                        cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                                        border-radius: 2px;"
                                    onclick="this.closest('.tab1c').remove()"
                                    onmouseenter="this.style.backgroundColor = '#eeeeee'"
                                    onmouseout="this.style.backgroundColor = '#ffffff'"
                            >Удалить элемент</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab1c-header" style="display: flex;">
                ${getTabs()}
            </div>
            <div class="textarea-container" 
                style="padding: 10px 10px 10px 10px; background: #ffffff; border: 1px solid #9B9B9B; 
                    box-shadow: 0 1px 0 rgba(74, 74, 74, 0.196473); display: flex;"
            >
                <textarea
                    class="element-textarea tab1c-main-resize-textarea"
                    ondblclick="this.select()"
                    onchange="this.innerHTML = this.value"
                    style="background-color: transparent; overflow: hidden; border-width: 0; 
                        height: ${props['mainResizeHeight']}; width: ${props['mainResizeWidth']}; resize: none; 
                        outline: none;"
                    disabled
                ></textarea>
                ${getResizer('both', 'calc(100% - 24px)', 'calc(100% - 16px)', 
                    'element-textarea', 'absolute', '', true, '#555')}
            </div>
        </div>
    `;
}

function tab1c(
  _top,
  _left,
  id,
  mainResizeHeight = '100px',
  mainResizeWidth = '426px',
  tabs = ['Вкладка 1', 'Вкладка 2'],
  activeTab = 0,
  markupID = generateElementID()) {
    let props = {
        'top': _top, 'left': _left, 'id': markupID, 'mainResizeHeight': mainResizeHeight,
        'mainResizeWidth': mainResizeWidth, 'tabs': tabs, 'activeTab': activeTab
    };
    document.querySelector(`#form-1c-${id}`).innerHTML += tab1cRenderer(props);
}