import React from 'react'

const CompanyTickIcon = ({ ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" {... rest}>
            <circle cx="11" cy="11" r="11" fill="#40AD45"/>
            <path d="M6 11L9.63636 15L16 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default CompanyTickIcon;
