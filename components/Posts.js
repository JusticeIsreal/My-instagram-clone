import { useState, useEffect } from "react";
import Post from "./Post";
import StoryData from "./StatusData";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/Firebase";
function Posts() {
  const [poseDetails, setPostDetails] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPostDetails(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div>
      {poseDetails.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            img={post.data().image}
            caption={post.data().caption}
            timestamp={post.data().timestamp}
          />
        );
      })}
    </div>
  );
}

export default Posts;
