import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import profileImage1 from '@/assets/profileImage1.jpeg';
import LinkList from '../linkList/LinkList';
import { blogData } from '@/data/blogData';
import SocialLinks from '../portfolio/SocialLinks/SocialLinks';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function BlogNavigation() {
  const postsAndLabels = blogData.map((blogentry) => {
    return {
      name: `${blogentry.date.toLocaleDateString()} ${blogentry.title}`,
      url: `http://localhost:5173/blog/${blogentry.date.getFullYear().toString()}/${blogentry.id}`,
      categories: blogentry.labels,
    };
  });

  const postsAndYears = blogData.map((blogentry) => {
    return {
      name: `${blogentry.date.toLocaleDateString()} ${blogentry.title}`,
      url: `http://localhost:5173/blog/${blogentry.date.getFullYear().toString()}/${blogentry.id}`,
      categories: [blogentry.date.getFullYear().toString()],
    };
  });

  return (
    <Sheet>
      <SheetTrigger className="flex cursor-pointer flex-col items-center justify-center">
        <Avatar className="size-20 cursor-pointer">
          <AvatarImage className="size-25" src={profileImage1} />
          <AvatarFallback>MAJIS</AvatarFallback>
        </Avatar>
        <p className="bg-card rounded-2xl px-2">Blog Menu</p>
      </SheetTrigger>
      <SheetContent side="left" className="p-4">
        <ScrollArea className="flex h-full w-full flex-col">
          <SheetHeader className='my-6'>
            <SheetTitle className="flex w-full flex-row items-center justify-center">
              <Avatar className="size-38 cursor-pointer">
                <AvatarImage className="size-50" src={profileImage1} />
                <AvatarFallback>MAJIS</AvatarFallback>
              </Avatar>
            </SheetTitle>
            <SheetDescription>
              Hi! I am Majis, a web developer and career counsellor. I publish
              my my schoold works here in this blog.
            </SheetDescription>
          </SheetHeader>
          <div className='my-6'>
            <h2>Subjects</h2>
            <LinkList links={postsAndLabels}></LinkList>
          </div>
          <div className='my-6'>
            <h2>All posts</h2>
            <LinkList links={postsAndYears} />
          </div>
          <div className='my-6'>
            <SocialLinks />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
