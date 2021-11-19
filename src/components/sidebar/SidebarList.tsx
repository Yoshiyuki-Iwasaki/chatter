import firebase from "../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarItem from "./SidebarItem";
import { SidebarListType } from "../../declarations/sidebar";

const SidebarList: React.FC<SidebarListType> = ({ currentUserId }) => {
  const db = firebase.firestore();
  const [usersList, loading, error] = useCollection(
    db.collection("users").where("uid", "!=", currentUserId),
    {}
  );
  const [chatList, chatLoading, chatError] = useCollection(
    db.collection("chat").where("users", "array-contains", currentUserId),
    {}
  );
  if (loading || chatLoading) return <h6>Loading...</h6>;
  if (error || chatError) return null;
  return (
    <>
      {usersList &&
        usersList.docs.map((doc, index) => (
          <SidebarItem
            key={index}
            currentUserId={currentUserId}
            chatList={chatList}
            uid={doc.data().uid}
            photoURL={doc.data().photoURL}
            displayName={doc.data().displayName}
          />
        ))}
    </>
  );
};

export default SidebarList
