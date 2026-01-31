import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/features/authSlice';
import { loginWithEmail } from '../api/authApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/auth/google/login";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginWithEmail(email, password);
            const { access_token, user } = response.data;

            dispatch(login({ user, token: access_token }));
            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-8">Sign in to access your saved logos</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md"
                    >
                        Sign In
                    </button>
                </form>

                <div className="flex items-center gap-4 my-6">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-gray-400 text-sm font-medium">OR CONTINUE WITH</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full border border-gray-300 p-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition font-medium text-gray-700"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Sign in with Google
                </button>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-600 font-bold hover:underline">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;