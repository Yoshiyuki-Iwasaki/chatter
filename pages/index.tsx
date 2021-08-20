import firebase from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useState, useEffect } from 'react'
import Author from "../components/Author";
import Auth from "../components/Auth";
interface Todo {
  id: number;
  message: string;
  // username: string;
  // avater: string;
}

const Home = () => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log('loading', loading, '|', 'current user', user);
  const [text, setText] = useState('');
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
      const resTodo = await db.collection('chatList').doc('chat').get();
      setTodos(resTodo.data().chat);
      setIsLoading(false);
    })();
  }, [db])

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        setIsLoading(true);
        const docRef = await db.collection('chatList').doc('chat');
        docRef.update({chat: todos});
        setIsLoading(false);
      })();
    }
  },[todos, isChangedTodo, db])

  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: Todo = {
      id: new Date().getTime(),
      message: text,
      // username: '',
      // avater: '',
    };
    setTodos([...todos, newTodo]);
    setText("");
  };

  return (
    <>
      {!user && <Auth />}
      <ul>
        {todos && todos.map(todo => (
          <li key={todo.id}>
            {/* <Author  /> */}
            <p>{todo.message}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={e => handleOnSubmit(e)}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type="submit" value="追加" onChange={e => handleOnSubmit(e)} />
      </form>
    </>
  );
}

export default Home;
