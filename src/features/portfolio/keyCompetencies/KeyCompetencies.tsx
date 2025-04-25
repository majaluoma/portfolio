import { keyCompetencies } from '@/data/keyCompetencies';

export default function KeyCompetencies() {
  return (
    <div>
      <div className="mb-6 flex w-full items-center justify-center">
        <h2 className="font-headline mb-2 text-4xl">Key Competencies</h2>
      </div>
      <div className="z-10 flex flex-wrap items-center justify-center gap-8">
        {keyCompetencies.map((competency, index) => (
          <div key={`${competency.title}_${index}`} className="w-70 lg:w-80">
            <div className="flex flex-row justify-between gap-2 mr-6">
              <h2 className="font-headline mb-2 text-2xl">{competency.title}</h2>
              {competency.badge}
            </div>
            <p>{competency.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}