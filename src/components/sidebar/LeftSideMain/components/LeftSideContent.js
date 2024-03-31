import cn from "classnames";
import styles from "../LeftSideMain.module.scss";
import {useClickOutside} from "../../../../hooks/useClickOutside";
import {useRef} from "react";

export function LeftSideContent({
                                  children,
                                  isExpand,
                                  onClose
}) {
  const refMain = useRef(null);
  useClickOutside(refMain, onClose)

  return(
      <div
        ref={refMain}
          className={cn("position-fixed text-white z-1", styles["navigation-custom__content"],styles["navigation-custom__scroll"],
              { [styles['navigation-custom__content_is-full']]: isExpand },
          )}
      >
          {children}
      </div>
  )
}