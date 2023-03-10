import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";
import StoryData from "./StatusData";
import Story from "./Story";

function Stories() {
  const [suggestions, setSuggestions] = useState(StoryData);

  const { data: session } = useSession();

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 rounded-sm border overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session.user.image} name={session.user.username} />
      )}
      {suggestions.map((profile) => (
        <Story key={profile.id} {...profile} />
      ))}
    </div>
  );
}

export default Stories;
