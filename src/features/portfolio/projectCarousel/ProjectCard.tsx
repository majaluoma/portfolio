import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from '../../../components/ui/card';
type ProjectCardProps = {
  project: Project;
};

type Project = {
  name: string;
  mainImageUrl: string;
  url: URL;
  description: string;
  badges: { badge: string; renderElement: React.ReactNode }[];
};

export default function ProjectCard({ project }: Readonly<ProjectCardProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleButtonClick = () => {
    if (isOpen) {
      window.open(project.url);
    }
  };

  return (
    <Card
      className="relative h-96 cursor-pointer overflow-hidden py-0"
      onClick={handleCardClick}
    >
      <CardTitle
        className={`absolute top-3/7 z-10 flex w-full justify-center p-3 text-2xl text-white transition-all duration-500 ${
          isOpen ? 'top-4' : ''
        }`}
      >
        <Button
          onClick={handleButtonClick}
          className="relative cursor-pointer p-6 text-2xl"
        >
          {isOpen && 'Go to '}
          {project.name}
        </Button>
      </CardTitle>
      <img
        src={project.mainImageUrl}
        alt={project.name + 'main'}
        className={`h-full w-full object-cover ${isOpen ? 'brightness-50' : 'brightness-75 hover:brightness-100'}`}
      />
      {isOpen && (
        <CardContent
          className={`absolute top-3/7 mx-12 flex flex-col self-center`}
        >
          <CardDescription className={`text-white`}>
            {project.description}
          </CardDescription>
          <CardAction
            className={`align-center mt-5 flex w-full flex-row justify-center gap-2`}
          >
            {project.badges.map((badge, index) => {
              return (
                <div key={`${badge.badge}_${index}`}>{badge.renderElement}</div>
              );
            })}
          </CardAction>
        </CardContent>
      )}
    </Card>
  );
}
