import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";

const LoginSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = searchParams.get("token");
        const avatar = searchParams.get("avatar");
        const name = searchParams.get("name");

        if (token) {
            dispatch(login({ token, user: { name, avatar } }));
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [searchParams, dispatch, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <h2 className="text-xl font-semibold">Logging you in...</h2>
        </div>
    );
};

export default LoginSuccess;
