import React, {useEffect, useState} from 'react';
import style from "./index.module.scss"
import WrapperContent from "../../components/shared/WrapperContent";
import HeaderContent from "../../components/shared/HeaderContent";
import {Link, useSearchParams} from "react-router-dom";
import PlusIcon from "../../components/shared/icons/PlusIcon";
import ArrowDownIcon from "../../components/shared/icons/ArrowDownIcon";
import DriverItemCard from "../../components/drivers/DriverItemCard";
import ModalConfirm from "../../components/shared/ModalWindow/Confirm";
import {Driver} from '../../services';
import {requestErrorDisplay} from '../../utils';
import {useSelector} from 'react-redux';
import Loading from '../../components/invoices/Loading';
import EmptyContent from '../../components/shared/emptyContent';

const DriversPage = () => {
  const { user } = useSelector(state => state);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false)
  const [drivers, setDrivers] = useState([])

  const getContent = () => {
    setLoading(true)
    Driver.getDriversListByExpeditor(user.id)
      .then(res => res.data)
      .then(data => {
        setDrivers(data)
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
      <HeaderContent title={"Водители"} />
      <Link to={"/drivers/create"} className={style.button}>
        <PlusIcon/>
        <span>Добавить водителя</span>
      </Link>
      <div className={style.itemsSort}>
        <span>Водителей: {drivers.length}</span>
        {/* TODO */}
        {/*<div className={style.dropdown}>*/}
        {/*  <div className={style.dropdown_selected}>*/}
        {/*    <span>По алфавиту</span>*/}
        {/*    <ArrowDownIcon />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <DriverItemCard
        isHead
      />
      { isLoading && <Loading inBlock />}
      { !isLoading && drivers.map(d => <DriverItemCard key={d.id} item={d} />)}
      { !isLoading && !drivers.length && <EmptyContent /> }

      { searchParams.get("created") === "1" && <ModalConfirm
        onClose={() => setSearchParams({ created: 0 })}
        title={"Водитель добавлен"}
        summary={<span>Теперь вы можете назначить водителя на заказ. После добавления данные о водителе пройдут модерацию</span>}
      />
      }
    </WrapperContent>
  );
};

export default DriversPage;