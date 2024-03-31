import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading  = ({ inBlock = false, marginBottom = "24px", ...rest }) => {


    return (
        <div
        style={{
            position: inBlock ? 'static' : 'absolute',
            left: '0',
            top: '0',
            width: inBlock ? '' : '100%',
            height: inBlock ? '' : '120vh',
            display: 'flex', 
            alignItems: 'center', 
            zIndex: inBlock ? '' : '9999',
            justifyContent: 'center',
            backgroundColor: inBlock ? '' : 'rgb(60 61 61 / 38%)',
            marginBottom: inBlock ? marginBottom : '',
        }}
        {...rest}
>
            <Spinner style={{marginTop: inBlock ? '' : '-50px'}} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default Loading;