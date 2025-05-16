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
    <div className="min-h-screen flex bg-white text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-900 p-6 border-r border-purple-800">
        <h1 className="text-3xl font-semibold text-grey mb-10 hover:text-purple-300 transition-colors duration-200 cursor-pointer">Snooze</h1>
        <nav className="space-y-4">
          {['Dashboard', 'Sleep Log', 'Insights', 'Calendar', 'Tips'].map(
            (item) => (
              <div
                key={item}
                className="hover:text-purple-300 transition-colors duration-200 cursor-pointer"
              >
                {item}
              </div>
            )
          )}
        </nav>
      </aside>

      

      {/* Login Button - Top Right */}
      <div className="absolute top-4 right-6 z-20">
      <Link href="/login" passHref>
        <button className="bg-purple-700 hover:bg-purple-900 text-white px-4 py-2 rounded-md transition duration-200">
          Sign In
        </button>
      </Link>

      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl text-black font-bold mb-2 hover:text-purple-800 transition-colors duration-200 cursor-pointer">Sleep Dashboard</h2>
        <p className="text-gray-800 mb-8 hover:text-purple-800 transition-colors duration-200 cursor-pointer">Welcome back to your sleep insights</p>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Sleep Summary */}
          <div className="border border-purple-700 p-6 rounded-lg hover:shadow-lg hover:bg-purple-50 transition duration-300 text-black">
            <h3 className="text-xl font-semibold mb-2">😴 Sleep Summary</h3>
            <p className="text-gray-800">Your recent sleep overview</p>
            <div className="mt-4 text-black">
              <p className="text-lg">
                Average Duration: <span className="font-bold">{avgSleep}h</span>
              </p>
              <p className="text-lg">
                Sleep Score: <span className="font-bold">82</span>
              </p>
              <p className="text-lg">
                Quality: <span className="font-bold">Good</span>
              </p>
            </div>
          </div>

          {/* Sleep Quality */}
          <div className="border border-purple-700 p-6 rounded-lg hover:shadow-lg hover:bg-purple-50 transition duration-300 text-black">
            <h3 className="text-xl font-semibold mb-2">🌙 Sleep Quality</h3>
            <p className="text-gray-800">Last night's sleep metrics</p>
            <div className="mt-4 space-y-2">
              <p className="text-2xl font-bold text-purple-800">78%</p>
              <div className="text-sm text-gray-800">Overall Quality</div>
              {[
                { label: 'Restfulness', value: 82 },
                { label: 'Continuity', value: 76 },
                { label: 'Timing', value: 68 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex text-gray-800 justify-between text-sm">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full bg-purple-700/20 h-2 rounded-full">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Sleep Entry */}
          <div className="border border-purple-700 p-6 rounded-lg flex flex-col items-center justify-center text-center hover:shadow-lg hover:bg-purple-100 transition duration-300 text-black">
            <div className="text-4xl mb-2">➕</div>
            <h3 className="text-xl font-semibold mb-2">Log New Sleep</h3>
            <p className="text-gray-800 mb-4">
              Track your sleep for better insights
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition duration-200">
              Add Sleep Entry
            </button>
          </div>
        </div>

        {/* Graph + Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graph */}
          <div className="text-black border border-purple-700 p-6 rounded-lg hover:shadow-lg hover:bg-purple-50 transition duration-300">
            <h3 className="text-xl font-semibold mb-4">📊 Weekly Sleep Pattern</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockData}>
                <XAxis dataKey="day" stroke="#222" />
                <YAxis stroke="#222" />
                <Tooltip />
                <Bar dataKey="hours" fill="#a78bfa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tips */}
          <div className="text-black border border-purple-700 p-6 rounded-lg hover:shadow-lg hover:bg-purple-50 transition duration-300">
            <h3 className="text-xl font-semibold mb-4">💡 Sleep Tips</h3>
            <div className="bg-yellow-500/10 text-yellow-800 p-4 mb-4 rounded">
              <strong className="block mb-1">Tip of the day:</strong>
              Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7, and exhale for 8.
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-800 text-sm">
              <li>Maintain a consistent sleep schedule, even on weekends</li>
              <li>Avoid caffeine and alcohol close to bedtime</li>
              <li>Exercise regularly, but not too close to bedtime</li>
              <li>Create a restful environment in your bedroom</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
