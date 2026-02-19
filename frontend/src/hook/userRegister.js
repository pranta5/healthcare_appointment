import { useMutation } from "@tanstack/react-query";
import axios_instance from "../api/axiosInstance";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axios_instance.post("/auth/register", data);
      return res.data;
    },
  });
};
