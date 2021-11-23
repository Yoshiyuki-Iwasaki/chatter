import ChatList from "../../components/chat/ChatList";
import Layout from "../../components/module/Layout";
import firebase from "../../firebase/clientApp";
import styled from "styled-components";

const ChatDetail = ({ todo }) => {
  return (
    <>
      <Layout title={"チャット"}>
        <ChatArea>
          <ChatList id={todo} />
        </ChatArea>
      </Layout>
    </>
  );
};

export default ChatDetail;

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const res = await db.collection("chat").get();
  const paths = res.docs.map(todo => `/chat/${todo.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const db = firebase.firestore();
  const id = context.params.id;
  const res = await db.collection("chat").get();
  const todos = res.docs.map(todo => todo.id);
  const array = todos.find(todo => todo == id);
  return {
    props: {
      todo: array,
    },
  };
};

const ChatArea = styled.main`
  padding: 0 20px;
  width: calc(100% - (100% / 5));

  @media (max-width: 768px) {
    width: auto;
  }
`;