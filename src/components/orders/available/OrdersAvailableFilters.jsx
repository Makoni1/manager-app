import React from 'react';
import OrdersSectionItemInfoColumn from "../section-item/components/OrdersSectionItemInfoColumn";
import SelectCustom from "../../shared/forms/select-custom";
import ArrowRightRotateIcon from "../../shared/icons/ArrowRightRotateIcon";
import CustomDatePicker from "../../shared/date-picker/Date";
import CalendarIcon from "../../shared/icons/CalendarIcon";
import {isMobile} from "react-device-detect";
import ArrowRightRotate2Icon from "../../shared/icons/ArrowRightRotate2Icon";
import style from "../../../pages/orders/available/OrdersAvailable.module.scss";
import PinIcon from "../../shared/icons/PinIcon";
import ArrowRightIcon from "../../shared/icons/ArrowRightIcon";
import PlusIcon from "../../shared/icons/PlusIcon";
import SectionItem from "../section-item";

const OrdersAvailableFilters = () => {
  return (
    <SectionItem gridGapRow={26}>
      <OrdersSectionItemInfoColumn contentGridColumn={2}>
        <OrdersSectionItemInfoColumn title="Погрузка" contentGridColumn={2}>
          <OrdersSectionItemInfoColumn>
            <SelectCustom
              placeholder="Город погрузки"
              options={[]}
              defaultValue={null}
              returnObject
              bgGray
              IconStart={<ArrowRightRotateIcon />}
              onSubmit={(item) => {
                console.log("item", item)
              }}
            />
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn>
            <CustomDatePicker
              selected={null}
              dateFormat="dd.MM.yyyy"
              placeholderText="Дата погрузки"
              monthsShown={2}
              withBorder
              bgGray
              IconStart={<CalendarIcon />}
              onChange={(item) => {
                console.log(item)
              }}
              withPortal={isMobile}
            />
          </OrdersSectionItemInfoColumn>
        </OrdersSectionItemInfoColumn>
        <OrdersSectionItemInfoColumn title="Выгрузка" contentGridColumn={2}>
          <OrdersSectionItemInfoColumn>
            <SelectCustom
              placeholder="Город выгрузки"
              options={[]}
              defaultValue={null}
              returnObject
              bgGray
              IconStart={<ArrowRightRotate2Icon />}
              onSubmit={(item) => {
                console.log("item", item)
              }}
            />
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn>
            <CustomDatePicker
              selected={null}
              dateFormat="dd.MM.yyyy"
              placeholderText="Дата выгрузки"
              monthsShown={2}
              withBorder
              bgGray
              IconStart={<CalendarIcon />}
              onChange={(item) => {
                console.log(item)
              }}
              withPortal={isMobile}
            />
          </OrdersSectionItemInfoColumn>
        </OrdersSectionItemInfoColumn>
      </OrdersSectionItemInfoColumn>
      <OrdersSectionItemInfoColumn contentGridColumn={6}>
        <SelectCustom
          placeholder="Тип транспорта"
          options={[]}
          defaultValue={null}
          returnObject
          bgGray
          onSubmit={(item) => {
            console.log("item", item)
          }}
        />
        <SelectCustom
          placeholder="Вес"
          options={[]}
          defaultValue={null}
          returnObject
          bgGray
          onSubmit={(item) => {
            console.log("item", item)
          }}
        />
        <SelectCustom
          placeholder="Объем"
          options={[]}
          defaultValue={null}
          returnObject
          bgGray
          onSubmit={(item) => {
            console.log("item", item)
          }}
        />
        <SelectCustom
          placeholder="Тип погрузки"
          options={[]}
          defaultValue={null}
          returnObject
          bgGray
          onSubmit={(item) => {
            console.log("item", item)
          }}
        />
        <SelectCustom
          placeholder="Тип заказа"
          options={[]}
          defaultValue={null}
          returnObject
          bgGray
          onSubmit={(item) => {
            console.log("item", item)
          }}
        />
        <SelectCustom
          placeholder="Тип оплаты"
          options={[]}
          defaultValue={null}
          returnObject
          bgGray
          onSubmit={(item) => {
            console.log("item", item)
          }}
        />
      </OrdersSectionItemInfoColumn>
      <OrdersSectionItemInfoColumn>
        <button type="button" className={style.clearBtnFilter}>
          Очистить фильтры
        </button>
      </OrdersSectionItemInfoColumn>
      <OrdersSectionItemInfoColumn>
        <hr/>
      </OrdersSectionItemInfoColumn>
      <OrdersSectionItemInfoColumn title={"Сохраненные направления: " + 3}>
        <div className={style.savedFilters}>
          <button type="button" className={style.savedFilter}>
            <PinIcon />
            <span>Казахстан</span>
            <ArrowRightIcon />
            <span>Казахстан</span>
          </button>
          <button type="button" className={style.saveBtnFilter}>
            <PlusIcon />
            Добавить текущее
          </button>
        </div>
      </OrdersSectionItemInfoColumn>
    </SectionItem>
  );
};

export default OrdersAvailableFilters;