import React, {useMemo} from 'react';
import style from "./index.module.scss"
import cn from "classnames";
import CheckmarkIcon from "../../shared/icons/CheckmarkIcon";

const CreateOrderSteps = ({ items = 0, current = 0, stepChange }) => {
  const steps = Array(items ).fill("").map((_, idx) => idx + 1 )
  const progressInPercent = useMemo(() => {
    const margin = 10
    return ((current / items) * 100).toFixed(2) - (current === 1 ? 10 : margin)
  }, [current, items])
  return (
    <div className={style.wrapper}>
      {
        steps.map(step => (
          <div
            key={'step-' + step}
            className={cn(style.step, {
              [style.step_active]: step < current,
              [style.step_current]: step === current
            })}
            onClick={() => stepChange( step < current ? step : current)}
          >
            {
              step < current
                ? <CheckmarkIcon />
                : step
            }
          </div>
        ))
      }
      <div className={style.stepLine}>
        <div className={style.stepLine_progress} style={{ width: progressInPercent + "%" }}></div>
      </div>
    </div>
  );
};

export default CreateOrderSteps;