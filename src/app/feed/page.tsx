import Posts from "@/components/posts/posts";
import { IPost } from "@/interfaces/posts";
import { getPosts } from "@/lib/posts";

export default async function FeedPage() {
  const posts: (IPost & { userFirstName: string; createdAt: string })[] =
    (await getPosts(2)) as (IPost & {
      userFirstName: string;
      createdAt: string;
    })[];
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
