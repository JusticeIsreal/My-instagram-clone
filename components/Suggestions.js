/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import StatusData from "./StatusData";
function Suggestions() {
  const [suggestion, setSuggestions] = useState(StatusData);
  return (
    <div className="mt-4 ml-10 ">
      <div className="flex justify-between text-sm mb-5">
        {" "}
        <h3 className="txt-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gary-600 font-semibold">See All</button>
      </div>
      {suggestion.slice(0, 5).map((item) => {
        return (
          <div key={item.id} className="flex items-center justify-between mt-3">
            <img
              src={item.img}
              alt=""
              className="w-10 h-10 rounded-full p-[2px] "
            />
            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">{item.name}</h2>
              <h3 className="text-xs text-gray-400">Works at StringCode</h3>
            </div>
            <button className="text-blue-400 text-sm font-bold">Follow</button>
          </div>
        );
      })}
    </div>
  );
}

export default Suggestions;
