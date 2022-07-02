import axios from "axios";
import { auth } from "../../utils/firebase.utils";

const getApi = async () => {
  const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `Bearer ${await auth?.currentUser?.getIdToken()}`,
    },
  });
  return axiosInstance;
};

export default getApi;
