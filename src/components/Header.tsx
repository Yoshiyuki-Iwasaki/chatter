import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import styled from 'styled-components';

const Header = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const logout = () => {
    firebase.auth().signOut();
  }
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  const Header = styled.header`
    margin: 0 auto;
    width: 100%;
    background: rgba(243, 244, 246, 0.8);
  `;
  const Inner = styled.div`
    margin: 0 auto;
    padding: 15px 30px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  const Title = styled.div`
  `;
  const Link = styled.a`
    font-weight: 700;
    font-size: 28px;
    letter-spacing: 0.025em;
  `;
  const LeftArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  const Button = styled.button`
    margin-left: 25px;
    padding: 15px;
    background: gray;
    color: #fff;
    font-weight: 700;
  `
  const Text = styled.p`
    font-size: 15px;
    color: gray;
    letter-spacing: 0.025em;
    font-weight: 700;
  `;
  return (
    <Header>
      <Inner>
        <Title>
          <Link href="/">chatter</Link>
        </Title>
        <LeftArea>
          {!user ? "" : <Text>{user.displayName}</Text>}
          <Button onClick={() => logout()}>ログアウト</Button>
        </LeftArea>
      </Inner>
    </Header>
  );
}

export default Header
