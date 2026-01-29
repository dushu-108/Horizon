import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../redux/features/dataSlice";

const TitleStep = () => {
    const { title } = useSelector((state) => state.data);
    const dispatch = useDispatch();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">What is your Logo Name?</h2>
      <p className="text-gray-500 mb-6">Enter your business name or brand title.</p>
      <input 
        type="text" 
        className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="e.g. Horizon Tech"
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
      />
    </div>
  );
};

export default TitleStep;