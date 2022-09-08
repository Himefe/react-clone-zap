import React from "react";
import styles from "./MessageItem.module.css";
import { useSelector } from "react-redux";

const MessageItem = ({ dados }) => {
  const stateUser = useSelector((state) => state.userReducer);
  const usuarioLogado = stateUser.usuarioLogado;

  const condicaoUsuarioLogado = dados.author !== usuarioLogado.id;

  const now = new Date(dados.date.seconds * 1000);

  let hour = now.getHours();
  let minutes = now.getMinutes();

  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  if (dados) {
    return (
      <div
        className={`${styles.messageLine} first`}
        style={
          condicaoUsuarioLogado
            ? { justifyContent: "flex-start" }
            : { justifyContent: "flex-end" }
        }
      >
        <div
          className={styles.messageItem}
          style={condicaoUsuarioLogado ? { backgroundColor: "#202c33" } : {}}
        >
          <span>{dados.body}</span>
          <div className={styles.messageDate}>{`${hour}:${minutes}`}</div>
        </div>
      </div>
    );
  }
};

export default MessageItem;
