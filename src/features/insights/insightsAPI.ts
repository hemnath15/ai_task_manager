import axios from "axios";

export const fetchInsightsAPI = async () => {
  const res = await axios.get("/insights");
  return res.data;
};
