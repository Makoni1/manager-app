import React, { useEffect, useState } from "react";
import { Order, User } from "../../../services";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import DriverSelectionModal from "./DriverSelectionModal";
import {toast} from "react-toastify";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {onDebounce, requestErrorDisplay} from "../../../utils";

const CancelApp = ({ item, onClose, onUpdateData }) => {
  const { isMobile } = useWindowSize()
  console.log("item ---->", item);
  const { user } = useSelector((state) => state);
  console.log("USER =====>", user);

  const isExpeditor = user.type === "Expeditor" ? true : false;
  const [showDriverSelect, setShowDriverSelect] = useState(false);

  const [selectMenu, setSelectMenu] = useState();
  const [comment, setComment] = useState('');
  const [error, setError] = useState(''); 
  const [cancelList, setCancelList] = useState([]);

  // useEffect(() => {
  //   Order.getCancelList()
  //   .then(response => {
  //     if(response.data && response.data.length){
  //       response.data.map(item=>{
  //         item.isSelect = false
  //       })
  //       setCancelList(response.data)
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     toast.error('Произошла ошибка, попробуйте позже')
  //     toast.error(error)
  //   });
  // }, []);

  const onInputComment = text => {
    onDebounce(() => {
      setComment(text.toString().trim())
    })
  }

  const querySelectMenu = (item) => {
    setSelectMenu(item)
    cancelList.forEach(i=> i.isSelect = item.id === i.id)
  }

  const createOrder = () => {
    if(!comment) {
      setError('Напишите, пожалуйста, причину')
      toast.error('Напишите, пожалуйста, причину')
      return
    }
    setError()
    const data = {
        "orderId": item.id,
        "comment": comment
    }
    console.log('aaa', data);
    Order.canceled(data)
        .then(response => {
          setError();
          onClose();
          onUpdateData();
          toast.info('Заказ успешно отменен')
        })
        .catch(error => {
          requestErrorDisplay(error)
        });
}

  return (
    <>
      <div className="modal-overlay">
        <div
          style={{
            backgroundColor: "#ffffff",
            maxHeight: "610px",
            minHeight: '370px',
            width: isMobile ? "96%" : "500px",
            margin: "30px auto",
            borderRadius: "6px",
          }}
        >
          <div>
            <div
              style={{
                padding: "14px 24px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                justifyContent: "space-between",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
              }}
            >
              <div></div>
              <div
                onClick={onClose}
                style={{ padding: "4px", cursor: "pointer", opacity: "1" }}
              >
                <img src="/icons/close.svg" height="16px" />
              </div>
            </div>
            <div style={{ fontSize: "25px", backgroundColor: "#ffffff", fontWeight: '600', textAlign: 'center', marginTop: '-30px' }}>
                  Отозвать заказ
            </div>
            <div  style={{ fontSize: "14px", color: "#9BA0AB", fontWeight: 'lighter', textAlign: 'center', display: cancelList.length ? '' : 'none'}}>
              Укажите, пожалуйста, причину
            </div>
            <div  style={{padding: isMobile ? '10px 20px' : '10px 70px'}}>
              {
                cancelList.map((item, idx)=>(
                  <div className="cancel-menu" key={idx}>
                  <div style={{cursor: 'pointer'}}>
                    { item.isSelect ?
                      <div onClick={() => querySelectMenu(item)}><img height="15px" src="/icons/Group 680.svg" alt="" /></div>
                      :
                      <div onClick={() => querySelectMenu(item)}><img height="15px" src="/icons/Rectangle 16.svg" alt="" /></div>
                    }
                  </div>
                  <div style={{marginLeft: '10px'}}>{item.message}</div>
                  </div>
                ))
              }
              <div>
                <textarea
                  name="name"
                  placeholder={"Напишите пожалуйста, причину"}
                  id="comment"
                  cols="30"
                  rows="10"
                  className="cancel-menu"
                  style={{
                    padding: "10px 14px",
                    outline: "none",
                    minHeight: "100px",
                    maxHeight: "300px"
                  }}
                  onInput={e => onInputComment(e.target.value)}
                ></textarea>
              </div>
              {error ? <div style={{marginTop: '10px', color: 'red', width: '100%', textAlign: 'center'}}>{error}</div> : null} 
              <div style={{marginTop: '14px', marginBottom: '20px', width: '100%', color: 'red', display: "flex", justifyContent: 'center'}}>
                    <div onClick={createOrder} style={{ 
                             backgroundColor: '#A3195B',
                             color: '#ffffff',
                             cursor: 'pointer',
                             padding: '10px 16px',
                             fontSize: '13px',
                             borderRadius: '8px',
                             }}>Подтвердить
                      </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
      {showDriverSelect && (
        <DriverSelectionModal
          onClose={() => setShowDriverSelect(false)}
          orderId={item.id}
        />
      )}
    </>
  );
};

export default CancelApp;
