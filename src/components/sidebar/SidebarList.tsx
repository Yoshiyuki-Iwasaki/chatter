import firebase from "../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarItem from "./SidebarItem";

const SidebarList: React.FC<any> = ({ currentUser }) => {
  const db = firebase.firestore();
  const [usersList, loading, error] = useCollection(
    db.collection("users").where("uid", "!=", currentUser.uid),
    {}
  );
  const [chatList, chatLoading, chatError] = useCollection(
    db.collection("chat").where("users", "array-contains", currentUser.uid),
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
            currentUser={currentUser}
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
