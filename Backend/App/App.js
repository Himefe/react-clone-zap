import express from "express";

import { initializeApp } from "@firebase/app";
import cors from "cors";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  FieldValue,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { firebaseConfig } from "../firebaseConfig.js";

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.get("/auth-fb", async (req, res) => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    // console.log(auth);

    const result = await signInWithPopup(auth, provider);

    console.log(result);
    res.status(200).send({ msg: JSON.stringify(result) });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
});

app.post("/new-user", async (req, res) => {
  try {
    const params = ["id", "name", "avatar"];
    const paramsPost = req.body;
    const paramExcluded = [];

    const name = req.body?.name;
    const avatar = req.body?.avatar;
    const id = req.body?.id;

    params.map((param, index) => {
      if (!Object.keys(paramsPost).includes(param)) {
        paramExcluded.push(params[index]);
      }

      if (paramExcluded.length >= 1 && index === params.length - 1) {
        throw `Parâmetros que faltam no body: (${paramExcluded})`;
      }
    });

    const newUserRef = doc(db, "users", id);

    await setDoc(
      newUserRef,
      {
        name,
        avatar,
      },
      { merge: true }
    );

    res.status(200).send({ msg: { nome: name, avatar } });
  } catch (error) {
    res.status(403).send({ msg: error });
  }
});

app.post("/contact-list", async (req, res) => {
  try {
    if (!req.body.userId) throw "Não enviado no body: userId";

    const userId = req.body?.userId;

    let list = [];
    let results = await getDocs(collection(db, "users"));

    results.forEach((item) => {
      let data = item.data();

      if (item.id !== userId) {
        list.push({
          id: item.id,
          name: data.name,
          avatar: data.avatar,
        });
      }
    });

    res.status(200).send({ data: list });
  } catch (e) {
    res.status(500).send({ msg: e });
  }
});

app.post("/new-chat", async (req, res) => {
  try {
    const param = ["user", "user2"];

    const user = req.body?.user;
    const user2 = req.body?.user2;
    const hasChatId = req.body?.chatId;

    if (hasChatId === false) {
      let newChat = await addDoc(collection(db, "chats"), {
        messages: [],
        users: [user.id, user2.id],
      });

      await updateDoc(doc(db, "users", user.id), {
        chats: arrayUnion({
          chatId: newChat.id,
          title: user2.name,
          image: user2.avatar,
          with: user2.id,
        }),
      });

      await updateDoc(doc(db, "users", user2.id), {
        chats: arrayUnion({
          chatId: newChat.id,
          title: user.nome || user.name,
          image: user.avatar || user.image,
          with: user.id,
        }),
      });

      res.status(200).send({ chatId: newChat.id });
    } else {
      res.status(200).send({});
    }
  } catch (e) {
    res.status(500).send({ msg: e });
  }
});

app.post("/send-message", async (req, res) => {
  try {
    const params = ["chatData", "userId", "type", "body", "users"];
    const paramExcluded = [];
    const paramsPost = req.body;

    params.map((param, index) => {
      if (!Object.keys(paramsPost).includes(param)) {
        paramExcluded.push(params[index]);
      }

      if (paramExcluded.length >= 1 && index === params.length - 1) {
        throw `Parâmetros que faltam no body: (${paramExcluded})`;
      }
    });

    const objetoParams = {};
    params.forEach((item) => {
      objetoParams[item] = req.body[item] || null;
    });

    const now = new Date();

    updateDoc(doc(db, "chats", objetoParams.chatData.chatId), {
      messages: arrayUnion({
        type: objetoParams.type,
        author: objetoParams.userId,
        body: objetoParams.body,
        date: now,
      }),
    });

    objetoParams.users.forEach(async (item, index) => {
      let user = (await getDoc(doc(db, "users", item))).data();

      if (user.chats) {
        let chats = [...user.chats];

        chats.forEach((chatItem) => {
          if (chatItem.chatId === objetoParams.chatData.chatId) {
            chatItem.lastMessage = objetoParams.body;
            chatItem.lastMessageDate = now;
          }
        });

        await updateDoc(doc(db, "users", item), {
          chats,
        });
      }
    });

    res.status(200).send();
  } catch (e) {
    res.status(500).send({ msg: e });
  }
});

app.listen(8080, () => {
  console.log("Rodando na porta 8080");
});
