import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import axios_instance from "../api/axiosInstance";
import { toast } from "react-toastify";

const PatientDashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  // fetch my appointment
  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myAppointments"],
    queryFn: async () => {
      const res = await axios_instance.get("/appointment/my-appointment");
      return res.data.data || [];
    },
  });
  // cancel appointment
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      return axios_instance.patch(`/appointment/${id}/status`, {
        status: "Cancelled",
      });
    },
    onSuccess: () => {
      toast.success("Appointment cancelled");
      queryClient.invalidateQueries({ queryKey: ["myAppointments"] });
    },
    onError: () => {
      toast.error("Failed to cancel appointment");
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Appointments
          </h1>
          <p className="mt-2 text-gray-600">
            Welcome back,{" "}
            <span className="font-medium">{user?.name || "Patient"}</span>
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-12 text-gray-500">
            Loading your appointments...
          </div>
        )}

        {isError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r">
            <p className="text-red-700">
              {error?.response?.data?.message || "Could not load appointments"}
            </p>
          </div>
        )}

        {!isLoading && !isError && appointments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 text-lg">
              You don't have any appointments yet.
            </p>
            <p className="mt-2 text-gray-500">
              Book one with your doctor to get started.
            </p>
          </div>
        )}

        {/* Appointments List */}
        {!isLoading && !isError && appointments.length > 0 && (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="
                  bg-white border border-gray-200 rounded-lg 
                  p-5 sm:p-6 shadow-sm
                "
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <h3 className="font-medium text-gray-900 text-lg">
                      Dr. {appt.doctor_name}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <br />
                        {new Date(appt.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="text-gray-500">Time:</span>
                        <br />
                        {appt.time}
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <br />
                        <span
                          className={`
                            inline-block px-2.5 py-0.5 text-xs font-medium rounded-full mt-1
                            ${
                              appt.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : appt.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : appt.status === "Cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-700"
                            }
                          `}
                        >
                          {appt.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cancel button */}
                  {appt.status === "Pending" && (
                    <button
                      onClick={() => cancelMutation.mutate(appt._id)}
                      disabled={cancelMutation.isPending}
                      className={`
                        px-5 py-2 text-sm font-medium rounded-md
                        border border-red-200 text-red-700
                        hover:bg-red-50 hover:border-red-300
                        focus:outline-none focus:ring-2 focus:ring-red-300
                        transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed
                        self-start sm:self-center
                      `}
                    >
                      {cancelMutation.isPending ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
