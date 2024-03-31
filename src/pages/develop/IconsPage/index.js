import React, {useMemo} from 'react';
import Icons from "../../../components/shared/icons"
import WrapperContent from '../../../components/shared/WrapperContent';
import HeaderContent from '../../../components/shared/HeaderContent';
import style from "./style.module.scss";
import {toast} from 'react-toastify';
const Index = () => {
  const iconComponents = useMemo(() => {
    const icons = []
    const iconsSort = {}
    for (let key in Icons) {
      const name = key.replace(/^\.\//, '').replace(/\.jsx$/, '')
      const nameFirstLetter = name.charAt(0).toUpperCase()

      if (!iconsSort[nameFirstLetter]) {
        iconsSort[nameFirstLetter] = []
      }

      iconsSort[nameFirstLetter].push({
        key,
        name,
        nameWithOutPrefix: name.replace("Icon", ""),
        Component: Icons[key].default
      })
    }

    for (let key in iconsSort) {
      icons.push({
        name: key,
        components: iconsSort[key]
      })
    }

    return icons
  }, [Icons])

  const copyToClipboard = text => {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);

    const selected =
      document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');

    document.body.removeChild(el);

    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    toast.success("Название скопировано в буфер обмена")
  }



  return (
    <WrapperContent>
      <HeaderContent title={"Icons"} />
      { iconComponents.map(item => (
        <div
          key={"components-" + item.name}
          className={style.alphabet}
        >
          <h3 className={style.title}>{item.name}</h3>
          {item.components.map(component => (
            <div
              key={component.key}
              className={style.card}
              onClick={()=> copyToClipboard(component.name)}
            >
              <component.Component />
              <span>{component.nameWithOutPrefix}</span>
            </div>
          ))}
        </div>
      )) }
    </WrapperContent>
  );
};

export default Index;