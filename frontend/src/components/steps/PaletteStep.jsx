import { useSelector, useDispatch } from "react-redux";
import { setPalette } from "../../redux/features/dataSlice";

const palettes = [
    { name: "Modern", colors: ["#1a1a1a", "#ffffff", "#3b82f6"] },
    { name: "Warm", colors: ["#ea580c", "#fbbf24", "#78350f"] },
    { name: "Nature", colors: ["#166534", "#86efac", "#14532d"] },
    { name: "Elegant", colors: ["#000000", "#e5e5e5", "#d4af37"] },
];

const PaletteStep = () => {
    const { palette } = useSelector((state) => state.data);
    const dispatch = useDispatch();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose a Color Palette</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {palettes.map((p, i) => (
            <div 
                key={i} 
                onClick={() => dispatch(setPalette(p.name))}
                className={`p-4 border rounded-xl cursor-pointer flex justify-between items-center hover:shadow-md transition ${palette === p.name ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
            >
                <span className="font-medium">{p.name}</span>
                <div className="flex gap-1">
                    {p.colors.map((c, j) => (
                        <div key={j} className="w-6 h-6 rounded-full border border-gray-100" style={{backgroundColor: c}}></div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteStep;