import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";

interface Props {
  id: number;
  message: string;
  userId: string;
}

const TodoItem = ({ id, message, userId }: Props): ReactElement => {
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${userId}`)
  );

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  const messageClass =
    value.data().uid === user.uid ? "justify-end" : "justify-start";

  return (
    <li key={id} className={`mt-8 flex ${messageClass}`}>
      <div className={`p-4 bg-blue-50 w-96 rounded-lg flex`}>
        <figure className="w-1/5 mr-4">
          <img
            className="rounded-full w-full"
            src={value.data().photoURL}
            alt=""
          />
        </figure>
        <div className="w-4/5">
          <h4 className="font-bold">{value.data().displayName}</h4>
          <p className="mt-1">{message}</p>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
