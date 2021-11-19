import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "../components/module/Layout";
import ChatList from "../components/mychat/ChatList";
import styled from "styled-components";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <Layout>
      <SidebarArea>
        <Sidebar
          uid={user.uid}
          photoURL={user.photoURL}
          displayName={user.displayName}
        />
      </SidebarArea>
      <ChatArea>{user && <ChatList id={user.uid} />}</ChatArea>
    </Layout>
  );
};

export default Home;


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