import React, { useEffect, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import api from "../utils/api";

export default function Logs() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [groupedTeams, setGroupedTeams] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(id || "");
  const [eventName, setEventName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (id) {
      fetchEventDetails();
    } else {
      fetchEvents();
    }
  }, [id]);

  useEffect(() => {
    if (selectedEvent) fetchLogs();
  }, [selectedEvent]);

  const fetchEventDetails = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEventName(res.data.event.event_name);
      setSelectedEvent(id);
    } catch (err) {
      console.error("Failed to fetch event details:", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data || []);
      if (res.data?.length && !selectedEvent) setSelectedEvent(res.data[0].event_id);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await api.get(`/participants/logs?event_id=${selectedEvent}`);
      setParticipants(res.data);
      groupByTeam(res.data);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  };

  const groupByTeam = (data) => {
    const grouped = {};
    data.forEach((p) => {
      if (
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.team_name.toLowerCase().includes(search.toLowerCase())
      ) {
        if (!grouped[p.team_name]) grouped[p.team_name] = [];
        grouped[p.team_name].push(p);
      }
    });
    setGroupedTeams(grouped);
  };

  useEffect(() => {
    groupByTeam(participants);
  }, [search]);

  const getBoxColor = (check_in, meals_eaten) => {
    if (check_in === "No" || check_in === 0) return "bg-black";
    if (meals_eaten > 0) return "bg-green-500";
    return "bg-red-500";
  };

  const totalEaten = participants.filter((p) => p.meals_eaten > 0).length;
  const totalNotEaten = participants.filter((p) => p.meals_eaten === 0).length;
  const checkedIn = participants.filter((p) => p.check_in === "Yes" || p.check_in === 1).length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E] text-white">
      
      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Dashboard Content */}
      <main className="flex-1 px-6 py-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
          <h1 className="text-4xl font-bold">📊 Logs Dashboard</h1>

          <div className="flex gap-4 flex-wrap">
            {/* Event Selector / Info */}
            {id ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-gray-400 hover:text-white"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="bg-white/10 border border-[#C77DFF]/30 px-4 py-2 rounded-xl text-[#C77DFF] font-bold">
                  {eventName || "Loading..."}
                </div>
              </div>
            ) : (
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 outline-none"
              >
                {events.map((e) => (
                  <option
                    key={e.event_id}
                    value={e.event_id}
                    className="text-black"
                  >
                    {e.event_name}
                  </option>
                ))}
              </select>
            )}

            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-gray-300"
                size={18}
              />
              <input
                type="text"
                placeholder="Search name or team"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 outline-none placeholder-gray-300"
              />
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          <Kpi title="Total Participants" value={participants.length} />
          <Kpi title="Eaten" value={totalEaten} color="text-green-400" />
          <Kpi title="Not Eaten" value={totalNotEaten} color="text-red-400" />
          <Kpi title="Checked In" value={checkedIn} color="text-blue-400" />
        </div>

        {/* TEAM LOGS */}
        {Object.keys(groupedTeams).length === 0 ? (
          <p className="text-gray-300">No data found</p>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedTeams).map(([team, members]) => (
              <div
                key={team}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-semibold mb-4">{team}</h2>

                <div className="flex flex-wrap gap-3">
                  {members.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => navigate(`/participant/${m.id}`)}
                      className={`w-11 h-11 rounded-lg ${getBoxColor(
                        m.check_in,
                        m.meals_eaten
                      )} relative group hover:scale-110 transition cursor-pointer`}
                    >
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                        {m.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 🔹 Footer */}
      <Footer />
    </div>
  );
}

/* 🔹 KPI Card */
function Kpi({ title, value, color = "text-white" }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
      <p className="text-gray-300 text-sm">{title}</p>
      <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}
