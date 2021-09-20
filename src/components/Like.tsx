import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import styled from "styled-components";

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

  const Wrapper = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
  `;

  const Button = styled.figure`
    width: 25px;
    z-index: 100;
  `;

  const LikeCount = styled.button`
    margin-left: 5px;
    font-size: 14px;
    color: gray;
  `;

  return (
    <Wrapper>
      {!done ? (
        <Button onClick={clickLikeButton}>
          <img src={`image/icon_like.png`} alt="" />
        </Button>
      ) : (
        <Button onClick={clickRemoveLikeButton}>
          <img src={`image/icon_liked.png`} alt="" />
        </Button>
      )}
      <LikeCount>{likeCount}</LikeCount>
    </Wrapper>
  );
};

export default Like;
