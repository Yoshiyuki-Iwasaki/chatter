import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  message: string;
  userId: string;
}

const TodoList = () => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: Todo = {
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
    };
    setTodos([...todos, newTodo]);
    setText("");
  };
  return (
    <div className="mx-64">
      <ul>
        {todos &&
          todos.map((todo, index) => (
            <TodoItem
              id={todo.id}
              message={todo.message}
              userId={todo.userId}
            />
          ))}
      </ul>
      <form className="mt-12 mb-12 text-center" onSubmit={e => handleOnSubmit(e)}>
        <input
          className="mr-4 w-96 h-20 border"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input
          className="p-2 bg-red-200"
          type="submit"
          value="追加"
          onChange={e => handleOnSubmit(e)}
        />
      </form>
    </div>
  );
};

export default TodoList;
