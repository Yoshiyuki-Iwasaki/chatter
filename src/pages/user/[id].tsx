import React from 'react'
import firebase from "../../firebase/clientApp";
import User from "../../components/User";
import Layout from "../../components/Layout";

const UserDetail = ({ todo } :any) => {
  return (
    <Layout>
      <User todo={todo} />
    </Layout>
  );
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