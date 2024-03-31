import {get, post, put, destroy} from './config';

const File = {
    add: (formData) =>
        post('/v1/files/new-document', formData),
    addOrderDoc: (formData) =>
        post('/v1/files/order/document', formData),
    uploadDocument: (data) =>
        post(`v1/files/document`, data),
    uploadDocumentDriver: (data) =>
        post(`v1/files/document/expeditor-driver`, data),
    get: (type) =>
        get(`v1/files/document/${type}`, {responseType: 'blob'}),
    getProfileLogo: () =>
        get(`v1/files/profile-image64`),
    getImageByType: (type, id, params) =>
        get(`v1/files/image-base64/${type}/${id}`, {params}),
    getDocApp: (orderId) =>
        get(`v1/documents/document-nod/${orderId} `, {responseType: 'blob'}),
    checkDocApp: (userId) =>
        get(`v1/files/document/check-client-docs/${userId}`),
    getFilesByOrder: (orderId) => get(`v1/files/order/document/list/by-order-${orderId}`),
    downloadFileById: (fileId) =>
        get(`v1/files/order/document/download/${fileId}`, {responseType: 'blob'}),
    getDriverPhoto: (driverId) =>
        get(`v1/files/driver/profile-image64?driverId=${driverId}`),
    addVehicleFile: (data) =>
        post('v1/files/document/vehicle', data),
}


export default File;
