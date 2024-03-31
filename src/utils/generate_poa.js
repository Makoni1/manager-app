import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import {tnr_regular} from './fonts/tnr-regular';
import {tnr_bold} from './fonts/tnr-bold';
import {tnr_italics} from './fonts/tnr-italics';
import {tnr_bold_italics} from './fonts/tnr-bold-italics';

import {signature} from './signature';

const generatePOA = (driverInfo, driver, senderName, recipientName, orderNumber, shippingDate, unloadingDate) => {
    let non_zero_order_number = orderNumber;
    while (non_zero_order_number[0] === '0') {
        non_zero_order_number = non_zero_order_number.slice(1);
    }
    // [YYYY, MM, DD]
    let formattedShippingDate = [shippingDate.slice(0, 4), shippingDate.slice(5, 7), shippingDate.slice(8, 10)];
    let formattedUnloadingDate = [unloadingDate.slice(0, 4), unloadingDate.slice(5, 7), unloadingDate.slice(8, 10)];
    if (formattedShippingDate[2][0] === '0') {
        formattedShippingDate[2] = formattedShippingDate[2].slice(1, 2);
    }
    if (formattedUnloadingDate[2][0] === '0') {
        formattedUnloadingDate[2] = formattedUnloadingDate[2].slice(1, 2);
    }
    const mapper_month = {
        "01": "января",
        "02": "февраля",
        "03": "марта",
        "04": "апреля",
        "05": "мая",
        "06": "июня",
        "07": "июля",
        "08": "августа",
        "09": "сентрября",
        "10": "октября",
        "11": "ноября",
        "12": "декабря"
    }
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    window.pdfMake.vfs["TimesNewRoman-Regular.ttf"] = tnr_regular;
    window.pdfMake.vfs["TimesNewRoman-Bold.ttf"] = tnr_bold;
    window.pdfMake.vfs["TimesNewRoman-Italics.ttf"] = tnr_italics;
    window.pdfMake.vfs["TimesNewRoman-Bold-Italics.ttf"] = tnr_bold_italics;

    pdfMake.fonts = {
        TimesNewRoman: {
            normal: 'TimesNewRoman-Regular.ttf',
            bold: 'TimesNewRoman-Bold.ttf',
            italics: 'TimesNewRoman-Italics.ttf',
            bolditalics: 'TimesNewRoman-Bold-Italics.ttf',
        },
    };

    const documentDefinition = {
        content: [
            {
                text: `ДОВЕРЕННОСТЬ №${non_zero_order_number}`,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10],
            },
            {
                text: '\n',
                fontSize: 14,
            },
            {
                columns: [
                    {
                        text: 'г. Астана',
                        bold: true,
                        alignment: 'left',
                    },
                    {
                        text: `${formattedShippingDate[2]} ${mapper_month[formattedShippingDate[1]]} ${formattedShippingDate[0]} года`,
                        bold: true,
                        alignment: 'right',
                    },
                ],
                margin: [0, 0, 0, 10],
            },
            {
                text: '\n',
            },
            {
                text:
                    ['Товарищество с ограниченной ответственностью "LAGOM Group" БИН 201140021812 (',
                        {text: 'далее – Доверитель', italics: true},
                        `), находящийся по адресу РК, 010000 г. Астана, район Алматы, ул.Панфилова, 14 в лице директора Хасеновой А.Б, действующего на основании Устава, настоящей доверенностью уполномочивает водителя автомашины ${driverInfo.carModel.toUpperCase()} ${driverInfo.carNumber}/${driverInfo.trailerNumber.toUpperCase()}, ${driver.surname} ${driver.name} ${(driver.patronymic || '')}, номер удостоверения личности №${driverInfo.idNumber} от ${driverInfo.issuedDate.slice(0, 10)} ${driverInfo.issuedBy} получить материальные ценности от компании ${senderName} в адрес компании ${recipientName}`],
                margin: [0, 0, 0, 10],
            },
            {
                text: '\n',
            },
            {
                text: ` Настоящая доверенность действительна до ${formattedUnloadingDate[2]} ${mapper_month[formattedUnloadingDate[1]]} ${formattedUnloadingDate[0]} года`,
            },
            {
                text: '\n\n',
            },
            {
                image: signature,
                width: 500,
                height: 150,
            },
        ],
        defaultStyle: {
            font: 'TimesNewRoman',
            fontSize: 15,
        },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    //pdfDocGenerator.open();
    pdfDocGenerator.download(`order${non_zero_order_number}POA.pdf`)
};

export default generatePOA;
