import React, {useEffect, useState} from 'react';
import styles from './CreateOrder.module.scss'
import OrderCustomButton from "./Button/OrderCustomButton";
import OrderCustomInput from "./Input/OrderCustomInput";
import cn from "classnames";
import Loading from "../invoices/Loading";
import {numberToFinanceFormat} from "../../utils";
import CreateOrderSteps from "../order/step";

const CreateOrderCommonBannerItem = ({
  title,
  icon,
  subtitle,
  buttonText,
  withInsurance = false,
  priceDiscount = 0,
  price = 0,
  buttonColor = "",
  isMobile = false,
  displayButton = true,
  displayInput = false,
  stepCount = 0,
  stepCurrent = 0,
  stepChange,
  isLoading = false,
  isValidate = true,
  onSubmit,
  changeInput,
  defaultCount
}) => {
  const [count, setCount] = useState(defaultCount);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    if (count !== defaultCount && changeInput) {
      changeInput(count)
    }
  }, [count])

  const clickHandle = () => {
    if (onSubmit) onSubmit()
  }

  const priceAmountTotal = (c) => {
    if (!price) return price
    let total = c > 1 ? price * c : price

    if (withInsurance && priceDiscount) {
      total = total + (c > 1 ? +priceDiscount * c : +priceDiscount)
    }

    return total
  }

  return (
    <div className={styles.createOrderContainer}>
      <div className={cn(styles.createOrder, {
        [styles.createOrder_gray]: !isValidate,
        [styles.createOrder_withSteps]: stepCount,
        [styles.createOrder_isMobile]: isMobile
      })}>
        { icon && (
          <div className={styles.createOrder__logo}>
            <img
              src={icon}
              alt="Logo"
              style={{ display: 'block', width: '69px', height: '34px' }}
            />
          </div>
        )}
        <div className={cn(styles.createOrder__content, { [styles.createOrder__content_isMobile]: isMobile })}>
            <div className={styles.createOrder__title}>
                {title}
            </div>
            {subtitle && (
                <div className={styles.createOrder__subtitle}>
                    {subtitle}
                </div>
            )}
          {
            stepCount
              ? <CreateOrderSteps items={stepCount} current={stepCurrent} stepChange={stepChange} />
              : null
          }
        </div>
        {displayInput && (
          <div className={cn(styles['createOrder__amount'], { [styles['createOrder__amount_isMobile']]: isMobile })}>
              <div className={styles['createOrder__amount-total']}>{numberToFinanceFormat(priceAmountTotal(count))} ₸</div>
              <div className={styles['createOrder__amount-subtitle']} style={{ marginBottom: priceDiscount && price ? '0px': '' }}>
                Цена 1 заявки: {numberToFinanceFormat(price)} ₸
              </div>

            {withInsurance && priceDiscount && price ? (
              <div className={cn(styles['createOrder__amount-subtitle'], styles['createOrder__amount-subtitle_discount'])}>Страхования 1 заявки: {priceDiscount} ₸</div>
            ) : null}

              <div className={styles['createOrder__amount-count']}>
                  <button className={styles['createOrder__amount-button']} onClick={decrementCount}>-</button>
                  <OrderCustomInput
                      value={count}
                      onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                  />
                  <button className={styles['createOrder__amount-button']} onClick={incrementCount}>+</button>
              </div>
          </div>
        )}
        { displayButton && isMobile && (
          <OrderCustomButton
            className={styles.createOrder__button}
            onClick={clickHandle}
            isMobile={isMobile}
            color={buttonColor}
            displayText={!!price && !withInsurance && isValidate}
          >
            {isLoading ? <Loading inBlock marginBottom={0} /> : buttonText }
          </OrderCustomButton>
        )}
      </div>

        { displayButton && !isMobile && (
          <div className={cn(styles.createOrderButton, {[styles.createOrderButton_withMargin]: !!subtitle })}>
            <OrderCustomButton
              className={styles.createOrder__button}
              onClick={clickHandle}
              color={buttonColor}
              displayText={!!price && !withInsurance && isValidate}
            >
              {isLoading ? <Loading inBlock marginBottom={0} /> : buttonText }
            </OrderCustomButton>
          </div>
        )}
    </div>

  );
};

export default CreateOrderCommonBannerItem;

