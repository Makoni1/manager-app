import React from 'react';


const BalanceSectionItem = ({ title, children, isCompact = false, column = 1, isEditable = false }) => {
    return (
        <BalanceSectionItem isCompact={isCompact} column={column} title={title} isEditable={isEditable}>
            { children }
        </BalanceSectionItem>
    );
};

export default BalanceSectionItem;