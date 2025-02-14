const parsers = {
  'page': pageParser,
  'checkbox1c': checkbox1cParser,
  'textelem': textelemParser,
  'tab1c': tab1cParser,
  'select1c': select1cParser,
  'dbtable1c': table1cParser,
  'uncoloredbutton1c': uncoloredButton1cParser,
  'wrapperform1c': wrapperForm1cParser,
  'yellowbutton1c': yellowButton1cParser,
  'bpmnpool': bpmnpoolParser,
  'bpmnevent': bpmneventParser,
  'bpmntask': bpmntaskParser,
  'arrow': arrowParser,
  'bpmngateway': bpmngatewayParser,
  'bpmndoc': bpmndocParser
};

function prepareStringForStoring(str) {
  return str.trim().replaceAll('"', "&quot;").replaceAll('\\', "/");
}

function pageParser(e) {
  return {
    'type': 'page', 'id': e.id, 'name': e.querySelector('.page-name').innerHTML.trim()
  };
}

function checkbox1cParser(e) {
  let checked;
  if (e.querySelector('.checkbox1c-value-container').checked) {
    checked = 'checked';
  } else {
    checked = '';
  }
  return {
    'type': 'checkbox1c',
    'top': e.style.top,
    'left': e.style.left,
    'id': e.id,
    'checked': checked,
    'name': prepareStringForStoring(e.querySelector('.checkbox1c-name-resize-textarea').innerHTML),
    'nameResizeWidth': e.querySelector('.checkbox1c-name-resize-textarea').style.width,
    'typeElemProp': e.querySelector('#typeElemProp').innerHTML,
    'orientation': e.querySelector('#orientation').innerHTML
  };
}

function textelemParser(e) {
  let checked;
  if (e.querySelector('.element-text-weight-input').checked) {
    checked = 'checked';
  } else {
    checked = '';
  }
  return {
    'type': 'textelem',
    'top': e.style.top,
    'left': e.style.left,
    'id': e.id,
    'color': e.querySelector('.element-text-color-input').value,
    'bold': checked,
    'elementFontSize': e.querySelector('.element-text-font-size-input').value + 'px',
    'name': prepareStringForStoring(e.querySelector('.textelem-name-resize-textarea').innerHTML),
    'nameResizeWidth': e.querySelector('.textelem-name-resize-textarea').style.width,
    'nameResizeHeight': e.querySelector('.textelem-name-resize-textarea').style.height,
    'borderWidth': Number(e.querySelector('.textelem-border-style-container').innerHTML),
    'parentIdPrefix': e.querySelector('.parent-id-prefix-container').innerHTML,
  };
}

function tab1cParser(e) {
  return {
    'type': 'tab1c',
    'top': e.style.top,
    'left': e.style.left,
    'id': e.id,
    'mainResizeHeight': e.querySelector('.tab1c-main-resize-textarea').style.height,
    'mainResizeWidth': e.querySelector('.tab1c-main-resize-textarea').style.width,
    'tabs': Array.from(e.querySelectorAll('.tab1c-name-textarea')).map(x => prepareStringForStoring(x.value)),
    'activeTab': e.querySelector('.select-active-tab').value
  };
}

function select1cParser(e) {
  let options = [];
  e.querySelectorAll('.select1c-alt-option-textarea').forEach((o) => {
    options.push(prepareStringForStoring(o.innerHTML));
  });
  let checkboxesStates = {};
  let namesAndClasses = {
    'displayActionButton': 'select1c-display-action-button',
    'openObjectActionButton': 'select1c-open-object-action-button',
    'pickDateActionButton': 'select1c-pick-date-action-button',
    'pickObjectActionButton': 'select1c-pick-object-action-button',
    'displaySelectButton': 'select1c-display-select-button',
    'noButtons': 'select1c-no-buttons'
  };
  Object.keys(namesAndClasses).forEach((key) => {
    if (e.querySelector(`.${namesAndClasses[key]}`).checked) {
      checkboxesStates[key] = 'checked';
    } else {
      checkboxesStates[key] = '';
    }
  });

  return {
    'type': 'select1c',
    'top': e.style.top,
    'left': e.style.left,
    'id': e.id,
    'leftMargin': e.querySelector('.input-label-margin').value,
    'nameResizeWidth': e.querySelector('.select1c-name-resize-textarea').style.width,
    'displayActionButton': checkboxesStates['displayActionButton'],
    'openObjectActionButton': checkboxesStates['openObjectActionButton'],
    'pickDateActionButton': checkboxesStates['pickDateActionButton'],
    'displaySelectButton': checkboxesStates['displaySelectButton'],
    'pickObjectActionButton': checkboxesStates['pickObjectActionButton'],
    'noButtons': checkboxesStates['noButtons'],
    'options': {
      'selected': prepareStringForStoring(e.querySelector('.select1c-name-resize-textarea').innerHTML),
      'options': options,
    },
    'name': prepareStringForStoring(e.querySelector('.select-name-label').innerHTML)
  };
}

