function showTooltip(tooltipID=0) {
  let tooltipsContents = {
  0: 'Чтобы добавить новый макет, щелкните правой кнопкой мыши в любом свободном месте экрана и выберите элемент,' +
    ' который хотите создать (макет UI или BPMN схему). Вы также можете создать новый макет по текстовому описанию.',
  1: 'Щелкните правой кнопкой на макете или схеме чтобы добавить новый элемент на этот макет или схему.',
  2: 'Дважды щёлкните на любом элементе или тексте, чтобы отредактировать его.',
  3: 'Вы можете генерировать макеты по текстовому описанию, для этого нажмите на кнопку <b>&lt;/&gt;</b> в меню.' +
    ' В открывшемся редакторе доступен синтаксический помошник: используйте клавишу "Alt" для открытия списка ' +
    'вариантов ввода, клавиши "вверх/вниз" - для выбора подходящего варианта и клавишу "Tab" для автоподстановки ' +
    'выбранного значения в текст.',
  4: 'Чтобы поделиться схемой, отправьте ссылку на нее. Ссылка доступна в одном из пунктов главного меню (третья' +
    ' кнопка сверху). Имейте в виду, что пользователь, который пройдет по ссылке, получит права на просмотр и ' +
    'редактирование всех схем и экранов доступных по данному ключу',
  5: 'Не забудьте сохранить схемы (нажать пиктограмму сохранения в главном меню) перед закрытием окна. Автосохранение' +
    ' выполняется при некоторых действиях, но сохранность данных гарантируется только при ручном сохранении.',
  6: 'Для создания, копирования, удаления и перехода между экранами используйте контекстное меню (правая клавиша ' +
    'мыши на любом пустом месте экрана).',
  7: 'Это бета версия приложения, некоторые функции находятся в разработке и будут добавлены позже. Если у Вас есть ' +
    'идеи, пожелания или вопросы, пожалуйста, <a href="https://t.me/ArtyomKonovalov">напишите мне</a>.',
  };

  tooltipID = (tooltipID > Object.keys(tooltipsContents).length - 1) ? 0 : tooltipID;

  let tooltipHTML = renderTooltip({'tooltipID': tooltipID, 'tooltipContent': tooltipsContents[tooltipID]});

  let actualTooltip = document.querySelector('#tooltip');
  if (actualTooltip) {
  actualTooltip.style.opacity = '0';
  setTimeout(() => {document.querySelector('#tooltip').remove()}, 500);
  }

  setTimeout(() => {
  document.body.insertAdjacentHTML('beforeend', tooltipHTML);
  document.querySelector('#tooltip').style.opacity = '1';
  }, 500);

}

function rotateTooltip(manual=false) {
  let tooltipID = Number(document.querySelector('#tooltip-id').innerHTML);
  showTooltip(tooltipID + 1);
}

function removeTooltip() {
  if (document.querySelector('#tooltip')) {
  document.querySelector('#tooltip').remove();
  }
  showTooltips = false;
  clearInterval(tooltipDaemonID);
}

function renderTooltip(props) {
  return `
  <div id="tooltip" style="width: 500px; height: 100px; background-color: #FFFFFF; 
    box-shadow: 0 3px 6px rgba(0, 0, 0, 1); top: ${window.innerHeight - 200}px; left: ${window.innerWidth - 600}px;
    position: absolute; font-weight: 400; padding: 42px 20px 20px 20px; opacity: 0; 
    transition: opacity 0.5s cubic-bezier(.6,0,.3,1); z-index: 9999;">
    <data style="display: none;" id="tooltip-id">${props['tooltipID']}</data>
    <span style="color: black; position: absolute; right: 20px; top: 10px; cursor: pointer; font-size: 22px;" 
    onclick="removeTooltip()">✖</span>
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px;">${props['tooltipContent']}</div>
    <span style="position: absolute; bottom: 15px; right: 30px; font-size: 11px; color: #0000FF;
    cursor: pointer;" onclick="rotateTooltip()">СЛЕДУЮЩАЯ ПОДСКАЗКА >>></span>
  </div>
  `;
}

function runTooltipRotationDaemon() {
  if (window.innerWidth > 624 && window.innerHeight > 574) {
  let urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.get('no_tooltips')) {
    showTooltip(Math.floor(Math.random() * 7));
    tooltipDaemonID = setInterval(rotateTooltip, mockAppGlobals.tooltipRotationTimeout);
  }
  }
}
