function mainMenuOnclick() {
  let _contextMenu = document.querySelector('.contextMenu');
  if (_contextMenu) {
    _contextMenu.remove()
  }
  showContextMenu({target: document.querySelector('html'), clientY: 25, clientX: 60});
}

function faqOnclick() {
  removeAllPopupElements();
}

function getPublicLink() {
  return clientAppURL + '?key=' + (localStorage.getItem('mockupGUID') || '');
}

async function downloadVisioFile() {
  /** let makeFileResult = await API.startVisioFileGeneration();
  if (makeFileResult) {
    let timerId = setInterval(() => {
      fetch(stateURL + 'getvsdx/?key=' + localStorage.getItem('mockupGUID')).then(async res => {
        if (res.ok) {
          clearInterval(timerId);
          let fileContent = await res.body.getReader().read();
          let blob = new Blob([fileContent.value], {
            type: 'application/octet-stream'
          });
          let a = document.createElement('a');
          a.href = window.URL.createObjectURL(blob);
          a.download = 'scheme.vsdx';
          document.body.appendChild(a);
          a.style.display = 'none';
          a.click();
          a.remove();
        }
      });
    }, 1000)
  } */

  showNotification(
    `<span style="padding: 25px 0 25px 20px; display: block">
      Функциональность находится в разработке.</span>`,
    [40, 270],
    520,
    'dialog',
    '')
}

