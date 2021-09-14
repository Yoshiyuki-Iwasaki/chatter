import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import marked from "marked";
import Like from "./Like";
import styled from "styled-components";

interface Props {
  key: number;
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const TodoItem = ({key, id, message, userId, createdAt }: Props): ReactElement => {
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${userId}`)
  );

  if (loading || userLoading) {
    return <h6>Loading...</h6>;
  }

  if (error || userError) {
    return null;
  }

  const List = styled.li`
    margin-top: 25px;
    display: flex;
    justify-content: ${userId === user.uid ? "flex-end" : "flex-start"};
  `;

  const Inner = styled.div`
    padding: 10px;
    display: flex;
    border: 1px solid gray;
    width: 30%;
  `;

  const IconArea = styled.a`
    width: calc(100% / 5);
    margin-right: 20px;
  `;

  const Icon = styled.img`
    width: 100%;
  `;

  const TextArea = styled.div`
    width: calc(100% - (100% / 5));
  `;
  const TextAreaInner = styled.div`
    display:flex;
    justify-content: space-between;
  `;
  const Title = styled.h4`
    font-size: 15px;
    color: gray;
    font-weight: 700;
  `;
  const Text = styled.p`
    font-size: 15px;
    color: gray;
  `
  const Body = styled.div`
    margin-top: 10px;
    font-size: 15px;
    color: gray;
  `;

  return (
    <List key={key}>
      <Inner>
        <IconArea href={`/user/${value.data().uid}`}>
          <Icon src={value.data().photoURL} />
        </IconArea>
        <TextArea>
          <TextAreaInner>
            <Title>
              <a href={`/user/${value.data().uid}`}>
                {value.data().displayName}
              </a>
            </Title>
            <Text>{createdAt}</Text>
          </TextAreaInner>
          <Body
            className="mt-1"
            dangerouslySetInnerHTML={{ __html: marked(message) }}
          />
          <Like postId={id} />
        </TextArea>
      </Inner>
    </List>
  );
};

export default TodoItem;
