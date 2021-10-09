import React, { useState, useEffect } from "react";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import styled from "styled-components";

interface Props {
  displayName: string;
  photoURL: string;
  uid: string;
  description: string;
}

const IconArea = styled.figure`
  margin: 20px auto 0;
  width: 150px;
`;

const Icon = styled.img`
  width: 100%;
  border: 1px solid gray;
  border-radius: 50%;
`;

const Title = styled.h1`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const DmButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const DmButton = styled.button`
  padding: 10px;
  background: #333;
  font-size: 14px;
  color: #fff;
  font-weight: 700;
`;

const Description = styled.p`
  margin-top: 10px;
  text-align: center;
`;
const Form = styled.form`
  margin-top: 10px;
  text-align: center;
`;
const InputField = styled.input`
  border: 1px solid gray;
`;
const InputButton = styled.input`
  margin-left: 10px;
  padding: 5px;
`;

const User: React.FC<Props> = ({
  displayName,
  photoURL,
  uid,
  description,
}) => {
  const db = firebase.firestore();
  const router = useRouter();
  const [data, setData] = useState<boolean>(false);
  const [data02, setData02] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const [groupe, groupeLoading, groupeError] = useCollection(
    db.collection("groupe").where("users", "==", [user.uid, uid]),
    {}
  );
  const [groupe02, groupe02Loading, groupe02Error] = useCollection(
    db.collection("groupe").where("users", "==", [uid, user.uid]),
    {}
  );

  useEffect(() => {
    (async (): Promise<any> => {
      await db.collection("groupe").onSnapshot((snapshot: any) => {
        snapshot.docs.map(doc => {
          doc.data().users.map(doc => {
            if (doc == user.uid) {
              setData(true);
            }
            if (doc == uid) {
              setData02(true);
            }
          });
        });
      });
    })();
  }, []);

  const checkGroupe = groupe => {
    groupe &&
      groupe.docs.map((doc, index) =>
        router.push(`/groupe/${doc.data().id}`, `/groupe/${doc.data().id}`)
      );
  };

  const handleDM = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<any> => {
    e.preventDefault();

    if (!data && !data02) {
      await db.collection("groupe").add({
        id: new Date().getTime(),
        users: [user.uid, uid],
        createdAt: updatedTime,
      });
    }
    checkGroupe(groupe);
    checkGroupe(groupe02);
  };

  if (groupeLoading || groupe02Loading || userLoading)
    return <h6>Loading...</h6>;
  if (groupeError || groupe02Error || userError) return null;

  const handleOnSubmit = e => {
    e.preventDefault();
    if (!text) return;
    db.collection("users")
      .doc(uid)
      .update({
        description: text,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
    setText("");
  };

  return (
    <>
      <IconArea>
        <Icon src={photoURL} />
      </IconArea>
      <Title>{displayName}</Title>
      <DmButtonWrapper>
        <DmButton onClick={handleDM}>
          {displayName}とプライベートチャットをする
        </DmButton>
      </DmButtonWrapper>
      {/* {description && <Description>{description}</Description>}
      <Form onSubmit={e => handleOnSubmit(e)}>
        <InputField
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <InputButton
          type="submit"
          onClick={e => handleOnSubmit(e)}
          value="投稿"
        />
      </Form> */}
    </>
  );
};

export default User
