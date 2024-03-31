import React from 'react';
import TenderIcon from '../../assets/icon/tender.svg';
import CreateOrderCommonBannerItem from "./CreateOrderCommonBannerItem";

const CreateTender = () => {
    return (
        <CreateOrderCommonBannerItem
            icon={TenderIcon}
            title="Разыграть тендер или открыть аукцион"
            buttonText="Перейти"
            isLightButton={true}
        />
    );
};

export default CreateTender;
