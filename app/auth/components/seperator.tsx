import React from "react";

function Seperator() {
  return (
    <div className="flex items-center justify-between w-full gap-x-3">
      <div className="w-full h-[1px] bg-gray-300" />
      <p className="text-sm">or</p>
      <div className="w-full h-[1px] bg-gray-300" />
    </div>
  );
}

export default Seperator;
