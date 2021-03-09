import React from "react";
import styles from "./styles.module.css";
import Button from "@material-ui/core/Button";

const Registration: React.FC = React.memo(() => {
  return (
    <div className={styles.registration}>
      <Button>Login/Register</Button>
    </div>
  );
});
export default Registration;
