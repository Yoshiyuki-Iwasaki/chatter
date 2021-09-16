import React from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Auth from "./Auth";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

const Layout = ({ children }) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }
  const Main = styled.div`
  `
  const Inner = styled.div`
    display: flex;
    width: 100%;
  `
  const SidebarArea = styled.div`
    background: rgba(243, 244, 246, 0.8);
    width: calc(100% / 5);
  `;
  const ChatArea = styled.div`
    margin: 0 20px;
    width: calc(100% - (100% / 5));
  `;
  return (
    <>
      <Header />
      <Main>
          {!user ? <Auth /> : (
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
}

export default Layout
