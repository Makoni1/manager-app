import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCreative, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from "./slider.module.scss"
import "./local.scss"

const ITEMS = [
  {
    image: "Frame-446-min.jpg",
    name: "100 заказов одним <br/> кликом — не предел",
    summary: "Создавайте сколько угодно экземпляров за раз, копируйте существующие, сохраняйте шаблонов"
  },
  {
    image: "Frame-447-min.jpg",
    name: "Анализируйте цены <br/> и заказы в реальном времени",
    summary: "Сравнивайте цены в разные периоды, следите за качеством проведения бизнес-процессов, совершенствуйте свою стратегию"
  },
  {
    image: "Frame-449-min.jpg",
    name: "Разыгрывайте аукционы <br />между водителями",
    summary: "Необходимо сэкономить на поставке? Разыграйте её между частными водителями Biny и выбирайте из предложенных ими цен"

  },
  {
    image: "Frame-448-min.jpg",
    name: "Тендеры транспортным <br />компаниям",
    summary: "Выстраивайте отношения с транспортными компаниями без лишних звонков и обсуждений и получайте фидбек на месте"
  },
  {
    image: "Frame-450-min.jpg",
    name: "Забудьте о бумажках",
    summary: "Загружайте документы лишь однажды, а Biny автоматически и своевременно распределит их между сотрудниками и водителями."
  }
]

const SliderRegistration = () => {
  return (
    <div className={styles.wrapper}>
      <Swiper
        spaceBetween={5}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectCreative]}
      >
        {ITEMS.map(slide => (
          <SwiperSlide key={slide.name}>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={`/images/registration/${slide.image}`} alt={slide.name} />
              </div>
              <div className={styles.content}>
                <h3 dangerouslySetInnerHTML={{ __html: slide.name }}></h3>
                <p>{slide.summary}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderRegistration;