import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import ConfirmDocs from "../../components/profile/ConfirmDocs";
import style from "./index.module.scss"

const VerifyDocs = () => {
  const navigate = useNavigate()
  const params = new URLSearchParams(window.location.search)
  const redirectUrl = params.get('redirectUrl')
  const { user } = useSelector(state => state);

  useEffect(() => {
    const banner = document.querySelector("#BannerWarning")
    const contentForModerating = banner.querySelectorAll(".is-moderation")
    const contentForDocs = banner.querySelectorAll(".is-need-docs")
    const isDisplayed = banner?.dataset.display
    if (isDisplayed === "true") {
      banner.style.display = "none"
      return () => {
        banner.style.display = "block"
        for (let i = 0; i < contentForDocs.length; i++) {
          contentForDocs[i].style.display = "none"
        }
        for (let i = 0; i < contentForModerating.length; i++) {
          contentForModerating[i].style.display = "inline-block"
        }
      }
    }
  }, [])

  return (
    <div className={style.wrapper}>
      <ConfirmDocs
        userId={user?.id}
        updateData={() => {
          navigate(redirectUrl)
        }}
      />
    </div>
  );
};

export default VerifyDocs;