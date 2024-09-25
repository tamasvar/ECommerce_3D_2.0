// LoadingOverlay.tsx
import { Loader2 } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin h-16 w-16 text-white" />
      </div>
    </div>
  );
};

export default LoadingOverlay;