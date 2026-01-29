import React from 'react';

const Dashboard = () => {
  const logos = [
    { id: 1, title: "Coffee House", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Tech Corp", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="p-8 md:p-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">My Logos</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">+ Create New</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {logos.map((logo) => (
          <div key={logo.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img src={logo.image} alt={logo.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{logo.title}</h3>
              <button className="text-indigo-600 text-sm font-medium mt-2">Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;