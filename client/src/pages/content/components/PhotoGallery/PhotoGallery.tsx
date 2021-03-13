import React, { useState } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
  EffectCube,
  Controller,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import fullscreen from "../../../../assets/img/fullscreen.png";
import "swiper/swiper-bundle.css";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { CurrentCountry, CurrentCountryLang } from "../../../../types";
import { useEffect } from "react";
import { RootState } from "../../../../redux/rootReducer";

enum Lang {
  Ru = "ru",
  Es = "es",
  En = "en",
}

type State = {
  countries: {
    currentCountry: CurrentCountry;
    attractions: [];
  };
};

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCube,
  Thumbs,
  Controller,
]);

const PhotoGallery: React.FC = React.memo(() => {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const handle = useFullScreenHandle();

  const currentCountry = useSelector((state: State) => {
    return state.countries.currentCountry || [];
  });

  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  const [
    countryLangData,
    setCountryLangData,
  ] = useState<CurrentCountryLang | null>(null);

  useEffect(() => {
    setCountryLangData(currentCountry[currentLanguage as Lang]);
  }, [currentCountry, currentLanguage]);

  return (
    <div className={styles.photoGallery}>
      <div className={styles.swiperContainer}>
        <FullScreen handle={handle}>
          <Swiper
            id="main"
            spaceBetween={1}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // @ts-ignore
            controller={{ control: controlledSwiper }}
            effect="cube"
          >
            {countryLangData?.attractions?.map((item: any) => {
              return (
                <SwiperSlide key={item._id}>
                  <img src={item.url} alt="slider" className={styles.img} />
                  <p className={styles.textImg}>{item.name}</p>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            id="controller"
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            // @ts-ignore
            onSwiper={setControlledSwiper}
            watchSlidesVisibility
            watchSlidesProgress
            className={styles.galleryThumbs}
          >
            {countryLangData?.attractions?.map((item: any) => {
              return (
                <SwiperSlide key={item._id} className={styles.slideThumbs}>
                  <img
                    src={item.url}
                    alt="slider"
                    className={styles.imgThumbs}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </FullScreen>
      </div>{" "}
      <img
        src={fullscreen}
        alt="fullscreen"
        className={styles.imgFullscreen}
        onClick={handle.enter}
      />
    </div>
  );
});
export default PhotoGallery;
