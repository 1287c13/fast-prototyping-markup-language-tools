function drawArrowOnmousemove(event) {
  arrow(
    mockAppGlobals.arrowParentElemID,
    mockAppGlobals.initialArrowCoords,
    [event.clientX - mockAppGlobals.arrowParentCoords[0],
      event.clientY - mockAppGlobals.arrowParentCoords[1]],
    'straight'
  );
  document.querySelector('#arrow-in-process').remove();
}

function handleOpacityOnmouseout(e) {
  e.querySelectorAll('.arrow-handle').forEach((handle) => {
    handle.style.opacity = '0';
  });
  e.querySelectorAll('.handle-resizer').forEach((handle) => {
    handle.style.opacity = '0';
  });
}

function handleOpacityOnmouseenter(e) {
  e.querySelectorAll('.arrow-handle').forEach((handle) => {
    handle.style.opacity = '1';
  });
  e.querySelectorAll('.handle-resizer').forEach((handle) => {
    handle.style.opacity = '1';
  });
}

function switchDocumentEventsForArrowDrawing() {
  document.onmousemove = drawArrowOnmousemove;
  document.onmouseup = () => {
    document.querySelector('#arrow-in-process').remove();
    document.onmousemove = () => {};
    document.querySelectorAll('.arrow-handle').forEach((handle) => {
      handle.style.opacity = '0';
    });
  }
}

function getArrowHandle(_top, _left, handlePosition) {
  let handleSide = 'topdown';
  if (handlePosition === 'left' || handlePosition === 'right') {
    handleSide = 'leftright';
  }
  return `
    <div
      class="arrow-handle ${handleSide} ${handlePosition}-handle"
      style="position: absolute; top: ${_top}; left: ${_left}; background-color: #c50000; border-radius: 5px;
        width: 7px; height: 7px; cursor: crosshair; opacity: 0; z-index: 9999;"
      onmousedown="this.closest('.element-main-wrapper').querySelectorAll('.drag-handle').forEach(() => {
        mockAppGlobals.initialArrowCoords = [
          this.closest('.element-main-wrapper').offsetLeft + this.offsetLeft, 
          this.closest('.element-main-wrapper').offsetTop + this.offsetTop
        ];
        mockAppGlobals.arrowParentCoords = [
          this.closest('.bpmnpool').offsetLeft, 
          this.closest('.bpmnpool').offsetTop
        ];
        mockAppGlobals.arrowParentElemID = this.closest('.bpmnpool').id;
        mockAppGlobals.arrowParentHandleSide = 'topdown';
        if (this.classList.contains('leftright')) {
          mockAppGlobals.arrowParentHandleSide = 'leftright';
        }
        document.querySelectorAll('.arrow-handle').forEach((handle) => {
          handle.style.opacity = '1';
        })
        document.querySelector('html').style.cursor = 'grabbing';
      })"
      onmouseup="this.closest('.element-main-wrapper').querySelectorAll('.drag-handle').forEach(() => {
        let endHandleSide = 'topdown';
        if (this.classList.contains('leftright')) {
          endHandleSide = 'leftright';
        }
        arrow(
          mockAppGlobals.arrowParentElemID,
          [mockAppGlobals.initialArrowCoords[0] + 4, mockAppGlobals.initialArrowCoords[1] + 4],
          [this.closest('.element-main-wrapper').offsetLeft + this.offsetLeft + 4, 
            this.closest('.element-main-wrapper').offsetTop + this.offsetTop + 4],
          'manhattan',
          '',
          [mockAppGlobals.arrowParentHandleSide, endHandleSide],
          'checked'
        );
        document.querySelectorAll('.arrow-handle').forEach((handle) => {
          handle.style.opacity = '0';
        });
        document.querySelector('html').style.cursor = '';
      })"
    ></div>
  `;
}
