import React from 'react';

const useCheckAuth = (elRef, callback) => {

  /** Single state hook useState for all the state properties */
  const [fullState, setFullState] = React.useState({
    isAuth: false,
  });

  /** Redirect on successfull submission */
  React.useEffect(() => {
    axios
      // const result = await axios
      .get(`/api/users/auth`, config)

      .then((res) => {
        console.log("private route HOC, res =====> ", res);
        setFullState({
          ...fullState,
          isAuth: true,
        });
      })
      .catch((error) => {
        console.log("private route HOC, error =====> ", error.response);
      });
  }, []);

  // const callbackRef = React.useRef();
  // callbackRef.current = callback;

  // React.useEffect(() => {

  //   const handleClickOutside = e => {

  //     if (!elRef?.current?.contains(e.target) && callbackRef.current) 
  //       callbackRef.current(e);
  //   }

  //   document.addEventListener('click', handleClickOutside, true)
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true)
  //   }
  // }, [callbackRef, elRef]);
};

export default useCheckAuth;