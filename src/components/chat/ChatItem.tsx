import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import marked from "marked";
import Like from "../Like";
import styled from "styled-components";
import Link from "next/link";

interface Props {
  key: number;
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const ChatItem = ({key, id, message, userId, createdAt }: Props): ReactElement => {
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${userId}`)
  );

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  const List = styled.li`
  `;

  const Inner = styled.div`
    padding: 20px 10px;
    display: flex;
    border-bottom: 1px solid rgb(235, 239, 244);
  `;

  const IconArea = styled.a`
    width: 32px;
    margin-right: 10px;
    transition: opacity 0.6s;

    &:hover {
      opacity: 0.6;
    }
  `;

  const Icon = styled.img`
    width: 100%;
    border-radius: 50%;
    border: 1px solid rgb(235, 239, 244);
  `;

  const TextArea = styled.div`
    padding-top: 8px;
    width: calc(100% - 32px);
  `;
  const TextAreaInner = styled.div`
    display: flex;
    align-items: center;
  `;
  const Title = styled.h4`
  `;
  const TitleLink = styled.a`
    font-size: 15px;
    color: gray;
    font-weight: 700;
    transition: opacity 0.6s;

    &:hover {
      opacity: 0.6;
    }
  `;
  const Date = styled.p`
    margin-left: 20px;
    font-size: 12px;
    color: gray;
  `;
  const Body = styled.div`
    margin-top: 20px;

    > p {
      font-size: 14px;
      color: gray;
    }
  `;

  return (
    <List key={key}>
      <Inner>
        <Link
          href={`/user/${value.data().uid}`}
          as={`/user/${value.data().uid}`}
        >
          <IconArea>
            <Icon src={value.data().photoURL} />
          </IconArea>
        </Link>
        <TextArea>
          <TextAreaInner>
            <Title>
              <Link
                href={`/user/${value.data().uid}`}
                as={`/user/${value.data().uid}`}
              >
                <TitleLink>{value.data().displayName}</TitleLink>
              </Link>
            </Title>
            <Date>{createdAt}</Date>
          </TextAreaInner>
          <Body dangerouslySetInnerHTML={{ __html: marked(message) }} />
          <Like postId={id} />
        </TextArea>
      </Inner>
    </List>
  );
};

export default ChatItem;
