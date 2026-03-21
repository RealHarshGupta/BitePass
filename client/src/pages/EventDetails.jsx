// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // export default function EventDetails() {
// //   const { id } = useParams();

// //   const [event, setEvent] = useState(null);
// //   const [mealDays, setMealDays] = useState([]);
// //   const [selectedDate, setSelectedDate] = useState("");

// //   const [loading, setLoading] = useState(true);
// //   const [status, setStatus] = useState(1);

// //   // Fetch event + meals on page load
// //   useEffect(() => {
// //     fetch(`http://localhost:8000/events/${id}`)
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setEvent(data.event);
// //         setMealDays(data.meals);
// //         setStatus(data.event.enabled);
// //         setLoading(false);
// //       })
// //       .catch((err) => console.error("Error:", err));
// //   }, [id]);

// //   // 🟢 Fetch meals again when selectedDate changes
// //   useEffect(() => {
// //     if (selectedDate) {
// //       fetch(`http://localhost:8000/events/${id}`)
// //         .then((res) => res.json())
// //         .then((data) => {
// //           setMealDays(data.meals);
// //         })
// //         .catch((err) => console.error("Error fetching meals:", err));
// //     }
// //   }, [selectedDate, id]);

// //   // Toggle event enabled/disabled
// //   const toggleEvent = () => {
// //     fetch(`http://localhost:8000/events/${id}/toggle`, { method: "PUT" })
// //       .then((res) => res.json())
// //       .then(() => {
// //         setStatus(status === 1 ? 0 : 1);
// //       })
// //       .catch((err) => console.error("Toggle Error:", err));
// //   };

// //   // Generate dates between start and end
// //   const getDateRange = (start, end) => {
// //     const dates = [];
// //     let current = new Date(start);
// //     const last = new Date(end);

// //     while (current <= last) {
// //       dates.push(current.toISOString().split("T")[0]);
// //       current.setDate(current.getDate() + 1);
// //     }
// //     return dates;
// //   };

// //   if (loading) return <p className="text-gray-400 p-8">Loading...</p>;
// //   if (!event) return <p className="text-gray-400 p-8">Event not found</p>;

// //   const allDates = getDateRange(event.start_date, event.end_date);

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white p-8">
      
// //       {/* Header Section */}
// //       <div className="flex justify-between items-center mb-4">
// //         <h1 className="text-3xl font-bold">{event.event_name}</h1>

// //         <button
// //           onClick={toggleEvent}
// //           className={`px-4 py-2 rounded-lg font-semibold transition 
// //             ${status === 1 ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
// //         >
// //           {status === 1 ? "Disable Event" : "Enable Event"}
// //         </button>
// //       </div>

// //       {/* Event Status Badge */}
// //       <div className="mb-6">
// //         <span
// //           className={`px-3 py-1 text-sm rounded-lg 
// //             ${status === 1 ? "bg-green-600" : "bg-red-600"}`}
// //         >
// //           {status === 1 ? "Event Active — QR Allowed" : "Event Disabled — QR Blocked"}
// //         </span>
// //       </div>

// //       {/* Event Dates */}
// //       <p className="text-gray-300 mb-6">
// //         <b>Start:</b> {event.start_date} &nbsp; | &nbsp;
// //         <b>End:</b> {event.end_date}
// //       </p>

// //       {/* Date Dropdown */}
// //       <div className="mb-6">
// //         <label className="font-semibold">Select Date:</label>
// //         <select
// //           className="ml-3 p-2 bg-gray-800 rounded border border-gray-700"
// //           value={selectedDate}
// //           onChange={(e) => setSelectedDate(e.target.value)}
// //         >
// //           <option value="">Select a date</option>
// //           {allDates.map((date) => (
// //             <option key={date} value={date}>
// //               {date}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Meal Display */}
// //       {selectedDate && (
// //         <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 w-full md:w-2/3">
// //           <h2 className="text-xl font-semibold mb-4 text-purple-400">
// //             Meal Schedule for {selectedDate}
// //           </h2>

