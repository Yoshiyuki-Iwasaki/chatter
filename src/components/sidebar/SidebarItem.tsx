import { useRouter } from "next/router";
import firebase from "../../firebase/clientApp";
import styled from "styled-components";
import getRecipient from "../../utils/getRecipient";

const SidebarItem = ({ currentUser, chatList, uid, photoURL, displayName }) => {
  const db = firebase.firestore();
  const router = useRouter();
  const createChatRoom = async userId => {
    await chatList?.docs.map(doc => {
      if (getRecipient(doc.data().users, currentUser.uid)) {
        router.push(`/chat/${doc.id}`);
      } else {
        db.collection("chat").add({
          id: new Date().getTime(),
          users: [userId, currentUser.uid],
        });
        router.push(`/chat/${doc.id}`);
      }
    });
  };

  return (
    <ListItem onClick={() => createChatRoom(uid)}>
      <ListInner>
        <IconArea>
          <Icon src={photoURL} />
        </IconArea>
        <Text>{displayName}</Text>
      </ListInner>
    </ListItem>
  );
};

export default SidebarItem;

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
const GroupeList = styled.ul``;
const GroupeListItem = styled.li``;
