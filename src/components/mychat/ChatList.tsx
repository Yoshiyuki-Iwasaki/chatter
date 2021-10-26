import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/clientApp";
import ChatItem from "../chat/ChatItem";
import ChatInput from "./ChatInput";

const ChatList: React.FC<any> = ({ id }) => {
  const db = firebase.firestore();
  const [data, loading, error] = useCollection(
    db.collection("mychat").where("userId", "==", id),
    {}
  );

  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <>
      <ul>
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
      </ul>
      <ChatInput id={id} />
    </>
  );
};

export default ChatList;