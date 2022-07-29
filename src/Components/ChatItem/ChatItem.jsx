import React from "react";
import AppStyles from "../../App.module.css";
import styles from "./ChatItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addActiveChat } from "../../Redux/Reducers/ChatReducer";

const ChatItem = ({ active, chat }) => {
  const dispatch = useDispatch();

  const handleClickRef = () => {
    dispatch(addActiveChat(chat.chatId));
  };

  return (
    <div
      className={`${styles.chatItem}`}
      onClick={handleClickRef}
      data-active={active}
    >
      <div className={styles.avatar}>
        <img src={chat.avatar} alt="Avatar ícone" />
      </div>
      <div className={styles.detalhes_mensagens}>
        <div className={styles.nome_e_mensagem}>
          <b className={styles.nome}>{chat.nome}</b>
          <p className={styles.messagem}>{chat.mensagens.at(-1)}</p>
        </div>
        <div className={styles.detalhes_direita}>
          <p className={styles.hora}>22:12</p>
          <div className={styles.notificacoes}>
            <span>{chat.mensagens.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
