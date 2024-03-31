import { get, post, put, destroy } from './config';

const User = {
    get: () =>
        get('/v1/users'),
    register: (data) =>
        post('/v1/users/client/new-register', data),
    update: (data) =>
        post('/v1/users/update', data),
    getCoordinate: (number) =>
        get(`v1/orders/positions/list?orderNo=${number} `),
    getHistory: (id) => 
        get(`v1/orders/states/${id} `),
    changePassword: (data) =>
        post('/v1/users/change-password', data),
    getDriverById: (driverId) =>
        get(`v1/users/by-${driverId}`),
    getCheck: (type, value) =>
        get(`v1/users/client/check/${type}/${value}`),
    isActive: () =>
        get(`v1/users/drivers/isactive`),
}

export default User;
