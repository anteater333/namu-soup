import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = {
  getTrendingList: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getMemoList: async (keyword) => {
    try {
      const response = await axios.get(
        API_URL + `/${encodeURIComponent(keyword)}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  writeMemo: async (keyword, uuid, context, slot) => {
    const body = { uuid: uuid ? uuid : "tmp", memo: context, slot: slot };
    try {
      await axios.post(API_URL + `/${encodeURIComponent(keyword)}`, body);

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
