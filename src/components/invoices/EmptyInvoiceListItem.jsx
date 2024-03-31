import React, { useEffect, useState } from 'react';
import { Order } from '../../services';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { numberToFinanceFormat } from '../../utils/index';
import moment from 'moment';

const EmptyInvoiceListItem = () => {

    return (
        <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '16px', padding: '12px 16px 8px' }}>
            <div className='row'>
                <div className='col-1'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}><Skeleton width="50px" /></div>
                    <div style={{ fontSize: '15px', marginTop: '4px' }}><Skeleton width="20px" /></div>
                </div>
                <div className='col-1'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}><Skeleton width="50px" /></div>
                    <div style={{ fontSize: '15px', marginTop: '4px' }}><Skeleton width="50px" /></div>
                </div>
                <div className='col-2'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}><Skeleton width="100px" /></div>
                    <div style={{ fontSize: '15px', marginTop: '4px' }}><Skeleton width="80px" /></div>
                </div>
                <div className='col-4'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}><Skeleton width="120px" /></div>
                    <div style={{ fontSize: '15px', marginTop: '4px' }}><Skeleton width="200px" /></div>
                </div>    
                <div className='col-2'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}><Skeleton width="100px" /></div>
                    <div style={{ fontSize: '15px', marginTop: '4px' }}><Skeleton width="80px" /></div>
                </div>
                <div className='col-2'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}><Skeleton width="60px" /></div>
                    <div style={{ fontSize: '18px', marginTop: '4px' }}><Skeleton width="80px" /></div>
                </div>
            </div>
        </div>
        
    );
}

export default EmptyInvoiceListItem;