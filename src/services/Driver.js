import { get, post, put, destroy } from './config';

const Driver = {
    createCompanyDriver: (data) =>
        post('v1/users/driver/add', data),
    createDriverByExpeditor: (expeditorId, data) =>
        post(`v1/users/drivers/create/${expeditorId}`, data),
    getByCompany: (companyId, state, page) =>
        get(`v1/users/drivers?companyId=${companyId}&state=${state}&page=${page}`),
    assignDriver: (orderId, driverId) =>
        post(`v1/orders/book/by-${orderId}-and-${driverId}`),
    getDriversListByExpeditor: (expeditorId, params) =>
        get(`v1/users/drivers/by-expeditor-${expeditorId}`, { params }), // { params: { vehicleTypeId } }
    createVehicleByExpeditor: (expeditorId, data) =>
        post(`v1/vehicle/create/${expeditorId}`, data),
    getVehicleByExpeditor: (expeditorId, data) =>
        get(`v1/vehicle/list/${expeditorId}`, data),
    getVehicleTypes: () =>
        get("v1/directories/vehicle/types/"),
    getVehicleLoadingTypes: () =>
        get("v1/directories/vehicle/loading-types/")
}

export default Driver;