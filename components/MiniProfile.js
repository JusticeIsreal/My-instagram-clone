/* eslint-disable @next/next/no-img-element */
import React from "react";
import { signOut, useSession } from "next-auth/react";
function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={session?.user?.image}
        alt="img"
        className="border p-[2px]  w-16 h-16 rounded-full cursor-pointer "
      />

      <div className="flex-1">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3
          className="text-xs lg:text-sm text-gray-400"
          style={{ fontSize: "12px", lineHeight: "1" }}
        >
          Welcome to
          <br />
          Instagram Clone by
          <br />
          Justice Agbonma
        </h3>
      </div>
      <button
        onClick={signOut}
        className="text-blue-400 text-sm font-semibold pl-8 cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
