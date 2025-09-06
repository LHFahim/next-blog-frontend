import { IPost } from "@/interfaces/posts";
import { formatDate } from "@/lib/format";
import Image from "next/image";
import LikeButton from "../like-icon/like-icon";

function Post({
  post,
}: {
  post: IPost & {
    userFirstName: string;
    createdAt: string;
  };
}) {
  return (
    <article className="post">
      <div className="post-image">
        <Image src={post.image_url} alt={post.title} width={600} height={400} />
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
            <LikeButton />
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
  posts: (IPost & { userFirstName: string; createdAt: string })[];
}) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.createdAt}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
