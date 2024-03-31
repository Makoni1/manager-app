import React from 'react';
import style from "./style.module.scss"
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import {useAnimationConfig} from "../../../hooks/useAnimationConfig";

const WrapperContent = ({ children, displayCreateBtn = true }) => {
  const { routeVariants} = useAnimationConfig()
  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      className={style.orders}
    >
      { children }
      { displayCreateBtn && (
        <div className={style.mobile_flex}>
          <Link to={"/orders/create"} className={style.mobile_order_btn}>
            <span className={style.mobile_create_btn}>Создать новый заказ</span>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default WrapperContent;