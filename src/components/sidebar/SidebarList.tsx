import firebase from "../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarItem from "./SidebarItem";
import { SidebarListType } from "../../declarations/sidebar";

const SidebarList: React.FC<SidebarListType> = ({ currentUserId }) => {
  const db = firebase.firestore();
  const [chatData, loading, error] = useCollection(
    db.collection("chat"),
    {}
  );
  if (loading) return <h6>Loading...</h6>;
  if (error) return null;
  return (
    <>
      {chatData &&
        chatData.docs.map(
          (
            doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>,
            index: number
          ) => <SidebarItem key={index} id={doc.id} title={doc.data().title} />
        )}
    </>
  );
};

export default SidebarList
