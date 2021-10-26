import Meta from "../meta";
import Header from "./Header";
import Auth from "./Auth";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

const Layout: React.FC<any> = ({ children }) => {
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

const Main = styled.div`
  height: calc(100vh - 58px);

  @media (max-width: 768px) {
    height: auto;
  }
`;
const Inner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;