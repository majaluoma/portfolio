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
export default function BlogNavigation() {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <Avatar className="size-20 cursor-pointer">
          <AvatarImage className="size-25" src={profileImage1} />
          <AvatarFallback>MAJIS</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader >
          <SheetTitle className="flex w-full flex-row items-center justify-center">
            <Avatar className="size-38 cursor-pointer">
              <AvatarImage className="size-50" src={profileImage1} />
              <AvatarFallback>MAJIS</AvatarFallback>
            </Avatar>
          </SheetTitle>
          <SheetDescription>
            Hi! I am Majis, a web developer and career counsellor. I publish my my schoold works here in this blog. 
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
