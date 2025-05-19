import Link from 'next/link';

export default function Signup() {
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

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col sm:flex-row items-center justify-between px-6 py-3 backdrop-blur-sm">
      <Link href="/dashboard" className="flex items-center space-x-8">
          <h1
            className="text-6xl font-bold px-8 text-purple-300"
            style={{ fontFamily: '"Just Another Hand", cursive' }}
          >
            Snooze
          </h1>
        </Link>
        <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6 text-lg sm:text-xl px-4 mt-2 sm:mt-0">
          <Link href="/dashboard" className="text-purple-300 hover:text-white cursor-pointer">Dashboard</Link>
          <Link href="/sleep-log" className="text-purple-300 hover:text-white cursor-pointer">Sleep Log</Link>
          <Link href="/calendar" className="text-purple-300 hover:text-white cursor-pointer">Calendar</Link>
          <Link href="/tips" className="text-purple-300 hover:text-white cursor-pointer">Tips</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-20 flex items-center justify-center min-h-screen pt-28 sm:pt-32 px-4">
        <div className="text-white p-10 rounded-lg bg-purple-500/5 backdrop-blur-md transition duration-300 hover:backdrop-blur-lg hover:scale-102 hover:shadow-xl transform cursor-pointer">
          <p className="text-center text-4xl mb-4 font-semibold">Get Started!</p>
          <h1 className="text-xl font-bold mb-2 text-purple-300 text-left">Sign Up</h1>

          <form>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 rounded bg-white/20 border border-purple-400 text-white placeholder-purple-200"
            />
            <input
              type="password"
              placeholder="Create Password"
              className="w-full mb-4 p-3 rounded bg-white/20 border border-purple-400 text-white placeholder-purple-200"
            />
            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-900 text-white py-2 rounded transition"
            >
              Submit
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-purple-200">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
