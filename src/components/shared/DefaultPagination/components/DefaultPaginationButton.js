import React from 'react';
import style from "../pagination.module.scss"
import cn from "classnames";
const DefaultPaginationButton = ({ isPrev = false, isNext = false, currentPage, text, updatePage, isDisabled = false }) => {
  return (
    <li className="page-item">
      <a
        className={cn("page-link", style.pagination_button, {
          [style.pagination_arrow]: isPrev || isNext,
          [style.pagination_active]: text === currentPage,
          [style.pagination_disabled]: isDisabled
        })}
        href="#"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          updatePage(text)
          window.scrollTo({
            top: 0,
            behavior:'smooth'
          });
        }}
        aria-label={isPrev ? "Previous" : isNext? "Next" : "Page"}
      >
        { isPrev
          ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M12.5 16L7 10.5L12.5 5" stroke="#909195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )
          : isNext
            ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M8.5 16L14 10.5L8.5 5" stroke="#909195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )
            : (
              <>
                { text }
              </>
            )
        }
      </a>
    </li>
  );
};

export default DefaultPaginationButton;