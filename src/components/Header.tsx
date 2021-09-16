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
  const Text = styled.span`
    font-size: 15px;
    color: gray;
    letter-spacing: 0.025em;
    font-weight: 700;
  `;
  const Hover = styled.div`
    position: relative;
  `;
  const List = styled.ul`
    position: absolute;
    top: 25px;
    right: 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.6s;
    width: 200px;

    ${Hover}:hover & {
      opacity: 1;
      visibility: visible;
    }
  `;
  const ListItem = styled.li`
    padding: 20px 10px;
    background: gray;
  `;
  const ListLink = styled.a`
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 13px;
    color: #fff;
    font-weight: 700;
  `;
  const Button = styled.a`
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: 13px;
    color: #fff;
    font-weight: 700;
  `;
  return (
    <Header>
      <Inner>
        <Title>
          <Link href="/">chatter</Link>
        </Title>
        {!user ? (
          ""
        ) : (
          <>
            <LeftArea>
              <Hover>
                <Text>{user.displayName}</Text>
                <List>
                  <ListItem>
                    <ListLink href={`/user${user.uid}`}>
                      プロフィールを見る
                    </ListLink>
                  </ListItem>
                  <ListItem>
                    <Button onClick={() => logout()}>ログアウト</Button>
                  </ListItem>
                </List>
              </Hover>
            </LeftArea>
          </>
        )}
      </Inner>
    </Header>
  );
}

export default Header
