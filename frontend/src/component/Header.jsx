import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios_instance from "../api/axiosInstance";
import { toast } from "react-toastify";

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios_instance.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className="
      border-b border-gray-200
      px-4 py-3 sm:px-6 lg:px-8
      bg-blue-200
      sticky top-0 z-30
    "
    >
      <div
        className="
        flex items-center justify-between
        max-w-7xl mx-auto
      "
      >
        <div>
          <Link
            to="/"
            className="
              text-lg font-bold
              text-gray-900 hover:text-indigo-600
              transition-colors
            "
          >
            Home
          </Link>
        </div>

        <div
          className="
          flex items-center gap-4 sm:gap-6
        "
        >
          {user ? (
            <>
              <Link
                to={`/${user.role}`}
                className="
                  text-sm sm:text-base
                  font-medium text-gray-700
                  hover:text-indigo-600
                  transition-colors
                "
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="
                  px-3 py-1.5 sm:px-4 sm:py-2
                  text-sm sm:text-base
                  font-medium
                  text-white bg-red-600
                  hover:bg-red-700
                  rounded-md
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
                px-4 py-2
                text-sm sm:text-base
                font-medium
                text-white bg-indigo-600
                hover:bg-indigo-700
                rounded-md
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              "
              >
                Login
              </Link>
              <Link
                to="/register"
                className="
                px-4 py-2
                text-sm sm:text-base
                font-medium
                text-white bg-indigo-600
                hover:bg-indigo-700
                rounded-md
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              "
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
