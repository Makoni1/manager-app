import cn from "classnames";
import styles from "../LeftSideMain.module.scss";
import React, {useState, useEffect, useRef} from "react";


export const LeftSideList = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollPosition, setScrollPosition] = useState("top");

  const rootContent = useRef();

  useEffect(() => {
    const listElement = rootContent.current;

    const handleScroll = () => {
      const scrollTop = listElement.scrollTop;
      setScrollY(scrollTop);

      const scrollHeight = listElement.scrollHeight;
      const clientHeight = listElement.clientHeight;
      const scrollOffset = scrollTop + clientHeight;

      if (scrollOffset >= scrollHeight) {
        setScrollPosition("bottom");
      } else if (scrollOffset >= clientHeight / 2) {
        setScrollPosition("middle");
      } else {
        setScrollPosition("top");
      }
    };

    listElement.addEventListener("scroll", handleScroll);

    return () => {
      listElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const listClassName = cn(styles["navigation-custom__list"], {
    [styles["scroll-middle"]]: scrollPosition === "middle",
    [styles["scroll-bottom"]]: scrollPosition === "bottom",
  });

  return (
    <ul ref={rootContent} className={styles['navigation-custom__list']}>
      {children}
    </ul>
  );
};


