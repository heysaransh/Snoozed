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
    <div className="relative min-h-screen overflow-hidden text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/snooze_bg6.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Nav Bar */}
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
          <Link href="/calendar" className="text-purple-300 hover:text-white cursor-pointer">Calendar</Link>
          <Link href="/tips" className="text-white font-semibold cursor-pointer">Tips</Link>
          <Link href="/login" passHref>
            <button className="bg-purple-700 hover:bg-purple-900 text-white px-3 rounded-md transition duration-200">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-20 p-8 mt-1 py-20">
        <h1 className="text-4xl font-bold mb-2 hover:text-purple-200 transition-colors cursor-pointerr">
          Sleep Tips
        </h1>
        <p className="text-lg mb-5 text-purple-200">
          Improve your sleep with these helpful habits
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="text-white p-10 rounded-lg bg-purple-500/5 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg hover:scale-110 hover:shadow-xl transform cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-purple-300 mb-2">{tip.title}</h2>
              <p className="text-white-800">{tip.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
