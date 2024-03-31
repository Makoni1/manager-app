import {useEffect, useState} from "react";
import {isMobile, isDesktop, isTablet} from "react-device-detect";

let timerDebounce = null
export const useWindowSize = () => {
  const [desktopVersion, setDesktop] = useState(isDesktop)
  const [mobileVersion, setMobile] = useState(isMobile)
  const [tabletVersion, setTablet] = useState(isTablet)

  const eventResize = () => {
    clearTimeout(timerDebounce)
    timerDebounce = setTimeout(() => {
      setDesktop(window.innerWidth > 1200)
      setTablet(window.innerWidth < 1200 && window.innerWidth > 640)
      setMobile(window.innerWidth < 1200)
    }, 500)
  }

  useEffect(() => {
    window.addEventListener("resize", eventResize);
    return () => window.removeEventListener("resize", eventResize);
  }, [])

  return {
    isMobile: mobileVersion,
    isDesktop: desktopVersion,
    isTablet: tabletVersion,
  }
}