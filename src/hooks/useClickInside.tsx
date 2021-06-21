import React, { MutableRefObject, useEffect } from "react";
type Ref = MutableRefObject<HTMLElement | null>;
const useClickInside = (ref: Ref, callback: () => void) => {
  useEffect(() => {
    const handler = (event: any) => {
      if (ref?.current && ref?.current.contains(event?.target)) {
        callback();
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
};

export default useClickInside;
