import React from "react";
import { ArrowBack, Search } from "@mui/icons-material";
import styles from "./NewChat.module.css";
import { search_input_area } from "../../App.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addActiveChat,
  addContactList,
} from "../../Redux/Reducers/ChatReducer";
import ChatItem from "../ChatItem/ChatItem";

const NewChat = ({ setNewChatActive }) => {
  const [removing, setRemoving] = React.useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.chatReducer);
  const stateUser = useSelector((state) => state.userReducer.usuarioLogado);
  const [contactList, setContactList] = React.useState([]);

  React.useEffect(() => {
    const handleContactListFetch = async () => {
      const response = await fetch("http://localhost:8080/contact-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: stateUser.id,
        }),
      });

      const data = await response.json();

      dispatch(addContactList(data.data));
    };
    handleContactListFetch();
  }, []);

  const handleClickRef = async (obj) => {
    const hasChat = state.chatList?.chats?.some((item) => item.with === obj.id);

    const response = await fetch("http://localhost:8080/new-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user: stateUser,
        user2: obj,
        chatId: hasChat || false,
      }),
    });

    const json = await response.json();

    if (hasChat) {
      const chat = state.chatList?.chats.find((item) => item.with === obj.id);

      dispatch(addActiveChat(chat.chatId));
    } else {
      dispatch(addActiveChat(json.chatId));
    }
  };

  React.useEffect(() => {
    setContactList(state.contacts);
  }, [state]);

  return (
    <div
      className={`${styles.newChat_container} ${
        removing ? styles.removing : ""
      }`}
    >
      <div className={styles.newChat_header}>
        <div className={styles.newChat_flex}>
          <ArrowBack
            onClick={() => {
              setRemoving(true);
              setTimeout(() => {
                setNewChatActive(false);
              }, 300);
            }}
          />
          <b>Nova conversa</b>
        </div>
        <div className={styles.newChat_inputArea}>
          <div className={search_input_area}>
            <Search />
            <input
              type="search"
              name="search_header"
              id="search_header"
              placeholder="Pesquisar contatos"
            />
          </div>
        </div>
      </div>
      <div className={styles.newChat_body}>
        {contactList.map((item) => (
          <div
            key={item.chatId || item.id}
            onClick={() => {
              handleClickRef(item);
              setRemoving(true);
              setTimeout(() => {
                setNewChatActive(false);
              }, 300);
            }}
          >
            <ChatItem
              chat={item}
              key={item.chatId}
              active={state.activeChatId === item.chatId}
              isContact={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewChat;
