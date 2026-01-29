import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const loggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="flex justify-between items-center p-4 shadow-sm bg-white sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <img src="horizon.png" alt="logo" height={100} width={100}/>
      </Link>
      
      <div className="flex gap-4 items-center">
        {loggedIn ? (
          <Link to="/dashboard" className="font-medium hover:text-indigo-600">My Dashboard</Link>
        ) : (
          <>
            <Link to="/login" className="font-medium hover:text-indigo-600">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Get Started</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;