import { useEffect, useState } from "react";

export const useResize = () => {
    const [windowWidth, setWindowWidth] = useState();

    useEffect(() => {
      function handleResize() {
        if (window.innerWidth < 576) {
            setWindowWidth('xs');
        } else if (window.innerWidth > 575 && window.innerWidth < 768) {
            setWindowWidth('sm');
        } else if (window.innerWidth > 767 && window.innerWidth < 992) {
            setWindowWidth('md')
        } else if (window.innerWidth > 991 && window.innerWidth < 1200) {
            setWindowWidth('lg')
        } else if (window.innerWidth > 1199) {
            setWindowWidth('xl')
        }
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []); 
    return windowWidth;
  }