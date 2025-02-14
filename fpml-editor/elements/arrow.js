function getArrowSVG(props) {
  props.h = Math.round(props.h);
  if (props.x1 === undefined || props.y1 === undefined || props.x2 === undefined || props.y2 === undefined) {
    return `
      <svg style="display: block;"
        width="${props.w}"
        height="${props.h}" 
        viewBox="0 0 ${props.w} ${props.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
      </svg>
    `;
  } else if (props.pathType === 'straight-dashed') {
    return `
      <svg style="display: block;"
        width="${props.w}"
        height="${props.h}" 
        viewBox="0 0 ${props.w} ${props.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M ${props.x1} ${props.y1} L ${props.x2} ${props.y2}" stroke="#777777" stroke-dasharray="4"/>
      </svg>
    `;
  } else if (props.pathType === 'arrowToClosingGateway') {
    return `
      <svg style="display: block;"
        width="${props.w}"
        height="${props.h}" 
        viewBox="0 0 ${props.w} ${props.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M ${props.x1} ${props.y1} H${props.x2 - mockAppGlobals.bpmnRendererConfig.horIndent / 2} 
          V${props.y2} H${props.x2}" stroke="#777777"/>
      </svg>
    `;
  } else if (props.pathType === 'manhattan') {
    if (props.handleTypes[0] === 'leftright'
      && props.handleTypes[1] === 'leftright'
      && props.h < 10
    ) {
      return `
        <svg style="display: block;"
          width="${props.w}"
          height="${props.h}" 
          viewBox="0 0 ${props.w} ${props.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M ${props.x1} ${props.y1} H${props.x2}" stroke="#777777"/>
        </svg>
      `;
    } else if (props.handleTypes[0] === 'leftright'
        && props.handleTypes[1] === 'leftright'
    ) {
      return `
        <svg style="display: block;"
          width="${props.w}"
          height="${props.h}" 
          viewBox="0 0 ${props.w} ${props.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M ${props.x1} ${props.y1} H${props.x2 / 2} V${props.y2} H${props.x2}" stroke="#777777"/>
        </svg>
      `;
    } else if (props.handleTypes[0] === 'topdown'
        && props.handleTypes[1] === 'leftright'
    ) {
      return `
        <svg style="display: block;"
          width="${props.w}"
          height="${props.h}" 
          viewBox="0 0 ${props.w} ${props.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M ${props.x1} ${props.y1} V${props.y2} H${props.x2}" stroke="#777777"/>
        </svg>
      `;
    } else if (props.handleTypes[0] === 'leftright'
        && props.handleTypes[1] === 'topdown'
    ) {
      return `
        <svg style="display: block;"
          width="${props.w}"
          height="${props.h}" 
          viewBox="0 0 ${props.w} ${props.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M ${props.x1} ${props.y1} H${props.x2} V${props.y2}" stroke="#777777"/>
        </svg>
      `;
    } else if (props.handleTypes[0] === 'topdown'
      && props.handleTypes[1] === 'topdown'
      && props.w < 10
    ) {
      return `
        <svg style="display: block;"
          width="${props.w}"
          height="${props.h}" 
          viewBox="0 0 ${props.w} ${props.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M ${props.x1} ${props.y1} V${props.y2}" stroke="#777777"/>
        </svg>
      `;
    } else if (props.handleTypes[0] === 'topdown'
        && props.handleTypes[1] === 'topdown'
    ) {
      return `
        <svg style="display: block;"
          width="${props.w}"
          height="${props.h}" 
          viewBox="0 0 ${props.w} ${props.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M ${props.x1} ${props.y1} V${props.y2 / 2} H${props.x2} V${props.y2}" stroke="#777777"/>
        </svg>
      `;
    }
  }
}

function getArrowMarkerSVG(props) {
  if (props.arrowMarker) {
    return `
      <svg style="display: block;" width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 6L0.334936 0.75L4.66506 0.75L2.5 6Z" fill="black"/>
      </svg>
    `;
  } else {
    return '';
  }
}

