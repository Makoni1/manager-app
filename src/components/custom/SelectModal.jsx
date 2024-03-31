import React, { useEffect, useState } from 'react';
import './styles.css'

const SelectModal = ({onClose, header, options, onSubmit, search = false, searchTitle }) => {

    console.log('OPTIONS ===>', options);

    const [searchStr, setSearchStr] = useState();

    const renderList = () => {
        if(options) {
            const list = options.map((item, index) => {
                if(searchStr) {
                   if(item.name.toLowerCase().includes(searchStr)) {
                    return (
                        <div key={index} onClick={() => onSubmit(item)} style={{ borderTop: `${index == 0 ? 'none' : '1px solid #eeeeee'}` }} className='option-item'>{item.name}</div>
                    )
                   } 
                }else {
                    return (
                        <div key={index} onClick={() => onSubmit(item)} style={{ borderTop: `${index == 0 ? 'none' : '1px solid #eeeeee'}` }} className='option-item'>{item.name}</div>
                    )
                }
                
            });

            return list;
        }else {
            return <div style={{ padding: '16px 24px' }}>Загрузка..</div>
        }
    }
    
    return (
        <div className='modal-overlay'>
            <div style={{ backgroundColor: '#ffffff', maxHeight: 'calc(100vh - 50px)', maxWidth: '320px', margin: '24px auto', borderRadius: '6px' }}>
                <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', justifyContent: 'space-between', borderBottom: '1px solid #eeeeee', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                    <div style={{ fontSize: '16px', backgroundColor: '#ffffff', color: '#A3ACB6' }}>{header}</div>
                     <div onClick={onClose}>X</div>
                </div>
                {
                    search ? 
                    <div style={{ borderBottom: '1px solid #eeeeee' }}>
                        <input disabled={!options} type="text" placeholder={searchTitle ? searchTitle : ''} onChange={(event) => setSearchStr(event.target.value.toLowerCase())} style={{ width: '100%', padding: '12px 24px', border: 'none', fontSize: '14px' }} />
                    </div> : null
                }
                <div style={{ overflowY: 'scroll', maxHeight: `${search ? 'calc(100vh - 183px)' : 'calc(100vh - 103px)'}`, textAlign: 'left' }}>
                    {renderList()}
                </div>
            </div>
        </div>
    );
}

export default SelectModal;