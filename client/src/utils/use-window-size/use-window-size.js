import React from 'react';

/**
 * 
 * @returns {dimensions} [window.innerWidth, window.innerHeight] - the dimentions of the browser window
 * 
 * More details at:
 * https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
 * 
 */
const useWindowSize = () => {

  const [dimensions, setDimensions] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  React.useLayoutEffect(() => {
    const debouncedResizeHandler = debounce(() => {
      setDimensions([window.innerWidth, window.innerHeight]);
    }, 100); // 100ms
    window.addEventListener('resize', debouncedResizeHandler);
    debouncedResizeHandler({});
    return () => window.removeEventListener('resize', debouncedResizeHandler);
  }, []);
  return dimensions;
};

function debounce(fn, ms) {
  let timer;
  return function(_) {
    clearTimeout(timer);
    timer = setTimeout(function(_) {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
};

export default useWindowSize;