import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import styled from "styled-components";

interface Props {
  postId: number;
}

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const LikeButton = styled.span`
  z-index: 100;
`;

const LikedButton = styled(LikeButton)`
  color: #e94709;
`;

const LikeCount = styled.button`
  margin-left: 5px;
  font-size: 14px;
  color: gray;
`;

const Like: React.FC<Props> = ({ postId }: Props) => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [done, setDone] = useState(false);
  const [likeCount, setlikeCount] = useState(0);
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);

  useEffect(() => {
    loadingLike();
    countLike();
  }, []);

  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  const countLike = async () => {
    await db
      .collection("like")
      .where("postId", "==", postId)
      .get()
      .then(snap => {
        const size = snap.size;
        setlikeCount(size);
      });
  };

  const loadingLike = async () => {
    const likesRef = await db
      .collection("like")
      .where("postId", "==", postId)
      .where("userId", "==", user.uid)
      .get();
    likesRef.forEach(() => {
      setDone(true);
    });
  };

  const clickLikeButton = async () => {
    await db.collection("like").add({
      id: new Date().getTime(),
      postId: postId,
      userId: user.uid,
      createdAt: updatedTime,
    });
    loadingLike();
    countLike();
  };

  const clickRemoveLikeButton = async () => {
    const likesRef = await db
      .collection("like")
      .where("postId", "==", postId)
      .where("userId", "==", user.uid)
      .get();
    likesRef.forEach(postDoc => {
      db.collection("like").doc(postDoc.id).delete();
      countLike();
    });
    setDone(false);
  };

  return (
    <Wrapper>
      {!done ? (
        <LikeButton onClick={clickLikeButton}>いいね</LikeButton>
      ) : (
        <LikedButton onClick={clickRemoveLikeButton}>いいね済み</LikedButton>
      )}
      <LikeCount>{likeCount}</LikeCount>
    </Wrapper>
  );
};

export default Like;
