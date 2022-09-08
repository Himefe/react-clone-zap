import React from "react";
import styles from "./ChatWindow.module.css";
import appStyles from "../../App.module.css";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import MicrophoneComponent from "../Microphone/Microphone";
import {
  MoreHoriz,
  Search,
  Attachment,
  InsertEmoticonOutlined,
  Mic,
  Send,
  Close,
} from "@mui/icons-material";
import MessageItem from "../MessageItem/MessageItem";
import {
  addMessagesLists,
  resetMessagesList,
} from "../../Redux/Reducers/ChatReducer";
import Api from "../../Assets/Api/Api";

const ChatWindow = () => {
  const stateChatReducer = useSelector((state) => state.chatReducer);
  const stateUser = useSelector((state) => state.userReducer.usuarioLogado);

  const [messsage, setMessage] = React.useState("");
  const [emojiActive, setEmojiActive] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  const conversationRef = React.useRef();

  const dispatch = useDispatch();

  const activeChat =
    stateChatReducer?.chatList?.chats?.find(
      (chat) => chat.chatId === stateChatReducer.activeChatId
    ) ||
    stateChatReducer?.contacts?.find(
      (chat) => chat.id === stateChatReducer.activeChatId
    );

  const dispatcherMessagesList = (data) => {
    dispatch(addMessagesLists(data));
  };

  React.useEffect(() => {
    dispatch(resetMessagesList());

    const { snapshot, data } = Api.onChatContent(
      stateChatReducer.activeChatId,
      dispatcherMessagesList,
      setUsers
    );

    const unsubscribe = snapshot;

    return unsubscribe;
  }, [stateChatReducer.activeChatId]);

  React.useEffect(() => {
    if (
      conversationRef.current.scrollHeight >
      conversationRef.current.offsetHeight
    ) {
      conversationRef.current.scrollTop =
        conversationRef.current.scrollHeight -
        conversationRef.current.offsetHeight;
    }
  }, [stateChatReducer.messagesList]);

  const handleSend = async () => {
    if (messsage) {
      let response = await fetch("http://localhost:8080/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatData: activeChat,
          userId: stateUser.id,
          type: "text",
          body: messsage,
          users,
        }),
      });

      setMessage("");
      setEmojiActive(false);
    }
  };

  const handleInputEnter = (e) => {
    if (e.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <div className={`${styles.chatWindow}`}>
      <div className={styles.chatWindow_header}>
        <div className={styles.chatWindow_headerInfo}>
          <div className={styles.chatWindow_avatar}>
            <img src={activeChat?.image || activeChat?.avatar} alt="Profile" />
          </div>
          <b>{activeChat?.title || activeChat?.name}</b>
        </div>
        <div className={styles.chatWindow_icons_area}>
          <Search />
          <MoreHoriz />
        </div>
      </div>
      <div className={styles.chatWindow_body}>
        <div className={styles.chatWindow_conversation} ref={conversationRef}>
          {stateChatReducer?.messagesList?.map((item, index) => (
            <MessageItem dados={item} key={index} />
          ))}
        </div>
      </div>
      <div className={styles.chatWindow_emojiPickerArea}>
        {emojiActive ? (
          <EmojiPicker
            disableSkinTonePicker
            disableSearchBar
            onEmojiClick={(_, emojiObject) => {
              setMessage((messsage ? messsage : "") + emojiObject.emoji);
            }}
            pickerStyle={{
              width: "100%",
              backgroundColor: "#202c33",
              borderRadius: "0",
              boxShadow: "none",
              border: "none",
            }}
          />
        ) : null}
      </div>
      <div className={styles.chatWindow_footer}>
        <div className={styles.chatWindow_sendMessageArea}>
          <div className={styles.chatWindow_emoticonArea}>
            {emojiActive && <Close onClick={() => setEmojiActive(false)} />}
            <InsertEmoticonOutlined
              onClick={() => setEmojiActive(true)}
              style={emojiActive ? { fill: "#00a884" } : { fill: "#8696a0" }}
            />
            <Attachment />
          </div>
          <div className={styles.chatWindow_inputArea}>
            <input
              type="text"
              name="messageSender"
              id="messageSender"
              placeholder="Mensagem"
              onChange={({ target }) => setMessage(target.value)}
              value={messsage}
              onKeyUp={handleInputEnter}
            />
            <div className={styles.chatWindow_micArea}>
              {messsage ? (
                <Send onClick={() => handleSend()} />
              ) : (
                <MicrophoneComponent
                  listening={listening}
                  setListening={setListening}
                  messsage={messsage}
                  setMessage={setMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
