import React from "react";
import styles from "./ChatWindow.module.css";
import appStyles from "../../App.module.css";
import { useSelector } from "react-redux";
import { MoreHoriz, Search } from "@mui/icons-material";

const ChatWindow = () => {
  const state = useSelector((state) => state.chatReducer);

  const activeChat = state.chatList.find(
    (chat) => chat.chatId === state.activeChatId
  );

  return (
    <div className={`${styles.chatWindow} ${appStyles.spacerPadding}`}>
      <div className={styles.chatWindow_header}>
        <div className={styles.chatWindow_headerInfo}>
          <div className={styles.chatWindow_avatar}>
            <img src={activeChat.avatar} alt="Profile" />
          </div>
          <b>{activeChat.nome}</b>
        </div>
        <div className={styles.chatWindow_icons_area}>
          <Search />
          <MoreHoriz />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
