import React from 'react'

const User = ({ todo }) => {
  return (
    <>
      <figure>
        <img src={todo.photoURL} />
      </figure>
      <h1>{todo.displayName}</h1>
    </>
  );
};

export default User
