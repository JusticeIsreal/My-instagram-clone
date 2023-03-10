/* eslint-disable @next/next/no-img-element */
import React from "react";

function Story({ name, img }) {
  return (
    <div>
      <img
        src={img}
        alt="img"
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
      />
      <p className="text-xs w-14 truncate text-center">{name}</p>
    </div>
  );
}

export default Story;
