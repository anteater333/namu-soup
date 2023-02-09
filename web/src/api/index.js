import axios from "axios";

// const API_URL = "http://118.67.131.205:8080/api";
const API_URL = "/api";

const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = "http://118.67.131.205:8080"; // To be changed
      break;
    case "development":
    default:
      url = "";
  }

  return url;
};

axios.create({
  baseURL: getBaseUrl(),
});

const axiosClient = {
  getTrendingList: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error(`error 발생했음. 개발자에게 연락해주세요.`);
      console.error(error);
      throw error;
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
        console.error(error);
        throw error;
      }
    }
  },
  writeMemo: async (keyword, uuid, context, slot) => {
    const body = { uuid: uuid ? uuid : "tmp", memo: context, slot: slot };
    try {
      await axios.post(API_URL + `/${keyword}`, body);

      return [true, "done"];
    } catch (error) {
      if (error.response.status === 404) {
        return [false, "notFound"];
      } else if (error.response.status === 409) {
        return [false, "duplicated"];
      } else if (error.response.status === 410) {
        return [false, "missed"];
      } else if (error.response.status === 419) {
        return [false, "tooLong"];
      } else if (error.response.status === 429) {
        return [false, "tooMany"];
      }

      console.error(error);
      if (error.response) {
        return [false, "notDefined"];
      }

      throw error;
    }
  },
};

export default axiosClient;
