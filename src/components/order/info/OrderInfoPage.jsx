import React, { useEffect, useState } from 'react';
import { MapContainer, useMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const OrderInfoPage = () => {

    const position = [51.505, -0.09];

    return (
        <div style={{ padding: '24px 24px' }}>
            <div style={{ fontSize: '22px' }}>Информация о заказе <span style={{ fontWeight: '600' }}>KZ-145069BD</span></div>
            <div className='row' style={{ marginTop: '18px' }}>
                <div className='col-6'>
                    <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px' }}>
                        <div style={{ height: '360px', position: 'relative' }}>
                            <MapContainer center={[43.238949, 76.889709]} zoom={10} scrollWheelZoom={false}>
                                <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                
                            </MapContainer>
                            <div style={{ position: 'absolute', width: '100%', bottom: '10px', zIndex: '9997' }}>
                                <div style={{ backgroundColor: '#ffffff', padding: '22px 16px 12px', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', margin: '8px 16px' }}>
                                    <div className='row' style={{ position: 'relative' }}>

                                        <div style={{ position: 'absolute', marginTop: '13px' }}>
                                            <div style={{ borderBottom: '2px rgba(190, 190, 182, 0.5) dashed', width: '50%', margin: '0 auto' }}></div>
                                        </div>
                                        <div className='col-6' style={{ position: 'relative', textAlign: 'center' }}>
                                            {/* <div style={{ borderBottom: '2px rgba(190, 190, 182, 0.5) dashed', width: '100%', position: 'absolute', marginLeft: '10px', marginTop: '13px' }}></div> */}
                                            <div style={{ position: 'relative', zIndex: '9998' }}>
                                                <img src="/icons/pick-up.svg" height="18px" />
                                            </div>
                                            <div style={{ marginTop: '6px' }}>
                                                <div style={{ color: '#193048', fontWeight: '700', fontSize: '15px', lineHeight: '1.3' }}>г. Алматы</div>
                                                <div style={{ color: '#A3ACB6', fontSize: '12px', lineHeight: '1.3', marginTop: '2px' }}>ул. Кажымукана 45Г</div>
                                            </div>
                                        </div>
                                        <div className='col-6' style={{ textAlign: 'center' }}>
                                            <div style={{ position: 'relative', zIndex: '9998' }}>
                                                <img src="/icons/delivery.svg" height="18px" />
                                            </div>
                                            <div style={{ marginTop: '6px' }}>
                                                <div style={{ color: '#193048', fontWeight: '700', fontSize: '15px', lineHeight: '1.3' }}>г. Астана</div>
                                                <div style={{ color: '#A3ACB6', fontSize: '12px', lineHeight: '1.3', marginTop: '2px' }}>ул. Сагынак 35, офис 12</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '16px 16px 2px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '12px'  }}>
                                <div>
                                    <img src="/icons/order-details.svg" />
                                </div>
                                <div style={{ color: '#A3ACB6', fontSize: '14px', lineHeight: '1.3', fontWeight: '700', marginLeft: '8px' }}>Детали заказа</div>  
                            </div>
                            <div className='row' style={{ marginTop: '16px' }}>
                                <div className='col-4' style={{ paddingBottom: '14px' }}>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Номер заказа</div>
                                    <div style={{ fontSize: '14px', marginTop: '2px' }}>KZ-145069BD</div>
                                </div>
                                <div className='col-4' style={{ paddingBottom: '14px' }}>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Статус заказа</div>
                                    <div style={{ fontSize: '14px', marginTop: '2px', color: '#f0ad4e', fontWeight: '600' }}>Опубликован</div>
                                </div>
                                <div className='col-4' style={{ paddingBottom: '14px' }}>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Сумма заказа</div>
                                    <div style={{ fontSize: '14px', marginTop: '2px' }}>15 756 KZT</div>
                                </div>
                                <div className='col-4' style={{ paddingBottom: '14px' }}>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Дата создания</div>
                                    <div style={{ fontSize: '14px', marginTop: '2px' }}>30.10.2022</div>
                                </div>
                                <div className='col-4' style={{ paddingBottom: '14px' }}>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Дата и время загрузки</div>
                                    <div style={{ fontSize: '14px', marginTop: '2px' }}>01.11.2022, 12:00 - 15:00</div>
                                </div>
                                <div className='col-4' style={{ paddingBottom: '14px' }}>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Дата и время выгрузки</div>
                                    <div style={{ fontSize: '14px', marginTop: '2px' }}>10.11.2022, 16:00 - 18:00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='col-3'>
                    <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', padding: '16px' }}>
                        
                
                            <div style={{ display: 'flex', alignItems: 'center',  borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '12px' }}>
                                <div>
                                    <img src="/icons/order-driver.svg" />
                                </div>
                                <div style={{ color: '#A3ACB6', fontSize: '14px', lineHeight: '1.3', fontWeight: '700', marginLeft: '8px' }}>Водитель</div>  
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '14px' }}>      
                                <div>
                                    <img src="/icons/driver-account.svg" height="48px" style={{ opacity: '0.4' }} />
                                </div>    
                                <div style={{ marginLeft: '14px' }}>
                                    
                                    <div style={{ color: '#193048', fontWeight: '700', fontSize: '16px', lineHeight: '1.3' }}>Калиев Алихан</div>   
                                    <div style={{ color: '#A3ACB6', fontSize: '12px', lineHeight: '1.3', marginTop: '2px' }}>+7 747 534 7789</div>
                                </div>
                            </div>
                       

                        <div style={{ color: '#A3ACB6', fontSize: '12px', marginTop: '16px' }}>Информация о машине</div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                            <div>
                                <img src="/images/volvo-fh16.jpeg" style={{ borderRadius: '8px', height: '50px' }} />
                            </div>
                            <div style={{ marginLeft: '12px' }}>
                                <div style={{ fontSize: '14px' }}>Volvo FH16</div>
                                <div style={{ fontWeight: '700', fontSize: '13px' }}>748 AMP 05</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Тип транспорта</div>
                            <div style={{ fontSize: '14px', marginTop: '2px' }}>Тягач-полуприцеп</div>
                        </div>
            
                        
                    </div>

                    <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', padding: '16px', marginTop: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '12px'  }}>
                            <div>
                                <img src="/icons/order-cargo.svg" />
                            </div>
                            <div style={{ color: '#A3ACB6', fontSize: '14px', lineHeight: '1.3', fontWeight: '700', marginLeft: '8px' }}>Детали груза</div>  
                        </div>
                        <div className='row' style={{ marginTop: '16px' }}>
                            <div className='col-6' style={{ paddingBottom: '8px' }}>
                                <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Вес</div>
                                <div style={{ fontSize: '14px', marginTop: '2px' }}>48 тн</div>
                            </div>
                            <div className='col-6' style={{ paddingBottom: '8px' }}>
                                <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Объем</div>
                                <div style={{ fontSize: '14px', marginTop: '2px' }}>3400<sup>3</sup></div>
                            </div>
                            <div className='col-6' style={{ paddingBottom: '8px' }}>
                                <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Категория</div>
                                <div style={{ fontSize: '14px', marginTop: '2px' }}>строительные матриеалы</div>
                            </div> 
                            <div className='col-6' style={{ paddingBottom: '8px' }}>
                                <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Габариты</div>
                                <div style={{ fontSize: '14px', marginTop: '2px' }}>340x150x60</div>
                            </div> 
                            
                        </div>    
                        <div>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Описание</div>
                            <div style={{ fontSize: '14px', marginTop: '2px' }}>Паркет и ламинат</div>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '12px'  }}>
                            <div>
                                <img src="/icons/order-statuses.svg" />
                            </div>
                            <div style={{ color: '#A3ACB6', fontSize: '14px', lineHeight: '1.3', fontWeight: '700', marginLeft: '8px' }}>История заказа</div>  
                        </div>
                         
                        <div style={{ marginTop: '16px', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '0', left: '6px', borderRight: '2px rgba(163, 172, 182, 0.2) dashed', height: '100%' }}>
                                
                            </div>
                            <div style={{ position: 'relative', zIndex: '1' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ backgroundColor: '#A3195B', width: '14px', height: '14px', borderRadius: '50%', textAlign: 'center' }}>
                                            {/* <img src="/icons/tick.svg" height="9px" style={{ marginTop: '-5px' }} /> */}
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '14px', fontSize: '13px', color: '#A3195B' }}>На модерации</div>
                                </div> 
                            </div>
                            <div style={{ marginTop: '24px', position: 'relative', zIndex: '1' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ backgroundColor: '#A3195B', width: '14px', height: '14px', borderRadius: '50%', textAlign: 'center' }}>
                                            {/* <img src="/icons/tick.svg" height="9px" style={{ marginTop: '-5px' }} /> */}
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '14px', fontSize: '13px', color: '#A3195B' }}>Опубликован</div>
                                </div> 
                            </div>
                            <div style={{ marginTop: '24px', position: 'relative', zIndex: '1' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ backgroundColor: '#dadee2', width: '14px', height: '14px', borderRadius: '50%', textAlign: 'center' }}>
                                            {/* <img src="/icons/tick.svg" height="9px" style={{ marginTop: '-5px' }} /> */}
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '14px', fontSize: '13px', color: '#A3ACB6' }}>Подтвержден</div>
                                </div> 
                            </div>
                            <div style={{ marginTop: '24px',  position: 'relative', zIndex: '1'  }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ backgroundColor: '#dadee2', width: '14px', height: '14px', borderRadius: '50%', textAlign: 'center' }}>
                                            {/* <img src="/icons/tick.svg" height="9px" style={{ marginTop: '-5px' }} /> */}
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '14px', fontSize: '13px', color: '#A3ACB6' }}>В пути</div>
                                </div> 
                            </div>
                            <div style={{ marginTop: '24px',  position: 'relative', zIndex: '1'  }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ backgroundColor: '#dadee2', width: '14px', height: '14px', borderRadius: '50%', textAlign: 'center' }}>
                                            {/* <img src="/icons/tick.svg" height="9px" style={{ marginTop: '-5px' }} /> */}
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '14px', fontSize: '13px', color: '#A3ACB6' }}>Выполнен</div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', padding: '16px', marginTop: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '12px'  }}>
                            <div>
                                <img src="/icons/order-recipient.svg" />
                            </div>
                            <div style={{ color: '#A3ACB6', fontSize: '14px', lineHeight: '1.3', fontWeight: '700', marginLeft: '8px' }}>Получатель</div>  
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Название организации</div>
                            <div style={{ fontSize: '14px', marginTop: '2px' }}>ТОО Акварис</div>
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Номер телефона</div>
                            <div style={{ fontSize: '14px', marginTop: '2px' }}>+7 747 458 5598</div>
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Электронный адрес</div>
                            <div style={{ fontSize: '14px', marginTop: '2px' }}>sales@akvaris.kz</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderInfoPage