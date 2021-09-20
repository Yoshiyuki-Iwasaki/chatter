import firebase from "../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import Link from "next/link";

const Sidebar = () => {
  const db = firebase.firestore();
  const [usersList, loading, error] = useCollection(
    db.collection("users"),
    {}
  );
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  const Title = styled.h2`
    margin-top: ${props => (props.marginTop ? props.marginTop : "")};
    padding: 20px;
    background: gray;
    font-size: 15px;
    color: #fff;
    font-weight: 700;
  `;

  const List = styled.ul`
  `;
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
      <ul>
        <li>
          <ListInner>
            <Text href="">グループ</Text>
          </ListInner>
        </li>
        <li>
          <ListInner>
            <Text href="">グループ</Text>
          </ListInner>
        </li>
        <li>
          <ListInner>
            <Text href="">グループ</Text>
          </ListInner>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
