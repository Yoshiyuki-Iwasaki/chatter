import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import marked from "marked";
import Like from "./Like";

interface Props {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const TodoItem = ({ id, message, userId, createdAt }: Props): ReactElement => {
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
    <li key={id} className={`mde-preview mt-8 first:mt-0 flex ${messageClass}`}>
      <div
        className={`mde-preview-content md:w-96 border-4 border-light-blue-500 border-opacity-25 rounded-lg flex`}
      >
        <a href={`/user/${value.data().uid}`} className="w-1/5 mr-4">
          <img className={"rounded-full w-full"} src={value.data().photoURL} />
        </a>
        <div className="w-4/5">
          <div className="flex justify-between">
            <h4 className="font-bold">
              <a href={`/user/${value.data().uid}`}>
                {value.data().displayName}
              </a>
            </h4>
            <p className="text-sm text-gray-600">{createdAt}</p>
          </div>
          <div>
            <span
              className="mt-1"
              dangerouslySetInnerHTML={{ __html: marked(message) }}
            />
          </div>
          <Like id={id} />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
