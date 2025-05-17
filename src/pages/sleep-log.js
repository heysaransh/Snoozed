// src/pages/sleep-log.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SleepLog() {
  const router = useRouter();
  const [sleepEntry, setSleepEntry] = useState({
    date: '2025-05-16',
    bedTime: '22:00',
    wakeTime: '07:00',
    quality: 100,
    notes: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSleepEntry({ ...sleepEntry, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(sleepEntry.date, JSON.stringify(sleepEntry));
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-900 p-6 border-r border-purple-800 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-100 mb-10 hover:text-purple-300 transition-colors duration-200 cursor-pointer">
          Snooze
        </h1>
        <nav className="space-y-4">
          <Link href="/dashboard">
            <div className="text-purple-300 hover:text-white cursor-pointer">Dashboard</div>
          </Link>
          <Link href="/sleep-log">
            <div className="text-white font-semibold cursor-pointer">Sleep Log</div>
          </Link>
          <Link href="/calendar">
            <div className="text-purple-300 hover:text-white cursor-pointer">Calendar</div>
          </Link>
          <Link href="/tips">
            <div className="text-purple-300 hover:text-white cursor-pointer">Tips</div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        <h1 className="text-3xl text-black font-bold mb-2 hover:text-purple-800 transition-colors duration-200 cursor-pointer">Sleep Log</h1>
        <p className="text-gray-800 mb-8 hover:text-purple-800 transition-colors duration-200 cursor-pointer">Track and record your sleep data</p>

        <form onSubmit={handleSubmit} className="border border-purple-700 p-6 rounded-lg hover:shadow-lg hover:bg-purple-50 transition duration-300 text-black p-8 shadow space-y-8 max-w-4xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={sleepEntry.date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 font-semibold">Sleep Duration</label>
              <input
                type="text"
                value={calculateDuration(sleepEntry.bedTime, sleepEntry.wakeTime)}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 font-semibold">Bed Time</label>
              <input
                type="time"
                name="bedTime"
                value={sleepEntry.bedTime}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 font-semibold">Wake Time</label>
              <input
                type="time"
                name="wakeTime"
                value={sleepEntry.wakeTime}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 font-semibold">
              Sleep Quality:
            </label>
            <input
              type="range"
              name="quality"
              value={sleepEntry.quality}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-sm text-gray-800">
              <span>Very Poor</span>
              <span>Very Good</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 font-semibold">Extra Note</label>
            <textarea
              name="notes"
              value={sleepEntry.notes}
              onChange={handleChange}
              placeholder="Any factors that affected your sleep? (optional)"
              className="w-full h-24 border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-medium transition duration-150"
          >
            Save Sleep Entry
          </button>
        </form>

        {showPopup && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-900 font-semibold rounded">
            Sleep entry saved successfully!
          </div>
        )}
      </main>
    </div>
  );
}

// Helper function
function calculateDuration(bedTime, wakeTime) {
  const [bedHour, bedMin] = bedTime.split(':').map(Number);
  const [wakeHour, wakeMin] = wakeTime.split(':').map(Number);
  let diff = (wakeHour * 60 + wakeMin) - (bedHour * 60 + bedMin);
  if (diff < 0) diff += 1440;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `${h}h ${m}m`;
}
