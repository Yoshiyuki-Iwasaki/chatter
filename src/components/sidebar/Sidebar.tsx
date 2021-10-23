import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import SidebarList from "./SidebarList";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [currentUser, loading, error] = useAuthState(firebase.auth());
  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  const SendToMychat = () => {
    router.push(`/`);
  }

  return (
    <>
      <Title>ユーザーリスト</Title>
      <List>
        <ListItem onClick={() => SendToMychat()}>
          <ListInner>
            <IconArea>
              <Icon src={currentUser.photoURL} />
            </IconArea>
            <Text>{currentUser.displayName}</Text>
          </ListInner>
        </ListItem>
        <SidebarList currentUser={currentUser} />
      </List>
    </>
  );
};

export default Sidebar;

const Title = styled.h2`
  margin-top: ${props => (props.marginTop ? props.marginTop : "")};
  padding: 20px;
  background: gray;
  font-size: 15px;
  color: #fff;
  font-weight: 700;
`;

const List = styled.ul``;
const ListItem = styled.li`
  border-bottom: 1px solid gray;
`;

const ListInner = styled.a`
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;

const IconArea = styled.figure`
  margin-right: 10px;
  width: 40px;
`;

const Icon = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const Text = styled.p`
  width: calc(100% - 40px);
  display: block;
  font-size: 14px;
  color: gray;
  font-weight: 400;
`;
