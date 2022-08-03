import React from "react";
import styles from "./ChatWindow.module.css";
import appStyles from "../../App.module.css";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import {
  MoreHoriz,
  Search,
  Attachment,
  InsertEmoticonOutlined,
  Mic,
  Send,
  Close,
} from "@mui/icons-material";

const ChatWindow = () => {
  const state = useSelector((state) => state.chatReducer);

  const [messsage, setMessage] = React.useState();
  const [emojiActive, setEmojiActive] = React.useState(false);

  const activeChat = state.chatList.find(
    (chat) => chat.chatId === state.activeChatId
  );

  return (
    <div className={`${styles.chatWindow}`}>
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
      <div className={styles.chatWindow_body}>
        <div className={styles.chatWindow_conversation}>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
          <span>.................</span>
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
            />
            <div className={styles.chatWindow_micArea}>
              {messsage ? <Send /> : <Mic />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
