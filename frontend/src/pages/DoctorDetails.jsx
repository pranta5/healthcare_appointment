import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios_instance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const DoctorDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [date, setDate] = useState("");

  // Doctor info
  const { data: doctor, isLoading: doctorLoading } = useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const res = await axios_instance.get(`/user/single-user/${id}`);
      return res.data.data;
    },
  });

  // Available slots
  const {
    data: slots,
    isLoading: slotsLoading,
    refetch,
  } = useQuery({
    queryKey: ["slots", id, date],
    queryFn: async () => {
      const res = await axios_instance.get(
        `/doctor/slot-available?doctor=${id}&date=${date}`,
      );
      return res.data.slots || [];
    },
    enabled: false,
  });

  const bookingMutation = useMutation({
    mutationFn: async (time) => {
      return axios_instance.post("/appointment/create", {
        doctor: id,
        date,
        time,
      });
    },
    onSuccess: () => {
      toast.success("Appointment booked successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to book appointment");
    },
  });

  const handleCheckSlots = () => {
    if (!date) {
      toast.info("Please select a date");
      return;
    }

    const selectedDate = new Date(date);
    const day = selectedDate.getDay();

    if (day === 0 || day === 6) {
      toast.error("Appointments are only available Monday to Friday");
      return;
    }

    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Doctor Info */}
        {doctorLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : doctor ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Dr. {doctor.name}
            </h1>
            <p className="mt-2 text-gray-600">{doctor.email}</p>
            {doctor.specialization && (
              <p className="mt-1 text-sm text-indigo-600">
                {doctor.specialization}
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Doctor not found</p>
        )}

        {/* Date Picker + Check Button */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Select Appointment Date
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="
                  w-full px-4 py-2 
                  border border-gray-300 rounded-md 
                  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                "
              />
            </div>

            <button
              onClick={handleCheckSlots}
              disabled={slotsLoading || bookingMutation.isPending}
              className="
                px-6 py-2 
                bg-indigo-600 hover:bg-indigo-700 
                text-white font-medium 
                rounded-md 
                transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                sm:self-end
              "
            >
              {slotsLoading ? "Checking..." : "Check Slots"}
            </button>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Note: Available Monday - Friday only
          </p>
        </div>

        {/* Slots */}
        {slots !== undefined && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Available Slots
            </h3>

            {slotsLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading available times...
              </div>
            ) : slots.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No slots available for this date
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => bookingMutation.mutate(slot)}
                    disabled={bookingMutation.isPending || !user}
                    className={`
                      py-3 px-4 
                      text-sm font-medium 
                      rounded-md border 
                      transition-colors
                      ${
                        user
                          ? "border-indigo-200 hover:bg-indigo-50 text-indigo-700 hover:text-indigo-800"
                          : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                      }
                      disabled:opacity-60
                    `}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}

            {!user && slots?.length > 0 && (
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="
                    inline-block px-6 py-3 
                    bg-indigo-600 hover:bg-indigo-700 
                    text-white font-medium 
                    rounded-md 
                    transition-colors
                  "
                >
                  Login to book an appointment
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;
