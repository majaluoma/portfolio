import BlockView from '@/components/customUi/BlockView';
import { blogData } from '@/data/blogData';
import BlogNavigation from '@/features/blogPosts/BlogNavigation';
import BlogPosts from '@/features/blogPosts/BlogPosts';
import LinkList from '@/features/linkList/LinkList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type BlockProps = {
  single?: boolean;
  batch?: boolean;
};
export default function Blog({ single, batch }: BlockProps) {
  const { id, year } = useParams();
  const [blogPosts, setBlogPosts] = useState(blogData);

  useEffect(() => {
    if (single) {
      const post = blogData.find((blog) => blog.id === Number(id));
      if (post) {
        setBlogPosts([post]);
      }
    }

    if (batch) {
      const post = blogData.filter(
        (blog) => blog.date.getFullYear().toString() === year,
      );
      if (post) {
        setBlogPosts(post);
      }
    }
  }, [batch, single, id, year]);

  return (
    <>
      <div>
        <h1 className="font-headline text-6xl font-bold">
          Majis development blog
        </h1>
        <p>Web development from finnish context</p>
      </div>

      <BlockView>
        <BlogPosts blogposts={blogPosts} />
      </BlockView>
      <BlockView>
        <h2 className="font-headline text-4xl font-bold">All posts</h2>
        <LinkList
          links={blogData.map((blogentry) => {
            return {
              name: `${blogentry.date.toLocaleDateString()} ${blogentry.title}`,
              url: `/blog/${blogentry.date.getFullYear().toString()}/${blogentry.id}`,
              categories: [blogentry.date.getFullYear().toString()],
            };
          })}
        />
      </BlockView>
      <div className="fixed bottom-1 left-1 md:top-50 md:left-20 z-50">
        <BlogNavigation />
      </div>
      <p>Sidebar: social links</p>
    </>
  );
}
