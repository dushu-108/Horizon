import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import generateImage from '../api/imageApi';
import { setImage } from '../redux/features/logoSlice';
import TitleStep from '../components/steps/TitleStep';
import DescStep from '../components/steps/DescStep';
import PaletteStep from '../components/steps/PaletteStep';
import StyleStep from '../components/steps/StyleStep';
import LoadingStep from '../components/steps/LoadingStep';
import ResultStep from '../components/steps/ResultStep';

const CreateLogo = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const { title, desc, palette, style } = useSelector((state) => state.data);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const onGenerate = async () => {
        setLoading(true);
        try {
            const response = await generateImage(title, desc, palette, style, token);
            dispatch(setImage(response.image));
            setResult(response.image);
        } catch (error) {
            console.error("Failed to generate logo", error);
            alert("Failed to generate logo. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-80px)]">
            <div className="w-64 bg-white border-r hidden md:block p-8">
                <div className="space-y-6">
                    {['Title', 'Description', 'Palette', 'Style', 'Finish'].map((label, index) => (
                        <div key={index} className={`flex items-center gap-3 ${step === index + 1 ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === index + 1 ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
                                {index + 1}
                            </div>
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    {loading ? <LoadingStep /> : result ? <ResultStep image={result} /> : (
                        <>
                            {step === 1 && <TitleStep />}
                            {step === 2 && <DescStep />}
                            {step === 3 && <PaletteStep />}
                            {step === 4 && <StyleStep />}

                            <div className="flex justify-between mt-8 pt-4 border-t">
                                <button onClick={prevStep} disabled={step === 1} className="text-gray-500 hover:text-gray-800 disabled:opacity-50">Back</button>
                                {step === 4 ? (
                                    <button onClick={onGenerate} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Generate Logo</button>
                                ) : (
                                    <button onClick={nextStep} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Next Step</button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateLogo;