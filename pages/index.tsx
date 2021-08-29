import firebase from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import TodoList from "../components/TodoList";
import Auth from "../components/Auth";
import Layout from "../components/Layout";

const Home = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  return <Layout>{!user ? <Auth /> : <TodoList />}</Layout>;
}

export default Home;
