import Link from 'next/link';

export default function TipsPage() {
  const tips = [
    {
      title: 'Maintain a Regular Sleep Schedule',
      description: 'Go to bed and wake up at the same time every day—even on weekends—to regulate your body’s internal clock.',
    },
    {
      title: 'Create a Relaxing Bedtime Routine',
      description: 'Wind down with calm activities like reading or meditation to signal to your body that it’s time to sleep.',
    },
    {
      title: 'Limit Screen Time Before Bed',
      description: 'Avoid phones, tablets, and TVs at least an hour before sleep. Blue light disrupts melatonin production.',
    },
    {
      title: 'Keep Your Sleep Environment Comfortable',
      description: 'Ensure your bedroom is cool, quiet, and dark. Use blackout curtains, earplugs, or white noise as needed.',
    },
    {
      title: 'Avoid Caffeine and Heavy Meals Late in the Day',
      description: 'Caffeine and rich foods can disrupt your ability to fall and stay asleep.',
    },
  ];

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
            <div className="text-purple-300 hover:text-white cursor-pointer">Calendar</div>
          </Link>
          <Link href="/tips">
            <div className="text-white font-semibold cursor-pointer">Tips</div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        <h1 className="text-3xl text-black font-bold mb-2 hover:text-purple-800 transition-colors duration-200 cursor-pointer">Sleep Tips</h1>
        <p className="text-gray-800 mb-8 hover:text-purple-800 transition-colors duration-200 cursor-pointer">Improve your sleep with these helpful habits</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="border border-purple-200 rounded-lg p-6 shadow hover:shadow-lg transition border border-purple-700 p-6 rounded-lg hover:shadow-lg hover:bg-purple-50 transition duration-300"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">{tip.title}</h2>
              <p className="text-gray-700">{tip.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
