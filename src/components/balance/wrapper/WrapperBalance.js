import React from 'react';
import { motion } from "framer-motion";
import {useAnimationConfig} from "../../../hooks/useAnimationConfig";

const WrapperBalance = ({ children }) => {
    const { routeVariants} = useAnimationConfig()
    return (
        <motion.div
          variants={routeVariants}
          initial="initial"
          animate="final"
        >
            { children }
        </motion.div>
    );
};

export default WrapperBalance;