import Meta from "../meta";
import Header from "./Header";
import Auth from "./Auth";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { LayoutType } from "../../declarations/layout";

const Layout: React.FC<LayoutType> = ({ children }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <>
      <Header />
      <Meta title="Top" description="This is Top page." />
      <Main>{!user ? <Auth /> : <Inner>{children}</Inner>}</Main>
    </>
  );
};

export default Layout;

const Main = styled.div``;
const Inner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;