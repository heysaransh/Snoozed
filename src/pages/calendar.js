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
            <div className="text-purple-300 hover:text-white cursor-pointer">Sleep Log</div>
          </Link>
          <Link href="/insights">
            <div className="text-purple-300 hover:text-white cursor-pointer">Insights</div>
          </Link>
          <Link href="/calendar">
            <div className="text-white font-semibold cursor-pointer">Calendar</div>
          </Link>
          <Link href="/tips">
            <div className="text-purple-300 hover:text-white cursor-pointer">Tips</div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        <h1 className="text-3xl text-black font-bold mb-2 hover:text-purple-800 transition-colors duration-200 cursor-pointer">Sleep Calendar</h1>
        <p className="text-gray-800 mb-8 hover:text-purple-800 transition-colors duration-200 cursor-pointer">Track your sleep history and patterns</p>

        {/* Top Section: Calendar + Sleep Details */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Calendar Box */}
          <div className=" border border-purple-700 p-6 rounded-lg hover:shadow-lg hover:bg-purple-50 transition duration-300">
          <div className="flex justify-between items-center mb-4 ">
            <button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>&lt;</button>
            <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
            <button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 text-center gap-2 text-sm text-gray-600">
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
                        ? 'text-gray-400'
                        : 'hover:bg-purple-100'
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
          <div className="w-full md:w-80 bg-white p-6 shadow border border-purple-700 p-6 rounded-lg hover:shadow-lg hover:bg-purple-50 transition duration-300">
            <h2 className="text-lg font-semibold mb-2">Sleep Details</h2>
            <p className="text-sm text-gray-500 mb-1">Date</p>
            <p className="mb-2 font-medium">
              {format(parseISO(selectedDate), 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-sm text-gray-500 mb-1">Sleep Duration</p>
            <p className="text-xl font-bold text-purple-600 mb-2">
              {entry ? calculateDuration(entry.bedTime, entry.wakeTime) : '—'}
            </p>
            <p className="text-sm text-gray-500 mb-1">Sleep Quality</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border rounded-xl p-6 shadow border border-purple-700 p-6 rounded-lg hover:shadow-lg hover:bg-purple-50 transition duration-300">
          {[
            { label: 'Average Sleep', value: '7.5h' },
            { label: 'Best Quality', value: 'Weekends' },
            { label: 'Sleep Debt', value: '-2.5h' },
            { label: 'Consistency', value: 'Good' },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-purple-50 hover:bg-white rounded-lg p-4 text-center"
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
