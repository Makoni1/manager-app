import React from 'react';
import styles from "./layout.module.scss"
import MainMenu from "../../components/sidebar/mainMenu/MainMenu";
import {Outlet} from "react-router-dom";

const LayoutMain = ({children, ...rest}) => {

  return(
    <div className={styles.wrapper}>
     <MainMenu />
      <main className={`${styles.content}`}>
        { children }
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutMain;