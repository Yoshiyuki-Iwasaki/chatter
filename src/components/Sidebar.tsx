import firebase from "../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import Link from "next/link";

const Title = styled.h2`
  margin-top: ${props => (props.marginTop ? props.marginTop : "")};
  padding: 20px;
  background: gray;
  font-size: 15px;
  color: #fff;
  font-weight: 700;
`;

const List = styled.ul``;
const ListItem = styled.li`
  border-bottom: 1px solid gray;
`;

const ListInner = styled.a`
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;

const IconArea = styled.figure`
  margin-right: 10px;
  width: 40px;
`;

const Icon = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const Text = styled.p`
  width: calc(100% - 40px);
  display: block;
  font-size: 14px;
  color: gray;
  font-weight: 400;
`;
const GroupeList = styled.ul`

`;
const GroupeListItem = styled.li`
`;

const Sidebar = () => {
  const db = firebase.firestore();
  const [usersList, loading, error] = useCollection(
    db.collection("users"),
    {}
  );
  const [groupe, groupeLoading, groupeError] = useCollection(
    db.collection("groupe"),
    {}
  );
  if (loading || groupeLoading) return <h6>Loading...</h6>;
  if (error || groupeError) return null;

  return (
    <>
      <Title>ユーザーリスト</Title>
      <List>
        {usersList &&
          usersList.docs.map((doc, index) => (
            <ListItem key={index}>
              <Link
                href={`/user/${doc.data().uid}`}
                as={`/user/${doc.data().uid}`}
                passHref
              >
                <ListInner>
                  <IconArea>
                    <Icon src={doc.data().photoURL} />
                  </IconArea>
                  <Text>{doc.data().displayName}</Text>
                </ListInner>
              </Link>
            </ListItem>
          ))}
      </List>
      <Title>グループリスト</Title>
      <GroupeList>
        <GroupeListItem>
          {groupe &&
            groupe.docs.map((doc, index) => (
              <Link
                key={index}
                href={`/groupe/${doc.data().id}`}
                as={`/groupe/${doc.data().id}`}
                passHref
              >
                <ListInner>
                  <Text href="">グループ</Text>
                </ListInner>
              </Link>
            ))}
        </GroupeListItem>
      </GroupeList>
    </>
  );
};

export default Sidebar;