import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useLogin } from "../hook/useLogin";
const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const loginMutation = useLogin(setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email required",
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password required",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? "Logging in..." : "Login"}
        </button>

        {loginMutation.isError && <p>Invalid credentials</p>}
      </form>
    </div>
  );
};
export default Login;
