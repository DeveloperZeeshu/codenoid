import { Shield, Zap, Code2 } from 'lucide-react';

export const Values = () => {
  const values = [
    { icon: <Zap />, title: "Instant Feedback", desc: "Get code explanations in seconds, not minutes." },
    { icon: <Shield />, title: "Privacy First", desc: "Your source code is never stored or used for training." },
    { icon: <Code2 />, title: "Clean Architecture", desc: "We prioritize readable, production-grade output." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      {values.map((v, i) => (
        <div key={i} className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all">
          <div className="text-blue-500 mb-4">{v.icon}</div>
          <h3 className="text-white font-bold text-xl mb-2">{v.title}</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
        </div>
      ))}
    </div>
  );
};