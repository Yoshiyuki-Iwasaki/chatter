import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";

interface Like {
  id: number;
  postId: string;
  userId: string;
  createdAt: string;
}

const Like = ({ postId }) => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [done, setDone] = useState(false);
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  useEffect(() => {
    handleLike();
  }, []);

  const handleLike = async () => {
    const citiesRef = await db
      .collection("likeList")
      .where("postId", "==", postId)
      .where("userId", "==", user.uid)
      .get();
    citiesRef.forEach(() => {
      setDone(true);
    });
  };

  const clickLikeButton = async () => {
    await db.collection("likeList").add({
      id: new Date().getTime(),
      postId: postId,
      userId: user.uid,
      createdAt: updatedTime,
    });
    handleLike();
  };

  const clickRemoveLikeButton = async () => {
    const citiesRef = await db
      .collection("likeList")
      .where("postId", "==", postId)
      .where("userId", "==", user.uid)
      .get();
    citiesRef.forEach(postDoc => {
      db.collection("likeList").doc(postDoc.id).delete();
    });
    setDone(false);
  };

  return (
    <>
      {!done ? (
        <button className="mt-2" onClick={clickLikeButton}>
          いいね
        </button>
      ) : (
        <button className="mt-2" onClick={clickRemoveLikeButton}>
          いいね済み
        </button>
      )}
    </>
  );
};

export default Like;
