import React from 'react';
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../../components/sidebar/Sidebar";
import styled from "styled-components";

const UserList = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) return <h6>Loading...</h6>;
  if (error) return null;
  return (
    <Inner>
      <Sidebar
        uid={user.uid}
        photoURL={user.photoURL}
        displayName={user.displayName}
      />
    </Inner>
  );
};

export default UserList;


const Inner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;