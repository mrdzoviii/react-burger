import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-aa57b.firebaseio.com"
});

export default instance;
