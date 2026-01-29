import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../../redux/features/dataSlice";

const ResultStep = () => {
    const { image } = useSelector((state) => state.data);    
    const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Your Logo is Ready!</h2>
      <div className="bg-white p-2 border rounded-xl shadow-lg mb-8">
        <img src={image} alt="Generated Logo" className="w-[400px] h-[400px] object-cover rounded-lg" />
      </div>
      <div className="flex gap-4">
        <button onClick={() => dispatch(setImage(null))} className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-bold">Download Logo</button>
        <button onClick={() => dispatch(setImage(null))} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">Generate New</button>
      </div>
    </div>
  );
};

export default ResultStep;