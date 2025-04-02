import { Button } from '../../../components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../../components/ui/hover-card';
import HistoryIcon from './HistoryIcon';
import { CalendarIcon } from 'lucide-react';
import { CalendarX } from 'lucide-react';
import { Experience } from './ResumeTable';

type ExperienceCardProps = {
  experience: Experience;
};

export default function ExperienceCard({
  experience,
}: Readonly<ExperienceCardProps>) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{experience.name}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-90">
        <div className="flex justify-between space-x-4">
          <div>
          <HistoryIcon icon={experience.icon} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{experience.name}</h4>
            <p className="text-sm">{experience.description}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-muted-foreground text-xs">
                {experience.startDate.toLocaleDateString()}
              </span>
            </div>
            {experience.endDate && (
              <div className="flex items-center pt-2">
                <CalendarX className="mr-2 h-4 w-4 opacity-70" />{' '}
                <span className="text-muted-foreground text-xs">
                  {experience.endDate.toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
