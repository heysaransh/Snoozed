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
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/snooze_bg6.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col sm:flex-row items-center justify-between px-8 py-2 backdrop-blur-sm">

        <Link href="/dashboard" className="flex items-center space-x-8">
          <h1
            className="text-6xl font-bold px-8 text-purple-300"
            style={{ fontFamily: '"Just Another Hand", cursive' }}
          >
            Snooze
          </h1>
        </Link>
        <div className="flex space-x-4 px-9 text-xl">
          <Link href="/dashboard" className="text-purple-300 hover:text-white cursor-pointer">Dashboard</Link>
          <Link href="/sleep-log" className="text-white font-semibold cursor-pointer">Sleep Log</Link>
          <Link href="/calendar" className="text-purple-300 hover:text-white cursor-pointer">Calendar</Link>
          <Link href="/tips" className="text-purple-300 hover:text-white cursor-pointer">Tips</Link>
          <Link href="/login" passHref>
            <button className="bg-purple-700 hover:bg-purple-900 text-white px-3 rounded-md transition duration-200">
              Sign In
            </button>
          </Link>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="relative z-20 p-8 mt-1 py-20">
        <h2 className="text-4xl font-bold mb-2 hover:text-purple-200 transition-colors cursor-pointer">Sleep Log</h2>
        <p className="text-lg mb-5 text-purple-200">Track and record your sleep data</p>
        <div className='flex justify-center items-center'>
        <form onSubmit={handleSubmit} className="w-full max-w-3xl text-white p-10 rounded-lg bg-purple-500/10 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg hover:scale-105 hover:shadow-xl transform cursor-pointer space-y-18">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-md font-medium mb-1 font-bold">Date</label>
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
              <label className="block text-md font-medium mb-1 font-bold">Sleep Duration</label>
              <input
                type="text"
                value={calculateDuration(sleepEntry.bedTime, sleepEntry.wakeTime)}
                readOnly
                className="w-full border rounded px-3 py-2 bg-purple-300/10 text-white"
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
            <div className="flex justify-between text-sm text-white">
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
        </div>

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
