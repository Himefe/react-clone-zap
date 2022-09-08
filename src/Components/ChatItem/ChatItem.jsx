import React from "react";
import AppStyles from "../../App.module.css";
import styles from "./ChatItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addActiveChat } from "../../Redux/Reducers/ChatReducer";

const ChatItem = ({ active, chat, isContact }) => {
  const stateUser = useSelector((state) => state.userReducer.usuarioLogado);
  const dispatch = useDispatch();

  const [dateTime, setDateTime] = React.useState(null);

  React.useEffect(() => {
    const miliseconds = 1000;

    const secondsInDateTime =
      (chat?.lastMessageDate?.seconds || chat?.LastMessageDate?.seconds) *
      miliseconds;

    const date = new Date(secondsInDateTime);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const formatedDateTime = `${hours}:${minutes}`;

    setDateTime(formatedDateTime);
  }, [chat]);

  return (
    <div className={`${styles.chatItem}`} data-active={active}>
      <div className={styles.avatar}>
        <img src={chat.image || chat.avatar} alt="Avatar ícone" />
      </div>
      <div className={styles.detalhes_mensagens}>
        <div className={styles.nome_e_mensagem}>
          <b className={styles.nome}>{chat.title || chat.name}</b>
          {chat.lastMessage && isContact !== true && (
            <p className={styles.messagem}>{chat?.lastMessage}</p>
          )}
        </div>
        {chat.lastMessage && isContact !== true && (
          <div className={styles.detalhes_direita}>
            <p className={styles.hora}>{dateTime}</p>
            <div className={styles.notificacoes}>
              {/* <span>{chat.mensagens.length}</span> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
