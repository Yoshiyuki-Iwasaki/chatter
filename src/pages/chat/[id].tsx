import ChatList from "../../components/chat/ChatList";
import Layout from "../../components/Layout";
import firebase from "../../firebase/clientApp";
import Sidebar from "../../components/sidebar/Sidebar";
import styled from "styled-components";

const chatDetail = ({ todo }) => {
  return (
    <>
      <Layout>
        <SidebarArea>
          <Sidebar />
        </SidebarArea>
        <ChatArea>
          <ChatList id={todo} />
        </ChatArea>
      </Layout>
    </>
  );
};

export default chatDetail;

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
      id: id,
    },
  };
};

const SidebarArea = styled.div`
  background: rgba(243, 244, 246, 0.8);
  width: calc(100% / 5);

  @media (max-width: 768px) {
    width: auto;
  }
`;

const ChatArea = styled.div`
  margin: 0 20px;
  width: calc(100% - (100% / 5));

  @media (max-width: 768px) {
    width: auto;
  }
`;