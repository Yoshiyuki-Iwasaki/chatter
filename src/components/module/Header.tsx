import React, { useState, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import styled from 'styled-components';
import Link from 'next/link';
import { DarkModeContext } from "../../context/DarkModeContext";
import { COLORS } from '../../utils/variable';
import Modal from "./Modal";

type TitleType = {
  title:string;
};

const Header: React.FC<TitleType> = ({ title }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const { theme, toggleDarkMode } = useContext(DarkModeContext);
  const [show, setShow] = useState<boolean>(false);

  const logout = () => {
    firebase.auth().signOut();
  };

  const createGroupeChat = () => {
    setShow(!show);
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
        <SpTitle>
          <Link href="/" as="/" passHref>
            <SpLogo>{title}</SpLogo>
          </Link>
        </SpTitle>
        {user && (
          <>
            <LeftArea>
              <GroupeButton onClick={createGroupeChat}>
                グループ作成
              </GroupeButton>
              {show && <Modal currentUserId={user.uid} setShow={setShow} />}
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
                    <Link href="./userList" as="./userList" passHref>
                      <a>ユーザーリスト</a>
                    </Link>
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
    </HeaderLayout>
  );
};

export default Header


const HeaderLayout = styled.header`
  margin: 0 auto;
  width: 100%;
`;
const Inner = styled.div`
  margin: 0 auto;
  padding: 15px 25px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    padding: 5px 15px;
  }
`;
const Title = styled.h1`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Logo = styled.a`
  transition: opacity 0.6s;
  cursor: pointer;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.025em;
  @media screen and (max-width: 768px) {
    display: none;
  }

  &:hover {
    opacity: 0.6;
  }
`;
const SpTitle = styled.h1`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
const SpLogo = styled.a`
  display: none;
  transition: opacity 0.6s;
  cursor: pointer;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.025em;

  @media screen and (max-width: 768px) {
    display: block;
    font-size: 18px;
  }

  &:hover {
    opacity: 0.6;
  }
`;
const LeftArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const GroupeButton = styled.button`
  margin-right: 15px;
  padding: 10px 15px;
  background: rgb(51, 51, 51);
  border-radius: 20px;
  transition: all 0.6s;
  font-size: 13px;
  color: rgb(255, 255, 255);
  letter-spacing: 0.025em;
  font-weight: 700;

  &:hover {
    opacity: .7;
  }
`;
const DarkButton = styled.button`
  margin-right: 15px;
`;
const Text = styled.span`
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.025em;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    display: none;
  }
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
  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
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
  color: ${COLORS.WHITE};
  font-weight: 700;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;