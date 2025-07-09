import React from "react";

const guarantees = [
  { icon: "😊", text: "Happiness Pledge: We value your satisfaction. If something goes wrong with your order, we’ll step in to help resolve it." },
  { icon: "🔍", text: "Vetted Taskers: Only trusted vendors. Every seller with this badge has been reviewed for quality and reliability." },
  { icon: "🛡️", text: "Dedicated Support: We’ve got your back. Our team is here to assist you quickly if you face issues." },
];

const SatisfactionSection: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 py-8 bg-blue-600 text-white rounded-2xl my-8">
    <h2 className="text-xl font-bold mb-4">Your Satisfaction is Guaranteed</h2>
    <ul className="space-y-3">
      {guarantees.map((g, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-2xl">{g.icon}</span>
          <span>{g.text}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default SatisfactionSection; 