import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
        Create Unique Logos with <br /> <span className="text-indigo-600">Artificial Intelligence</span>
      </h1>
      <p className="text-xl text-gray-500 mb-10 max-w-2xl">
        Don't rely on stock templates. Generate professional, high-quality vector logos 
        customized for your brand in seconds.
      </p>
      <Link to="/create">
        <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition transform">
          Create My Logo Free
        </button>
      </Link>
      
      <div className="mt-16 w-full max-w-4xl p-4 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              <img src="https://as2.ftcdn.net/v2/jpg/16/31/40/31/1000_F_1631403193_ECj6xejEQ6QCb9FK3ZKiiuTMTFDLmRwq.jpg" alt="Logo" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              <img src="https://as1.ftcdn.net/v2/jpg/03/08/95/98/1000_F_308959870_bcfVAs1VoJMXS9AUs3p8YaJrYL3NiuQA.jpg" alt="Logo" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              <img src="https://as1.ftcdn.net/v2/jpg/03/38/23/98/1000_F_338239852_ORDNOPSIoGcYeoQl9N2bkjYptzWD2O2G.jpg" alt="Logo" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;