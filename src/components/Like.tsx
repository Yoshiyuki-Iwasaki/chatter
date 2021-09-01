import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import { useRouter } from "next/router";

interface Like {
  id: number;
  postId: string;
  userId: string;
  createdAt: string;
}
const Like = ({ id }) => {
  const db = firebase.firestore();
  const [likes, setLikes] = useState<Like[]>([]);
  const [user, loading, error] = useAuthState(firebase.auth());
  const [isLoading, setIsLoading] = useState(true);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const resTodo = await db.collection("likeList").doc("like").get();
      setLikes(resTodo.data().like);
      setIsLoading(false);
    })();
  }, [db]);

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        setIsLoading(true);
        const docRef = await db.collection("likeList").doc("like");
        docRef.update({ like: likes });
        console.log(likes);
        setIsLoading(false);
      })();
    }
  }, [likes, isChangedTodo, db]);

  const handleLike = e => {
    console.log("click");
    e.preventDefault();
    setIsChangedTodo(true);
    const newLike: Like = {
      id: new Date().getTime(),
      postId: id,
      userId: user.uid,
      createdAt: updatedTime,
    };
    setLikes([...likes, newLike]);
  };

  return <button onClick={e => handleLike(e)}>いいね</button>;
};

export default Like;
