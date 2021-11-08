import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import marked from "marked";
import Like from "../module/Like";
import styled from "styled-components";
import Link from "next/link";
import { ChatItemType } from "../../declarations/chat";
import dayjs from "dayjs";

const ChatItem: React.FC<ChatItemType> = ({
  id,
  message,
  userId,
  createdAt,
}): ReactElement => {
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${userId}`)
  );
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  let dueDate;
  if (createdAt) {
    dueDate = dayjs(createdAt.toDate()).format("YYYY-MM-DD HH:mm");
  }
  if (loading || userLoading) return <h6>Loading...</h6>;
  if (error || userError) return null;

  const List = styled.li`
    display: flex;
    justify-content: ${userId === user.uid ? "flex-end" : "flex-start"};
  `;

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
            {createdAt && <Date>{dueDate}</Date>}
          </TextAreaInner>
          <Body dangerouslySetInnerHTML={{ __html: marked(message) }} />
          <Like postId={id} />
        </TextArea>
      </Inner>
    </List>
  );
};

export default ChatItem;

const Inner = styled.div`
  padding: 20px 10px;
  display: flex;
  max-width: 50%;
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
`;
const Body = styled.div`
  margin-top: 20px;

  > p {
    font-size: 14px;
  }
`;
