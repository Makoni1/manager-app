import React, { useEffect, useState } from 'react';

const MenuMadal = ({ item, onClose, editeOrder, selectCopy}) => {

  return (
    <>
      <div className='modal-overlay' style={{display: 'none'}}>
          <div style={{ backgroundColor: '#f0f4f7', margin: '24px', borderRadius: '16px', maxHeight: 'calc(100vh - 50px)' }}>
            <div style={{width: '100%', height: '80%', paddingBottom: '25px'}}>
              <div style={{ padding: '14px 24px',width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{width: '90%', display: 'flex'}}>
                </div>
                <div onClick={onClose} style={{width: '5%', marginTop: '-30px', marginRight: '-15px', padding: '4px', cursor: 'pointer', textAlign: 'end' }}>
                  <img src="/icons/close3.svg" height="10px" />
                </div>
              </div>
              <div style={{ padding: '0 24px' }}>
                  5555555555
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default MenuMadal
