import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import styled from "styled-components";
import { LikeType } from "../../declarations/like";

const Like: React.FC<LikeType> = ({ postId }) => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [done, setDone] = useState<boolean>(false);
  const [likeCount, setlikeCount] = useState<number>(0);

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
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
        <LikeButton onClick={clickLikeButton}>
          <Icon>
            <IconImage src="/icon_like.png" alt="" />
          </Icon>
        </LikeButton>
      ) : (
        <LikedButton onClick={clickRemoveLikeButton}>
          <Icon>
            <IconImage src="/icon_liked.png" alt="" />
          </Icon>
        </LikedButton>
      )}
      <LikeCount>{likeCount}</LikeCount>
    </Wrapper>
  );
};

export default Like;

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
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
`;

const Icon = styled.figure`
  width: 20px;

  @media (max-width: 768px) {
    width: 20px;
  }
`;

const IconImage = styled.img`
  width: 100%;
`;