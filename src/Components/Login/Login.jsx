import React from "react";
import styles from "./Login.module.css";

const Login = ({ googleAuth }) => {
  return (
    <div className={styles.buttonAreaLogin}>
      <button onClick={googleAuth}>
        <span>Login com o google</span>
      </button>
    </div>
  );
};

export default Login;
