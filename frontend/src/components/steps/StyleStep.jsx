import { useDispatch, useSelector } from "react-redux";
import { setStyle } from "../../redux/features/dataSlice";

const styles = [
    { name: "Minimalist", desc: "Clean, simple lines" },
    { name: "3D Mascot", desc: "Cute character based" },
    { name: "Vintage", desc: "Retro badge style" },
    { name: "Abstract", desc: "Modern geometric shapes" },
];

const StyleStep = () => {
    const { style } = useSelector((state) => state.data);
    const dispatch = useDispatch();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pick a Design Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {styles.map((s, i) => (
            <div 
                key={i} 
                onClick={() => dispatch(setStyle(s.name))}
                className={`p-6 border rounded-xl cursor-pointer hover:shadow-md transition ${style === s.name ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
            >
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default StyleStep;