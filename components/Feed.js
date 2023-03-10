import React from "react";
import { signOut, useSession } from "next-auth/react";
// component
import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";

function Feed() {
    const { data: session } = useSession();
    return (
        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl lg:grid-cols-3 lg:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`} >
      {/* Right side */}
      <section className="col-span-2">
        {/* story */}
        <Stories />
        {/* post */}
        <Posts />
      </section>

      {/* Left side */}
      {session && (
        <section className=" hidden lg:inline-grid md:col-span-1 ">
          <div className="fixed top-15">
            {/* mini profile */}
            <MiniProfile />
            {/* suggestions */}
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
