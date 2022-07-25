import React from "react";
import styles from "./App.module.css";

import {
  DonutLarge,
  Chat,
  MoreHoriz,
  Search,
  FilterList,
} from "@mui/icons-material";
import ChatItem from "./Components/ChatItem/ChatItem";
import ChatIntro from "./Components/ChatIntro/ChatIntro";

const App = () => {
  const chatList = [
    {
      chatId: 1,
      nome: "Irineu Jubileu",
      avatar: "https://cdn-icons-png.flaticon.com/512/1253/1253756.png",
      mensagens: ["HAHAHA", "EAI MEU AMIGO", "KKAKAKAKA", "Boa noite!!!"],
    },
    {
      chatId: 2,
      nome: "Alírio Sampaio",
      avatar: "https://cdn-icons-png.flaticon.com/512/147/147140.png",
      mensagens: [
        "HAHAHA",
        "EAI MEU AMIGO",
        "KKAKAKAKA",
        "Moro na rua 2, do lado da rua 1",
      ],
    },
    {
      chatId: 3,
      nome: "Jorge Zebra",
      avatar: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
      mensagens: ["HAHAHA", "EAI MEU AMIGO", "KKAKAKAKA", "HAHAHAHAHAHA"],
    },
  ];

  const [activeChatId, setActiveChatId] = React.useState();

  return (
    <div className={styles.app_window}>
      <aside className={styles.sidebar}>
        <header className={`${styles.header_area} ${styles.spacer_padding}`}>
          <div className={styles.user_area}>
            <div className={styles.profile_img}>
              <img
                src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                alt="Profile IMAGE"
              />
            </div>
          </div>
          <div className={styles.icons_area}>
            <DonutLarge />
            <Chat />
            <div className={styles.verticalDots}>
              <MoreHoriz />
            </div>
          </div>
        </header>
        <div
          className={`${styles.spacer_padding} ${styles.search_header_area}`}
        >
          <div className={styles.search_input_area}>
            <Search />
            <input
              type="search"
              name="search_header"
              id="search_header"
              placeholder="Pesquisar ou começar uma nova conversa"
            />
          </div>
          <FilterList />
        </div>
        <div className={`${styles.chatlist_area}`}>
          {chatList.map((item) => (
            <ChatItem
              key={item.chatId}
              setActiveChatId={setActiveChatId}
              chat={item}
              active={activeChatId === item.chatId}
            />
          ))}
        </div>
      </aside>
      <main className={styles.content_area}>
        <ChatIntro />
      </main>
    </div>
  );
};

export default App;
