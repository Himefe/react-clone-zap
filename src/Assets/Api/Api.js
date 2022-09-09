import { initializeApp } from "@firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { firebaseConfig } from "../../../Backend/firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export default {
  googlePopup: async () => {
    const auth = getAuth();

    const provider = new GoogleAuthProvider();
    let result = signInWithPopup(auth, provider);

    return result;
  },

  facebookPopup: async () => {
    const auth = getAuth();

    const provider = new FacebookAuthProvider();

    let result = signInWithPopup(auth, provider);

    return result;
  },

  onChatList: (userId, dispatcherChatList) => {
    let data = null;
    const snapshot = onSnapshot(doc(db, "users", userId), (doc) => {
      if (doc.exists) {
        data = doc.data();

        if (data !== null) {
          dispatcherChatList(data);
        }
      }
    });

    return {
      data,
      snapshot,
    };
  },
  // addNewChat: async (user, user2) => {
  //   let newChat = await db.collection("chats").add({
  //     messages: [],
  //     users: [user.id, user2.id],
  //   });

  //   db.collection("users")
  //     .doc(user.id)
  //     .update({
  //       chats: firebase.firestore.FieldValue.arrayUnion({
  //         chatId: newChat.id,
  //         title: user2.name,
  //         image: user2.avatar,
  //         with: user2.id,
  //       }),
  //     });

  //   db.collection("users")
  //     .doc(user2.id)
  //     .update({
  //       chats: firebase.firestore.FieldValue.arrayUnion({
  //         chatId: newChat.id,
  //         title: user.name,
  //         image: user.avatar,
  //         with: user.id,
  //       }),
  //     });
  // },
  // onChatList: (userId, setChatList) => {
  //   return db
  //     .collection("users")
  //     .doc(userId)
  //     .onSnapshot((doc) => {
  //       if (doc.exists) {
  //         let data = doc.data();
  //         if (data.chats) {
  //           let chats = [...data.chats];

  //           chats.sort((a, b) => {
  //             if (a.lastMessageDate === undefined) {
  //               return -1;
  //             }
  //             if (b.lastMessageDate === undefined) {
  //               return -1;
  //             }

  //             if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
  //               return 1;
  //             } else {
  //               return -1;
  //             }
  //           });

  //           setChatList(chats);
  //         }
  //       }
  //     });
  // },
  onChatContent: (chatId, dispatcherMessagesList, setUsers) => {
    let data = null;

    const snapshot = onSnapshot(doc(db, "chats", chatId), (doc) => {
      if (doc.exists) {
        data = doc.data();
        if (data !== undefined) {
          dispatcherMessagesList(data?.messages);
          setUsers(data["users"]);
        }
      }
    });

    return {
      data,
      snapshot,
    };
  },
};
