import styles from "./LeftSideMain.module.scss";
import cn from "classnames";
export function LeftSideMainContainer({children, rootClassName}) {
    return (
        <div className={cn(styles["navigation-custom"], rootClassName)}>
            {children}
        </div>
    )
}