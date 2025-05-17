import { useEffect, useState } from 'react';

export default function SleepReminder() {
  const [reminderTime, setReminderTime] = useState('22:00'); // default
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    // Load from localStorage after component mounts
    if (typeof window !== 'undefined') {
      const storedTime = localStorage.getItem('reminderTime');
      if (storedTime) {
        setReminderTime(storedTime);
      }

      // Notification permission
      setPermission(Notification.permission);
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(setPermission);
      }
    }
  }, []);

  useEffect(() => {
    // Store updated reminder time
    if (typeof window !== 'undefined') {
      localStorage.setItem('reminderTime', reminderTime);

      const interval = setInterval(() => {
        const now = new Date();
        const [h, m] = reminderTime.split(':').map(Number);
        const isNow = now.getHours() === h && now.getMinutes() === m;

        if (isNow && Notification.permission === 'granted') {
          new Notification('🌙 Time to start winding down for bed!');
        }

        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const yStr = yesterday.toISOString().split('T')[0];

        if (!localStorage.getItem(yStr) && Notification.permission === 'granted') {
          new Notification('📋 You forgot to log your sleep yesterday!');
        }
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [reminderTime]);

  return (
    <div className="p-4 bg-purple-50 border border-purple-300 rounded-lg shadow mt-4 max-w-md">
      <h2 className="text-lg font-semibold text-purple-900 mb-2">🕰️ Sleep Reminder</h2>
      <label className="block mb-2 text-sm text-gray-700">
        Choose your daily reminder time:
      </label>
      <input
        type="time"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        className="border border-purple-300 rounded px-3 py-2 text-purple-800"
      />
      <p className="mt-2 text-sm text-gray-600">
        You’ll be reminded daily at {reminderTime}.
      </p>
      {permission !== 'granted' && (
        <p className="text-red-500 mt-2 text-sm">
          Notifications are disabled. Please allow them in your browser settings.
        </p>
      )}
    </div>
  );
}
