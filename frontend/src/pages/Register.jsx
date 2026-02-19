import { useNavigate } from "react-router";
import { useRegister } from "../hook/userRegister";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onsubmit)}>
        {/* Name */}
        <input
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        {/* Email */}
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button disabled={registerMutation.isLoading}>
          {registerMutation.isLoading ? "Creating..." : "Register"}
        </button>

        {registerMutation.isError && <p>Registration failed</p>}
      </form>
    </div>
  );
};

export default Register;
