import Layout from "../components/Layout";
import styled from "styled-components";

const Button = styled.button`
  padding: 20px;
  background: #000;
  color: #fff;
`;

const Home = () => {

  return (
    <Layout>
      <Button>グループを作成する</Button>
    </Layout>
  );
}

export default Home;
