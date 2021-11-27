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
    <SidebarArea>
      <Title>グループリスト</Title>
      <List>
        <ListItem onClick={() => SendToMychat()}>
          <ListInner>
            <IconArea>
              <Icon src={photoURL} />
            </IconArea>
            <Text>マイチャット</Text>
          </ListInner>
        </ListItem>
        <SidebarList currentUserId={uid} />
      </List>
    </SidebarArea>
  );
};

export default Sidebar;

const SidebarArea = styled.aside`
  display: block;
  width: calc(100% / 5);

  @media (max-width: 768px) {
    display: none;
    position: fixed;
    top: 70 px;
    left: 0;
    width: 100%;
    height: calc(100 vh - 70 px);
    z-index: 10;
  }
`;

const Title = styled.h2`
  margin-top: ${props => (props.marginTop ? props.marginTop : "")};
  padding: 20px;
  font-size: 15px;
  font-weight: 700;
`;

const List = styled.ul`
  height: calc(100vh - 131px);
  overflow: scroll;

  @media screen and (max-width: 768px) {
    height: auto;
  }
`;
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
