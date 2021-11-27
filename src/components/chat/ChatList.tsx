import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/clientApp";
import ChatInput from "./ChatInput";
import ChatItem from "./ChatItem";
import { ChatListType } from "../../declarations/chat";
import styled from "styled-components";

const ChatList: React.FC<ChatListType> = ({ id }) => {
  const db = firebase.firestore();
  const [data, loading, error] = useCollection(
    db
      .collection("chat")
      .doc(id)
      .collection("messages")
      .orderBy("createdAt", "asc"),
    {}
  );

  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <>
      <List id="message-list">
        {data &&
          data.docs.map(
            (
              doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>,
              index: number
            ) => (
              <ChatItem
                key={index}
                id={doc.data().id}
                message={doc.data().message}
                userId={doc.data().userId}
                createdAt={doc.data().createdAt}
              />
            )
          )}
      </List>
      <ChatInput id={id} />
    </>
  );
};

export default ChatList;

const List = styled.ul`
  height: calc(100vh - 191px);
  overflow: scroll;
`;