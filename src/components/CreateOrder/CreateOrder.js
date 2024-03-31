import React, { useState } from 'react';
import LogoYIcon from '../../assets/icon/logoY.svg';
import CreateOrderCommonBannerItem from "./CreateOrderCommonBannerItem";

const CreateOrder = () => {
    return (
        <CreateOrderCommonBannerItem
            icon={LogoYIcon}
            title="Создать заявку Biny"
            subtitle={
                <>
                    Моментальная заявка по справедливой цене,
                    <br />
                    автоматический подбор водителей
                </>
            }
            buttonText="Рассчитать стоимость"
            isLightButton={false}
            count={0}
        />
    );
};

export default CreateOrder;

