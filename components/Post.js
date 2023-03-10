/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
// firebase imports
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/Firebase";
// icons
import {
  BsThreeDots,
  BsChatDots,
  BsBookmark,
  BsHeart,
  BsHeartFill,
  BsEmojiSmile,
} from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";

function Post({ id, img, username, userImg, caption, timestamp }) {
  // get sesion detail
  const { data: session } = useSession();

  // commet state
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // likes state
  const [likes, setLikes] = useState([]);
  const [hasLikes, setHasLikes] = useState(false);

  // fetch comment rom firebase
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );
  // fetch likes from firebase
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  // to unlike logic
  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);
  // post a like status to firebase db
  const likePost = async () => {
    if (hasLikes) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  // post coment func

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* header */}
      <div className="flex items-center p-5 ">
        <img
          src={userImg}
          alt="img"
          className="rounded-full h-12 w-13 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">
          {username} <br />
          <Moment fromNow className="pr-5 text-xs text-gray-500">
            {timestamp?.toDate()}
          </Moment>
        </p>
        <BsThreeDots className="h-5" />
      </div>
      {/* img */}
      <img src={img} alt="img" className="object-cover w-full " />
      {/* buttons */}
      {session && (
        <div
          className="flex justify-between px-4 pt-4"
          style={{ fontSize: "20px" }}
        >
          <div className="flex space-x-4 ">
            {hasLikes ? (
              <BsHeartFill onClick={likePost} className="btn text-red-500" />
            ) : (
              <BsHeart onClick={likePost} className="btn" />
            )}

            <BsChatDots className="btn" />
            <FaRegPaperPlane className="btn" />
          </div>
          <BsBookmark />
        </div>
      )}

      {/* caption */}
      <p className="p-5 ">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>
      {/* commets */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                alt=""
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs text-gray-500">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <BsEmojiSmile className="h-7" />
          <input
            value={comment}
            type="text"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}

      {/* input box */}
    </div>
  );
}

export default Post;
