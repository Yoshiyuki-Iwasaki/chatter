import React, { useState } from "react";
import firebase from "../../firebase/clientApp";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

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
  return (
    <>
      <figure className="w-1/5 mx-auto">
        <img
          className="rounded-full w-full border-4 border-light-blue-500 border-opacity-25"
          src={todo.photoURL}
        />
      </figure>
      <h1 className="mt-3 text-center text-2xl font-bold">
        {todo.displayName}
      </h1>
      <a href="#" onClick={clickLikeButton}>
        {todo.displayName}とプライベートチャットをする
      </a>
      {todo.description && (
        <p className="mt-5 text-center">{todo.description}</p>
      )}
      <form className="mt-5 text-center" onSubmit={e => handleOnSubmit(e)}>
        <input
          className="border-4 border-light-blue-500 border-opacity-25"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input
          className="ml-2 p-1"
          type="submit"
          onClick={e => handleOnSubmit(e)}
          value="投稿"
        />
      </form>
    </>
  );
};

export default User
