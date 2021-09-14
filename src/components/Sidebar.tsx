import firebase from "../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";

const Title = styled.h2`
  padding: 10px;
  background: gray;
  color: #fff;
  font-weight: 500;
  margin-top: ${props => (props.marginTop ? props.marginTop : "")};
`;
const Text = styled.a`
  padding: 10px;
  display: block;
  font-weight: 500;
`;

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

  return (
    <>
      <Title>ユーザーリスト</Title>
      <ul>
        {usersList &&
          usersList.docs.map((doc, index) => (
            <li key={index}>
              <Text href={`user/${doc.data().uid}`}>
                {doc.data().displayName}
              </Text>
            </li>
          ))}
      </ul>
      <Title marginTop="20px">グループリスト</Title>
      <ul>
        <li>
          <Text href="">
            グループ
          </Text>
        </li>
        <li>
          <Text href="">
            グループ
          </Text>
        </li>
        <li>
          <Text href="">
            グループ
          </Text>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
