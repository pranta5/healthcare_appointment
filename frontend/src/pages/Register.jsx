import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegister } from "../hook/userRegister";

const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              className={`
                w-full px-4 py-2.5 
                border rounded-md 
                border-gray-300 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                outline-none transition
                ${errors.name ? "border-red-500" : ""}
              `}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

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
                border rounded-md 
                border-gray-300 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                outline-none transition
                ${errors.email ? "border-red-500" : ""}
              `}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/i,
                  message: "Please enter a valid email",
                },
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
              placeholder="******"
              className={`
                w-full px-4 py-2.5 
                border rounded-md 
                border-gray-300 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                outline-none transition
                ${errors.password ? "border-red-500" : ""}
              `}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={registerMutation.isLoading}
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
            {registerMutation.isLoading ? "Creating account..." : "Sign Up"}
          </button>

          {/* Server error */}
          {registerMutation.isError && (
            <div className="text-center text-sm text-red-600 mt-2">
              Registration failed. Please try again.
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
