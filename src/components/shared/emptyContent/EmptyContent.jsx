import React from 'react';
import styles from './index.module.scss'
import EmptyIcon from '../icons/EmptyIcon';
import cn from 'classnames';

const EmptyContent = () => {
  return (
    <div className={cn("text-center mb-4", styles.wrapper)}>
      <EmptyIcon/>
      <div className={styles.empty_text}>Здесь пока пусто</div>
    </div>
  );
};

export default EmptyContent;