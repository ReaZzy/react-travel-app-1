import React, { useState, useEffect, useCallback } from "react";
import ReactBnbGallery from "react-bnb-gallery";
import "react-bnb-gallery/dist/style.css";
import { useSelector } from "react-redux";
import { CurrentCountry, CurrentCountryLang } from "../../../../types";
import { RootState } from "../../../../redux/rootReducer";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@material-ui/lab/Rating";
import Modal from "@material-ui/core/Dialog";
import fullscreen from "../../../../assets/img/fullscreen.png";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCube,
} from "swiper";

import "swiper/swiper-bundle.css";
import styles from "./styles.module.css";
import Votes from "./Votes";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCube]);

enum Lang {
  Ru = "ru",
  Es = "es",
  En = "en",
}

type BtnVoteDescription = {
  [key in Lang]?: string;
};

const textBtnVote: BtnVoteDescription = {
  [Lang.Ru]: "Голосовать",
  [Lang.En]: "Vote",
  [Lang.Es]: "Votar",
};

const textBtnSave: BtnVoteDescription = {
  [Lang.Ru]: "Сохранить",
  [Lang.En]: "Save",
  [Lang.Es]: "Salvar",
};

type State = {
  countries: {
    currentCountry: CurrentCountry;
    attractions: [];
  };
};

const PhotoGallery: React.FC = React.memo(() => {
  const { request } = useHttp();

  const currentCountry = useSelector((state: State) => {
    return state.countries.currentCountry || [];
  });

  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  const token = useSelector((state: RootState) => state.auth.token);

  const [
    countryLangData,
    setCountryLangData,
  ] = useState<CurrentCountryLang | null>(null);

  useEffect(() => {
    setCountryLangData(currentCountry[currentLanguage as Lang]);
  }, [currentCountry, currentLanguage]);

  const [images, setImages] = useState([]);
  const [galleryOpened, setGalleryOpened] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const toggleGallery = useCallback(() => {
    setGalleryOpened(!galleryOpened);
  }, [galleryOpened]);

  useEffect(() => {
    if (countryLangData?.attractions) {
      const imagesSlider = countryLangData?.attractions.reduce(
        (acc: any, item) => {
          return (acc = [
            ...acc,
            { photo: item.url, caption: item.name, thumbnail: item.url },
          ]);
        },
        []
      );

      setImages(imagesSlider);
    }
  }, [countryLangData]);
  const [valueReiting, setValueReiting] = useState(0);
  const [open, setOpen] = useState(false);
  const [attractionID, setAttractionID] = useState("");
  const handleClickOpen = useCallback((id) => {
    setOpen(true);
    setAttractionID(id);
    setValueReiting(0);
  }, []);

  const handleClose = useCallback((value) => {
    setOpen(false);
  }, []);

  const handleChangeReiting = useCallback((e) => {
    setValueReiting(e.target.value);
  }, []);

  const handleClickSave = useCallback(async () => {
    const resultReiting = {
      countryId: currentCountry.en._id,
      attractionId: attractionID,
      lang: currentLanguage,
      value: valueReiting,
    };

    try {
      console.log(token);

      const data = await request("/api/service/vote", "POST", resultReiting, {
        Authorization: `Bearer ${token}`,
      });
      console.log(data);
    } catch (error) {}
    setOpen(false);
  }, [
    valueReiting,
    currentCountry,
    attractionID,
    currentLanguage,
    request,
    token,
  ]);

  return (
    <div className={styles.photoGallery}>
      <div className={styles.swiperContainer}>
        <Swiper
          id="main"
          spaceBetween={1}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {countryLangData?.attractions?.map((item: any) => {
            return (
              <SwiperSlide key={item._id}>
                <img src={item.url} alt="slider" className={styles.img} />
                <div className={styles.textImg}>
                  <p className={styles.textImg__text}>{item.name}</p>
                  {isLoggedIn && <Votes />}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={styles.modal}
        >
          <Rating
            name="hover-feedback"
            precision={1}
            size="large"
            onChange={handleChangeReiting}
            className={styles.modalReiting}
          />
          <Button
            variant="contained"
            color="primary"
            className={styles.btnRating}
            onClick={handleClickSave}
          >
            {textBtnSave[currentLanguage as Lang]}
          </Button>
        </Modal>
        {images.length && (
          <ReactBnbGallery
            photos={images}
            show={galleryOpened}
            onClose={toggleGallery}
          />
        )}
      </div>
      <img
        src={fullscreen}
        alt="fullscreen"
        className={styles.imgFullscreen}
        onClick={toggleGallery}
      />
    </div>
  );
});
export default PhotoGallery;
