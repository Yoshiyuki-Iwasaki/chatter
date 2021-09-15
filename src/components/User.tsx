import React, { useState } from "react";
import firebase from "../../firebase/clientApp";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

const User = ({ todo }) => {
  const db = firebase.firestore();
  const [text, setText] = useState("");
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${todo.userId}`)
  );
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    db.collection("users")
      .doc(todo.uid)
      .update({
        description: text,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
    setText('');
  };

  const clickLikeButton = async () => {
    await db.collection("groupe").add({
      id: new Date().getTime(),
      users: [user.uid, value.data().uid],
      createdAt: updatedTime,
    });
  };

  const IconArea = styled.figure`
    margin: 20px auto 0;
    width: 150px;
  `;

  const Icon = styled.img`
    width: 100%;
    border: 1px solid gray;
    border-radius: 50%;
  `;

  const Title = styled.h1`
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  `;
  const Description = styled.p`
    margin-top: 10px;
    text-align: center;
  `;
  const Form = styled.form`
    margin-top: 10px;
    text-align: center;
  `;
  const InputField = styled.input`
    border: 1px solid gray;
  `;
  const InputButton = styled.input`
    margin-left: 10px;
    padding: 5px;
  `;

  return (
    <>
      <IconArea>
        <Icon src={todo.photoURL} />
      </IconArea>
      <Title>{todo.displayName}</Title>
      <a href="#" onClick={clickLikeButton}>
        {todo.displayName}とプライベートチャットをする
      </a>
      {todo.description && <Description>{todo.description}</Description>}
      <Form onSubmit={e => handleOnSubmit(e)}>
        <InputField
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <InputButton
          type="submit"
          onClick={e => handleOnSubmit(e)}
          value="投稿"
        />
      </Form>
    </>
  );
};

export default User