function arrowRenderer(props) {
  props.arrowMarkerBool = false;
  if (props.arrowMarker === 'checked') {
    props.arrowMarkerBool = true;
  }
  props.w = Math.abs(props.endCoords[0] - props.startCoords[0]) || 1;
  props.h = Math.abs(props.endCoords[1] - props.startCoords[1]) || 1;
  if (props.endCoords[0] >= props.startCoords[0] && props.endCoords[1] >= props.startCoords[1]) {
    props.x1 = 0;
    props.x2 = props.w;
    props.y1 = 0;
    props.y2 = props.h;
    props.canvasLeft = props.startCoords[0];
    props.canvasTop = props.startCoords[1];
    if (props.arrowMarkerBool
      && props.handleTypes[0] === 'topdown'
      && props.handleTypes[1] === 'topdown'
      && props.w < 10) {
      props.markerTop = 'calc(100% - 7px)';
      props.markerRight = 'calc(100% - 3px)';
      props.markerRotate = '0';
    } else if (props.arrowMarkerBool
      && props.handleTypes[0] === 'leftright'
      && props.handleTypes[1] === 'leftright'
      && props.h < 10) {
      props.markerTop = '-3px';
      props.markerRight = '2px';
      props.markerRotate = '-90deg';
    } else if (props.arrowMarkerBool) {
      if (props.handleTypes[1] === 'topdown') {
        props.markerTop = 'calc(100% - 6px)';
        props.markerRight = '-2px';
        props.markerRotate = '0deg';
      } else {
        props.markerTop = 'calc(100% - 3.5px)';
        props.markerRight = '1px';
        props.markerRotate = '-90deg';
      }
    }
  } else if (props.endCoords[0] < props.startCoords[0] && props.endCoords[1] >= props.startCoords[1]) {
    props.x1 = props.w;
    props.x2 = 0;
    props.y1 = 0;
    props.y2 = props.h;
    props.canvasLeft = props.startCoords[0] - props.w;
    props.canvasTop = props.startCoords[1];
    if (props.arrowMarkerBool
      && props.handleTypes[0] === 'topdown'
      && props.handleTypes[1] === 'topdown'
      && props.w < 10) {
      props.markerTop = 'calc(100% - 7px)';
      props.markerRight = 'calc(100% - 6px)';
      props.markerRotate = '0';
    } else if (props.arrowMarkerBool) {
      if (props.handleTypes[1] === 'topdown') {
        props.markerTop = 'calc(100% - 7px)';
        props.markerRight = 'calc(100% - 2.8px)';
        props.markerRotate = '0deg';
      } else {
        props.arrowMarkerBool = false;
      }
    }
  } else if (props.endCoords[0] < props.startCoords[0] && props.endCoords[1] < props.startCoords[1]) {
    props.x1 = props.w;
    props.x2 = 0;
    props.y1 = props.h;
    props.y2 = 0;
    props.canvasLeft = props.startCoords[0] - props.w;
    props.canvasTop = props.startCoords[1] - props.h;
    if (props.w < 10) {
      props.markerTop = '0';
      props.markerRight = '-2px';
      props.markerRotate = '180deg';
    } else {
      props.arrowMarkerBool = false;
      props.arrowMarker = '';
    }
  } else if (props.endCoords[0] >= props.startCoords[0] && props.endCoords[1] < props.startCoords[1]) {
    props.x1 = 0;
    props.x2 = props.w;
    props.y1 = props.h;
    props.y2 = 0;
    props.canvasLeft = props.startCoords[0];
    props.canvasTop = props.startCoords[1] - props.h;
    if (props.arrowMarkerBool
      && props.handleTypes[0] === 'leftright'
      && props.handleTypes[1] === 'leftright'
      && props.h < 10) {
      props.markerTop = 'calc(100% - 3px)';
      props.markerRight = '2px';
      props.markerRotate = '-90deg';
    } else if (props.arrowMarkerBool) {
      if (props.handleTypes[1] === 'topdown') {
        props.markerTop = '0';
        props.markerRight = '-2px';
        props.markerRotate = '180deg';
      } else {
        props.markerTop = '-2.7px';
        props.markerRight = '1px';
        props.markerRotate = '-90deg';
      }
    }
  }
  return `
    <div
      class="arrow"
      id="${props.id}"
      onmouseout="this.querySelectorAll('.arrow-hover-visible').forEach((e)=>{e.style.display='none'})"
      onmouseover="this.querySelectorAll('.arrow-hover-visible').forEach((e)=>{e.style.display='flex'})"
      style="position: absolute; top: ${props.canvasTop}px; left: ${props.canvasLeft}px; font-weight: 400;
        display: flex; flex-direction: column; align-items: start; border-radius: 4px;">
      <div class="arrow-props">
        <div class="arrow-id-pool" style="display: none;">${props.idPool}</div>
        <div class="arrow-start-coords-0" style="display: none;">${props.startCoords[0]}</div>
        <div class="arrow-start-coords-1" style="display: none;">${props.startCoords[1]}</div>
        <div class="arrow-end-coords-0" style="display: none;">${props.endCoords[0]}</div>
        <div class="arrow-end-coords-1" style="display: none;">${props.endCoords[1]}</div>
        <div class="arrow-path-type" style="display: none;">${props.pathType}</div>
        <div class="arrow-handle-types-0" style="display: none;">${props.handleTypes[0] || ''}</div>
        <div class="arrow-handle-types-1" style="display: none;">${props.handleTypes[1] || ''}</div>
        <div class="arrow-marker" style="display: none;">${props.arrowMarker}</div>
      </div>
      <div class="arrow-wrapper" style="position: absolute; width: ${props.w}; height: ${props.h};
        z-index: 7900;"
        onmouseenter="this.querySelector('.arrow-delete-button').style.opacity = '1'"
        onmouseleave="this.querySelector('.arrow-delete-button').style.opacity = '0'"
      >
        ${getArrowSVG(props)}
        <div
          style="position: absolute; top: ${props.markerTop}; right: ${props.markerRight}; height: 6px; 
            width: 5px; rotate: ${props.markerRotate};"
        >
          ${getArrowMarkerSVG(props)}
          <div class="arrow-delete-button" 
            style="height: 15px; width: 15px; position: absolute; top: -18px; right: -8px; cursor: pointer;
            font-weight: normal; font-size: 10px; opacity: 0;"
            onmouseenter="this.style.fontWeight = 'bold'"
            onmouseout="this.style.fontWeight = 'normal'"
            onclick="this.closest('.arrow').remove()"
          >&#10006</div>
        </div>
      </div>
    </div>
  `;
}

