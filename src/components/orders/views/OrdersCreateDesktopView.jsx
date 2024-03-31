import React, {useMemo} from 'react';
import OrdersContent from "../content";
import OrdersContentColumn from "../content/OrdersContentColumn";
import SectionItem from "../section-item";
import OrdersSectionItemInfoColumn from "../section-item/components/OrdersSectionItemInfoColumn";
import SelectCustom from "../../shared/forms/select-custom";
import OrdersDatePicker from "../date-picker";
import OrdersTransportTypeWrapper from "../transport-type/OrdersTransportTypeWrapper";
import OrdersLocationInfo from "../location-info";
import InputCustom from "../../shared/forms/input-custom";
import CargoInsurance from "../cargo-insurance";
import OrdersDocuments from "../orders-documents";
import OrdersMap from "../map/OrdersMap";
import CreateOrderCommonBannerItem from "../../CreateOrder/CreateOrderCommonBannerItem";
import OrdersSaveButton from "../orders-save-button";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const OrdersCreateDesktopView = ({
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
  onResetPrice ,
  saveDraft ,
}) => {
  const { user } = useSelector(state => state);

  const isValidateForm = useMemo(() => {
    let allow = true
    if (price) {
      if (!pickUpDate || !pickUpStartTime || !pickUpEndTime || !countryFrom) {
        allow = false
      } else if (!deliveryDate || !deliveryStartTime || !deliveryEndTime || !countryTo) {
        allow = false
      } else if (insurance && !declaredPrice || !recipientName) { // || !details
        allow = false
      }
    }
    if (!cityFrom || !cityTo || !weight || !volume || !type || !category ) {
      allow = false
    }

    return allow
  }, [
    pickUpDate, pickUpStartTime, pickUpEndTime, cityFrom, countryFrom, price,
    deliveryDate, deliveryStartTime, deliveryEndTime, cityTo, countryTo,
    category, type, weight, volume, insurance, declaredPrice, recipientName // details,
  ])

  const submitFormData = () => {
    if (!isValidateForm) {
      if (price) {
        if (!pickUpDate || !pickUpStartTime || !pickUpEndTime || !deliveryDate || !deliveryStartTime || !deliveryEndTime) {
          toast.error('Необходимо заполнить поле "Время" погрузки|выгрузки')
        }
        // if (!details) {
        //   toast.error('Необходимо заполнить поле "Описание груза"')
        // }
        if (!recipientName) {
          toast.error('У получателя должно быть адрес')
        }
        if (!copyCount || +copyCount < 1) {
          toast.error('Количество заявки не должен быть 0')
        }
        if (insurance && !declaredPrice) {
          toast.error('Объявленная стоимость не должен быть 0')
        }
      }
      if (!cityFrom || !countryFrom || !cityTo || !countryTo) {
        toast.error('Необходимо заполнить поле "Страна|Город" погрузки|выгрузки')
      }
      if (!category) {
        toast.error('Выберите "Категория груза"')
      }
      if (!type) {
        toast.error('Выберите "Тип транспорта"')
      }
      if (!weight || !volume) {
        toast.error('Необходимо заполнить поле "Объём/Вес"')
      }

      return
    }

    if (price) {
      createOrder()
    } else {
      orderCalculation()
    }

  }

  return (
    <OrdersContent column={2} withAdaptive>
      {/* Info */}
      <OrdersContentColumn>

        <SectionItem isCompact column={2} title="Информация о доставке" gridColumnGap={30} gridGapRow={20}>

          <OrdersSectionItemInfoColumn withArrowRight contentGridColumn={2}>
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
                  saveDraft();
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
          </OrdersSectionItemInfoColumn>

          <OrdersSectionItemInfoColumn contentGridColumn={2}>
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
          </OrdersSectionItemInfoColumn>

          <OrdersSectionItemInfoColumn title="Время погрузки" withArrowRight>
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

          <OrdersSectionItemInfoColumn title="Тип транспорта" isFullWidth>
            <OrdersTransportTypeWrapper
              types={types}
              onClick={(item) => {
                onResetPrice();
                setType(item)
                if (item?.value === "awning") {
                  setTemperatury(null)
                }
                saveDraft()
              }}
              defaultValue={type}
            />
          </OrdersSectionItemInfoColumn>
        </SectionItem>

        <SectionItem isCompact column={2} title="Детали доставки" gridColumnGap={30} gridGapRow={20}>
          <OrdersSectionItemInfoColumn title="Отправитель" withArrowRight>
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
                setAddressTo(item);
                setRecipientUpdate((prev) => prev + 1);
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

        <SectionItem isCompact column={2} title="Информация о грузе" gridColumnGap={30} gridGapRow={20}>

          <OrdersSectionItemInfoColumn title="Объём">
            <InputCustom
              prefixEnd={<span>м<sup>3</sup></span>}
              placeholder={'Введите объем'}
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
              placeholder={'Введите вес'}
              inputType={'number'}
              defaultValue={weight}
              onChangeValue={(item) => {
                onResetPrice();
                setWeight(item);
                saveDraft()
              }}
            />
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

        <SectionItem isCompact title="Страхование груза">
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

        <SectionItem isCompact title="Документы (необязательно)">
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

      {/* Location */}
      <OrdersContentColumn>

        <OrdersMap
          isEditable={!cityFrom || !cityTo}
          isLoading={false}
          cityFrom={cityFrom}
          cityTo={cityTo}
          distance={distance}
          countryTo={countryTo?.name}
          countryFrom={countryFrom?.name}
        />

        <CreateOrderCommonBannerItem
          icon={'/icons/logoY.svg'}
          title={"Создать по цене Biny"}
          subtitle={
            <>
              Моментальная заявка по справедливой цене,
              автоматический подбор водителей
            </>
          }
          buttonText={price ? "Создать заявку" : " Рассчитать стоимость"}
          isValidate={isValidateForm}
          price={price}
          priceDiscount={insurancePrice}
          displayInput
          withInsurance={insurance}
          isLoading={calculationLoading}
          buttonColor="brand"
          onSubmit={submitFormData}
          defaultCount={copyCount}
          changeInput={setCopyCount}
        />

        <CreateOrderCommonBannerItem
          icon={'/icons/tender.svg'}
          title="Разыграть тендер или открыть аукцион"
          buttonText="Перейти"
          isValidate={false}
          buttonColor="light"
          count={0}
        />

        <OrdersSaveButton onSubmit={saveDraft} />
      </OrdersContentColumn>
    </OrdersContent>
  )
};

export default OrdersCreateDesktopView;