import { LoaderCircle } from "lucide-react";
import React from "react";

function CustomLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999] bg-slate-800 bg-opacity-100">
      <LoaderCircle className="text-gray-100 animate-spin h-10 md:h-24 w-10 md:w-24" />
    </div>
  );
}

export default CustomLoader;
