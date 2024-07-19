import axios from "axios";

export const getSinglePosts = async ({ slug }) => {
    try {
        const { data } = await axios.get(`/api/posts/${slug}`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Card a ulaşılamadı " + error.message);
        }
    }
};



axios.defaults.headers.common = {
    'Content-Type': 'application/json',
  };

export const getAllPosts = async () => {
    try {
        const { data } = await axios.get("api/posts");
        return data;
    } catch (error) {
      if(error.response && error.response.data.message)
        throw new Error(error.response.data.message)
      throw new Error(error.message);
    }
};