// //           {mealDays.some((d) => d.date.slice(0, 10) === selectedDate) ? (
// //             mealDays
// //               .filter((d) => d.date.slice(0, 10) === selectedDate)
// //               .map((day) => (
// //                 <div key={day.date} className="space-y-3 text-gray-300">
// //                   {day.meals.map((meal, index) => (
// //                     <div
// //                       key={index}
// //                       className="flex justify-between bg-gray-700 p-3 rounded-lg border border-gray-600"
// //                     >
// //                       <span className="font-semibold">{meal.meal_name}</span>
// //                       <span>{meal.start_time?.slice(0,5)} - {meal.end_time?.slice(0,5)}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ))
// //           ) : (
// //             <p className="text-gray-400">No meals scheduled for this date.</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function EventDetails() {
//   const { id } = useParams();

//   const [event, setEvent] = useState(null);
//   const [mealDays, setMealDays] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [emailStatus, setEmailStatus] = useState(""); // ✅ NEW

//   // Fetch event + meals
//   useEffect(() => {
//     fetch(`http://localhost:8000/events/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setEvent(data.event);
//         setMealDays(data.meals);
//         setLoading(false);
//       })
//       .catch((err) => console.error("Error:", err));
//   }, [id]);

//   // Generate dates between start & end
//   const getDateRange = (start, end) => {
//     const dates = [];
//     let current = new Date(start);
//     const last = new Date(end);

//     while (current <= last) {
//       dates.push(current.toISOString().split("T")[0]);
//       current.setDate(current.getDate() + 1);
//     }
//     return dates;
//   };

//   // ✅ Send Email API
//   const sendEmail = () => {
//     setEmailStatus("sending");

//     fetch("http://localhost:8000/emails/send", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ eventId: id }),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setEmailStatus("success");
//       })
//       .catch((err) => {
//         console.error("Email Error:", err);
//         setEmailStatus("error");
//       });
//   };

//   if (loading) return <p className="text-gray-400 p-8">Loading...</p>;
//   if (!event) return <p className="text-gray-400 p-8">Event not found</p>;

//   const allDates = getDateRange(event.start_date, event.end_date);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8">

//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">{event.event_name}</h1>

//         {/* ✅ SEND EMAIL BUTTON */}
//         <button
//           onClick={sendEmail}
//           className="px-5 py-2 rounded-lg font-semibold transition bg-purple-600 hover:bg-purple-700"
//         >
//           Send Email
//         </button>
//       </div>

//       {/* ✅ Email Status */}
//       {emailStatus && (
//         <p className={`mb-4 text-sm font-medium ${
//           emailStatus === "success"
//             ? "text-green-400"
//             : emailStatus === "sending"
//             ? "text-yellow-400"
//             : "text-red-400"
//         }`}>
//           {emailStatus === "sending" && "📨 Sending emails..."}
//           {emailStatus === "success" && "✅ Emails sent successfully"}
//           {emailStatus === "error" && "❌ Failed to send emails"}
//         </p>
//       )}

//       {/* Event Dates */}
//       <p className="text-gray-300 mb-6">
//         <b>Start:</b> {event.start_date} &nbsp; | &nbsp;
//         <b>End:</b> {event.end_date}
//       </p>

//       {/* Date Dropdown */}
//       <div className="mb-6">
//         <label className="font-semibold">Select Date:</label>
//         <select
//           className="ml-3 p-2 bg-gray-800 rounded border border-gray-700"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         >
//           <option value="">Select a date</option>
//           {allDates.map((date) => (
//             <option key={date} value={date}>
//               {date}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Meal Display */}
//       {selectedDate && (
//         <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 w-full md:w-2/3">
//           <h2 className="text-xl font-semibold mb-4 text-purple-400">
//             Meal Schedule for {selectedDate}
//           </h2>

//           {mealDays.some((d) => d.date.slice(0, 10) === selectedDate) ? (
//             mealDays
//               .filter((d) => d.date.slice(0, 10) === selectedDate)
//               .map((day) => (
//                 <div key={day.date} className="space-y-3 text-gray-300">
//                   {day.meals.map((meal, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between bg-gray-700 p-3 rounded-lg border border-gray-600"
//                     >
//                       <span className="font-semibold">{meal.meal_name}</span>
//                       <span>
//                         {meal.start_time?.slice(0, 5)} - {meal.end_time?.slice(0, 5)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               ))
//           ) : (
//             <p className="text-gray-400">No meals scheduled for this date.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import Navbar from "../Components/NavBar";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import { formatDate, formatTime } from "../utils/formatters";

