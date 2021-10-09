import Layout from "../components/Layout";
import styled from "styled-components";

const Button = styled.button`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  transform: translate(-50%, -50%);
`;

const Home = () => {

  return (
    <Layout>
      <Button>グループを作成する</Button>
    </Layout>
  );
}

export default Home;
