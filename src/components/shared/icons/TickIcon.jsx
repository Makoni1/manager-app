import React from 'react'
const TickIcon = ({ ...rest}) => {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none" stroke="#40AD45" { ...rest }>
        <path d="M1 4L4.63636 8L11 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
}

export default TickIcon;