import { useQuery } from "@tanstack/react-query";
import axios_instance from "../api/axiosInstance";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axios_instance.get("/doctor/all-doctor");
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <p className="text-xl font-medium text-red-600">
            Something went wrong
          </p>
          <p className="mt-2 text-gray-600">
            Failed to load doctors. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Available Doctors
        </h1>

        {data?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-lg text-gray-600">
              No doctors available right now
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((doctor) => (
              <div
                key={doctor._id}
                className="
                  bg-white rounded-lg shadow-sm 
                  border border-gray-200 
                  hover:border-indigo-300 
                  transition-colors
                "
              >
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Dr. {doctor.name}
                    {!doctor.isDoctorAvailable && (
                      <span className="text-red-600 font-medium">
                        (Not Available)
                      </span>
                    )}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">{doctor.email}</p>

                  <Link
                    to={`/doctor/${doctor._id}`}
                    className="
                      block w-full text-center
                      py-2.5 px-4
                      bg-indigo-600 hover:bg-indigo-700
                      text-white text-sm font-medium
                      rounded-md
                      transition-colors
                    "
                  >
                    View Slots
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
