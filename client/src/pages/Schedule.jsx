import React, { useEffect, useState } from "react";
import { Calendar, Clock, Pencil, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import QRScannerModal from "../Components/QRScannerModal";
import api from "../utils/api";
import { formatDate, formatTime } from "../utils/formatters";

export default function Schedule() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [activeMeal, setActiveMeal] = useState(null);
  const [showMealPicker, setShowMealPicker] = useState(false);

  useEffect(() => {
    api.get("/events")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleScanClick = async (event) => {
    setSelectedEvent(event);
    
    // Store all event meals to show in picker if needed
    try {
      const res = await api.get(`/events/${event.event_id}`);
      const data = res.data;
      
      // Save all meals for the picker
      const allMeals = [];
      if (data.meals) {
        data.meals.forEach(day => {
          day.meals.forEach(meal => {
            allMeals.push({
              ...meal,
              date: day.date
            });
          });
        });
      }
      setSelectedEvent(prev => ({ ...prev, allMeals }));

      // If we already have a persistent active meal for THIS event, use it
      if (activeMeal && activeMeal.event_id === event.event_id) {
        setShowScanner(true);
        return;
      }

      // Otherwise try auto-detection
      const now = new Date();
      const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const today = now.toISOString().split("T")[0];

      let currentMeal = null;
      allMeals.forEach(meal => {
        if (meal.date === today) {
          const [h1, m1, s1] = meal.start_time.split(":").map(Number);
          const [h2, m2, s2] = meal.end_time.split(":").map(Number);
          const start = h1 * 3600 + m1 * 60 + s1;
          const end = h2 * 3600 + m2 * 60 + s2;
          
          if (currentTime >= start && currentTime <= end) {
            currentMeal = meal;
          }
        }
      });

      if (currentMeal) {
        setActiveMeal({ ...currentMeal, event_id: event.event_id });
        setShowScanner(true);
      } else {
        setShowMealPicker(true);
      }
    } catch (err) {
      console.error("Error fetching event meals:", err);
      setShowMealPicker(true);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E] text-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="flex-1 px-6 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <h1 className="text-4xl font-bold">📅 Event Schedule</h1>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-lg">
            <p className="text-gray-300 text-sm">Total Events</p>
            <p className="text-3xl font-bold text-[#C77DFF]">
              {events.length}
            </p>
          </div>
        </div>

        {/* Events */}
        {loading ? (
          <p className="text-gray-300">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-300">No events available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.event_id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition"
              >
                {/* Title */}
                <Link to={`/schedule/${event.event_id}`}>
                  <h2 className="text-2xl font-semibold text-[#C77DFF] flex items-center gap-2 mb-4">
                    <Calendar size={22} />
                    {event.event_name}
                  </h2>
                </Link>

                {/* Dates */}
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-green-400" />
                    Start: {formatDate(event.start_date)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-red-400" />
                    End: {formatDate(event.end_date)}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                  <Link
                    to={`/schedule/edit/${event.event_id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7F5AF0] to-[#C77DFF] hover:scale-105 transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleScanClick(event)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 transition"
                  >
                    <QrCode size={16} />
                    Scan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Meal Selection Modal */}
      {showMealPicker && selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMealPicker(false)}></div>
          <div className="relative bg-[#1a1a2e] border border-white/20 rounded-3xl p-8 shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Select Scan Session</h2>
            <div className="space-y-3">

              {selectedEvent.allMeals && selectedEvent.allMeals.length > 0 ? (
                selectedEvent.allMeals.map((meal) => (
                  <button
                    key={meal.meal_id}
                    onClick={() => {
                      setActiveMeal({ ...meal, event_id: selectedEvent.event_id });
                      setShowMealPicker(false);
                      setShowScanner(true);
                    }}
                    className={`w-full p-4 rounded-2xl transition text-left flex flex-col ${
                      activeMeal?.meal_id === meal.meal_id ? "bg-[#7F5AF0] ring-2 ring-white text-white" : "bg-white/5 hover:bg-white/10 text-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold">{meal.meal_name}</span>
                      {activeMeal?.meal_id === meal.meal_id && <span className="text-[10px] bg-white text-[#7F5AF0] px-2 py-1 rounded-full font-bold">Active</span>}
                    </div>
                    <span className="text-xs opacity-60 mt-1">
                      {formatDate(meal.date)} | {formatTime(meal.start_time)} - {formatTime(meal.end_time)}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4 text-sm border border-dashed border-white/10 rounded-xl">No specific meals found</p>
              )}
              
              <button
                onClick={() => setShowMealPicker(false)}
                className="mt-4 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-sm transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* QR Scanner */}
      {showScanner && (
        <QRScannerModal
          onClose={() => setShowScanner(false)}
          eventId={selectedEvent.event_id}
          activeMeal={activeMeal}
          onChangeMeal={() => {
            setShowScanner(false);
            setShowMealPicker(true);
          }}
        />
      )}

    </div>
  );
}
