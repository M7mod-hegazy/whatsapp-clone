import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { getRecipientEmail } from "../utils/getRecipientEmai";

const Chat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipentEmail = getRecipientEmail(users, user);
  const [recipentSnapshot] = useCollection(
    db.collection("users").where("email", "==", recipentEmail)
  );
  const recipent = recipentSnapshot?.docs?.[0]?.data();

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipent ? (
        <UserAvatar src={recipent.photoURL} />
      ) : (
        <UserAvatar>{recipentEmail[0]}</UserAvatar>
      )}
      <p>{recipentEmail}</p>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
