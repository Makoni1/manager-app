import React from 'react';
import style from "../common.module.scss"
import cn from "classnames";

const BalanceSectionItemWrapper = ({ title, children, isCompact, column = 1, isEditable }) => {
    return (
        <div className={cn(style.wrapper, {[style.isCompact]: isCompact})}>
            { title && (
                <div className={style.headerSub}>
                    <h3 className={style.titleSub}>{ title }</h3>
                    { isEditable && (
                        <button type="button" className={cn('ms-auto', style.editableBtn)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M17.0318 8.51049L13.4506 4.96638L14.6303 3.78501C14.9533 3.46154 15.3502 3.2998 15.8209 3.2998C16.2917 3.2998 16.6883 3.46154 17.0107 3.78501L18.1904 4.96638C18.5134 5.28985 18.682 5.68026 18.696 6.13762C18.71 6.59498 18.5556 6.98512 18.2325 7.30802L17.0318 8.51049ZM15.81 9.75515L6.87807 18.6998H3.29688V15.1135L12.2288 6.16885L15.81 9.75515Z" fill="#909195"/>
                            </svg>
                        </button>
                    )}
                </div>
            )}

            <div className="d-grid" style={{ gridTemplateColumns: `repeat(${column}, 1fr)`, gap: '10px'}}>
                { children }
            </div>
        </div>
    );
};

export default BalanceSectionItemWrapper;