import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRecipientEmail } from "../../utils/getRecipientEmai";

function chat({ chat, messages }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>chat with {getRecipientEmail(chat.users,user)}</title>
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png" />

      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages}/>
      </ChatContainer>
    </Container>
  );
}

export default chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();
  const messages = messageRes.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
//   console.log(chat, messages);
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  height: 100vh;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: hidden;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
