import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../components/ui/carousel';
import ProjectCard from './ProjectCard';
import Autoplay from 'embla-carousel-autoplay';
import pr1_todistusvalinta from '@/assets/projects/pr1_todistusvalinta/mainImage.png';
import pr2_commonearth from '@/assets/projects/pr2_commonearth/mainImage.png';
import pr3_autopaikkoja from '@/assets/projects/pr3_autopaikkoja/mainImage.png';
import { ReactBadge } from '../../../components/customUi/SkillBadges';

export default function ProjectCarousel() {
  const projects = [
    {
      name: 'Todistusvalinta.fi',
      mainImageUrl: pr1_todistusvalinta,
      url: new URL('https://www.todistusvalinta.fi'),
      description: 'Todistusvalinta.fi on palvelu, joka auttaa sinua valitsemaan oikean todistuksen oikeaan tarkoitukseen.',
      badges: [{ badge: 'React', renderElement: <ReactBadge /> }],
    },
    {
      name: 'Commonearth.fi',
      mainImageUrl: pr2_commonearth,
      url: new URL('https://www.commonearth.fi'),
      description: 'Todistusvalinta.fi on palvelu, joka auttaa sinua valitsemaan oikean todistuksen oikeaan tarkoitukseen.',
      badges: [{ badge: 'React', renderElement: <ReactBadge /> }],
    },
    {
      name: 'Autopaikkoja.fi',
      mainImageUrl: pr3_autopaikkoja,
      url: new URL('https://www.autopaikkoja.fi'),
      description: 'Todistusvalinta.fi on palvelu, joka auttaa sinua valitsemaan oikean todistuksen oikeaan tarkoitukseen.',
      badges: [{ badge: 'React', renderElement: <ReactBadge /> }],
    },
  ];

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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
