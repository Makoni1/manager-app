import React, {useEffect, useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import WrapperContent from "../../components/shared/WrapperContent";
import HeaderContent from "../../components/shared/HeaderContent";
import style from "../drivers/index.module.scss";
import PlusIcon from "../../components/shared/icons/PlusIcon";
import ArrowDownIcon from "../../components/shared/icons/ArrowDownIcon";
import CarsItemCard from "../../components/cars/CarsItemCard";
import ModalConfirm from "../../components/shared/ModalWindow/Confirm";
import {Driver} from '../../services';
import {useSelector} from 'react-redux';
import {requestErrorDisplay} from '../../utils';
import Loading from '../../components/invoices/Loading';
import EmptyContent from '../../components/shared/emptyContent';

const CarsPage = () => {
  const { user } = useSelector(state => state);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState([])

  const getContent = () => {
    setLoading(true)
    if (!user?.id) {
      return
    }
    Driver.getVehicleByExpeditor(user.id)
      .then(res => res.data)
      .then(data => {
        setVehicles(data || [])
      })
      .catch(e => {
        requestErrorDisplay(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    getContent()
  }, [])
  return (
    <WrapperContent>
      <HeaderContent title={"Автопарк"} />
      <Link to={"/cars/create"} className={style.button}>
        <PlusIcon/>
        <span>Добавить автомобиль</span>
      </Link>
      <div className={style.itemsSort}>
        <span>Автомобилей: {vehicles.length}</span>
        {/* TODO */}
        {/*<div className={style.dropdown}>*/}
        {/*  <div className={style.dropdown_selected}>*/}
        {/*    <span>По алфавиту</span>*/}
        {/*    <ArrowDownIcon />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <CarsItemCard
        isHead
      />
      { isLoading && <Loading inBlock />}
      { vehicles.map(v => <CarsItemCard key={v.id} item={v} />)}
      { !isLoading && !vehicles.length && <EmptyContent /> }
      { searchParams.get("created") === "1" && <ModalConfirm
        onClose={() => setSearchParams({ created: 0 })}
        title={"Автомобиль добавлен"}
        summary={<span>Теперь вы можете назначить автомобиль на заказ. После добавления данные о автомобиле пройдут модерацию</span>}
      />
      }
    </WrapperContent>
  );
};

export default CarsPage;