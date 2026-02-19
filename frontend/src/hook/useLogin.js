import axios_instance from "../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useLogin = (setUser) => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axios_instance.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};
