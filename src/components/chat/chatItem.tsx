import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import marked from "marked";
import Like from "../module/Like";
import styled from "styled-components";
import { formatDate } from "../../utils/date";
import { ChatItemType } from "../../declarations/chat";

const ChatItem: React.FC<ChatItemType> = ({
  id,
  message,
  userId,
  createdAt,
}) => {
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${userId}`)
  );
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  if (loading || userLoading) return <h6>Loading...</h6>;
  if (error || userError) return null;

  const List = styled.li`
    display: flex;
    justify-content: ${userId === user.uid ? "flex-end" : "flex-start"};
  `;

  return (
    <List>
      <Inner>
        <IconArea>
          <Icon src={value.data().photoURL} />
        </IconArea>
        <TextArea>
          <TextAreaInner>
            <Title>
                <TitleLink>{value.data().displayName}</TitleLink>
            </Title>
            {createdAt && <Date>{formatDate(createdAt.toDate())}</Date>}
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
  margin-bottom: 15px;
  padding: 15px 25px;
  display: flex;
  max-width: 50%;
  background: #f0f3fc;
`;

const IconArea = styled.div`
  margin-right: 10px;
  width: 32px;
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
const TitleLink = styled.p`
  font-size: 15px;
  font-weight: 700;
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
