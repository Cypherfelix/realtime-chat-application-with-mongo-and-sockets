import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${process.env.BACKEND_URL}/auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const fetchConversations = async (user, setConversations) => {
  try {
    const res = await axios.get(`${process.env.BACKEND_URL}/conversations/${user._id}`);
    setConversations(res.data);
  } catch (err) {
    console.log(err);
  }
}