function table1cParser(e) {
  let columns = [];
  e.querySelectorAll('.dbtable1c-column').forEach((column) => {
    let columnData = {'data': []};
    columnData['header'] = prepareStringForStoring(column
      .querySelector('.dbtable1c-header-cell')
      .querySelector('textarea')
      .innerHTML);
    columnData['width'] = column
      .querySelector('.dbtable1c-header-cell')
      .querySelector('textarea').style.width;
    column.querySelectorAll('.dbtable1c-data-cell').forEach((cell) => {
      columnData['data'].push(prepareStringForStoring(cell.querySelector('textarea').innerHTML));
    });
    columns.push(columnData);
  });

  let checkboxesStates = {};
  let namesAndClasses = {
    'removeControls': 'table1c-remove-controls', 'coloredLines': 'table1c-color-lines',
  };
  Object.keys(namesAndClasses).forEach((key) => {
    if (e.querySelector(`.${namesAndClasses[key]}`).checked) {
      checkboxesStates[key] = 'checked';
    } else {
      checkboxesStates[key] = '';
    }
  });

  return {
    'type': 'dbtable1c',
    'top': e.style.top,
    'left': e.style.left,
    'id': e.id,
    'columns': columns,
    'removeControls': checkboxesStates['removeControls'],
    'coloredLines': checkboxesStates['coloredLines'],
    'contentMaxWidth': e.querySelector('.dbtable1c-table').style.maxWidth,
    'scrollPosition': e.querySelector('.dbtable1c-table').scrollLeft
  };
}

function uncoloredButton1cParser(e) {
  return {
    'type': 'uncoloredbutton1c',
    'top': e.style.top,
    'left': e.style.left,
    'id': e.id,
    'name': prepareStringForStoring(e.querySelector('.uncoloredbutton1c-name-resize-textarea').innerHTML),
    'nameResizeWidth': e.querySelector('.uncoloredbutton1c-name-resize-textarea').style.width,
  };
}

function wrapperForm1cParser(e) {
  let taxi = 'checked';
  if (!e.querySelector('.display-taxi-navbar').checked) {
    taxi = '';
  }
  let abstractStyling = 'checked';
  if (!e.querySelector('.apply-abstract-styling').checked) {
    abstractStyling = '';
  }
  return {
    'type': 'wrapperform1c',
    'top': e.style.top,
    'left': e.style.left,
    'id': e.id,
    'name': prepareStringForStoring(e.querySelector('.wrapperform1c-name-resize-textarea').innerHTML),
    'taxi': taxi,
    'abstractStyling': abstractStyling,
    'nameResizeWidth': e.querySelector('.wrapperform1c-name-resize-textarea').style.width,
    'mainResizeHeight': e.querySelector('.wrapperform1c-main-resize-textarea').style.height,
    'mainResizeWidth': e.querySelector('.wrapperform1c-main-resize-textarea').style.width,
  };
}

function yellowButton1cParser(e) {
  return {
    'type': 'yellowbutton1c',
    'top': e.style.top,
    'left': e.style.left,
    'id': e.id,
    'name': prepareStringForStoring(e.querySelector('.yellowbutton1c-name-resize-textarea').innerHTML),
    'nameResizeWidth': e.querySelector('.yellowbutton1c-name-resize-textarea').style.width,
  };
}

function bpmnpoolParser(e) {
  let lanesElements = e.querySelectorAll('.bpmnpool-lane');
  let lanes = [...lanesElements].map((laneElem) => {
    return {
      'name': prepareStringForStoring(laneElem.querySelector('.pool-lane-name').innerHTML),
      'height': laneElem.style.height.replace('px',''),
      'width': laneElem.style.width.replace('px',''),
    };
  });
  return {
    'type': 'bpmnpool',
    'top': e.style.top,
    'left': e.style.left,
    'idPool': e.id,
    'poolName': prepareStringForStoring(e.querySelector('.pool-name').innerHTML),
    'lanes': lanes,
  };
}

