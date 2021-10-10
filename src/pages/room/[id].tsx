import RoomList from "../../components/room/RoomList";
import Layout from "../../components/Layout";
import firebase from "../../firebase/clientApp";

const RoomDetail = ({ todo }: any) => {
  return (
    <Layout>
      <RoomList id={todo.uid} />
    </Layout>
  );
};

export default RoomDetail;

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const res = await db.collection("users").get();
  const paths = res.docs.map(todo => `/room/${todo.data().uid}`);
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
