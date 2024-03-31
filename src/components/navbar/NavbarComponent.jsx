import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {Nav} from 'react-bootstrap';


const CLIENT_NAV_LINKS = [
    { id: '1', title: 'Заказы', path: '/main' },
    { id: '2', title: 'Счета', path: '/invoices' },
    { id: '3', title: 'Профиль', path: '/profile' },
];

const EXPEDITOR_NAV_LINKS = [
    { id: '1', title: 'Заказы', path: '/main' },
    { id: '2', title: 'Поиск', path: '/explore' },
    { id: '3', title: 'Водители', path: '/drivers' },
    { id: '4', title: 'Профиль', path: '/profile' },
]

const NavbarComponent = () => {

    const {navbar} = useSelector(state => state.navigation);
    const { user } = useSelector(state => state);

    console.log('USER in nvabar', user)

    const renderNavLinks = () => {
        if(user) {
            if(user.type === "Expeditor") {
                const list = EXPEDITOR_NAV_LINKS.map((item, idx) => {
                    return (
                        <Link to={item.path} style={{ textDecoration: 'none' }} key={idx}>
                        <div style={{ color: `${item.id === navbar.activeNavId ? '#C5115E' : '#A3ACB6'}`, fontWeight: '600', padding: '4px 16px', fontSize: '15px' }}>{item.title}</div>
                         </Link>
                    );
                });
                return list;
            }else {
                const list = CLIENT_NAV_LINKS.map((item, idx) => {
                    return (
                        <Link to={item.path} style={{ textDecoration: 'none' }} key={idx}>
                        <div style={{ color: `${item.id === navbar.activeNavId ? '#C5115E' : '#A3ACB6'}`, fontWeight: '600', padding: '4px 16px', fontSize: '15px' }}>{item.title}</div>
                        </Link>
                    );
                });
                return list;
            }
        }else {
            return (
                <div>Загрузка...</div>
            );
        }
        
    }

    return (
        <div style={{ display: 'flex' }}>
            {renderNavLinks()}
        </div>
        // <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
        //     {renderNavLinks()}
        // </Nav>
    );
}

export default NavbarComponent;