function handleBpmnAssociationDrawingEvent(x, y, id) {
  const contextMenuSvgString = `
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16.5" y="11.5" width="12" height="17" rx="4.5" fill="white" stroke="black"/>
      <line x1="22.5" y1="12" x2="22.5" y2="19" stroke="black"/>
      <path d="M24 13H25C26.1046 13 27 13.8954 27 15V19H24V13Z" fill="black"/>
      <path d="M7.84362 12.1319L6.41752 18.4068C6.30158 18.9169 5.57921 18.929 5.44635 18.423L0.876216 1.01939L16.2339 9.72364C16.6704 9.97102 16.5113 10.6353 16.0101 10.6581L9.23821 10.9659C8.56396 10.9966 7.99321 11.4738 7.84362 12.1319Z" fill="black" stroke="black"/>
    </svg>`;

  const idPool = 'bpmn-pool-' + id;
  let pool = document.querySelector('#' + idPool);
  let poolXCoord = Number(pool.style.left.replace('px', ''));
  let poolYCoord = Number(pool.style.top.replace('px', ''));
  if (mockAppGlobals.associationDrawingIsInProcess) {
    arrow(
      idPool,
      [
        mockAppGlobals.initialAssociationCoords[0] - poolXCoord,
        mockAppGlobals.initialAssociationCoords[1] - poolYCoord],
      [x - poolXCoord, y - poolYCoord],
      'straight-dashed',
      '',
      '',
      ''
    );
  }
  mockAppGlobals.initialAssociationCoords = mockAppGlobals.associationDrawingIsInProcess ? null : [x, y];
  if (!mockAppGlobals.associationDrawingIsInProcess) {
    document.querySelector('html').style.cursor = svgToBase64Url(contextMenuSvgString, 30, 30);
    mockAppGlobals.associationDrawingIsInProcess = true;
  } else {
    document.querySelector('html').style.cursor = svgToBase64Url(regularSvgString, 20, 23);
    mockAppGlobals.associationDrawingIsInProcess = false;
  }
}

function arrow(
  idPool,
  startCoords,
  endCoords,
  pathType,
  id = 'arrow-in-process',
  handleTypes = [],
  arrowMarker = '') {
  let props = {'idPool': idPool, 'startCoords': startCoords, 'endCoords': endCoords, 'pathType': pathType, 'id': id,
  'handleTypes': handleTypes, 'arrowMarker': arrowMarker};
  if (startCoords[0] !== endCoords[0] && startCoords[1] !== endCoords[1]) {
    document.querySelector(`#${idPool}`).innerHTML += arrowRenderer(props);
  }
}