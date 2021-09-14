import firebase from "../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = () => {
  const db = firebase.firestore();
  const [usersList, loading, error] = useCollection(
    db.collection("users"),
    {}
  );
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  return (
    <>
      <h2 className="bg-gray-500 text-white font-medium p-3">ユーザーリスト</h2>
      <ul>
        {usersList &&
          usersList.docs.map((doc, index) => (
            <li key={index}>
              <a
                href={`user/${doc.data().uid}`}
                className="block font-medium p-2"
              >
                {doc.data().displayName}
              </a>
            </li>
          ))}
      </ul>
      <h2 className="mt-10 bg-gray-500 text-white font-medium p-3">
        グループリスト
      </h2>
      <ul>
        <li>
          <a href="" className="block font-medium p-2">
            グループ
          </a>
        </li>
        <li>
          <a href="" className="block font-medium p-2">
            グループ
          </a>
        </li>
        <li>
          <a href="" className="block font-medium p-2">
            グループ
          </a>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
