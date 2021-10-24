import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/clientApp";
import marked from "marked";
import Like from "../module/Like";
import styled from "styled-components";
import Link from "next/link";

interface Props {
  key: number;
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const ChatItem: React.FC<Props> = ({
  id,
  message,
  userId,
  createdAt,
}): ReactElement => {
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${userId}`)
  );

  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <List>
      <Inner>
        <Link
          href={`/user/${value.data().uid}`}
          as={`/user/${value.data().uid}`}
          passHref
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
                passHref
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

const List = styled.li``;

const Inner = styled.div`
  padding: 20px 10px;
  display: flex;
  border-bottom: 1px solid rgb(235, 239, 244);
`;

const IconArea = styled.a`
  margin-right: 10px;
  width: 32px;
  cursor: pointer;
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
const Title = styled.h4``;
const TitleLink = styled.a`
  font-size: 15px;
  color: gray;
  font-weight: 700;
  cursor: pointer;
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