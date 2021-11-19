import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import styled from 'styled-components';
import Link from 'next/link';
import { DarkModeContext } from "../../context/DarkModeContext";

const Header: React.FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const { theme, toggleDarkMode } = useContext(DarkModeContext);

  const logout = () => {
    firebase.auth().signOut();
  };

  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <HeaderLayout>
      <Inner>
        <Title>
          <Link href="/" as="/" passHref>
            <Logo>chatter</Logo>
          </Link>
        </Title>
        {user && (
          <>
            <LeftArea>
              <DarkButton onClick={toggleDarkMode}>
                {theme == "dark" ? "🌑" : "🌝"}
              </DarkButton>
              <Hover>
                <Wrapper>
                  <Icon>
                    <IconImage src={user.photoURL} />
                  </Icon>
                  <Text>{user.displayName}</Text>
                </Wrapper>
                <List>
                  <ListItem>
                    <Button onClick={() => logout()}>ログアウト</Button>
                  </ListItem>
                </List>
              </Hover>
            </LeftArea>
          </>
        )}
      </Inner>
    </HeaderLayout>
  );
};

export default Header


const HeaderLayout = styled.header`
  margin: 0 auto;
  width: 100%;
`;
const Inner = styled.div`
  @media screen and (max-width: 768px) {
  }
  margin: 0 auto;
  padding: 15px 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div``;
const Logo = styled.a`
  transition: opacity 0.6s;
  cursor: pointer;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.025em;

  &:hover {
    opacity: 0.6;
  }
`;
const LeftArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DarkButton = styled.button`
  margin-right: 10px;
`;
const Text = styled.span`
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.025em;
  font-weight: 700;
`;
const Hover = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.figure`
  margin-right: 10px;
  width: 40px;
`;
const IconImage = styled.img`
  width: 100%;
  border-radius: 50%;
`;
const List = styled.ul`
  position: absolute;
  top: 50px;
  right: 20px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.6s;

  &:before {
    content: "";
    position: absolute;
    top: -4px;
    right: 25px;
    width: 8px;
    height: 8px;
    border-top: 1px solid gray;
    border-right: 1px solid gray;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  ${Hover}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
const ListItem = styled.li`
`;
const Button = styled.a`
  padding: 15px 0;
  display: inline-block;
  background: gray;
  cursor: pointer;
  width: 200px;
  font-size: 13px;
  color:#fff;
  font-weight: 700;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;