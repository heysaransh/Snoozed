// src/pages/calendar.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

const dummyEntry = {
  date: '2025-05-17',
  bedTime: '23:00',
  wakeTime: '07:00',
  quality: 90,
  notes: '',
};

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date('2025-05-01'));
    const [selectedDate, setSelectedDate] = useState(format(currentMonth, 'yyyy-MM-dd'));
  const [sleepData, setSleepData] = useState({});
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    // Load from localStorage or dummy
    const stored = localStorage.getItem(selectedDate);
    setEntry(stored ? JSON.parse(stored) : dummyEntry);
  }, [selectedDate]);

  const handleDateSelect = (dateStr) => {
    setSelectedDate(dateStr);
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
        <Link href="/sleep-log" className="text-purple-300 hover:text-white cursor-pointer">Sleep Log</Link>
        <Link href="/calendar" className="text-white font-semibold cursor-pointer">Calendar</Link>
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
        <h1 className="text-4xl font-bold mb-2 hover:text-purple-200 transition-colors cursor-pointer">Sleep Calendar</h1>
        <p className="text-lg mb-5 text-purple-200">Track your sleep history and patterns</p>

        {/* Top Section: Calendar + Sleep Details */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Calendar Box */}
          <div className="text-white flex flex-col items-center justify-center text-center rounded-lg bg-purple-500/10 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg hover:scale-105 hover:shadow-xl transform cursor-pointer p-6">
          <div className="flex justify-between items-center mb-4 ">
            <button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>&lt;</button>
            <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
            <button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 text-center gap-2 text-sm text-white">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div key={d}>{d}</div>
              ))}
              {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() }, (_, i) => {
                const day = i + 1;
                const dateStr = format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day), 'yyyy-MM-dd');
                const isSelected = dateStr === selectedDate;
                const isFuture = new Date(dateStr) > new Date();

                return (
                  <div
                    key={dateStr}
                    className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition ${
                      isSelected
                        ? 'bg-purple-600 text-white'
                        : isFuture
                        ? 'text-gray-600'
                        : 'hover:bg-purple-300'
                    }`}
                    onClick={() => !isFuture && handleDateSelect(dateStr)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sleep Details */}
          <div className="w-full md:w-80 text-white flex flex-col items-center justify-center text-center rounded-lg bg-purple-500/10 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg hover:scale-105 hover:shadow-xl transform cursor-pointer p-6">
            <h2 className="text-lg font-semibold mb-2">Sleep Details</h2>
            <p className="text-sm text-gray-100 mb-1">Date</p>
            <p className="mb-2 font-medium">
              {format(parseISO(selectedDate), 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-sm text-gray-100 mb-1">Sleep Duration</p>
            <p className="text-xl font-bold text-purple-500 mb-2">
              {entry ? calculateDuration(entry.bedTime, entry.wakeTime) : '—'}
            </p>
            <p className="text-sm text-gray-100 mb-1">Sleep Quality</p>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded">
                {getQualityLabel(entry?.quality)}
              </span>
              <div className="text-purple-500">
                {'★'.repeat(Math.round((entry?.quality || 0) / 20))}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white flex flex-col items-center justify-center text-center rounded-lg bg-purple-500/10 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg  p-6">
          {[
            { label: 'Average Sleep', value: '7.5h' },
            { label: 'Best Quality', value: 'Weekends' },
            { label: 'Sleep Debt', value: '-2.5h' },
            { label: 'Consistency', value: 'Good' },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-lg p-4 text-center hover:scale-105 hover:shadow-xl transform cursor-pointer duration-300"
            >
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-xl font-semibold text-purple-600 mt-1">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Helpers
function calculateDuration(bedTime, wakeTime) {
  if (!bedTime || !wakeTime) return '—';
  const [bedH, bedM] = bedTime.split(':').map(Number);
  const [wakeH, wakeM] = wakeTime.split(':').map(Number);
  let total = (wakeH * 60 + wakeM) - (bedH * 60 + bedM);
  if (total < 0) total += 1440;
  const hours = (total / 60).toFixed(1);
  return `${hours} hours`;
}

function getQualityLabel(score) {
  if (score >= 80) return 'Very Good';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
}
