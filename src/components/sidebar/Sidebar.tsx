import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import SidebarList from "./SidebarList";
import { useRouter } from "next/router";
import { SidebarType } from '../../declarations/sidebar'

const Sidebar: React.FC<SidebarType> = ({ uid, photoURL, displayName }) => {
  const router = useRouter();

  const SendToMychat = () => {
    router.push(`/`);
  };

  return (
    <>
      <Title>ユーザーリスト</Title>
      <List>
        <ListItem onClick={() => SendToMychat()}>
          <ListInner>
            <IconArea>
              <Icon src={photoURL} />
            </IconArea>
            <Text>{displayName}</Text>
          </ListInner>
        </ListItem>
        <SidebarList currentUserId={uid} />
      </List>
    </>
  );
};

export default Sidebar;

const Title = styled.h2`
  margin-top: ${props => (props.marginTop ? props.marginTop : "")};
  padding: 20px;
  font-size: 15px;
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
  font-weight: 400;
`;
