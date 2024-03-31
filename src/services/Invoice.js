import {get} from './config';

const Invoice = {
    getByUser: (userId, status, page, isBalance = false) =>
        get(`v1/invoices/by-user-${userId}?status=${status}&page=${page}&isBalance=${isBalance}`),

    getBalanceInfo: (userId) =>
        get(`v1/invoices/balance-info/${userId}`),

    getInvoicesWithPagination: (userId, params) =>
        get(`v1/invoices/pagination/by-user-${userId}`, { params }),

}

export default Invoice;
