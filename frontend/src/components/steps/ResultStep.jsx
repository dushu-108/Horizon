import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../../redux/features/logoSlice";
import generateImage from "../../api/imageApi";

const ResultStep = () => {
  const { image } = useSelector((state) => state.logo);
  const { title, desc, palette, style } = useSelector((state) => state.data);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const generateLogo = async () => {
    try {
      const response = await generateImage(title, desc, palette, style, token);
      dispatch(setImage(response.image));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Your Logo is Ready!</h2>
      <div className="bg-white p-2 border rounded-xl shadow-lg mb-8">
        <img src={image} alt="Generated Logo" className="w-[400px] h-[400px] object-cover rounded-lg" />
      </div>
      <div className="flex gap-4">
        <button onClick={() => generateLogo()} className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-bold">Generate New</button>
      </div>
    </div>
  );
};

export default ResultStep;