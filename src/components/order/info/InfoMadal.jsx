import React, { useEffect, useState } from "react";
import { Order, User } from "../../../services";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import DriverSelectionModal from "./DriverSelectionModal";

const InfoMadal = ({ status, title, refreshOrder }) => {
  console.log(status)
  return (
    <>
      <div className="modal-overlay">
        <div
          style={{
            backgroundColor: "#ffffff",
            height: "260px",
            width: "330px",
            margin: "15% auto",
            borderRadius: "6px",
          }}
        >
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
          <div style={{width: "100%", textAlign: "center" }}>
            <div style={{width: "100%", textAlign: "center" }}>
              <div style={{marginTop: '10px'}}>
                {status == 'success' 
                ? 
                  <img src="/icons/Vector%20(10).svg" height="70px" />
                : 
                  <img src="/icons/Vector%20(10).svg" height="70px" />
                }
                {status == 'success' 
                ? 
                  <div style={{color: '#10121C', fontWeight: 'bold', fontSize:'17px', marginTop: '10px'}}>Успешно!</div>
                : 
                  <div style={{color: '#10121C', fontWeight: 'bold', fontSize:'17px', marginTop: '10px'}}>Успешно!</div>
                }
              </div>
              <div style={{color: '#6A6C70', fontSize: '15px', fontWeight: 'lighter',  marginTop: '10px'}}>{title}</div>
            </div>
            <div
              style={{
                marginTop: "17px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                onClick={refreshOrder}
                style={{
                  backgroundColor: "#A3195B",
                  width: '160px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  color: "#ffffff",
                  padding: "10px 16px",
                  fontSize: "13px",
                  borderRadius: "8px",
                }}
              >
                Ок
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoMadal;
