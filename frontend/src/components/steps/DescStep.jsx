import { useDispatch, useSelector } from "react-redux";
import { setDesc } from "../../redux/features/dataSlice";

const DescStep = () => {
    const { desc } = useSelector((state) => state.data);
    const dispatch = useDispatch();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Describe your Vision</h2>
      <p className="text-gray-500 mb-6">Tell the AI what your business does and what you want to see.</p>
      <textarea 
        className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 outline-none h-40 resize-none"
        placeholder="e.g. A futuristic tech company dealing with space travel. I want a planet icon..."
        value={desc}
        onChange={(e) => dispatch(setDesc(e.target.value))}
      />
    </div>
  );
};

export default DescStep;