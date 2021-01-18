import { database } from "../services/firebase";

export function getChats() {
  let chats = [];
  database.ref("chats").on("value", (snapshot) => {
    snapshot.forEach((row) => {
      chats.push(row.val());
    });
  });
  return chats;
}

export function sendChat(data) {
  return database.ref("chats").push({
    message: data.message,
    timestamp: data.timestamp,
    uid: data.uid,
  });
}
