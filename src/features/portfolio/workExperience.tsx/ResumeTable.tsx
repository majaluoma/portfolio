import { Separator } from '../../../components/ui/separator';
import ExperienceCard from './ExperienceCard';

export type Experience = {
  name: string;
  employer: string;
  icon: string;
  description: string;
  startDate: Date;
  endDate?: Date;
};

type ResumeTableProps = {
  experienceBranches: {
    title: string;
    description: string;
    experience: Experience[];
  }[];
};

export default function ResumeTable({
  experienceBranches,
}: Readonly<ResumeTableProps>) {
  return (
    <div className="flex flex-col gap-16">
      {experienceBranches.map(function mapBranches(branch, index) {
        return (
          <div key={`${branch.title}_${index}_branch`}>
            <div className="space-y-1">
              <h4 className="text-xl leading-none font-medium">
                {branch.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {branch.description}
              </p>
            </div>
            <div>
              <Separator className="my-4" />
              <div className="flex items-center space-x-4 text-sm">
                {branch.experience.map(
                  function mapExperience(experience, index) {
                    return (
                      <div
                        className="flex flex-row"
                        key={`${experience.name}_${index}_experience`}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <ExperienceCard experience={experience} />
                          <p>
                            {experience.startDate.getFullYear()}{' — '}
                            {experience.endDate
                              ? experience.endDate.getFullYear()
                              : ''}
                          </p>
                        </div>
                        <Separator orientation="vertical" />
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
