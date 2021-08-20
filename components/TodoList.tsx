import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "../firebase/clientApp";

interface Props {
  id: number;
  message: string;
  userId: string;
}

const Author = ({ id, message, userId }: Props): ReactElement => {
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${userId}`)
  );

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  return (
    <div key={id}>
      <img src={value.data().photoURL} alt="" />
      <h4>{value.data().displayName}</h4>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Author;
