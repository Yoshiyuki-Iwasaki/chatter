import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "../firebase/clientApp";

interface Props {
  id: number;
  message: string;
  userId: string;
}

const TodoItem = ({ id, message, userId }: Props): ReactElement => {
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
    <div key={id} className="mt-8">
      <div className="flex">
        <figure className="w-12 rounded-3xl mr-4">
          <img src={value.data().photoURL} alt="" />
        </figure>
        <div>
          <h4>{value.data().displayName}</h4>
          <p className="mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