function bpmntaskParser(e) {
  return {
    'type': 'bpmntask',
    'top': e.style.top,
    'left': e.style.left,
    'taskWidth': e.querySelector('.bpmntask-wrapper').style.width,
    'taskHeight': e.querySelector('.bpmntask-wrapper').style.height,
    'taskText': e.querySelector('textarea').value,
    'taskType': e.querySelector('.task-type-input').value,
    'firstTaskActivity': e.querySelector('.first-task-activity-input').value,
    'secondTaskActivity': e.querySelector('.second-task-activity-input').value,
    'id': e.id
  };
}

function bpmneventParser(e) {
  let isThrowing = 'checked';
  if (!e.querySelector('.event-is-throwing-input').checked) {
    isThrowing = '';
  }
  let isBreaking = 'checked';
  if (!e.querySelector('.event-is-breaking-input').checked) {
    isBreaking = '';
  }
  return {
    'type': 'bpmnevent',
    'top': e.style.top,
    'left': e.style.left,
    'eventType': e.querySelector('.event-type-input').value,
    'eventLocation': e.querySelector('.event-location-input').value,
    'isThrowing': isThrowing,
    'isBreaking': isBreaking,
    'id': e.id
  };
}

function bpmngatewayParser(e) {
  return {
    'type': 'bpmngateway',
    'top': e.style.top,
    'left': e.style.left,
    'gatewayType': e.querySelector('.gateway-type-input').value,
    'id': e.id
  };
}

function arrowParser(e) {

  let arrowMarker = '';
  if (e.querySelector('.arrow-marker').innerHTML === 'checked') {
    arrowMarker = 'checked';
  }

  return {
    'type': 'arrow',
    'idPool': e.querySelector('.arrow-id-pool').innerHTML,
    'startCoords': [
      Number(e.querySelector('.arrow-start-coords-0').innerHTML),
      Number(e.querySelector('.arrow-start-coords-1').innerHTML)],
    'endCoords': [
      Number(e.querySelector('.arrow-end-coords-0').innerHTML),
      Number(e.querySelector('.arrow-end-coords-1').innerHTML)],
    'pathType': e.querySelector('.arrow-path-type').innerHTML,
    'id': e.id,
    'handleTypes': [
      e.querySelector('.arrow-handle-types-0').innerHTML,
      e.querySelector('.arrow-handle-types-1').innerHTML],
    'arrowMarker': arrowMarker,
  };
}

function bpmndocParser(e) {
  return {
    'type': 'bpmndoc',
    'top': e.style.top,
    'left': e.style.left,
    'id': e.id
  };
}

function transformElementToJSON(elem) {
  let jsonRepr = false;
  Object.keys(parsers).forEach((classname) => {
    if (elem.classList.contains(classname)) {
      jsonRepr = parsers[classname](elem);
      for (let key in jsonRepr) {
        if (typeof jsonRepr[key] === 'string') {
          jsonRepr[key] = jsonRepr[key].replaceAll('"', "'");
        }
      }
    }
  });
  return jsonRepr;
}

function treeCrawler(nodes) {
  let forest = [];
  while (nodes.length) {
    let currentNode = nodes.pop();
    let currentNodeJSONRepr = transformElementToJSON(currentNode);
    if (currentNode.children) {
      currentNodeJSONRepr.children = treeCrawler(Array.from(currentNode.children));
    }
    if (currentNodeJSONRepr) {
      forest.push(currentNodeJSONRepr);
    }
  }
  return forest;
}

function getState(parseDOM = false, replacementPage = false) {
  let currentState = {activePageID: null, pagesList: []};
  document.querySelectorAll('.page').forEach((e) => {
    if (e.style.display === 'block') {
      currentState.activePageID = e.id;
    }
    currentState.pagesList.push({id: e.id, name: e.querySelector('.page-name').innerHTML});
  });
  if (parseDOM) {
    currentState.elements = treeCrawler(Array.from(document.querySelectorAll('.page')));
  }
  if (parseDOM && replacementPage) {
    let i = 0;
    let flag = 0;
    currentState.elements.forEach((elem)=>{
      if (elem.id !== replacementPage.id && !flag) {
        i++;
      } else {
        flag = 1;
      }
    });
    if (flag) {
      currentState.elements[i] = replacementPage;
    }
  }
  return currentState;
}

