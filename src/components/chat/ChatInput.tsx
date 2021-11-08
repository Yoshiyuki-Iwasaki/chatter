import ReactMde from "react-mde";
import marked from "marked";
import styled from "styled-components";
import { useState } from 'react';
import firebase from "../../firebase/clientApp";
import { ChatListType } from "../../declarations/chat";

const ChatInput: React.FC<ChatListType> = ({ id }) => {
  const db = firebase.firestore();
  const [text, setText] = useState("");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const handleOnSubmit = async e => {
    e.preventDefault();
    if (!text) return;
    await db.collection("chat").doc(id).collection("messages").add({
      id: new Date().getTime(),
      message: text,
      userId: firebase.auth().currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText("");
  };

  return (
    <>
      <Form onSubmit={e => handleOnSubmit(e)}>
        <Input type="submit" value="投稿" onChange={e => handleOnSubmit(e)} />
      </Form>
      <ReactMde
        value={text}
        onChange={setText}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown => Promise.resolve(marked(markdown))}
      />
    </>
  );
};

export default ChatInput;

const Form = styled.form`
  margin-top: 30px;
  text-align: right;
`;

const Input = styled.input`
  padding: 15px 70px;
  background: pink;
  transition: opacity 0.6s;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;

  &:hover {
    opacity: 0.6;
  }
`;
