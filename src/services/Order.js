import {get, post, put, destroy} from './config';

const Order = {
    getOrders: (status, page) =>
        get(`/v1/orders?status=${status}&page=${page}`),
    getOwnOrders: (params = {}) =>
        get('/v1/orders/own', { params }),
    getOwnActiveOrders: (params = {}) =>
        get('/v1/orders/own/active', { params }),
    getOwnHistoryOrders: (params = {}) =>
        get('/v1/orders/own/history', { params }),
    getOrderById: (orderId) =>
        get(`v1/orders/by-${orderId}`),
    getAccount: (userId, summa) =>
        get(`/balance/${userId}?sum=${summa}`),
    create: (data) =>
        post('/v1/orders/create', data),
    update: (data) =>
        post('/v1/orders/update', data),
    createDraft: (data) =>
        post('/v1/orderdraft/create', data),
    updateDraft: (data, orderId) =>
        post(`/v1/orderdraft/update/${orderId}`, data),
    deleteDraftOrderById: (orderId) =>
        destroy(`/v1/orderdraft/${orderId}`),
    getDraftOrders: (params) =>
        get(`/v1/orderdraft/list`, { params }),
    deleteDraftOrders: () =>
        destroy(`/v1/orderdraft/all`),
    getDraftOrder: (order) =>
        get(`/v1/orderdraft/${order}`),
    getStatusWithOrderCounts: (data) =>
        get('/v1/orders/own/active-count', data),
    getCompletedOrdersCount: (data) =>
        get('/v1/orders/completed-orders-count', data),
    getCancelList: () =>
        get('/v1/directories/order/cancelmessages'),
    canceled: (data) =>
        post('/v1/orders/canceled', data),
    getCountries: (userId) =>
        get(`v1/directories/countries?userId=${userId}`),
    getCountryById: (id) =>
        get(`v1/directories/countries/by-country-${id}`),
    getCities: (countryId, userId) =>
        get(`v1/directories/cities/by-${countryId}?userId=${userId}`),
    getCityById: (id) =>
        get(`v1/directories/city/by-${id}`),
    getCategories: () =>
        get('v1/directories/cargo/categories'),
    getTypes: () =>
        get('v1/directories/vehicle/types'),
    // info: (data) =>
    //     post('v1/orders/info', data),
    getCargo: (cargoId) =>
        get(`v1/orders/cargo/by-cargo-${cargoId}`),
    getActiveOrdersByExpeditor: (expeditorId, params) =>
        get(`v1/orders/expeditor/active-orders?expeditorId=${expeditorId}`, { params }), // params = &page={page}&limit={limit}
    getCompanyOrders: (companyId, params) =>
        get(`v1/orders/by-company/${companyId}`, { params }),
    getAllOrders: (status, countryIdFrom, cityIdFrom, shippingDate, countryIdTo, cityIdTo, cargoCategory, vehicleType, minWeight, maxWeight, page) =>
        get(`v1/orders/all?status=${status}&countryIdFrom=${countryIdFrom}&cityIdFrom=${cityIdFrom}&shippingDate=${shippingDate}&countryIdTo=${countryIdTo}&cityIdTo=${cityIdTo}&cargoCategory=${cargoCategory}&vehicleType=${vehicleType}&minWeight=${minWeight}&maxWeight=${maxWeight}&page=${page}`),
    getAllOrderList: (status, countryIdFrom, cityIdFrom, shippingDate, countryIdTo, cityIdTo, cargoCategory, vehicleType, minWeight, maxWeight, page, limit = 15) =>
        get(`v1/orders/list?status=${status}&page=${page}&limit=${limit}&countryIdFrom=${countryIdFrom}&cityIdFrom=${cityIdFrom}&shippingDate=${shippingDate}&countryIdTo=${countryIdTo}&cityIdTo=${cityIdTo}&cargoCategory=${cargoCategory}&vehicleType=${vehicleType}&minWeight=${minWeight}&maxWeight=${maxWeight}`),
    getAllOrdersQuantity: (status) =>
        get(`v1/orders/quantity/all?status=${status}`),
    getOrderPrice: (data) =>
        post('v1/algorithm/calculate', data),
    getLastPosition: (orderId, driverId) =>
        get(`v1/orders/positions/last?orderId=${orderId}&driverId=${driverId}`),
    getRecipient: (recipientId) =>
        get(`v1/orders/recipient/by-recipient-${recipientId}`),
    driverInfo: (userId) =>
        get(`v1/users/driver/info/${userId}`),
    getDriverInfo: (driverId) =>
      get(`v1/users/driver/info/by-${driverId}`),
    getTemperaturesDisc: () =>
        get(`v1/directories/temperatures/`),
    getLoadingTypesDisc: () =>
        get(`v1/directories/loading-types`),
    getUserAddress: (params) =>
        get(`v1/useraddress/list`, { params }),
    getUserAddressCreate: (data) =>
        post(`v1/useraddress/create`, data),
    sendOrderBook: (orderId, data) =>
        post(`v1/orders/expeditor/book/${orderId}?vehicleId=${data.vehicleId}&driverId=${data.driverId}`, data), // ?vehicleId={vehicleId}&orderId={orderId}
    cancelOrderBook: (orderId, data) =>
        post(`v1/orders/expeditor/cancel-book/${orderId}`, data),
    getOrderForExpeditor: (params) => // params = { orderId: ID }
        get(`v1/orders/expeditor-order`, { params }),


}

export default Order;
