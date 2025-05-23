import BlockView from '@/components/customUi/BlockView';
import { blogData } from '@/data/blogData';
import BlogNavigation from '@/features/blog/BlogNavigation';
import BlogPosts from '@/features/blog/BlogPosts';
import LinkAccordion from '@/components/customUi/LinkAccordion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FadingBackground from '@/components/customUi/FadingBackgorund';
import natureImage1 from '@/assets/natureImage3.jpeg';
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
        <FadingBackground image={natureImage1} />
        <div className="text-card relative top-20">
          <h1 className="font-headline text-6xl font-bold">
            Majis development blog
          </h1>
          <p>Web development from finnish context</p>
        </div>
      </div>

      <BlockView>
        <BlogPosts blogposts={blogPosts} />
      </BlockView>
      <BlockView>
        <h2 className="font-headline text-4xl font-bold">All posts</h2>
        <LinkAccordion
          links={blogData.map((blogentry) => {
            return {
              name: `${blogentry.date.toLocaleDateString()} ${blogentry.title}`,
              url: `/blog/${blogentry.date.getFullYear().toString()}/${blogentry.id}`,
              categories: [blogentry.date.getFullYear().toString()],
            };
          })}
          firstOpen={false}
        />
      </BlockView>
      <div className="fixed bottom-1 left-1 z-50 md:top-50 md:left-20">
        <BlogNavigation />
      </div>
    </>
  );
}
