import React, {useEffect, useState} from 'react';
import BurgerMenu from "../burger/BurgerMenu";
import cn from "classnames";
import LeftSideMain from "../LeftSideMain/LeftSideMain";
import styles from "./MainMenu.module.scss"
import {useWindowSize} from "../../../hooks/useWindowSize";

const MainMenu = () => {
  const { isMobile } = useWindowSize()
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = (val) => {
    setIsBurgerMenuOpen(val);
  };

  return (
    <>
      <BurgerMenu className={cn({[styles.display]: isMobile })}
                  toggleBurgerMenu={toggleBurgerMenu}
                  isBurgerMenuOpen={isBurgerMenuOpen}
                  isHide
      />
      <LeftSideMain
        className={cn({[styles.hide]: isMobile,
          [styles.display]: isBurgerMenuOpen
        })}
        isOpen={isBurgerMenuOpen}
        onCloseMenu={() => setIsBurgerMenuOpen(false)}
      />
    </>
  );
};

export default MainMenu;