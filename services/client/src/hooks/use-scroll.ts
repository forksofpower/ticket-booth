import React from "react";
import { useEvent, useLifecycles, useMount } from "react-use";

import { isClient } from "@/utils/predicates";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  useEvent(
    "beforeunload",
    () => {
      localStorage.setItem("lastScrollY", scrollPosition.toString());
    },
    isClient ? window : null
  );

  useMount(() => {
    const lastScrollY = localStorage.getItem("lastScrollY");

    if (lastScrollY) {
      setScrollPosition(parseInt(lastScrollY));
    }
  });

  React.useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
