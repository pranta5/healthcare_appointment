import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios_instance from "../api/axiosInstance";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const queryClient = useQueryClient();

  // All Users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axios_instance.get("/user/all-users");
      return res.data.data;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to load users");
    },
  });

  // All Appointments
  const { data: appointments, isLoading: apptLoading } = useQuery({
    queryKey: ["allAppointments"],
    queryFn: async () => {
      const res = await axios_instance.get("/appointment/all-appointment");
      return res.data.data;
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to load appointments",
      );
    },
  });

  //setDoctor
  const setRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return axios_instance.patch(`/doctor/role/${id}`, { role });
    },
    onSuccess: () => {
      toast.success("Role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update Role");
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Dashboard Overview
        </h2>

        {/* Users Section */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            All Users
          </h3>

          {usersLoading ? (
            <div className="text-gray-500">Loading users...</div>
          ) : !users || users.length === 0 ? (
            <div className="text-gray-500">No users found.</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
                >
                  <p className="font-medium text-gray-900">{u.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{u.email}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Role:</span>{" "}
                    <span
                      className={`
                        inline-block px-2 py-0.5 text-xs rounded-full
                        ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : u.role === "doctor"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }
                      `}
                    >
                      {u.role}
                    </span>
                    <span>
                      {u.role === "admin" ? null : u.role === "patient" ? (
                        <button
                          className="text-xs text-slate-950 hover:bg-red-400 bg-red-200 flex items-center gap-1 mt-2 border rounded px-4 py-1"
                          onClick={() =>
                            setRoleMutation.mutate({
                              id: u._id,
                              role: "doctor",
                            })
                          }
                        >
                          set to Doctor
                        </button>
                      ) : (
                        <button
                          className="text-xs text-indigo-600 hover:bg-indigo-200 flex items-center gap-1 mt-2 border rounded px-4 py-1 bg-indigo-100"
                          onClick={() =>
                            setRoleMutation.mutate({
                              id: u._id,
                              role: "patient",
                            })
                          }
                        >
                          set to Patient
                        </button>
                      )}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Appointments Section */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            All Appointments
          </h3>

          {apptLoading ? (
            <div className="text-gray-500">Loading appointments...</div>
          ) : !appointments || appointments.length === 0 ? (
            <div className="text-gray-500">No appointments found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {appt.patient_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {appt.doctor_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(appt.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {appt.time}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`
                              inline-block px-2.5 py-1 text-xs font-medium rounded-full
                              ${
                                appt.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : appt.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : appt.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                              }
                            `}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
