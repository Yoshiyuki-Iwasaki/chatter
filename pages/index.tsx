import firebase from '../firebase/clientApp';
import * as functions from "firebase-functions";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useState, useEffect } from 'react'
import TodoList from "../components/TodoList";
import Auth from "../components/Auth";

const Home = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <TodoList/>
      )}
    </>
  );
}

export default Home;
