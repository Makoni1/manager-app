export const CLIENT_ORDER_STATUSES = ['all', 'moderation', 'awaitingpayment', 'awaiting-loading',
    'inprocess', 'completed', 'canceled'];

export const EXPEDITOR_ORDER_STATUSES = ['all', 'booked', 'confirmed', 'inprocess', 'waitingforcompletion', 'completed'];

export const ORDER_STATUSES_DATA = {
    'moderation': {title: 'На модерации', color: '#8B8C90'},
    'booked': {title: 'Забронирован', color: '#3A50C6'},
    'waitloadingcargo': {title: 'Ожидает погрузки', color: '#3A50C6'},
    'published': {title: 'Опубликован', color: '#3A50C6'},
    'awaitingpayment': {title: 'Ожидает оплаты', color: '#FBC334'},
    'processloadingcargo': {title: 'Идет погрузка', color: '#3A50C6'},
    'processunloadingcargo': {title: 'Идет разгрузка', color: '#0275d8'},
    'loadingcargomoderation': {title: 'Подтверждение погрузки на модерации', color: '#3A50C6'},
    'unloadingcargomoderation': {title: 'Подтверждение разгрузки на модерации', color: '#0275d8'},
    'rejectedunloadingcargomoderation': {title: 'Разгрузка отклонена', color: '#3A50C6'},
    'waitstarttrip': {title: 'Ожидание начала поездки', color: '#3A50C6'},
    'confirmed': {title: 'Подтвержден', color: '#0275d8'},
    'unloadingcargo': {title: 'В пути', color: '#3A50C6'},
    'loadingcargo': {title: 'В пути', color: '#3A50C6'},
    'onthetrip': {title: 'В пути', color: '#0275d8'},
    // "onthetrip": {title: 'Ожидает завершения', color: '#40AD45'},
    "waitingforcompletion": {title: 'Ожидает завершения', color: '#40AD45'},
    "waitcompletion": {title: 'Ожидает завершения', color: '#40AD45'},
    'completed': {title: 'Завершен', color: '#20B038'},
    'rejected': {title: 'Отклонён', color: '#A3ACB6'},
    'canceled': {title: 'Отменено', color: '#A3ACB6'}
}

export const INVOICE_STATUSES_DATA = {
    'awaitingpayment': {title: 'Не оплачен', color: '#f0be39'},
    "paid": {title: 'Оплачен', color: '#5cb85c'},
}

export const ACTIVE_DATA = [
    {name: 'По актуальности', code: 'status'},
    {name: 'По дате создания заявки', code: 'createDate'},
    {name: 'По стоимости', code: 'price'},
]

// export const ORDER_STATUSES_DATA = {
//     'published': {title: 'ДОСТУПЕН', color: '#f0be39'}, 
//     'booked': {title: 'НА РАССМОТРЕНИИ', color: '#f0ad4e'}, 
//     'confirmed': {title: 'НАЗНАЧЕН', color: '#5cb85c'}, 
//     'inprocess': {title: 'В ПУТИ', color: '#0275d8'}, 
//     'completed': {title: 'ВЫПОЛНЕН', color: '#A3195B'}
// }
