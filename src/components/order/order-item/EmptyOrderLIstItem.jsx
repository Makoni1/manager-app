import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const EmptyOrderListItem = () => {
    return (
        <SkeletonTheme color="#e5ebf2" highlightColor="#f0f4f7">
            <div onClick={() => selectOrder(item)} className='col-12 col-sm-12 col-md-6 col-lg-4' style={{ paddingBottom: '24px' }}>
                <div onClick={() => setShowOrderInfoModal(true)} style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px' }}>
                    <div style={{ padding: '16px' }}>
                        <div style={{ borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}><Skeleton width={80} /></div>
                                    <div style={{ color: '#193048', marginTop: '2px', fontSize: '15px' }}><Skeleton width={30} /></div>
                                </div>
                                <div>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}><Skeleton width={80} /></div>
                                    <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: '500', marginTop: '4px' }}><Skeleton width={90} /></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '14px 0', borderBottom: '1px solid rgba(190, 190, 182, 0.15)' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '12px', left: '9px', borderRight: '2px rgba(163, 172, 182, 0.2) dashed', height: '54px' }}></div>
                                    <div style={{ position: 'relative', zIndex: '1' }}>
                                        <Skeleton width={20} height={20} circle={true} />
                                    </div>
                                </div>
                                <div style={{ marginLeft: '12px' }}>
                                    <div style={{ fontSize: '15px', lineHeight: '1.3' }}><Skeleton width="120px" /></div> 
                                    <div style={{ lineHeight: '1.3', fontSize: '13px', marginTop: '2px' }}><Skeleton width="140px" /></div>        
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                                <div style={{ position: 'relative' }}>     
                                    <div style={{ position: 'relative', zIndex: '1' }}>
                                        <Skeleton width={20} height={20} />
                                    </div>
                                </div>
                                <div style={{ marginLeft: '12px' }}>
                                    <div style={{ fontSize: '15px', lineHeight: '1.3' }}><Skeleton width="120px" /></div> 
                                    <div style={{ lineHeight: '1.3', fontSize: '13px', marginTop: '2px' }}><Skeleton width="140px" /></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '14px 0 0' }}>
                            <div className='row'>
                                <div className='col-6'>
                                    <div style={{ display: 'flex', marginTop: '2px', alignItems: 'center' }}>
                                        <div style={{ color: '#193048', fontSize: '17px', marginLeft: '8px' }}><Skeleton width="100px" /></div>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div style={{ display: 'flex', marginTop: '2px', alignItems: 'center' }}>
                                        <div style={{ color: '#193048', fontSize: '17px', marginLeft: '6px' }}><Skeleton width="100px" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
}

export default EmptyOrderListItem
