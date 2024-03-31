import React, {useEffect, useState} from 'react';
import style from "./map.module.scss"
import {MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip} from "react-leaflet";
import L from "leaflet";
import {Order, User} from "../../../services";
import Skeleton from "react-loading-skeleton";
import OrdersMapBanner from "./components/OrdersMapBanner";
import Loading from "../../invoices/Loading";
import cn from "classnames";

const OrdersMap = ({
  displayBanner = true,
  isMobile = false,
  isEditable = false,
  isLoading = false,
  order,
  orderId,
  orderNumber,
  driverId,
  countryFrom,
  countryTo,
  cityFrom,
  distance,
  cityTo,
  status
}) => {
  const [driverPosition, setDriverPosition] = useState([]);
  const [coordinate, setCoordinate] = useState([]);

  useEffect(() => {
      if (['inprocess', 'waitingforcompletion', 'completed'].includes(status) && driverId) {
        // console.log('getting order location');
        Order.getLastPosition(orderId, driverId)
          .then((response) => {
            // console.log('location response', response);
            if (response.status == 200) {
              setDriverPosition([response.data.latitude, response.data.longitude]);
            } else {
              setDriverPosition([]);
            }
          }).catch(error => {
          console.log(error);
        });
      }
  }, [status, driverId])

  useEffect(() => {
    if (orderNumber) {
      User.getCoordinate(orderNumber) //'000182'
        .then((response) => {
          if (response.status == 200) {
            // console.log("getCoordinate: ", response.data);
            const post = [];
            if (response.data && response.data.length) {
              response.data.map((m) => {
                post.push({
                  lat: m.latitude,
                  lng: m.longitude,
                  date: m.createdAtStr,
                });
              });
            }
            setCoordinate(post);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orderNumber]);

  const getIcon = (url, iconSize) => {
    return L.icon({
      iconAnchor: iconSize == 26 ? [10, 35] : null,
      iconUrl: url,
      iconSize: iconSize == 26 ? [iconSize, 40] : iconSize
    });
  };

  const getDriverIcon = (iconSize) => {
    return L.icon({
      iconUrl: require("./icons/truck.png"),
      iconSize: iconSize
    })
  }

  const renderDeliveryMarker = () => {
    if (cityTo && countryTo) {
      // console.log(cityTo)
      if (cityTo.latitude && cityTo.longitude) {
        return (
          <Marker
            position={[cityTo.latitude, cityTo.longitude]}
            icon={getIcon(require("./icons/end.png"), 26)}
          >
            <Tooltip
              direction="top"
              height="100px"
              offset={[0, -35]}
              opacity={1}
              permanent>
              <div style={{padding: "0px 8px", fontWeight: "bold"}}>
                {cityTo?.name}
              </div>
            </Tooltip>
            <Popup>
              {order?.countryToName} г. {cityTo.name}
              <br/>
              {order?.addressTo}
            </Popup>
          </Marker>
        );
      }
    } else return null
  }

  const renderPickupMarker = () => {
    if (cityFrom && countryFrom) {
      // console.log(cityFrom)
      if (cityFrom.latitude && cityFrom.longitude) {
        // console.log('coords ====>', cityFrom.latitude, cityFrom.longitude)
        return (
          <Marker
            position={[cityFrom.latitude, cityFrom.longitude]}
            icon={getIcon(require("./icons/start.png"), 26)}>
            <Tooltip
              direction="top"
              marginTop="100px"
              height="100px"
              offset={[0, -35]}
              opacity={1}
              permanent>
              <div style={{padding: "0px 8px", fontWeight: "bold"}}>
                {cityFrom.name}
              </div>
            </Tooltip>
          </Marker>
        );
      }
    } else return null
  }

  const renderDriverMarker = () => {
    if (driverPosition && order?.driverId) {
      if (driverPosition.length == 2) {
        return (
          <Marker
            position={driverPosition}
            icon={getDriverIcon(30)}>
            <Popup>
              {order.driverSurname} {order.driverName}
            </Popup>
          </Marker>
        );
      }
    } else return null
  }

  const renderPositions = () => {
    return (
      <>
        <Polyline
          color="#10121C"
          weight="3"
          dashArray='3, 5'
          smoothFactor="1"
          opacity="1"
          positions={coordinate}
        />
        {coordinate.map((position, index) => (
          <Marker
            key={index}
            position={[position.lat, position.lng]}
            icon={getIcon(require("./icons/Ellipse 12.png"), 11)}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              {
                position.date ?
                  position.date
                  : ""
              }
            </Tooltip>
          </Marker>
        ))}
      </>
    );
  };

  return (
    <div className={cn(style.wrapper, { [style.wrapper_isMobile]: isMobile })}>
      <MapContainer
        center={{ lat: 48.019573, lng: 66.923684 }}
        zoom={4}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {renderPickupMarker()}
        {coordinate ? renderPositions() : ""}
        {renderDeliveryMarker()}
        {renderDriverMarker()}
        { isLoading && <Loading /> }
      </MapContainer>
      { displayBanner && (
        <OrdersMapBanner
          hide={isMobile}
          isEditable={isEditable}
          order={order}
          countryFrom={countryFrom}
          distance={distance}
          cityFrom={cityFrom}
          cityTo={cityTo}
          countryTo={countryTo}
        />
      )}
    </div>
  );
};

export default OrdersMap;