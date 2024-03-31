import React from 'react';
  import styles from './BurgerMenu.module.scss'
import cn from "classnames";
const BurgerMenu = ({toggleBurgerMenu, className, isHide = false, isBurgerMenuOpen }) => {
  const handleClick = () => {
    toggleBurgerMenu(!isBurgerMenuOpen);
  };
  return (
    <div>
      <button className={cn(styles.burger, className, { [styles.hide]: isHide })}
              onClick={handleClick}>
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H19.4167M1 7.5H19.4167M1 14H19.4167" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>

      </button>
    </div>
  );
};

export default BurgerMenu;