function pageRenderer(props, activePageID) {
  let _display = 'none';
  if (props['id'] === activePageID) {
    _display = 'block';
  }
  return `
    <div style="display: ${_display};" class="page" id=${props['id']}>
      <div class="page-name" style="display: none;">${props['name']}</div>
    </div>
  `;
}

const renderers = {
  'page': pageRenderer,
  'checkbox1c': checkbox1cRenderer,
  'textelem': textRenderer,
  'tab1c': tab1cRenderer,
  'select1c': select1cRenderer,
  'dbtable1c': table1cRenderer,
  'uncoloredbutton1c': uncoloredButton1cRenderer,
  'wrapperform1c': wrapperForm1cRenderer,
  'yellowbutton1c': yellowButton1cRenderer,
  'bpmntask': bpmntaskRenderer,
  'bpmnevent': bpmneventRenderer,
  'bpmnpool': bpmnpoolRenderer,
  'arrow': arrowRenderer,
  'bpmngateway': bpmngatewayRenderer,
  'bpmndoc': bpmndocRenderer
};

function createElementFromHTML(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function transformJSONtoHTML(props, activePageID) {
  if (props['type'] === 'page') {
    return renderers[props['type']](props, activePageID);
  } else {
    return renderers[props['type']](props);
  }
}

function treeGrower(nodes, activePageID, returnChildren) {
  let tree = document.createElement('div');
  let numOfRenderedPages = 0;
  while (nodes.length) {
    let currentNodeJSON = nodes.pop();
    if (currentNodeJSON['type'] === 'page') {
      numOfRenderedPages += 1;
    }
    let currentNodeHTML = transformJSONtoHTML(currentNodeJSON, activePageID).trim();
    let currentNodeElem = createElementFromHTML(currentNodeHTML);
    if (currentNodeJSON['children'].length) {
      currentNodeElem.insertAdjacentHTML(
        'beforeend',
        treeGrower(currentNodeJSON['children'], activePageID, true)
      );
      tree.appendChild(currentNodeElem);
    } else {
      tree.appendChild(currentNodeElem);
    }
  }
  if (returnChildren) {
    return tree.innerHTML;
  } else {
    return tree;
  }
}

function applyPostEffects() {
  document.querySelectorAll('.wrapperform1c').forEach(form => {
    if (form.querySelector('.apply-abstract-styling').checked) {
      applyAbstractStyling(form.id);
      applyScrolbarPositions();
    }
  });
}

function renderState() {
  if (!importedState || Object.keys(importedState).length === 0) {
    document.body.innerHTML = `
      <div style="display: block;" class="page" id="_1">
        <div class="page-name" style="display: none;">Экран 1</div>
      </div>
    `;
  } else {
    document.body.innerHTML = treeGrower(importedState.elements, importedState.activePageID, false)
      .innerHTML;
    document.body.innerHTML += `
      <div style="font-family: 'JetBrains Mono', serif; color: #FFFFFF; position: absolute;">.</div>
      <div id="scroll-crutch" style="width: 3000px; height: 1000px; z-index: 0; position: absolute; 
        top: calc(120% + 1px); left: calc(120% + 1px);"></div>
    `;
    document.querySelectorAll('.wrapperform1c, .bpmnpool').forEach((e) => {
      if (Number(e.id.split('-')[2]) >= formCounter) {
        formCounter = Number(e.id.split('-')[2]) + 1;
      }
    });
  }
  renderMainMenu();
  applyPostEffects();
}

function runStateDemon() {
  setInterval(() => {
    if (autosaveIsOn && changesRegistered) {
      API.setState().then(() => {
        changesRegistered = false;
      });
      console.log('changes were sent to server');
    }
    if (checkLocalStorageForMockupGUID && localStorage.getItem('mockupGUID')) {
      fillMockupGUIDInput();
      checkLocalStorageForMockupGUID = false;
      console.log('new key was set');
    }
    if (renderingNeeded) {
      renderState();
      renderingNeeded = false;
      if (showTooltips) {
        runTooltipRotationDaemon();
      }
      console.log('state was rendered');
    }
    document.querySelectorAll('.draggable').forEach((e) => {
      dragElement(e);
    });
  }, stateDemonTimeout * 1000);
}

runStateDemon();
