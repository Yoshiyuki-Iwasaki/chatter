import { useState, useEffect } from 'react'

interface Todo {
  id: number;
  message: string;
  // username: string;
  // avater: string;
}

const Home = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    const newTodo: Todo = {
      id: new Date().getTime(),
      message: text
      // username: '',
      // avater: '',
    }
    setTodos([...todos, newTodo]);
    setText('');
  }

  return (
    <>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
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
