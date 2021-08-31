import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";


const Header = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const logout = () => {
    firebase.auth().signOut();
  }

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-100 mx-auto">
      <div className="md:w-9/12 p-3 text-right mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wide">
          <a href="/">chatter</a>
        </h1>
        <div className="w-48 flex justify-between	items-center">
          {!user ? (
            ""
          ) : (
            <p className="text-1xl font-bold tracking-wide">
              {user.displayName}
            </p>
          )}
          <button
            onClick={() => logout()}
            className="bg-gray-500 text-white font-medium p-4"
          >
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header
