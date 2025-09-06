"use client";

import { togglePostLikeStatus } from "@/actions/post-actions";
import { IPost } from "@/interfaces/posts";
import { formatDate } from "@/lib/format";
import Image from "next/image";
import { useOptimistic } from "react";
import LikeButton from "../like-icon/like-icon";

function Post({
  post,
  action,
}: {
  post: IPost & {
    userFirstName: string;
    createdAt: string;
    image?: string;
    isLiked?: boolean;
  };
  action: (postId: number) => Promise<void>;
}) {
  // const imageUrl = post?.image as string;
  // console.log(post);
  return (
    <article className="post">
      <div className="post-image">
        <Image src={post.image!} alt={post.title} width={600} height={400} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({
  posts,
}: {
  posts: (IPost & {
    userFirstName: string;
    createdAt: string;
    image?: string;
    isLiked?: boolean;
  })[];
}) {
  const [optimisticPosts, startTransition] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = {
        ...prevPosts[updatedPostIndex],
      };
      updatedPost.isLiked = !updatedPost.isLiked;

      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const updatePost = async (postId: number) => {
    startTransition(postId);
    await togglePostLikeStatus(postId.toString(), new FormData());
  };

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.createdAt}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
