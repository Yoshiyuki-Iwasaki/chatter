import firebase from "../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import marked from 'marked';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

interface Todo {
  id: number;
  message: string;
  userId: any;
  createdAt: string;
}

const TodoList = () => {
  const db = firebase.firestore();
  const [text, setText] = useState("");
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

  const [todolists, todolistsLoading, todolistsError] = useCollection(
    db.collection("chatList").orderBy("id", "asc"),
    {}
  );

  const asyncFunction = async () => {
    firebase
    .firestore()
    .collectionGroup("posts")
    .get()
    .then(snapshot => {
      const list = [];
      snapshot.forEach(doc => {
        list.push(doc.data().id);
      });
      return Promise.all(list);
    });
  }

  useEffect(() => {
    asyncFunction();
  },[])

  const handleOnSubmit = async e => {
    e.preventDefault();
    if (!text) return;
    await db.collection("chatList").add({
      id: new Date().getTime(),
      message: text,
      userId: firebase.auth().currentUser.uid,
      createdAt: updatedTime,
    });
    setText("");
  };
  if (todolistsLoading) {
    return <h6>Loading...</h6>;
  }
  if (todolistsError) {
    return null;
  }
  return (
    <>
      <ul>
        {todolists &&
          todolists.docs.map((doc, index) => (
            <TodoItem
              key={index}
              id={doc.data().id}
              message={doc.data().message}
              userId={doc.data().userId}
              createdAt={doc.data().createdAt}
            />
          ))}
      </ul>
      <form className="mt-12 text-right" onSubmit={e => handleOnSubmit(e)}>
        <input
          className="py-2 px-24 bg-red-200 hover:opacity-70 transition-opacity cursor-pointer"
          type="submit"
          value="投稿"
          onChange={e => handleOnSubmit(e)}
        />
      </form>
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

export default TodoList;
