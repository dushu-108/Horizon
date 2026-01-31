import { useEffect, useState } from 'react';
import { fetchLogos, deleteLogo } from '../api/imageApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [logos, setLogos] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const getLogos = async () => {
      if (token) {
        try {
          const data = await fetchLogos(token);
          setLogos(data);
        } catch (error) {
          console.error("Failed to fetch logos", error);
        }
      }
    };
    getLogos();
  }, [token]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this logo?")) {
      await deleteLogo(id, token);
      setLogos(logos.filter(logo => logo.id !== id));
    }
  }

  const handleDownload = (logo) => {
    const link = document.createElement("a");
    link.href = logo.image;
    link.download = `Horizon_Logo_${logo.title}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="p-8 md:p-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">My Logos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {logos.map((logo) => (
          <div key={logo.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img src={logo.image || "https://via.placeholder.com/150"} alt={logo.description} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{logo.title || "Untitled"}</h3>
              <p className="text-xs text-gray-500 mb-2 truncate">{logo.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleDownload(logo)} className="text-indigo-600 text-sm font-medium">Download</button>
                <button onClick={() => handleDelete(logo.id)} className="text-red-500 text-sm font-medium">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;