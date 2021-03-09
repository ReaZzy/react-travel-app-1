import React from "react";
import styles from "./styles.module.css";
import { NativeSelect } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../index";

const Language: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const currentLanguage = useSelector((state:AppStateType)=>state.currentLanguage)
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: "SET_CURRENT_LANGUAGE", payload: e.target.value})
  }
  return (
    <div className={styles.language}>
      <NativeSelect id="select" value={currentLanguage} disableUnderline={true} onChange={handleChange}>
        <option value="ru">RU</option>
        <option value="en">EN</option>
        <option value="es">ES</option>
      </NativeSelect>
    </div>
  );
});
export default Language;
