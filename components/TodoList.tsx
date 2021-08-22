import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import marked from 'marked';
import Header from './Header'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});
interface Todo {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const TodoList = () => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );


  const [todolists, todolistsLoading, todolistsError] = useCollection(
    firebase.firestore().collection("chatList"),
    {}
  );

  if (todolistsLoading && todolists) {
    todolists.docs.map(doc => console.log(doc.data()));
  }

  useEffect(() => {
    (async () => {
      const resTodo = await db.collection("chatList").doc("chat").get();
      setTodos(resTodo.data().chat);
      setIsLoading(false);
    })();
  }, [db]);

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        setIsLoading(true);
        const docRef = await db.collection("chatList").doc("chat");
        docRef.update({ chat: todos });
        setIsLoading(false);
      })();
    }
  }, [todos, isChangedTodo, db]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: Todo = {
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: updatedTime,
    };
    setTodos([...todos, newTodo]);
    setText("");
  };
  return (
    <>
      <Header />
      <div className="m-24 md:w-9/12 p-3 md:p-0 mx-auto">
        <ul>
          {todos &&
            todos.map((todo, index) => (
              <TodoItem
                key={index}
                id={todo.id}
                message={todo.message}
                userId={todo.userId}
                createdAt={todo.createdAt}
              />
            ))}
        </ul>
        <form
          className="mt-12 mb-12 text-center"
          onSubmit={e => handleOnSubmit(e)}
        >
          <input
            className="p-2 bg-red-200 hover:opacity-70 transition-opacity cursor-pointer"
            type="submit"
            value="追加"
            onChange={e => handleOnSubmit(e)}
          />
        </form>
        <ReactMde
          value={text}
          onChange={setText}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(marked(markdown))
          }
        />
      </div>
    </>
  );
};

export default TodoList;
