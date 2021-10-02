import Meta from "./meta";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Auth from "./Auth";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

const Main = styled.div`
  height: calc(100vh - 58px);

  @media (max-width: 768px) {
    height: auto;
  }
`;
const Inner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
const SidebarArea = styled.div`
  margin: 50px 20px 0;
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

const Layout = ({ children }: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }
  return (
    <>
      <Header />
      <Meta title="Top" description="This is Top page." />
      <Main>
        {!user ? (
          <Auth />
        ) : (
          <Inner>
            <SidebarArea>
              <Sidebar />
            </SidebarArea>
            <ChatArea>{children}</ChatArea>
          </Inner>
        )}
      </Main>
    </>
  );
};

export default Layout;
