import React, { useState } from 'react'
import firebase from "../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { ModalType } from '../../declarations/modal'

const Modal: React.FC<ModalType> = ({ currentUserId, setShow }) => {
  const [text, setText] = useState("");
  const [checkData, setCheckData] = useState({});
  const db = firebase.firestore();
  const [userData, loading, error] = useCollection(
    db.collection("users"),
    {}
  );

  const closeModal = () => {
    setShow(false);
  };

  const handleInput = e => {
    setText(e.target.value);
  };

  const handleChange = e => {
    setCheckData({
      ...checkData,
      [e.target.id]: e.target.checked,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) return;
    const dataPushArray = Object.entries(checkData).reduce(
      (pre, [key, value]) => {
        value && pre.push(key);
        return pre;
      },
      []
    );
    db.collection("chat").add({
      id: new Date().getTime(),
      title: text,
      users: dataPushArray,
    });
    setText("");
    setShow(false);
  };

  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <>
      <Overlay onClick={() => closeModal()} />
      <Main onSubmit={handleSubmit}>
        <Title>チャット作成</Title>
        <ChatTitle>チャットタイトル</ChatTitle>
        <Input type="text" value={text} onChange={handleInput} />
        <User>ユーザー</User>
        <List>
          {userData &&
            userData.docs.map((doc, index) => (
              <ListItem key={index}>
                <CheckBox
                  id={doc.id}
                  type="checkbox"
                  value={checkData}
                  onChange={handleChange}
                />
                <Label htmlFor={doc.id}>{doc.data().displayName}</Label>
              </ListItem>
            ))}
        </List>
        <Button onClick={handleSubmit}>作成</Button>
      </Main>
    </>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.64);
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Main = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: #fff;
  transform: translate(-50%, -50%);
`;

const List = styled.ul``;
const ListItem = styled.li``;
const Title = styled.p``;
const ChatTitle = styled.p``;
const Input = styled.input``;
const User = styled.p``;
const CheckBox = styled.input``;
const Label = styled.label``;
const Button = styled.button``;