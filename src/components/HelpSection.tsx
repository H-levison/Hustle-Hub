import React, { useState } from "react";

const HelpSection: React.FC = () => {
  const [isRobot, setIsRobot] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 rounded-2xl my-8  md:flex-row gap-8 items-center">
      <div className=" p-4 h-[560px]">
        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="topic">Topic</label>
            <select
              id="topic"
              className="w-full px-4 py-3 rounded-xl bg-gray-200 border border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              defaultValue=""
            >
              <option value="" disabled>Select a topic</option>
              <option value="general">General Inquiry</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-gray-200 border border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-gray-200 border border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Type your message"
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-gray-200 border border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="robot"
              type="checkbox"
              checked={isRobot}
              onChange={() => setIsRobot(!isRobot)}
              className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="robot" className="text-gray-700 text-sm">I'm not a robot</label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-xl bg-gray-300 text-white font-semibold cursor-not-allowed"
            disabled
          >
            Send message
          </button>
        </form>
      </div>
      
    </section>
  );
};

export default HelpSection; 