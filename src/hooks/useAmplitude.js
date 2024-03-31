import * as amplitude from '@amplitude/analytics-browser';
import {useSelector} from "react-redux";

const AMPLITUDE_API_KEY = "8e1112dffb340743ae4dbd431f212992"

export const useAmplitude = () => {
  const { user } = useSelector(state => state);

  const amplitudeInit = (options = {}) => {
    amplitude.init(AMPLITUDE_API_KEY, {
      defaultTracking: false,
      ...options
    });
  }
  const amplitudeTrack = (eventName, options) => {
    amplitude.track(eventName, options);
  }

  return {
    amplitude: {
      init: amplitudeInit,
      startCreatingOrder: () => {
        amplitudeTrack("web.sender.order.startCreatingOrder", {
          bin: user?.businessIdentificationNumber || "",
          userId: user?.id || "",
        })
      },
      sendDocsToVerify: () => {
        amplitudeTrack("web.sender.registration.SendDocsToVerify", {
          bin: user?.businessIdentificationNumber || "",
          userId: user?.id || "",
        })
      },
      toUploadDocs: () => {
        amplitudeTrack("web.sender.registration.toUploadDocs",
          {
            bin: user?.businessIdentificationNumber || ""
          })
      },
      clientTypeSelected: (type = "", typeName = "") => {
        amplitudeTrack(
          "web.sender.registration.clientTypeSelected", { type, typeName }
        )
      },
      filledInfo: (phoneNumber, bin, ) => {
        amplitudeTrack(
          "web.sender.registration.filledInfo",
          {
            phone: phoneNumber || "",
            bin: bin || ""
          }
        )
      },
      orderCalculatePrice: (price, netPrice, payload, insurance) => {
        amplitudeTrack(
          "web.sender.order.calculatePrice",
          {
            userId: user?.id || "",
            bin: user?.businessIdentificationNumber || "",
            price: price || "",
            netPrice: netPrice || "",
            formData: payload || "",
            insurance: insurance || false,
          }
        )
      },
      createOrder: (orderId, insurance, createdAt) => {
        amplitudeTrack(
          "web.sender.order.createOrder",
          {
            userId: user?.id || "",
            bin: user?.businessIdentificationNumber || "",
            orderId: orderId || "",
            insurance: insurance || false,
            createdAt: createdAt || "",
          }
        )
      }
    }
  }
}