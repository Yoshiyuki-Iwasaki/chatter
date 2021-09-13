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
  const [likeCount, setlikeCount] = useState(0);
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
    CountLike();
  }, []);

  const CountLike = async () => {
    await db
      .collection("likeList")
      .where("postId", "==", postId)
      .get()
      .then(snap => {
        const size = snap.size;
        setlikeCount(size);
      });
  };

  const handleLike = async () => {
    const likesRef = await db
      .collection("likeList")
      .where("postId", "==", postId)
      .where("userId", "==", user.uid)
      .get();
    likesRef.forEach(() => {
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
    CountLike();
  };

  const clickRemoveLikeButton = async () => {
    const likesRef = await db
      .collection("likeList")
      .where("postId", "==", postId)
      .where("userId", "==", user.uid)
      .get();
    likesRef.forEach(postDoc => {
      db.collection("likeList").doc(postDoc.id).delete();
      CountLike();
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
      <span className='ml-1'>{likeCount}</span>
    </>
  );
};

export default Like;
