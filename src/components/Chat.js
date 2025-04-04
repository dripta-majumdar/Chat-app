import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  where,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    console.log("Setting up listener for room:", room);
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log("Received messages:", messages);
      setMessages(messages);
    }, (err) => {
      console.error("Error in snapshot listener:", err);
      setError("Error loading messages: " + err.message);
    });

    return () => unsuscribe();

  }, [room, messagesRef]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (newMessage === "") return;
    
    try {
      console.log("Sending message to room:", room);
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
      console.log("Message sent successfully");
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message: " + err.message);
    }
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.length === 0 && <div className="no-messages">No messages yet. Start the conversation!</div>}
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