export default function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [mealDays, setMealDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [loading, setLoading] = useState(true);

  // ✅ Fetch event + meals
  useEffect(() => {
    api.get(`/events/${id}`)
      .then((res) => {
        setEvent(res.data.event);
        setMealDays(res.data.meals);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Generate date range
  const getDateRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
      dates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // ✅ Generate QR → Then Send Email
  const sendEmail = async () => {
    const toastId = toast.loading("Generating QR Codes & Sending Emails...");
    try {
      /* 1️⃣ Generate QR Code */
      await api.post("/generation/auto_generated_qr_code", { event_id: id });

      /* 2️⃣ Send Email */
      await api.post("/emails/send-all", { event_id: id });

      toast.success("All QR Emails sent successfully! 🚀", { id: toastId });
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(error.message || "Failed to process request", { id: toastId });
    }
  };

  // ✅ Toggle event enabled/disabled
  const [status, setStatus] = useState(1);
  useEffect(() => {
    if (event) setStatus(event.enabled);
  }, [event]);

  const toggleEvent = () => {
    api.put(`/events/${id}/toggle`)
      .then(() => {
        setStatus(status === 1 ? 0 : 1);
      })
      .catch((err) => console.error("Toggle Error:", err));
  };

  const deleteEvent = async () => {
    if (window.confirm("Are you sure you want to delete this event? This will also delete all participants and meals.")) {
      const toastId = toast.loading("Deleting event...");
      try {
        await api.delete(`/events/${id}`);
        toast.success("Event deleted successfully", { id: toastId });
        navigate("/home");
      } catch (err) {
        toast.error(err.message, { id: toastId });
      }
    }
  };

  const navigate = useNavigate();

  /* Loading & Error */
  if (loading) return <p className="text-gray-400 p-8">Loading...</p>;
  if (!event) return <p className="text-gray-400 p-8 text-center mt-20 text-2xl font-bold">Event not found ❌</p>;

  const allDates = getDateRange(event.start_date, event.end_date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E] text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{event.event_name}</h1>
            <p className="text-gray-300">
              📆 {formatDate(event.start_date)} →{" "}
              {formatDate(event.end_date)}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={toggleEvent}
              className={`px-6 py-2 rounded-xl font-bold transition shadow-lg ${
                status === 1 ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {status === 1 ? "Disable QR Scanning" : "Enable QR Scanning"}
            </button>

            <button
              onClick={sendEmail}
              className="px-6 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 transition shadow-lg"
            >
              Send QR Emails
            </button>

            <button
              onClick={deleteEvent}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-red-600/20 text-red-500 border border-white/10 transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Status Message */}
        {status === 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
             <AlertCircle size={20} />
             <span>QR Scanning is currently <b>DISABLED</b> for this event.</span>
          </div>
        )}

      {/* Event Dates */}
      <p className="text-gray-300 mb-6">
        <b>Start:</b> {formatDate(event.start_date)} &nbsp; | &nbsp;
        <b>End:</b> {formatDate(event.end_date)}
      </p>

      {/* Date Dropdown */}
      <div className="mb-6">
        <label className="font-semibold">Select Date:</label>
        <select
          className="ml-3 p-2 bg-gray-800 rounded border border-gray-700"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Select a date</option>
          {allDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Meal Schedule */}
      {selectedDate && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 w-full md:w-2/3">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">
            Meal Schedule for {selectedDate}
          </h2>

          {mealDays.some((d) => d.date.slice(0, 10) === selectedDate) ? (
            mealDays
              .filter((d) => d.date.slice(0, 10) === selectedDate)
              .map((day) => (
                <div key={day.date} className="space-y-3 text-gray-300">
                  {day.meals.map((meal, index) => (
                    <div
                      key={index}
                      className="flex justify-between bg-gray-700 p-3 rounded-lg border border-gray-600"
                    >
                      <span className="font-semibold">{meal.meal_name}</span>
                      <span>
                        {formatTime(meal.start_time)} -{" "}
                        {formatTime(meal.end_time)}
                      </span>
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <p className="text-gray-400">No meals scheduled for this date.</p>
          )}
        </div>
      )}
      </main>
    </div>
  );
}
