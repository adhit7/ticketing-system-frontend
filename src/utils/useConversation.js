import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useAllConversationMutation,
  useStartConversationMutation,
  useSendMessageMutation,
} from '../slices/conversationApiSlice';

function useConversation() {
  const { userInfo } = useSelector((state) => state.auth);

  const [allConversation] = useAllConversationMutation();

  const [startConversation] = useStartConversationMutation();

  const [sendMessage] = useSendMessageMutation();

  const getAllConversation = async (id) => {
    try {
      const res = await allConversation({
        conversationId: id?.toString(),
        role: userInfo?.role,
      }).unwrap();
      return res?.messages;
    } catch (error) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  const newConversation = async (id, message) => {
    try {
      await startConversation({
        queryId: id,
        content: message,
        role: userInfo?.role,
      }).unwrap();
    } catch (error) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  const sentMessage = async (id, message) => {
    try {
      await sendMessage({
        queryId: id,
        content: message,
        role: userInfo?.role,
      }).unwrap();
    } catch (error) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  return {
    getAllConversation,
    newConversation,
    sentMessage,
  };
}

export default useConversation;
