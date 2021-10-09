import GroupeList from "../../components/groupe/GroupeList";
import Layout from "../../components/Layout";
import firebase from "../../firebase/clientApp";

interface Props {
  id: number;
}

const GroupeDetail = ({ todo }: any) => {
  return (
    <Layout>
      <GroupeList id={todo.id} />
    </Layout>
  );
};

export default GroupeDetail;

export const getStaticPaths = async (): Promise<any> => {
  const db = firebase.firestore();
  const res = await db.collection("groupe").get();
  const paths = res.docs.map(todo => `/groupe/${todo.data().id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context): Promise<any> => {
  const db = firebase.firestore();
  const id = context.params.id;
  const res = await db.collection("groupe").get();
  const todos = res.docs.map(todo => todo.data());
  const array = todos.find(todo => todo.id == id);

  return {
    props: {
      todo: array,
    },
  };
};
