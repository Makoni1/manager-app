import React, { useEffect, useState } from 'react';
import { User } from '../../services';
import { setUserData } from '../../store/actions/userAction';
import { useDispatch } from 'react-redux';

import VerificationFormComponent from './VerificationFormComponent';

const RegistrationCompletePage = () => {

    const dispatch = useDispatch();

    const updateUserData = () => {
        User.get()
        .then(response => {
          console.log(response)
          dispatch(setUserData(response.data));
        })
        .catch(error => {
          console.log(error)
        });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
            <VerificationFormComponent updateStep={updateUserData} isRegistrationComplete={true} />
        </div>
    );
}

export default RegistrationCompletePage