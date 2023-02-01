import axios from "axios";

// const API_URL = "http://118.67.131.205:8080/api";
const API_URL = "/api";

const axiosClient = {
  getTrendingList: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error(`error 발생했음. 개발자에게 연락해주세요.`);
      console.error(error);
    }
  },
  getMemoList: async (keyword) => {
    try {
      const response = await axios.get(API_URL + `/${keyword}`);
      return response.data;
    } catch (error) {
      if (error.response.status === 404) {
        return false;
      } else {
        console.error(`error 발생했음. 개발자에게 연락해주세요.`);
        console.error(error);
      }
    }
  },
  writeMemo: async (keyword, uuid, context, slot) => {
    const body = { uuid: uuid ? uuid : "tmp", memo: context, slot: slot };
    try {
      await axios.post(API_URL + `/${keyword}`, body);

      return true;
    } catch (error) {
      if (error.response.status === 409) {
        return false;
      } else if (error.response.status === 404) {
        return false;
      } else {
        console.error(`error 발생했음. 개발자에게 연락해주세요.`);
        console.error(error);
      }
    }
  },
};

export default axiosClient;
