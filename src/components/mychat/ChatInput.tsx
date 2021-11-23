import styled from "styled-components";
import { useState } from 'react';
import firebase from "../../firebase/clientApp";

const ChatInput: React.FC = () => {
  const db = firebase.firestore();
  const [text, setText] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const scrollTo = (direction: "top" | "end") => {
    const messageList = document.getElementById("message-list");
    if (messageList) {
      messageList.scrollTop =
        direction === "top" ? 50 : messageList.scrollHeight;
    }
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    if (!text) return;
    await db.collection("mychat").add({
      id: new Date().getTime(),
      message: text,
      userId: firebase.auth().currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText("");
    scrollTo("end");
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <StyledInput type="text" value={text} onChange={handleInput} />
      </Form>
    </>
  );
};

export default ChatInput;

const Form = styled.form`
  text-align: center;
  border-bottom: 1px solid rgb(56, 68, 77);
`;
const StyledInput = styled.input`
  width: 100%;
  height: 120px;
  border: 1px solid gray;
  font-size: 14px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100px;
  }
`;
