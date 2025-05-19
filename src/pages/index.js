import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';

const mockData = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 6 },
  { day: 'Wed', hours: 8 },
  { day: 'Thu', hours: 6.5 },
  { day: 'Fri', hours: 7 },
  { day: 'Sat', hours: 8.5 },
  { day: 'Sun', hours: 7.2 },
];

export default function Dashboard() {
  const totalSleep = mockData.reduce((acc, curr) => acc + curr.hours, 0);
  const avgSleep = (totalSleep / mockData.length).toFixed(2);

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
          <Link href="/dashboard" className="text-white font-semibold cursor-pointer">Dashboard</Link>
          <Link href="/sleep-log" className="text-purple-300 hover:text-white cursor-pointer">Sleep Log</Link>
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
        <h2 className="text-4xl font-bold mb-2 hover:text-purple-200 transition-colors cursor-pointer">
          Sleep Dashboard
        </h2>
        <p className="text-lg mb-5 text-purple-200">
          Welcome back to your sleep insights
        </p>

        {/* Summary + Quality */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Empty div to push the next one to the right on large screens */}
        <div className="hidden lg:block"></div>

        {/* Sleep Quality Box (right column) */}
        <div className="text-white p-10 rounded-lg bg-purple-500/5 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg hover:scale-110 hover:shadow-xl transform cursor-pointer">
          <h3 className="flex flex-col items-center justify-center text-center text-xl font-semibold mb-2">
            🌙 Sleep Quality
          </h3>
          <p className="text-white-800 flex flex-col items-center justify-center text-center">
            Last night&apos;s sleep metrics
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-2xl font-bold text-purple-800">78%</p>
            <div className="text-sm text-white-800">Overall Quality</div>
            {[
              { label: 'Restfulness', value: 82 },
              { label: 'Continuity', value: 76 },
              { label: 'Timing', value: 68 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex text-white-800 justify-between text-sm">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/20">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="text-white p-10 rounded-lg bg-purple-500/5 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg hover:scale-110 hover:shadow-xl transform cursor-pointer">
            <h3 className="text-xl font-semibold mb-2 flex flex-col items-center justify-center">😴 Sleep Summary</h3>
            <p className="text-white-800 flex flex-col items-center justify-center">Your recent sleep overview</p>
            <div className="mt-4 text-white">
              <p className="text-lg">Average Duration: <span className="font-bold">{avgSleep}h</span></p>
              <p className="text-lg">Sleep Score: <span className="font-bold">82</span></p>
              <p className="text-lg">Quality: <span className="font-bold">Good</span></p>
            </div>
          </div>
          </div>

          

        {/* Tips + Log Entry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Empty div to push the next one to the right on large screens */}
        <div className="hidden lg:block"></div>
          <Link
            href="/sleep-log"
            className="text-white flex flex-col items-center justify-center text-center rounded-lg bg-purple-500/5 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg hover:scale-110 hover:shadow-xl transform cursor-pointer p-6"
          >
            <div className="text-4xl mb-2">+</div>
            <h3 className="text-xl font-semibold mb-2">Log New Sleep</h3>
            <p className="text-white-800 mb-4">Track your sleep for better insights</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition duration-200">
              Add Sleep Entry
            </button>
          </Link>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="text-white rounded-lg bg-purple-500/5 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg hover:scale-110 hover:shadow-xl transform cursor-pointer p-6">
            <h3 className="text-xl font-semibold flex flex-col items-center justify-center text-center">💡 Sleep Tips</h3>
            <div className="border border-purple-700 rounded p-4 mb-4">
              <strong className="block mb-1">Tip of the day:</strong>
              Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7, and exhale for 8.
            </div>
            <ul className="list-disc pl-5 space-y-2 text-white-800 text-sm mb-4">
              <li>Maintain a consistent sleep schedule, even on weekends</li>
              <li>Avoid caffeine and alcohol close to bedtime</li>
              <li>Exercise regularly, but not too close to bedtime</li>
              <li>Create a restful environment in your bedroom</li>
            </ul>
          </div>
          </div>

          

        {/* Chart */}
        <div className="text-white w-full max-w-[800px] rounded-lg bg-purple-500/5 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg hover:scale-105 hover:shadow-xl transform cursor-pointer p-6 sm:p-10 lg:p-20 mx-auto mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">📊 Weekly Sleep Pattern</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <XAxis dataKey="day" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="hours" fill="#a78bfa" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      </main>
    </div>
  );
}
