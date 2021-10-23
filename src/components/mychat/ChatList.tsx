import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/clientApp";
import React, { useState } from "react";
import ChatItem from "./ChatItem";
import ReactMde from "react-mde";
import marked from "marked";
import styled from "styled-components";

const ChatList: React.FC<any> = ({ id }) => {
  const db = firebase.firestore();
  const [text, setText] = useState("");
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );
  const [data, loading, error] = useCollection(
    db.collection("mychat").where("userId", "==", id),
    {}
  );

  const handleOnSubmit = async e => {
    e.preventDefault();
    if (!text) return;
    await db.collection("mychat").add({
      id: new Date().getTime(),
      message: text,
      userId: firebase.auth().currentUser.uid,
      createdAt: updatedTime,
    });
    setText("");
  };

  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <>
      <ul>
        {data &&
          data.docs.map((doc, index) => (
            <ChatItem
              key={index}
              id={doc.data().id}
              message={doc.data().message}
              userId={doc.data().userId}
              createdAt={doc.data().createdAt}
            />
          ))}
      </ul>
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

export default ChatList;

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