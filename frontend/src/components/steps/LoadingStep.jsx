const LoadingStep = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-6"></div>
      <h2 className="text-2xl font-bold">Generating Magic...</h2>
      <p className="text-gray-500">Please wait while our AI creates your logo.</p>
    </div>
  );
};

export default LoadingStep;