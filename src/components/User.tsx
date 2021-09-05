import React, { useState } from "react";
import firebase from "../../firebase/clientApp";

const User = ({ todo }) => {
  const db = firebase.firestore();
  const [text, setText] = useState("");

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
        <input className='ml-2 p-1' type="submit" onClick={e => handleOnSubmit(e)} value="投稿" />
      </form>
    </>
  );
};

export default User
