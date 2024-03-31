import React, { useState, useEffect, useRef } from 'react';
import style from "./style.module.scss";
import AvatarCameraIcon from "../../../shared/icons/AvatarCameraIcon";
import CompanyTickIcon from "../../../shared/icons/CompanyTickIcon";
import NotVerifiedIcon from "../../../shared/icons/NotVerifiedIcon";
import NotVerified from "../NotVerified/NotVerified";
import cn from "classnames";
import {File} from "../../../../services";
import Loading from "../../../invoices/Loading";

const   ChangeAvatar = ({user, onOpenModal}) => {
    const [avatarData, setAvatarData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [showNotVerified, setShowNotVerified] = useState(false);
    const [showUploadButton, setShowUploadButton] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowNotVerified(false);
                setShowUploadButton(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getProfileLogo()
    }, [])

    const handleClick = (event, type) => {
        if (!type) {
            event.stopPropagation()
        }
        if (type === "verify") {
            if (user && user.state !== "Confirmed") {
                setShowNotVerified(true);
            }
        } else {
            setShowUploadButton(true)
        }

    };

    const onChangeInput = e => {
        if (!e?.target?.files[0] || isLoading) {
            return
        }
        uploadFile(e.target.files[0])
    }

    const uploadFile = (file) => {
        setLoading(true)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("type", 9)
        formData.append("side", 0)
        File.uploadDocument(formData)
            .then(res => res.data)
            .then(() => {
                setAvatarData(null)
                setShowUploadButton(false);
                getProfileLogo()
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const getProfileLogo = () => {
        setLoading(true)
        File.getProfileLogo()
            .then(res => res.data)
            .then(data => {
                setAvatarData(data)
            })
            .finally(() => {
                setLoading(false);
            })
    }
    return (
        <label
            htmlFor="upload-avatar"
            ref={containerRef}
            className={cn(style.logo, { [style.logo_hover]: showUploadButton || isLoading })}
            onClick={e => handleClick(e)}
        >
            {/* Image */}
            <img
                src={avatarData?.base64 ? `data:${avatarData?.contentType};base64, ${avatarData?.base64}` : '/images/no-photo.png'}
                alt=""
            />
            {/* Upload Content */}
            <div className={style.logo_upload_tooltip}>
                Загрузить изображение
            </div>
            {/* Loading upload */}
            {isLoading && <Loading inBlock className={style.loading} />}

            {/* Upload icon */}
            {
                !isLoading && <AvatarCameraIcon
                    className={style.logo_upload}
                    onClick={() => setShowUploadButton(!showUploadButton)}
            />
            }
            {/* Verify icon */}
            {
                user && user.state === "Confirmed"
                    ? <CompanyTickIcon className={style.tick} />
                    : <NotVerifiedIcon className={style.tick} onClick={e => handleClick(e, 'verify')} />
            }
            {/* Verify tooltip */}
            {showNotVerified && <NotVerified onOpenModal={onOpenModal} />}
            <input type="file" id="upload-avatar" accept="image/png, image/gif, image/jpeg" onChange={onChangeInput}/>
        </label>
    );
};

export default ChangeAvatar;