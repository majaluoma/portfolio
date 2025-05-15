import BlockView from '@/components/customUi/BlockView';
import TextContent from '../textContent/TextContent';
import ChapterSeparator from '../../components/customUi/ChapterSeparator/ChapterSeparator';

type Blogpost = {
  id: number;
  title: string;
  ingress: string;
  date: Date;
};

type BlogPostsProps = {
  blogposts: Blogpost[];
};

export default function BlogPosts({ blogposts }: BlogPostsProps) {
  return (
    <BlockView>
      <div className="flex flex-col">
        {blogposts.map((blogpost) => {
          return (
            <div key={`blogpost_${blogpost.id}`}>
                <p className='text-gray-600'>{blogpost.date.toLocaleDateString()}</p>
              <TextContent
                markdownFile={`/siteTexts/blogEntries/${blogpost.id}.md`}
              />
        <ChapterSeparator className='my-15'/>
            </div>
          );
        })}
      </div>
    </BlockView>
  );
}
