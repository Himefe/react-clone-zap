import React from "react";
import styles from "./App.module.css";

import { DonutLarge, Chat, MoreHoriz, Search } from "@mui/icons-material";

const App = () => {
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
              type="text"
              name="search_header"
              id="search_header"
              placeholder="Pesquisar ou começar uma nova conversa"
            />
          </div>
        </div>
      </aside>
      <main className={styles.content_area}>A</main>
    </div>
  );
};

export default App;
