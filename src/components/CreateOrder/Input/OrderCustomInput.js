import React from 'react';
import styles from './OrderCustomInput.module.scss';

export default function OrderCustomInput ({ value, onChange })  {
    return (
        <input
            className={styles['custom__input']}
            value={value}
            onChange={onChange}
        />
    );
};


