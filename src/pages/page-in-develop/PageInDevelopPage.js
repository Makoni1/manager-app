import React, {useState} from 'react';
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import {useAnimationConfig} from "../../hooks/useAnimationConfig";
import ToolsIcon from '../../components/shared/icons/ToolsIcon';
import SupportModal from '../../components/shared/SupportModal';

const PageInDevelopPage = () => {
  const { routeVariants} = useAnimationConfig()
  const [supportModal, setSupportModal] = useState(false)
    return (
        <motion.div
          variants={routeVariants}
          initial="initial"
          animate="final"
          className={styles.develop}
        >
           <ToolsIcon />
           <span
             className={styles.text}
           >
             Раздел находится в разработке
           </span>
           <button
             type={"button"}
             className={styles.button}
             onClick={() => setSupportModal(true)}
           >
              Обратная связь
           </button>

           {supportModal && <SupportModal
              display={supportModal}
              onClose={() => {setSupportModal(false)}}
              displayHeader={false}
           />}
        </motion.div>
    );
};

export default PageInDevelopPage;