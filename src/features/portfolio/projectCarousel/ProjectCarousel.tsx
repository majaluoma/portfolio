import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../components/ui/carousel';
import ProjectCard from './ProjectCard';
import Autoplay from 'embla-carousel-autoplay';
import { projects } from '@/data/projects';

export default function ProjectCarousel() {
  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
        startIndex: 1,
      }}
      plugins={[
        Autoplay({
          delay: 2500,
        }),
      ]}
    >
      <CarouselContent>
        {projects.map(function mapProjects(project, index) {
          return (
            <CarouselItem
              className="md:basis-2/3 lg:basis-2/3"
              key={`${project.name}_${index}`}
            >
              <ProjectCard project={project} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="hidden lg-block sm:block md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
