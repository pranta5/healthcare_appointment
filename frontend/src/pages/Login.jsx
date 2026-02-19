import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={`
                w-full px-4 py-2.5 
                border border-gray-300 rounded-md 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                outline-none transition
                ${errors.email ? "border-red-500" : ""}
              `}
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="*******"
              autoComplete="current-password"
              className={`
                w-full px-4 py-2.5 
                border border-gray-300 rounded-md 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                outline-none transition
                ${errors.password ? "border-red-500" : ""}
              `}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loginMutation.isLoading}
            className={`
              w-full py-2.5 px-4 
              font-medium text-white 
              bg-indigo-600 hover:bg-indigo-700 
              rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              transition-colors
              disabled:opacity-60 disabled:cursor-not-allowed
            `}
          >
            {loginMutation.isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Server error */}
          {loginMutation.isError && (
            <div className="text-center text-sm text-red-600 mt-2">
              Invalid email or password. Please try again.
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
