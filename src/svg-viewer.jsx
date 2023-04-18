import React, { useEffect, useState, useRef } from 'react';
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_AUTO } from 'react-svg-pan-zoom';

const SvgViewer = ({
  height = 500,
  width = 500,
  bracketWidth,
  bracketHeight,
  children,
  startAt = [0, 0],
  scaleFactor = 1.1,
  customToolbar = null,
  lHideMinimap = false,
  ...rest
}) => {
  let oInitialValue = rest.initialValue || INITIAL_VALUE  
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_AUTO);
  const [value, setValue] = useState(oInitialValue);

  useEffect(() => {
    if (!rest.initialValue) {
      Viewer.current.fitToViewer("center", "top")
    }
  }, []);

  const valueChanged = (oNewValue) => {
    // If a function exists to watch the zoom and pan then call it here.
    if (rest.onZoomPan) {
      rest.onZoomPan(oNewValue)
    }
  }

  return (
    <ReactSVGPanZoom
      detectAutoPan={false}
      ref={Viewer}
      scaleFactor={scaleFactor}
      width={Math.min(width, bracketWidth)}
      height={Math.min(height, bracketHeight)}
      tool={tool}
      onChangeTool={setTool}
      onChangeValue={setValue}
      value={value}
      onPan={valueChanged}
      onZoom={valueChanged}
      miniatureProps={{ position: 'right' }}
      customToolbar={customToolbar ?? (() => <></>)}
      customMiniature={lHideMinimap ? () => null : undefined}
      {...rest}
    >
      {children}
    </ReactSVGPanZoom>
  );
};
export default SvgViewer;
