function table1cRenderer(props) {
    let numOfCols = props['columns'].length;
    let numOfRows = props['columns'][0].data.length;
    let controlPanelDisplay = 'flex';
    if (props['removeControls']) {
        controlPanelDisplay = 'none';
    }

    function renderCell(cellData, colored) {
        let background = 'ffffff';
        if (colored) {
            background = 'f2f2f2';
        }
        props['cellTextAlign'] = (!isNaN(cellData.replace(',','.').replace(/\s/g,''))
                            && cellData.length) ? 'end' : 'start';
        props['cellTextAlign'] = (cellData === '☑' || cellData === '☐' || cellData === '✔')
            ? 'center' : props['cellTextAlign'];
        let cellSpecialStyles;
        cellSpecialStyles = (cellData === '☑' || cellData === '☐')
            ? 'font-size: 20px; padding: 0; margin: 0; height: 28px; top: -2px; position: relative; top: -3px;'
            : 'padding: 2px; margin: 5px 0 0 3px; height: 1rem;';

        return `
            <div class="dbtable1c-data-cell" style="background: #${background}; padding: 0; height: 28px;">
                <textarea
                    class="element-textarea"
                    ondblclick="this.select()"
                    onchange="this.innerHTML = this.value"
                    cols="2"
                    style="background-color: transparent; color: #4A4A4A; font-family: 'Arial', serif; font-weight: 400;
                        text-align: ${props['cellTextAlign']}; overflow: hidden; border-width: 0;
                        width: calc(100% - 15px); resize: none;
                        outline: none; ${cellSpecialStyles}"
                >${cellData}</textarea>
            </div>
        `;
    }
    function renderColumn(columnData, coloredLines) {
        let cellsHTML = '';
        let i = 1;
        columnData['data'].forEach((cellData)=>{
            if (!coloredLines) {
                i = 0;
            }
            cellsHTML += renderCell(cellData, i % 2);
            i += 1;
        });
        return `
            <div class="dbtable1c-column">
                <div class="dbtable1c-header-cell" 
                    style="display: inline-flex; background: linear-gradient(180deg, #F2F2F2 0%, #E6E6E6 100%);"
                >
                    <div class="textarea-container" style="display: flex; flex-direction: row-reverse;"
                        onmouseenter="handleOpacityOnmouseenter(this)"
                        onmouseleave="handleOpacityOnmouseout(this)"
                    >
                        ${getResizer('hor', '7px', '1px', 'element-textarea', 
                                    'relative', '', true, '#555')}
                        <textarea
                            class="element-textarea"
                            ondblclick="this.select()"
                            onchange="this.innerHTML = this.value"
                            style="background-color: transparent; color: #4A4A4A; font-family: 'Arial', serif;
                                font-weight: 400; text-align: start; overflow: hidden; border-width: 0;
                                margin-top: 3px; margin-left: 7px; margin-bottom: 3px; height: 1rem;
                                width: ${columnData['width']}; resize: none; outline: none; padding: 2px;"
                        >${columnData['header']}</textarea>
                    </div>
                    <svg width="1" height="26" viewBox="0 0 1 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style="margin-top: 2px;">
                        <path d="M0.5 0V26" stroke="#dddddd"/>
                    </svg>
                </div>
                <div class="dbtable1c-data-cells">
                    ${cellsHTML}
                </div>
            </div>
        `;
    }
    let tableHTML = '';
    props['columns'].forEach((columnData)=>{
        tableHTML += renderColumn(columnData, props['coloredLines']);
    });
    return `
        <div
            class="draggable dbtable1c element-main-wrapper" id="${props.id || generateElementID()}"
            onmouseout="this.querySelectorAll('.table1c-hover-visible').forEach((e)=>{e.style.display='none'})"
            onmouseover="this.querySelectorAll('.table1c-hover-visible').forEach((e)=>{e.style.display='flex'})"
            style="position: absolute; top: ${props['top']}; left: ${props['left']}; font-weight: 700;
                font-size: 15px; display: flex; flex-direction: column; align-items: start; border-radius: 4px;"
        >
            <div class="table1c-hover-visible hide-command-senitive" style="
                position: absolute; display: none; flex-direction: row-reverse; top: -22px; left: -207px; width: 240px; 
                height: 35px; z-index: 9999;"
            >
                <div 
                    style="margin-left: 5px; margin-right: 10px; opacity: 0;"
                    onmouseenter="dragElement(this.closest('.element-main-wrapper'))"
                >
                    <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                </div>
                <div class="settings-wrapper" style="width: 240px; z-index: 9999;">
                    <div class="settings-icon-box"
                         style="display: flex; flex-direction: row-reverse; width: 100%; margin-top: -2px; opacity: 0;"
                    >
                        <svg fill="none" height="20" viewBox="0 0 33 33" width="20" xmlns="http://www.w3.org/2000/svg">
                        </svg>
                    </div>
                    <div class="settings-panel"
                         style="flex-direction: column; background-color: #FFFFFF; font-weight: 400; font-size: 10px; 
                            font-family: 'JetBrains Mono', serif; padding: 10px 4px 10px 6px; display: none; 
                            margin: 4px -2px 0 0; border: solid 1px #999; border-radius: 5px; z-index: 9000;"
                    >
                        <div class="element-text-font-size" style="padding: 4px 0 0 0; margin-left: 0;">
                            <span>Количество колонок:</span>
                            <input
                                    class="select-num-of-cols" max="99" min="2" step="1" type="number"
                                    value="${numOfCols}"
                                    style="font-size: 10px;"
                                    onchange="this.closest('.dbtable1c').querySelectorAll('.dbtable1c-table').forEach((e)=>{
                                            if (this.value > e.querySelectorAll('.dbtable1c-column').length) {
                                                let new_column = e.querySelectorAll('.dbtable1c-column')
                                                    [e.querySelectorAll('.dbtable1c-column').length -1].cloneNode(true);
                                                e.appendChild(new_column);
                                            } else {
                                                e.removeChild(e.lastChild);
                                            }
                                            this.value = e.querySelectorAll('.dbtable1c-column').length;
                                        })"                                    
                            >
                        </div>
                        <div class="element-text-font-size" style="padding: 4px 0 0 0; margin-left: 12px;">
                            <span>Количество строк:</span>
                            <input
                                    class="select-num-of-rows" max="99" min="2" step="1" type="number"
                                    value="${numOfRows}" 
                                    style="font-size: 10px;"
                                    onchange="this.closest('.dbtable1c').querySelectorAll('.dbtable1c-column').forEach((e)=>{
                                            if (this.value > e.querySelectorAll('.dbtable1c-data-cell').length) {
                                                let new_cell = e.querySelectorAll('.dbtable1c-data-cell')[
                                                    e.querySelectorAll('.dbtable1c-data-cell').length - 2
                                                ].cloneNode(true);
                                                e.querySelector('.dbtable1c-data-cells').appendChild(new_cell);
                                            } else {
                                                e.querySelector('.dbtable1c-data-cells').removeChild(
                                                    e.querySelector('.dbtable1c-data-cells').lastChild;
                                                )
                                            }
                                            this.value = e.querySelectorAll('.dbtable1c-data-cell').length;
                                        })"
                            >
                        </div>
                        <div class="element-text-weight" style="padding: 4px 0 0 0; margin-left: 22px;">
                            <label style="cursor: pointer; display: flex; flex-direction: row;">
                                <div style="padding: 3px 0 0 4px;">Красить строки:</div>
                                <input 
                                    ${props['coloredLines']}
                                    class="table1c-color-lines"
                                    onchange="if (this.checked) {
                                                this.closest('.dbtable1c').querySelectorAll('.dbtable1c-data-cell').forEach((e) => {
                                                    e.style.backgroundColor = '#f2f2f2';
                                                });
                                            } else {
                                                this.closest('.dbtable1c').querySelectorAll('.dbtable1c-data-cell').forEach((e) => {
                                                    e.style.backgroundColor = '#FFFFFF';
                                                });
                                            }
                                        " type="checkbox"
                                >
                            </label>
                        </div>
                        <div class="element-text-weight" style="padding: 0 0 0 0; margin-left: 28px;">
                            <label style="cursor: pointer; display: flex; flex-direction: row;">
                                <div style="padding: 3px 0 0 4px;">Убрать панель:</div>
                                <input
                                    class="table1c-remove-controls"
                                    ${props['removeControls']} 
                                    onchange="if (this.checked) {
                                                this.closest('.dbtable1c').querySelector('.dbtable1c-controls').style
                                                    .display = 'none';
                                            } else {
                                                this.closest('.dbtable1c').querySelector('.dbtable1c-controls').style
                                                    .display = 'flex';
                                            }
                                        " type="checkbox"
                                >
                        </div>
                        <div style="display: flex; flex-direction: row-reverse;">
                            <button
                                    style="font-size: 10px; margin-top: 10px; font-family: 'JetBrains Mono', serif;
                                        cursor: pointer; background-color: #ffffff; border: 1px solid #555555;
                                        border-radius: 2px;"
                                    onclick="this.closest('.dbtable1c').remove()"
                                    onmouseenter="this.style.backgroundColor = '#eeeeee'"
                                    onmouseout="this.style.backgroundColor = '#ffffff'"
                            >Удалить элемент</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dbtable1c-wrapper drag-handle" style="z-index: 5000;" 
                ondblclick="setTimeout(settingsIconOnclickHandler, mockAppGlobals.settingsHideTimeout, this)">
                <div class="dbtable1c-controls" 
                    style="display: ${controlPanelDisplay}; flex-direction: row; justify-content: space-between;
                        margin-bottom: 5px;">
                    <div class="dbtable1c-controls-left" style="display: flex; flex-direction: row;">
                        <div style="font-weight: 400; font-size: 12px; padding: 5px 15px 2px 15px;
                            background: linear-gradient(180deg, #ffffff 62.5%, #E9E9E9 100%); border: 1px solid #9B9B9B;
                            box-shadow: 0 1px 0 rgba(74, 74, 74, 0.196473); border-radius: 4px; margin-right: 5px;
                            height: 16px; color: #4A4A4A;"
                        >
                            Добавить
                        </div>
                    </div>
                    <div class="dbtable1c-controls-right" style="display: flex; flex-direction: row;">
                        <div class="search-input-field"
                            style="background-color: #FFFFFF; display: flex; flex-direction: row; border: 1px solid #9B9B9B;
                                border-radius: 4px; height: 23px; box-shadow: 0 1px 0 rgba(74, 74, 74, 0.196473);
                                margin-right: 5px;"
                        >
                            <textarea class="input-textarea"
                                ondblclick="this.select()"
                                style="background-color: transparent; color: #d0d0d0; font-family: 'Arial', serif;
                                    font-weight: 400; text-align: start; overflow: hidden; border-width: 0; height: 1rem;
                                    width: 11rem; resize: none; outline: none; margin-top: 2px; margin-left: 4px;
                                    pointer-events:none; padding: 2px;
                                "
                            >
                                Поиск (Ctrl+F)</textarea>
                            <div class="select-dropdown-handle-box"
                                 style="display: flex; flex-direction: row; width: 18px; border-radius: 4px;
                                    cursor: pointer; background: linear-gradient(180deg, #FFFFFF 62.5%, #E9E9E9 100%);"
                                 onclick=""
                            >
                                <svg width="1" height="20" viewBox="0 0 1 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                                style="margin-top: 2px;">
                                    <path d="M0.5 0V26" stroke="#9B9B9B"/>
                                </svg>
                                <svg style="margin-left: 3px; margin-top: 5px;" width="12" height="14" 
                                    viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line x1="3.02513" y1="3.02511" x2="7.97487" y2="7.97486" stroke="#6F6F6F"/>
                                    <line x1="3.02513" y1="7.97482" x2="7.97487" y2="3.02507" stroke="#6F6F6F"/>
                                </svg>
                            </div>
                        </div>
                        <span style="position: absolute; right: 25px; top: 6px; font-weight: 400; font-size: 12px; 
                            color: #4A4A4A;"
                        >
                            Еще
                        </span>
                        <svg style="margin-left: 5px;" width="61" height="26" viewBox="0 0 76 33" fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g filter="url(#filter0_d_6_195)">
                            <rect width="76" height="32" rx="4" fill="url(#paint0_linear_6_195)"/>
                            <path d="M58.5 14L54.5 18.76L50.5 14H58.5Z" fill="#4A4A4A"/>
                            <rect x="0.5" y="0.5" width="75" height="31" rx="3.5" stroke="#9B9B9B"/>
                            </g>
                            <defs>
                            <filter id="filter0_d_6_195" x="0" y="0" width="76" height="33" filterUnits="userSpaceOnUse" 
                                color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" 
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="1"/>
                            <feColorMatrix type="matrix" 
                                values="0 0 0 0 0.290222 0 0 0 0 0.290175 0 0 0 0 0.290237 0 0 0 0.196473 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_195"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6_195" result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_6_195" x1="0" y1="0" x2="0" y2="32" 
                                gradientUnits="userSpaceOnUse">
                            <stop stop-color="white"/>
                            <stop offset="1" stop-color="#F9F9F9"/>
                            </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div class="dbtable1c-table" style="display: flex; flex-direction: row; border: 1px solid #9B9B9B;
                      max-width: ${props.contentMaxWidth}; overflow-x: auto; overflow-y: hidden; 
                      scrollbar-width: thin; scrollbar-color: #d3d3d3 #FFFFFF;">
                    ${tableHTML}
                    <data class="scroll-position" value="${props.scrollPosition}"></data>
                </div>
            </div>
        </div>
    `;
}

function applyScrolbarPositions() {
  /** table1c utility for post-effects applying. Used once per a state rendering at stateManagement.js */
  document.querySelectorAll('.dbtable1c-table').forEach(table => {
    table.scrollLeft = Number(table.querySelector('.scroll-position').value);
  });
}

function table1c(
  _top,
  _left,
  id,
  columns = [
      {'header': 'Имя колонки', 'width': '195px', 'data': ['', '']},
      {'header': 'Имя колонки', 'width': '195px', 'data': ['', '']},
  ],
  removeControls = 'checked',
  coloredLines = '',
  contentMaxWidth = '1000px',
  scrollPosition = 0,
  markupID = generateElementID()) {
    let props = {
        'top': _top, 'left': _left, 'id': markupID, 'columns': columns, 'removeControls': removeControls,
        'coloredLines': coloredLines, 'contentMaxWidth': contentMaxWidth, 'scrollPosition': scrollPosition
    };
    document.querySelector(`#form-1c-${id}`).innerHTML += table1cRenderer(props);
    document.querySelectorAll('textarea').forEach((e) => {
        e.spellcheck = false
    });
}