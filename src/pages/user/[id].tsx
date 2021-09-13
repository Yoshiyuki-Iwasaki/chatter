import React from 'react'
import firebase from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "../../components/Auth";
import User from "../../components/User";
import Layout from "../../components/Layout";

const UserDetail = ({ todo }) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  return <Layout>{!user ? <Auth /> : <User todo={todo} />}</Layout>;
};

export default UserDetail

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const res = await db.collection("users").get();
  const paths = res.docs.map(todo => `/user/${todo.data().uid}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const db = firebase.firestore();
  const id = context.params.id;
  const res = await db.collection("users").get();
  const todos = res.docs.map(todo => todo.data());
  const array = todos.find(todo => todo.uid == id);
  return {
    props: {
      todo: array,
    },
  };
};