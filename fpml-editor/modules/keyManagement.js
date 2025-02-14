function setMockupGUID() {
  if (!localStorage.getItem('mockupGUID')) {
    API.createState().then((res) => {
      localStorage.setItem('mockupGUID', res['result']['key']);
    })
  }
}

function fillMockupGUIDInput() {
  if (checkLocalStorageForMockupGUID && localStorage.getItem('mockupGUID')) {
    document.querySelector('#mockup-guid-input').value = localStorage.getItem('mockupGUID');
  }
}

function renderKeyManagementForm() {
  if (!standaloneMode && !localStorage.getItem('mockupGUID')) {
    let keyManagementForm = `
      <div 
        class="key-management-form-wrapper"
        style="position: absolute; width: 95%; height: 95%; font-family: 'JetBrains Mono', serif; z-index: 9999;"
      >
        <div
          style="width: 800px; height: 227px; background-color: #FFFFFF; box-shadow: 0 3px 6px rgba(0, 0, 0, 1);
          position: absolute; margin-left: calc(50% - 400px); margin-top: 150px; font-weight: 400"
        >
          <div 
            style="margin-top: 45px; margin-left: 100px; margin-right: 100px; border-bottom: 1px solid #000000; 
            padding-top: 0.5rem; padding-bottom: 0.5rem; display: flex; flex-direction: row; 
            justify-content: space-between"
          >
            <input 
              id="mockup-guid-input"
              type="text"
              value=""
              placeholder="введите ключ или сгенерируйте новый"
              style="border-style: none; width:  390px; font-family: 'JetBrains Mono', serif; font-size: 16px;
              margin-top: 2px; color: #000000;"
            >
            <svg width="30" height="30" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg"
              style="margin-top: 2px; cursor: pointer;"
              onclick="this.querySelectorAll('rect').forEach(()=>{
                checkLocalStorageForMockupGUID = true;
                setMockupGUID();
              });
              "
            >
              <circle cx="10.5" cy="7.5" r="7.5" fill="#707070"/>
              <circle cx="10.5" cy="7.5" r="5.5" fill="white"/>
              <rect x="15.8662" y="0.901611" width="4.93176" height="17" transform="rotate(53.5648 15.8662 0.901611)" fill="white"/>
              <path d="M17.0533 3.00276L19.9289 6.70111C20.1844 7.02968 19.95 7.50831 19.5338 7.50802L14.5666 7.50464C14.1504 7.50435 13.9167 7.0254 14.1726 6.69719L17.0533 3.00276Z" fill="#707070"/>
              <path d="M4.00001 12L1.15559 8.305C0.902496 7.97621 1.13688 7.5 1.5518 7.5H6.44822C6.86314 7.5 7.09752 7.97621 6.84442 8.305L4.00001 12Z" fill="#707070"/>
            </svg>
            <div 
              class="button-dark"
              id="key-input-button"
              onmouseenter="this.style.backgroundColor = '#574545'"
              onmouseleave="this.style.backgroundColor = '#707070'"
              onclick="this.querySelectorAll('span').forEach(()=>{
                if (!localStorage.getItem('mockupGUID') && document.querySelector('#mockup-guid-input').value) {
                  localStorage.setItem('mockupGUID', document.querySelector('#mockup-guid-input').value)
                }
                if (localStorage.getItem('mockupGUID')) {
                  let currentMockupGUIDInputValue = document.querySelector('#mockup-guid-input').value;
                  document.querySelector('.key-management-form-wrapper').remove();
                  API.getState().then((res)=>{
                    if (res['result']['result']) {
                      importedState = res['result']['result'];
                      localStorage.setItem(
                        'mockupGUID', 
                        currentMockupGUIDInputValue
                      );
                      renderingNeeded = true;
                    } else {
                      localStorage.removeItem('mockupGUID');
                      window.location.reload();
                    }
                  });
                }
              });"
              style="border: 1px solid transparent; border-radius: 3px; background-color: #707070; 
              cursor: pointer; color: #ffffff; height: 30px; width: 120px;"
            >
              <span 
                style="position: absolute; margin-left: 20px; margin-top: 6px; font-size: 14px;"
              >Продолжить</span>
            </div>
          </div>
          <div style="width: 480px; margin-left: 100px; margin-top: 7px;">
            <span style="font-weight: 400; font-size: 11px;">
              Ключ используется для доступа к макетам и схемам, без него они не будут сохранены. <br> 
              Ключ будет сохранен Вашим браузером, но в отдельных случаях (очистка памяти браузера, переход к другой схеме по внешней ссылке), он может быть утерян. Восстановление ключа в таких случаях не возможно.
            </span>
          </div>
          <span
            style="position: absolute; right: 20px; top: 10px; cursor: pointer; font-size: 22px;"
            onclick="this.closest('.key-management-form-wrapper').remove()"
          >&#10006;</span>
        </div>
      </div>
    `;
    document.body.innerHTML += keyManagementForm;

    const urlParams = new URLSearchParams(window.location.search);
    const mockupGUID = urlParams.get('key');
    if (mockupGUID) {
      document.querySelector('#mockup-guid-input').value = mockupGUID;
      document.querySelector('#key-input-button').onclick();
    }

  } else {
    API.getState().then((res) => {
      importedState = res['result']['result'];
      renderingNeeded = true;
    })
  }
}
