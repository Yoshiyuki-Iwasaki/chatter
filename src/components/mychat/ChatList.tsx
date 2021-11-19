import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/clientApp";
import ChatItem from "../chat/ChatItem";
import ChatInput from "./ChatInput";
import { ChatListType } from "../../declarations/chat";
import styled from "styled-components";

const ChatList: React.FC<ChatListType> = ({ id }) => {
  const db = firebase.firestore();
  const [data, loading, error] = useCollection(
    db
      .collection("mychat")
      .where("userId", "==", id)
      .orderBy("createdAt", "asc"),
    {}
  );

  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <>
      <List>
        {data &&
          data.docs.map((doc, index) => (
            <ChatItem
              key={index}
              id={doc.data().id}
              message={doc.data().message}
              userId={doc.data().userId}
              createdAt={doc.data().createdAt}
            />
          ))}
      </List>
      <ChatInput />
    </>
  );
};

export default ChatList;

const List = styled.ul`
  height: calc(100vh - 191px);
  overflow: scroll;
`;