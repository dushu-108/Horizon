import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <div className="p-4 shadow-sm border-b border-gray-200 flex justify-between items-center bg-white">
      <Link to="/" className="flex items-center gap-2">
        <img src="horizon.png" alt="logo" height={100} width={100}/>
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Hello, {user.name}</span>
            {user.avatar && (
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            )}
          </div>
        ) : (
          <Link to="/auth/google/login">
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-md font-medium hover:bg-indigo-700 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;