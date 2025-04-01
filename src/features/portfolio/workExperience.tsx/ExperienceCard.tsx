import { Button } from '../../../components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../../components/ui/hover-card';
import HistoryIcon from './HistoryIcon';
import { CalendarIcon } from 'lucide-react';
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
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <HistoryIcon icon="@/assets/history/haagaHelia.svg" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{experience.name}</h4>
            <p className="text-sm">{experience.decription}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-muted-foreground text-xs">
                {experience.startDate.toISOString()}
              </span>
            </div>
            {experience.endDate && (
              <div className="flex items-center pt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
                <span className="text-muted-foreground text-xs">
                  {experience.endDate.toISOString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
