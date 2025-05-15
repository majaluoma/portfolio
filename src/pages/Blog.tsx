import { blogData } from '@/data/blogData';
import BlogPosts from '@/features/blogPosts/BlogPosts';

export default function Blog() {
  return (
    <>
      <div>
      <h1 className="font-headline text-6xl font-bold">Majis development  blog</h1>
        <p>Web development from finnish context</p>
      </div>

      <BlogPosts blogposts={blogData} />

      <p>Blog texts list from recent year</p>
      <p>Blog archive, list text by year</p>

      <p>Sidebar: labels</p>
      <p>Sidebar: profile</p>
      <p>Sidebar: social links</p>
    </>
  );
}
