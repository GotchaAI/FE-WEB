import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const rootContainer = document.querySelector(".root-layout-container");
    if (rootContainer) {
      rootContainer.scrollTo(0, 0);
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
