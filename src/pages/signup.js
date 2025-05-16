// src/pages/login.js
import Link from 'next/link';

export default function Signup() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Snooze link */}
      <header>
        <Link href="/dashboard" legacyBehavior>
          <a className="py-6 px-5 text-3xl font-semibold text-purple-800 hover:text-purple-700 transition-colors duration-200 cursor-pointer block">
            Snooze
          </a>
        </Link>
      </header>

      {/* Main login form centered */}
      <main className="flex-grow flex items-center justify-center">
        <div className="border border-purple-700 px-4 py-20 rounded-lg bg-purple-50 text-black max-w-md w-full mx-4">
          {/* Welcome back message */}
          <p className="text-center text-4xl mb-4 text-black font-semibold">
            Get Started!
          </p>
          <h1 className="text-xl font-bold mb-6 text-purple-900 text-left">Sign Up</h1>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 rounded bg-white border border-purple-600 text-black"
            />
            <input
              type="password"
              placeholder="Create Password"
              className="w-full mb-4 p-3 rounded bg-white border border-purple-600 text-black"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
            >
              Submit
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
