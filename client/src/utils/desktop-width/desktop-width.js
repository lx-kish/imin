import useWindowSize from '../use-window-size/use-window-size';

const DesktopWidth = () => {

  const [ width, height ] = useWindowSize();

  return width > 1040;
};

export default DesktopWidth;