function linksOnclick() {
  removeAllPopupElements();
  document.body.innerHTML += `
  <div id="links-form-wrapper" 
    class="removable-popup"
    style="position: absolute; display: flex; justify-content: start; font-size: 13px; 
      font-family: 'JetBrains Mono', serif; z-index: 9999;">
    <div
      style="width: 400px; background-color: #FFFFFF; box-shadow: 0 3px 6px rgba(0, 0, 0, 1);
      position: absolute; margin-top: 30px; font-weight: 400; left: 40px; top: 40px;">
      <span
        style="color: black; position: absolute; right: 20px; top: 10px; cursor: pointer; font-size: 22px;"
        onclick="this.closest('#links-form-wrapper').remove()">
        &#10006;
      </span>
      <div style="padding: 30px 20px 15px 20px; display: flex; flex-direction: column;">
        <span>Общедоступная ссылка:</span>
        <input style="margin-top: 10px; font-size: 12px; height: 20px; color: #666666;" 
          spellcheck="false" type="text" value="${getPublicLink()}" onclick="this.select()">
        <div style="padding: 5px 0 0 0;">
          <span
            style="color: blue; text-decoration-line: underline; cursor: pointer; font-size: 11px; 
              right: 0; display: flex; justify-content: end;"
            onclick="navigator.clipboard.writeText(getPublicLink())
              .then(() => {
                console.log('Text copied to clipboard')
                this.closest('#links-form-wrapper').remove()
              })"
            >
            скопировать ссылку в буфер обмена
          </span>
        </div>
      </div>
      <div style="padding: 15px 20px 30px 20px; display: flex; flex-direction: column; justify-content: center;">
        <div style="display: flex; flex-direction: row; justify-content: start;">
          <span style="display: block; padding: 6px 6px 0 0;">Экспорт в visio:</span>
          <div style="width: 180px; border: solid black 1px; border-radius: 3px; margin: 0 0 0 46px; 
            padding: 2px 0 0 0; display: flex; cursor: pointer;"
            onmouseenter="this.style.backgroundColor = '#F4F4F4'"
            onmouseleave="this.style.backgroundColor = '#FFFFFF'"
            onclick="downloadVisioFile()"
          >
            <div style="padding: 4px 0 0 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.163 2.819C9 3.139 9 3.559 9 
                  4.4V11H7.803c-.883 0-1.325 0-1.534.176a.75.75 0 0 0-.266.62c.017.274.322.593.931 
                  1.232l4.198 4.401c.302.318.453.476.63.535a.749.749 0 0 0 .476 
                  0c.177-.059.328-.217.63-.535l4.198-4.4c.61-.64.914-.96.93-1.233a.75.75 0 0 0-.265-.62C17.522 
                  11 17.081 11 16.197 11H15V4.4c0-.84 0-1.26-.164-1.581a1.5 1.5 0 0 0-.655-.656C13.861 2 
                  13.441 2 12.6 2h-1.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zM5 21a1 1 0 0 0 1 
                  1h12a1 1 0 1 0 0-2H6a1 1 0 0 0-1 1z" fill="#000000"/>
              </svg>
            </div>
            <span style="display: block; padding: 2px 0 0 3px;">Скачать .vsdx файл</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function removeLocalDataAndReloadPage() {
  localStorage.clear();
  window.location.reload();
}

function settingsOnclick() {
  removeAllPopupElements();
  document.body.innerHTML += `
  <div id="settings-form-wrapper"
    class="removable-popup"
    style="
      position: absolute; display: flex; justify-content: start; font-size: 13px; 
      font-family: 'JetBrains Mono', serif; z-index: 9999;"
  >
    <div
      style="width: 500px; background-color: #FFFFFF; box-shadow: 0 3px 6px rgba(0, 0, 0, 1);
      position: absolute; margin-top: 30px; font-weight: 400; left: 40px; top: 40px; padding: 30px 20px 20px 20px;">
      <span
        style="color: black; position: absolute; right: 20px; top: 10px; cursor: pointer; font-size: 22px;"
        onclick="this.closest('#settings-form-wrapper').remove()">
        &#10006;
      </span>
      <div class="settings-grid" style="padding: 4px 0 0 0; margin-left: 0;">
        <span style="padding: 1px 0 0 0;">Сетка (минимальный шаг в пикселях):</span>
        <input 
          class="settings-grid-input" type="number" value="${grid}" min="0" max="5" step="1" 
          style="font-size: 10px;"
          onchange="grid = this.value">
      </div>
        <div style="margin: 20px 0 0 0;">
          <div style="padding: 0 0 0 0; margin-left: 0; display: flex; flex-direction: row; 
            justify-content: space-between; width: 98%;">
            <span style="padding: 1px 0 0 0;">Используемый ключ:</span>
            <input 
              class="settings-grid-input" type="text" disabled
              value="${localStorage.getItem('mockupGUID') || ''}"
              style="font-size: 11px; width: 206px;">
            <div class="button-dark" onmouseenter="this.style.backgroundColor = '#574545'"
              onmouseleave="this.style.backgroundColor = '#707070'" 
              onclick="removeLocalDataAndReloadPage()"
              onmouseup="this.closest('#pop-up-notification').remove()"
              style="border: 1px solid transparent; border-radius: 3px; background-color: #707070; 
              cursor: pointer; color: #ffffff; height: 15px; width: 95px; padding: 1px 0 0 8px;">
              <span
                style="position: absolute; font-size: 11px;">
                Удалить ключ
              </span>
            </div>
          </div>
          <div style="margin: 5px 0 0 0;">
            <span style="font-size: 11px;">Важно! При нажатии этой кнопки будет произведен 
            выход из системы. Если впоследствии вы не сможете ввести ключ, то восстановить доступ к схеме 
            не получится.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function renderMainMenu() {
  document.querySelector('body').innerHTML +=
    `
    <div id="main-menu-panel" style="position: sticky; top: 15px; left: 10px;">
      <div style="position: absolute; z-index: 8000;">
        <svg width="30" height="155" viewBox="0 0 30 182" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.1716 179.85H6.82843C5.0572 179.85 3.35851 179.146 2.10607 177.894C0.853618 176.641 0.15 
            174.943 0.15 173.172V6.82843C0.15 5.0572 0.853618 3.35851 2.10607 2.10607C3.35851 0.853618 5.0572 
            0.15 6.82843 0.15H23.1716C24.9428 0.15 26.6415 0.853618 27.8939 2.10607C29.1464 3.35851 29.85 
            5.0572 29.85 6.82843V173.172C29.85 174.943 29.1464 176.641 27.8939 177.894C26.6415 179.146 24.9428 
            179.85 23.1716 179.85Z" 
            fill="white" 
            stroke="#868686" 
            stroke-width="0.5"
          />
        </svg>
      </div>
      <div style="position: absolute; display: flex; flex-direction: column; z-index: 9999;">
        <div id="main-menu" style="height: 30px; width: 30px; cursor: pointer;"
          onclick="mainMenuOnclick()">
          <svg width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"
          style="padding: 7px 0 0 6px;">
            <path fill="#7A7A7A" fill-rule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"/>
          </svg>
        </div>
        <div id="main-code" style="height: 30px; width: 30px; cursor: pointer;"
          onclick="[null].forEach(() => {
            removeAllPopupElements();
            renderMainWindow();
          })">
          <svg width="19" height="15" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="padding: 7px 0 0 5.5px;">
            <path fill="#7A7A7A" d="M21.8297 8.18077C22.3984 8.57887 22.3984 9.42113 21.8297 9.81923L17.2126 
            13.0512C16.3122 13.6814 15.2019 12.6091 15.8004 11.6874L17.1918 9.54461C17.4069 9.21339 17.4069 
            8.78661 17.1918 8.45539L15.8004 6.31263C15.2019 5.3909 16.3122 4.31855 17.2126 4.9488L21.8297 
            8.18077Z"/>
            <path fill="#7A7A7A" d="M1.17033 9.81923C0.601616 9.42113 0.601615 8.57887 1.17033 
            8.18077L5.78743 4.9488C6.68778 4.31855 7.79812 5.3909 7.19959 6.31263L5.80819 8.45539C5.59311 
            8.78661 5.59311 9.21339 5.80819 9.54461L7.19959 11.6874C7.79812 12.6091 6.68778 13.6814 5.78743 
            13.0512L1.17033 9.81923Z"/>
            <line fill="#7A7A7A" x1="13.9594" y1="0.282166" x2="8.95936" y2="17.2822" stroke="#7A7A7A" stroke-width="2"/>
          </svg>
        </div>
        <div id="main-links" style="height: 30px; width: 30px; cursor: pointer;"
          onclick="linksOnclick()"
        >
          <svg width="20" height="20" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="padding: 3px 0 0 5px;">
            <path d="M7.64655 4.64638L9.60712 2.48456C10.1758 1.85753 10.9829 1.49992 11.8294 1.49992L12.2575 1.49992C13.0531 1.49992 13.8162 1.81599 14.3788 2.3786L14.6214 2.62124C15.184 3.18385 15.5001 3.94691 15.5001 4.74256L15.5001 5.25727C15.5001 6.05293 15.184 6.81599 14.6214 7.3786L12.5 9.49999" stroke="#585858"/>
            <path d="M9.327 12.2544L7.18548 14.2371C6.56434 14.8122 5.72915 15.0981 4.88588 15.0244L4.4594 14.987C3.66678 14.9177 2.93417 14.5363 2.42274 13.9268L2.20217 13.664C1.69074 13.0544 1.44237 12.2667 1.51172 11.4741L1.55658 10.9614C1.62593 10.1687 2.0073 9.43613 2.6168 8.9247L4.91493 6.99633" stroke="#585858"/>
            <line x1="10.9063" y1="6.35568" x2="6.35142" y2="10.856" stroke="#585858"/>
          </svg>
        </div>
        <div id="main-settings" style="height: 30px; width: 30px; cursor: pointer;"
          onclick="settingsOnclick()"
        >
          <svg width="18" height="18" viewBox="1 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="padding: 6px 0 0 6.5px;">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6233 1.30005C13.6233 0.747764 13.1756 
            0.300049 12.6233 0.300049L10.5493 0.300049C9.99703 0.300049 9.54932 0.747764 9.54932 
            1.30005V2.35403C9.54932 2.83502 9.20482 3.24187 8.74262 3.37497C8.21806 3.52604 7.71484 3.72414 
            7.23834 3.96415C6.8307 4.16948 6.33161 4.12327 6.00158 3.80796L5.2381 3.07853C4.85159 2.70925 
            4.24301 2.70925 3.8565 3.07853L2.42332 4.4478C2.01105 4.84168 2.01105 5.50001 2.42332 
            5.89389L3.2027 6.63852C3.53827 6.95912 3.60277 7.46587 3.40836 7.88729C3.28328 8.15843 
            3.17325 8.43733 3.07926 8.72302C2.93229 9.16978 2.53205 9.50005 2.06173 9.50005H1C0.447715 
            .50005 0 9.94776 0 10.5L0 12.3924C0 12.9447 0.447715 13.3924 1 13.3924H2.26612C2.70864 13.3924 
            3.09252 13.686 3.25844 14.0962C3.40391 14.4559 3.57537 14.8033 3.77062 15.1361C4.02604 15.5716 
            3.98453 16.1346 3.6195 16.4833L2.97505 17.0991C2.56279 17.4929 2.56279 18.1513 2.97505 
            18.5452L4.40823 19.9144C4.79474 20.2837 5.40333 20.2837 5.78984 19.9144L6.84944 18.9021C7.15151 
            18.6135 7.59923 18.5484 7.98846 18.7001C8.22886 18.7938 8.47475 18.8774 8.72554 18.9502C9.18666 
            19.084 9.53 19.4904 9.53 19.9705V20.9999C9.53 21.5522 9.97771 21.9999 10.53 
            21.9999H12.604C13.1563 21.9999 13.604 21.5522 13.604 20.9999V19.7307C13.604 19.2823 13.9048 
            18.8943 14.3244 18.7363C14.5538 18.6499 14.7783 18.5543 14.9974 18.45C15.4013 18.2576 15.8882 
            18.3087 16.2116 18.6177L17.1899 19.5524C17.5764 19.9217 18.185 19.9217 18.5715 19.5524L20.0047 
            18.1831C20.417 17.7892 20.417 17.1309 20.0047 16.737L19.1122 15.8843C18.7696 15.557 18.7101 
            15.037 18.9187 14.6116C19.0287 14.3872 19.1283 14.1572 19.2169 13.9222C19.3765 13.4988 19.7664 
            13.1924 20.2188 13.1924H20.9998C21.5521 13.1924 21.9998 12.7447 21.9998 12.1924V10.3C21.9998 
            9.74776 21.5521 9.30005 20.9998 9.30005H20.2778C19.8173 9.30005 19.4228 8.98305 19.2686 
            8.54916C19.2221 8.41819 19.1722 8.28871 19.119 8.16083C18.9466 7.74661 19.0185 7.26091 
            19.3429 6.95098L20.1048 6.22309C20.5171 5.82921 20.5171 5.17088 20.1048 4.777L18.6716 
            3.40773C18.2851 3.03846 17.6765 3.03846 17.29 3.40773L16.7055 3.9662C16.365 4.29147 15.8466 
            4.32951 15.4336 4.10325C15.0844 3.91188 14.7196 3.74349 14.3415 3.60021C13.923 3.44163 
            13.6233 3.05417 13.6233 2.60664V1.30005Z" fill="#7A7A7A"/>
            <circle cx="11.3999" cy="11.3" r="4.5" fill="white"/>
          </svg>
        </div>
        <div id="main-save" style="height: 30px; width: 30px; cursor: pointer;"
          onclick="changesRegistered = true">
          <svg style="padding: 7px 0 0 7.5px;" width="15" height="15" viewBox="0 0 14 14" fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1 0.5H10.77L13.3796 3.54453C13.4573 3.63515 13.5 3.75057 13.5 3.86992V13C13.5 13.2761 
            13.2761 13.5 13 13.5H1C0.723858 13.5 0.5 13.2761 0.5 13V1C0.5 0.723858 0.723858 0.5 1 0.5Z" 
            fill="#D9D9D9" stroke="#555555"/>
            <rect x="2.5" y="0.5" width="7" height="5" rx="0.5" fill="white" stroke="#555555"/>
            <rect x="2.5" y="8.5" width="9" height="5" rx="0.5" fill="white" stroke="#555555"/>
            <line x1="7.5" y1="2" x2="7.5" y2="4" stroke="#555555"/>
          </svg>
        </div>
        <div id="main-help" style="display: none; height: 30px; width: 30px; cursor: pointer;"
          onclick="faqOnclick()">
          <svg fill="#000000" width="15" height="15" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"
            style="padding: 6px 0 0 7.5px;">
            <g>
              <path d="M48,0A24.0275,24.0275,0,0,0,24,24a6,6,0,0,0,12,0,12,12,0,0,1,24,0c0,5.2031-3.0586,
              8.3965-8.0859,13.0371C47.2617,41.32,42,46.1719,42,54a6,6,0,0,0,12,0c0-2.4434,2.2969-4.6875,
              6.0469-8.1445C65.0859,41.2031,72,34.834,72,24A24.0275,24.0275,0,0,0,48,0Z"
              fill="#7A7A7A"/>
              <path d="M48,72A12,12,0,1,0,60,84,12.0119,12.0119,0,0,0,48,72Z" fill="#7A7A7A"/>
            </g>
          </svg>
        </div>
      </div>
    </div>
    `;
}
