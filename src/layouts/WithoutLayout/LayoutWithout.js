import React from 'react';
import styles from "./layout.module.scss"
import {Outlet} from "react-router-dom";

const LayoutWithout = (ctx) => {
  return(
    <div className={styles.wrapper}>
      <main className={styles.content}>
        { ctx.children }
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWithout;