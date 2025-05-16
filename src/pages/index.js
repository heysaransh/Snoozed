import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden font-sans">

      {/* Top Right Logo */}
      <div className="absolute top-4 right-6 z-10">
        <h1 className="text-4xl font-extrabold text-purple-600 glow-text">Snooze</h1>
      </div>

      {/* Top Right Navigation */}
      <div className="absolute top-4 right-6 z-10 flex space-x-6">
        <Link href="#about" className="text-lg text-purple-400 hover:text-white transition">
          About
        </Link>
        <Link href="#features" className="text-lg text-purple-400 hover:text-white transition">
          Features
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center bg-black bg-opacity-60">
        <h2 className="text-6xl font-extrabold text-purple-600 mb-4 animate-fade-in">Better Sleep Starts Tonight</h2>
        <p className="text-xl text-white max-w-2xl mb-8 animate-fade-in delay-100">
          Discover smarter ways to rest. Snooze uses smart analytics and calming tools to guide your path to better sleep.
        </p>
        <Link
          href="/auth"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl text-lg transition transform hover:scale-105 shadow-md hover:shadow-purple-700 animate-fade-in delay-300"
        >
          Get Started for Free
        </Link>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 bg-black bg-opacity-80 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-purple-600 mb-4">About Snooze</h3>
          <h4 className="text-2xl text-purple-400 mb-4">Transform Your Nights, Energize Your Days</h4>
          <p className="text-lg text-gray-300">
            Snooze is a modern sleep tracking solution that helps you understand and optimize your sleep cycles.
            Using personalized insights, calming features, and device integrations, it’s your all-in-one toolkit
            for better rest and recovery.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 bg-black bg-opacity-90 text-white">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-purple-600">Features</h3>
          <p className="text-lg text-gray-400 mt-2">Packed with everything you need to monitor and improve your sleep.</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-[#1f1f1f] border border-purple-600 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-600 transition transform hover:scale-105">
            <h4 className="text-2xl font-semibold text-purple-400 mb-4">Sleep Overview</h4>
            <ul className="space-y-2 text-gray-300 text-base">
              <li>• Sleep Duration Tracking</li>
              <li>• Sleep Quality Scores</li>
              <li>• Weekly & Monthly Reports</li>
              <li>• Sleep Goal Suggestions</li>
            </ul>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-[#1f1f1f] border border-purple-600 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-600 transition transform hover:scale-105">
            <h4 className="text-2xl font-semibold text-purple-400 mb-4">Sleep Log</h4>
            <ul className="space-y-2 text-gray-300 text-base">
              <li>• Manual & Auto Logging</li>
              <li>• Sync with Wearables</li>
              <li>• Sleep Tags & Notes</li>
              <li>• Nap & Sleep Debt Tracking</li>
            </ul>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-[#1f1f1f] border border-purple-600 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-600 transition transform hover:scale-105">
            <h4 className="text-2xl font-semibold text-purple-400 mb-4">Calendar & Schedule</h4>
            <ul className="space-y-2 text-gray-300 text-base">
              <li>• Visual Sleep Calendar</li>
              <li>• Smart Reminders</li>
              <li>• Weekly Trends View</li>
              <li>• Customizable Schedules</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .glow-text {
          text-shadow: 0 0 10px #6a60b8, 0 0 20px #6a60b8, 0 0 30px #6a60b8;
        }
      `}</style>
    </div>
  );
}
