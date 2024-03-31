import React, {useEffect, useMemo, useState} from 'react';
import OrdersContent from "../content";
import OrdersContentColumn from "../content/OrdersContentColumn";
import SectionItem from "../section-item";
import SelectCustom from "../../shared/forms/select-custom";
import OrdersSectionItemInfoColumn from "../section-item/components/OrdersSectionItemInfoColumn";
import OrdersDatePicker from "../date-picker";
import CreateOrderCommonBannerItem from "../../CreateOrder/CreateOrderCommonBannerItem";
import styles from "../../CreateOrder/CreateOrder.module.scss";
import Loading from "../../invoices/Loading";
import OrderCustomButton from "../../CreateOrder/Button/OrderCustomButton";
import OrdersLocationInfo from "../location-info";
import {useSelector} from "react-redux";
import InputCustom from "../../shared/forms/input-custom";
import CargoInsurance from "../cargo-insurance";
import OrdersDocuments from "../orders-documents";
import OrdersMap from "../map/OrdersMap";
import EditIcon from "../../shared/icons/EditIcon";
import {toast} from "react-toastify";
import moment from "moment";
import {useNavigate} from "react-router-dom";

const stepNames = {
  step1: 1,
  step2: 2,
  step3: 3,
  finish: 4,
}

const OrdersCreateMobileView = ({
  isBackBtn,
  setChangeTitleForMobile,
  isChangedTitleInMobile,
  setCountryFrom,
  setCityFrom,
  countries,
  countryFrom,
  citiesFrom,
  cityFrom,
  countryTo,
  setCountryTo,
  setCityTo,
  citiesTo,
  cityTo,
  pickUpDate,
  pickUpStartTime,
  pickUpEndTime,
  minPickDate,
  setPickUpDate,
  setPickUpStartTime,
  setPickUpEndTime,
  deliveryDate,
  deliveryStartTime,
  deliveryEndTime,
  minDeliveryDate,
  setDeliveryDate,
  setDeliveryStartTime,
  setDeliveryEndTime,
  types,
  setType,
  setTemperatury,
  type,
  addressTo,
  setAddressTo,
  recipientUpdate,
  addressFrom,
  setAddressFrom,
  setRecipientUpdate,
  recipientName,
  setRecipientName,
  recipientPhone,
  setRecipientPhone,
  volume,
  setVolume,
  weight,
  setWeight,
  categories,
  category,
  setCategory,
  temperatures,
  temperature,
  loadingTypes,
  loadingType,
  setLoadingType,
  details,
  setDetails,
  insurance,
  queryInsurance,
  declaredPrice,
  calcInsurance,
  fileInvoice,
  setInvoiceFile,
  files,
  setFiles,
  distance,
  price,
  insurancePrice,
  calculationLoading,
  copyCount,
  setCopyCount,
  createOrder,
  orderCalculation,
  onResetPrice,
  saveDraft
}) => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state);
  const [currentStep, setStep] = useState(stepNames.step1)

  useEffect(() => {
    if (currentStep === stepNames.finish && !isChangedTitleInMobile) {
      setStep(stepNames.step1)
    }
  }, [isChangedTitleInMobile])

  useEffect(() => {
    if (isBackBtn) {
      if (currentStep === stepNames.step3) {
        setStep(stepNames.step2)
      } else if (currentStep === stepNames.step2) {
        setStep(stepNames.step1)
      } else {
        navigate('/main')
      }
    }
  }, [isBackBtn])

  const isValidateForm = useMemo(() => {
    let allow = true
    if (currentStep === stepNames.step1) {
      return !(
        !pickUpDate || !pickUpStartTime || !pickUpEndTime || !countryFrom
        || !deliveryDate || !deliveryStartTime || !deliveryEndTime || !countryTo
        || !type || !cityFrom || !cityTo
      )
    } else if (currentStep === stepNames.step2) {
      return !(
        !weight || !volume || !category || !recipientName // || !details
      )
    }

    return allow
  }, [
    pickUpDate, pickUpStartTime, pickUpEndTime, cityFrom, countryFrom, price,
    deliveryDate, deliveryStartTime, deliveryEndTime, cityTo, countryTo,
    category, type, weight, volume, insurance, declaredPrice, recipientName, // details,
    currentStep
  ])

  const submitFormData = (step) => {
    if (!isValidateForm) {
      if (currentStep === stepNames.step1) {
        if (!cityFrom || !countryFrom || !cityTo || !countryTo) {
          toast.error('Необходимо заполнить поле "Страна|Город" погрузки|выгрузки')
        }
        if (!pickUpDate || !pickUpStartTime || !pickUpEndTime || !deliveryDate || !deliveryStartTime || !deliveryEndTime) {
          toast.error('Необходимо заполнить поле "Время" погрузки|выгрузки')
        }
        if (!type) {
          toast.error('Выберите "Тип транспорта"')
        }
      } else if (currentStep === stepNames.step2) {
        // if (!details) {
        //   toast.error('Необходимо заполнить поле "Описание груза"')
        // }
        if (!category) {
          toast.error('Выберите "Категория груза"')
        }
        if (!weight || !volume) {
          toast.error('Необходимо заполнить поле "Объём/Вес"')
        }
        if (!recipientName) {
          toast.error('У получателя должно быть адрес')
        }
      }
      // if (price) {

      //   if (!copyCount || +copyCount < 1) {
      //     toast.error('Количество заявки не должен быть 0')
      //   }
      //   if (insurance && !declaredPrice) {
      //     toast.error('Объявленная стоимость не должен быть 0')
      //   }
      // }

      return
    }

    if (step === stepNames.step3) {
      setChangeTitleForMobile(true)
      setStep(stepNames.finish)
    } else if (step === stepNames.step2 && !price) {
      orderCalculation()
    } else if (step === stepNames.step2) {
      setStep(stepNames.step3)
    } else {
      setStep(stepNames.step2)
      setChangeTitleForMobile(false)
    }

  }

  return (
    <OrdersContent>
      {/* Step 1 */}
      <OrdersContentColumn gridRowGap={16} hide={currentStep !== stepNames.step1}>
        <SectionItem isMobile withShadow title="Информация о доставке" gridGapRow={14}>
          {/* Fields for From */}
          <OrdersSectionItemInfoColumn title="Страна погрузки">
            <SelectCustom
              key={'countries-from'}
              placeholder="Страна"
              options={countries}
              defaultValue={countryFrom}
              returnObject
              onSubmit={(item) => {
                onResetPrice();
                setCountryFrom(item);
                setCityFrom(null);
                saveDraft()
              }}
            />
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Город погрузки">
            <SelectCustom
              placeholder="Город"
              options={citiesFrom}
              defaultValue={cityFrom}
              returnObject
              isDisabled={!countryFrom}
              onSubmit={(item) => {
                onResetPrice();
                setCityFrom(item);
                saveDraft();
              }}
            />
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Время погрузки">
            <OrdersDatePicker
              date={pickUpDate}
              timeStart={pickUpStartTime}
              timeEnd={pickUpEndTime}
              minDate={minPickDate}
              isSender
              isEditable
              setDate={setPickUpDate}
              setTimeStart={setPickUpStartTime}
              setTimeEnd={setPickUpEndTime}
              detect={saveDraft}
            />
          </OrdersSectionItemInfoColumn>

          {/* Fields for To */}
          <OrdersSectionItemInfoColumn title="Страна выгрузки">
            <SelectCustom
              placeholder="Страна"
              options={countries}
              defaultValue={countryTo}
              returnObject
              onSubmit={(item) => {
                onResetPrice();
                setCountryTo(item);
                setCityTo(null);
                saveDraft();
              }}
            />
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Город выгрузки">
            <SelectCustom
              placeholder="Город"
              options={citiesTo}
              defaultValue={cityTo}
              returnObject
              isDisabled={!countryTo}
              onSubmit={(item) => {
                onResetPrice();
                setCityTo(item);
                saveDraft();
              }}
            />
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Время выгрузки">
            <OrdersDatePicker
              date={deliveryDate}
              timeStart={deliveryStartTime}
              timeEnd={deliveryEndTime}
              minDate={pickUpDate || minDeliveryDate || minPickDate}
              isEditable
              setDate={setDeliveryDate}
              setTimeStart={setDeliveryStartTime}
              setTimeEnd={setDeliveryEndTime}
              detect={saveDraft}
            />
          </OrdersSectionItemInfoColumn>

          {/* Type */}
          <OrdersSectionItemInfoColumn title="Тип транспорта">
            <SelectCustom
              placeholder="Выберите тип"
              options={types}
              defaultValue={type}
              returnObject
              onSubmit={(item) => {
                onResetPrice();
                setType(item)
                if (item?.value === "awning") {
                  setTemperatury(null)
                }
                saveDraft();
              }}
            />
          </OrdersSectionItemInfoColumn>
        </SectionItem>
      </OrdersContentColumn>
      {/* Step 2 */}
      <OrdersContentColumn gridRowGap={16} hide={currentStep !== stepNames.step2}>
        <SectionItem isMobile withShadow title="Детали доставки">
          <OrdersSectionItemInfoColumn title="Отправитель">
            <OrdersLocationInfo
              isSender
              isEditable
              forceOpenDropdown={!!addressTo}
              forceOpenDropdownCount={recipientUpdate}
              companyName={user?.name}
              countries={countries}
              countrySelected={countryFrom}
              citySelected={cityFrom}
              address={addressFrom}
              onChangeAddress={item => {
                setAddressFrom(item); setRecipientUpdate((prev) => prev + 1)
              }}
              onChangeCountry={item => {
                setCountryFrom(item);
                setCityFrom(null);
                saveDraft()
              }}
              onChangeCity={(city) => {
                setCityFrom(city);
                saveDraft()
              }}
              detect={saveDraft}
            />
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Получатель">
            <OrdersLocationInfo
              isEditable
              forceOpenDropdown={!!addressFrom}
              forceOpenDropdownCount={recipientUpdate}
              countries={countries}
              address={addressTo}
              countrySelected={countryTo}
              citySelected={cityTo}
              companyName={recipientName}
              phoneNumber={recipientPhone}
              onChangeAddress={item => {
                setAddressTo(item); setRecipientUpdate((prev) => prev + 1)
              }}
              onRecipientPhone={setRecipientPhone}
              onChangeResipient={setRecipientName}
              onChangeCountry={item => {
                setCountryTo(item);
                setCityTo(null);
                saveDraft()
              }}
              onChangeCity={(city) => {
                setCityTo(city);
                saveDraft()
              }}
              detect={saveDraft}
            />
          </OrdersSectionItemInfoColumn>
        </SectionItem>
        <SectionItem isMobile withShadow title="Информация о грузе">
          <OrdersSectionItemInfoColumn contentGridColumn={2}>
            <OrdersSectionItemInfoColumn title="Объём">
              <InputCustom
                prefixEnd={<span>м<sup>3</sup></span>}
                placeholder={'0'}
                inputType="number"
                defaultValue={volume}
                onChangeValue={(item) => {
                  onResetPrice();
                  setVolume(item);
                  saveDraft()
                }}
              />
            </OrdersSectionItemInfoColumn>

            <OrdersSectionItemInfoColumn title="Вес">
              <InputCustom
                prefixEnd="тонн"
                placeholder={'0'}
                inputType={'number'}
                defaultValue={weight}
                onChangeValue={(item) => {
                  onResetPrice();
                  setWeight(item);
                  saveDraft()
                }}
              />
            </OrdersSectionItemInfoColumn>
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Категория груза">
            <SelectCustom
              options={categories}
              defaultValue={category}
              onSubmit={(item) => {
                onResetPrice();
                setCategory(item);
                saveDraft()
              }}
              returnObject
            />
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Температурный режим">
            <SelectCustom
              options={temperatures}
              defaultValue={temperature}
              onSubmit={(item) => {
                setTemperatury(item);
                saveDraft()
              }}
              returnObject
              isDisabled={type?.value === "awning"}
            />
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Тип погрузки">
            <SelectCustom
              options={loadingTypes}
              defaultValue={loadingType}
              onSubmit={(item) => {
                setLoadingType(item)
                saveDraft()
              }}
              returnObject
            />
          </OrdersSectionItemInfoColumn>

          <OrdersSectionItemInfoColumn title="Описание груза">
            <InputCustom
              placeholder="Например, особые условия хранения"
              defaultValue={details}
              onChangeValue={(item) => {
                setDetails(item)
                saveDraft()
              }}
            />
          </OrdersSectionItemInfoColumn>
        </SectionItem>
      </OrdersContentColumn>
      {/* Step 3 */}
      <OrdersContentColumn gridRowGap={16} hide={currentStep !== stepNames.step3}>
        <SectionItem isMobile withShadow title="Страхование груза">
          <CargoInsurance
            defaultValue={insurance}
            onClick={queryInsurance}
            declaredPrice={declaredPrice}
            setDeclaredPrice={calcInsurance}
            fileInvoice={fileInvoice}
            setInvoiceFile={setInvoiceFile}
            detect={saveDraft}
          />
        </SectionItem>
        <SectionItem isMobile withShadow title="Документы (необязательно)">
          <OrdersDocuments
            key={'files-docs'}
            files={files}
            allowUpload
            allowClearFile
            onUploadFiles={(files) => {
              setFiles(files)
              saveDraft()
            }}
          />
        </SectionItem>
      </OrdersContentColumn>
      {/* Step 4 */}
      <OrdersContentColumn gridRowGap={16} hide={currentStep !== stepNames.finish}>
        <CreateOrderCommonBannerItem
          key={'update-count-' + copyCount}
          isMobile
          icon={'/icons/logoY.svg'}
          title={"Создать по цене Biny"}
          subtitle={
            <>
              Моментальная заявка по справедливой цене,
              автоматический подбор водителей
            </>
          }
          buttonText={"Создать заявку"}
          isValidate={isValidateForm}
          price={price}
          priceDiscount={insurancePrice}
          displayInput
          withInsurance={insurance}
          isLoading={calculationLoading}
          buttonColor="brand"
          defaultCount={copyCount}
          changeInput={setCopyCount}
          onSubmit={createOrder}
        />

        <CreateOrderCommonBannerItem
          isMobile
          icon={'/icons/tender.svg'}
          title="Разыграть тендер или открыть аукцион"
          buttonText="Перейти"
          isValidate={false}
          withInsurance={insurance}
          buttonColor="light"
          count={0}
        />

        <OrdersMap
          isMobile
          isEditable={!cityFrom || !cityTo}
          isLoading={false}
          cityFrom={cityFrom}
          cityTo={cityTo}
          distance={distance}
          countryTo={countryTo?.name}
          countryFrom={countryFrom?.name}
        />

        <SectionItem isMobile withShadow>
          <OrdersSectionItemInfoColumn title="Количество заявок">
            { copyCount || 1 }
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Время погрузки">
            {moment.utc(pickUpDate).format('DD.MM.YYYY')} - {moment(pickUpStartTime).format('HH:mm')}
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Время выгрузки">
            {moment.utc(deliveryDate).format('DD.MM.YYYY')} - {moment(deliveryStartTime).format('HH:mm')}
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Категория груза">
            { category?.name || "-" }
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Объём">
            В сумме: { weight || "0" } тонн, { volume || "0" } м3
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn textColor="#909195" onClick={() => setStep(stepNames.step1)}>
            <EditIcon style={{ marginRight: "8px"}} fill="#909195" />
            Редактировать
          </OrdersSectionItemInfoColumn>
        </SectionItem>
      </OrdersContentColumn>

      {/* Actions */}
      { currentStep !== stepNames.finish && (
        <>
          <OrderCustomButton
            className={styles['createOrder__button']}
            color={isValidateForm ? "brand" : "gray"}
            isValidate={isValidateForm}
            onClick={() => submitFormData(currentStep)}
          >
            {
              calculationLoading
                ? <Loading inBlock marginBottom={0} />
                : currentStep === stepNames.step2 && !price ? "Рассчитать стоимость" : "Далее"
            }
          </OrderCustomButton>
          <CreateOrderCommonBannerItem
            isMobile
            title={"Информация о доставке"}
            buttonText={"Создать заявку"}
            displayButton={false}
            isValidate={true}
            stepCount={3}
            stepCurrent={currentStep}
            stepChange={setStep}
            price={price}
            priceDiscount={insurancePrice}
            displayInput
            withInsurance={insurance}
            isLoading={calculationLoading}
            buttonColor="brand"
            defaultCount={copyCount}
            changeInput={setCopyCount}
          />
        </>
      )}
    </OrdersContent>
  );
};

export default OrdersCreateMobileView;