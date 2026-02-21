export const Stats = () => {
  const stats = [
    { label: 'Lines Analyzed', value: '5k+' },
    { label: 'Bugs Caught', value: '1k' },
    { label: 'Avg Speed', value: '1.2s' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-32">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <p className="text-2xl font-black text-white">{stat.value}</p>
          <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};