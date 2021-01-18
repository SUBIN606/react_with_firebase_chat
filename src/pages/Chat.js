import React, { useState, useEffect } from "react";
import { auth, database } from "../services/firebase";
import { getChats, sendChat } from "../helpers/database";
import { logout } from "../helpers/auth";
function Chat() {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);

  const getChatList = () => {
    const chatList = getChats();
    setChats(chatList);
  };

  const scrollToBottom = () => {
    const chatArea = document.querySelector(".chat-middle");
    chatArea.scrollTop = chatArea.scrollHeight;
  };

  useEffect(() => {
    try {
      database.ref("chats").on("child_added", getChatList);
      database.ref("chats").on("child_changed", getChatList);
    } catch (error) {
      console.log(error);
    }
    scrollToBottom();
  }, []);

  const handleOnChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      await sendChat({
        message: msg,
        timestamp: Date.now(),
        uid: auth().currentUser.uid,
      });
      setMsg("");
      scrollToBottom();
    } catch (error) {
      console.log(error);
    }
  };

  const formattingTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    }`;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="chat-container">
      <div className="chat-top">
        헤더
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
      <div className="chat-middle">
        {chats.map((chat) => (
          <li
            key={chat.timestamp}
            className={`chat-bubble ${
              chat.uid === auth().currentUser.uid ? "send" : "receive"
            }`}
          >
            <p>{chat.message}</p>
            <span>{formattingTimestamp(chat.timestamp)}</span>
          </li>
        ))}
      </div>
      <div className="chat-bottom">
        <form onSubmit={handleSumbit}>
          <input
            placeholder="내용을 입력하세요."
            value={msg}
            onChange={handleOnChange}
          />
          <button type="submit">전송</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
