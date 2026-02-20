import { useAuth } from "../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios_instance from "../api/axiosInstance";
import { toast } from "react-toastify";

const DoctorDashboard = () => {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();
  //all appointment
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["doctorAppointments"],
    queryFn: async () => {
      const res = await axios_instance.get("/appointment/my-appointment");
      return res.data.data || [];
    },
  });
  //update status
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return axios_instance.patch(`/appointment/${id}/status`, { status });
    },
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["doctorAppointments"] });
    },
    onError: () => toast.error("Failed to update status"),
  });
  //set available
  const availabilityMutation = useMutation({
    mutationFn: async (isDoctorAvailable) => {
      return axios_instance.patch("/doctor/isavailable", { isDoctorAvailable });
    },
    onSuccess: (res) => {
      setUser((prev) => ({
        ...prev,
        isDoctorAvailable: res.data.isDoctorAvailable,
      }));
      toast.success("Availability updated");
    },
    onError: () => toast.error("Failed to update availability"),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Doctor Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Welcome,{" "}
            <span className="font-medium">{user?.name || "Doctor"}</span>
          </p>
        </div>

        {/* Availability */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Your Availability
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              Currently:
              <span
                className={
                  user?.isDoctorAvailable
                    ? "text-green-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {user?.isDoctorAvailable ? "Available" : "Not Available"}
              </span>
            </span>

            <button
              onClick={() =>
                availabilityMutation.mutate(!user?.isDoctorAvailable)
              }
              disabled={availabilityMutation.isPending}
              className={`
                px-4 py-2 text-sm font-medium rounded-md
                ${
                  user?.isDoctorAvailable
                    ? "bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
                    : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
                }
                transition-colors disabled:opacity-50
              `}
            >
              {availabilityMutation.isPending
                ? "Updating..."
                : user?.isDoctorAvailable
                  ? "Set Not Available"
                  : "Set Available"}
            </button>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            My Appointments
          </h2>

          {isLoading ? (
            <div className="text-center py-10 text-gray-500">
              Loading appointments...
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-10 text-gray-600">
              No appointments scheduled yet.
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div
                  key={appt._id}
                  className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid gap-2 sm:grid-cols-2 text-sm">
                    <div>
                      <span className="text-gray-500">Patient:</span>
                      <p className="font-medium text-gray-900">
                        {appt.patient_name || "—"}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500">Date & Time:</span>
                      <p className="font-medium text-gray-900">
                        {new Date(appt.date).toLocaleDateString()} • {appt.time}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500">Status:</span>
                      <p>
                        <span
                          className={`
                            inline-block px-2.5 py-0.5 text-xs font-medium rounded-full mt-1
                            ${
                              appt.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : appt.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : appt.status === "Rejected"
                                    ? "bg-red-100 text-red-800"
                                    : appt.status === "Completed"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-700"
                            }
                          `}
                        >
                          {appt.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/*  buttons */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {appt.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            statusMutation.mutate({
                              id: appt._id,
                              status: "Approved",
                            })
                          }
                          disabled={statusMutation.isPending}
                          className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            statusMutation.mutate({
                              id: appt._id,
                              status: "Rejected",
                            })
                          }
                          disabled={statusMutation.isPending}
                          className="px-4 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {appt.status === "Approved" && (
                      <button
                        onClick={() =>
                          statusMutation.mutate({
                            id: appt._id,
                            status: "Completed",
                          })
                        }
                        disabled={statusMutation.isPending}
                        className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
