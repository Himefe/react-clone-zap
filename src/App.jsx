import React from "react";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  DonutLarge,
  Chat,
  MoreHoriz,
  Search,
  FilterList,
} from "@mui/icons-material";
import ChatItem from "./Components/ChatItem/ChatItem";
import ChatIntro from "./Components/ChatIntro/ChatIntro";
import { addChatList } from "./Redux/Reducers/ChatReducer";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import { setUserLogado } from "./Redux/Reducers/UserReducer";
import NewChat from "./Components/NewChat/NewChat";
import Api from "./Assets/Api/Api";
import { doc } from "firebase/firestore";
import { addActiveChat } from "./Redux/Reducers/ChatReducer";
import Login from "./Components/Login/Login";

const App = () => {
  const [newChatActive, setNewChatActive] = React.useState(false);

  const userLogado = useSelector((state) => state.userReducer.usuarioLogado);
  const stateChatReducer = useSelector((state) => state.chatReducer);

  const dispatch = useDispatch();

  const googleAuth = async () => {
    const result = await Api.googlePopup();

    dispatch(
      setUserLogado({
        name: result.user.displayName,
        avatar: result.user.photoURL,
        id: result.user.uid,
      })
    );

    await fetch("http://localhost:8080/new-user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: result.user.uid,
        name: result.user.displayName,
        avatar: result.user.photoURL,
      }),
    });
  };

  React.useEffect(() => {
    if (stateChatReducer.chatList.chats) {
      const userObject = {
        ...userLogado,
      };

      dispatch(setUserLogado(userObject));
    }
  }, []);

  const dispatcherChatList = (dados) => {
    const userWithChats = { ...dados };

    userWithChats.chats.sort((a, b) => {
      if (a.lastMessageDate === undefined) {
        return -1;
      }
      if (b.lastMessageDate === undefined) {
        return -1;
      }

      if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
        return 1;
      } else {
        return -1;
      }
    });

    dispatch(addChatList(dados));
  };

  React.useEffect(() => {
    if (userLogado !== null) {
      const { snapshot, data } = Api.onChatList(
        userLogado.id,
        dispatcherChatList
      );

      const unsubscribe = snapshot;

      return unsubscribe; /* unsubscribe */
    }
  }, [userLogado]);

  const chatState = useSelector((state) => state.chatReducer);
  const userState = useSelector((state) => state.userReducer);

  if (!userLogado) {
    return <Login googleAuth={googleAuth} />;
  }

  const handleClickRef = async (item) => {
    dispatch(addActiveChat(item.id || item.chatId));
  };

  return (
    <div className={styles.app_window}>
      {newChatActive && <NewChat setNewChatActive={setNewChatActive} />}
      <aside className={styles.sidebar}>
        <header className={`${styles.header_area} ${styles.spacer_padding}`}>
          <div className={styles.user_area}>
            <div className={styles.profile_img}>
              <img src={userState.usuarioLogado?.avatar} alt="Profile IMAGE" />
            </div>
          </div>
          <div className={styles.icons_area}>
            <DonutLarge />
            <Chat onClick={() => setNewChatActive(true)} />
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
          {stateChatReducer.chatList?.chats?.map((item) => (
            <div
              key={item.chatId || item.id}
              onClick={() => handleClickRef(item)}
            >
              <ChatItem
                chat={item}
                active={chatState.activeChatId === item.chat}
              />
            </div>
          ))}
        </div>
      </aside>

      <main className={styles.content_area}>
        {chatState.activeChatId ? <ChatWindow /> : <ChatIntro />}
      </main>
    </div>
  );
};

export default App;
