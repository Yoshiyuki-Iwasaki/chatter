import ChatList from "../../components/chat/ChatList";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "../../components/module/Layout";
import firebase from "../../firebase/clientApp";
import Sidebar from "../../components/sidebar/Sidebar";
import styled from "styled-components";

const ChatDetail = ({ todo }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) return <h6>Loading...</h6>;
  if (error) return null;
  return (
    <>
      <Layout>
        <SidebarArea>
          {user && (
            <Sidebar
              uid={user.uid}
              photoURL={user.photoURL}
              displayName={user.displayName}
            />
          )}
        </SidebarArea>
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

const SidebarArea = styled.aside`
  width: calc(100% / 5);

  @media (max-width: 768px) {
    width: auto;
  }
`;

const ChatArea = styled.main`
  padding: 0 20px;
  width: calc(100% - (100% / 5));

  @media (max-width: 768px) {
    width: auto;
  }
`;