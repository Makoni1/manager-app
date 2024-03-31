import React from 'react';

import BalanceSectionItemWrapper from "./components/OrdersSectionItemWrapper";

const BalanceSectionItem = ({ children, ...rest }) => {
  return (
    <BalanceSectionItemWrapper {...rest}>
      { children }
    </BalanceSectionItemWrapper>
  );
};

export default BalanceSectionItem;