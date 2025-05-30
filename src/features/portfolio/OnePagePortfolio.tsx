import PortfolioTitle from './portfoliotitle/PortfolioTitle';
import profileImage1 from '@/assets/profileImage1.jpeg';
import ProjectCarousel from './projectCarousel/ProjectCarousel';
import BlockView from '../../components/customUi/BlockView';
import ResumeTable from './resumeTable/ResumeTable';
import ChapterSeparator from '../../components/customUi/ChapterSeparator/ChapterSeparator';
import { experienceBranches } from '@/data/experienceBranches';
import PageEnd from '../../components/customUi/ChapterSeparator/PageEnd';
import SocialLinks from '../../components/customUi/SocialLinks/SocialLinks';
import KeyCompetencies from './keyCompetencies/KeyCompetencies';

export default function OnePagePortfolio() {
  return (
    <div className="relative bottom-8 flex max-w-screen flex-col gap-40">
      <PortfolioTitle />
      <BlockView variant="white">
        <div className="z-10 flex flex-wrap items-center justify-center gap-8">
          <div className="w-70 lg:w-80">
            <h2 className="font-headline mb-2 text-4xl">Olli Majaluoma</h2>
            <p>
              I am a web developer with specialized expertise in the Finnish
              education system and career counseling. My programming interests
              include databases, infrastructure, and server-side processing. To
              me, learning is a lifelong journey that brings joy and
              fulfillment. <br /> <br /> I have been working in ICT sector for 5
              years as a part-time entrepenour and managed to build profitable
              and popular services. <br /> <br /> I am also a career counselor
              passionate about individuals' life paths and career
              decision-making skills. My work is rooted in humanistic values and
              diverse experiences across different contexts. At the heart of my
              approach is helping clients discover solutions within themselves.
            </p>
          </div>
          <img src={profileImage1} alt="Me" className="h-96" />
        </div>
      </BlockView>
      <ChapterSeparator />
      <BlockView variant="default">
        <KeyCompetencies />
      </BlockView>
      <ChapterSeparator />
      <BlockView variant="white">
        <div className="mb-5 flex justify-center">
          <h2 className="font-headline self-center text-4xl font-bold">
            Resume
          </h2>
        </div>
        <div className="w-full min-w-full">
          <ResumeTable experienceBranches={experienceBranches} />
        </div>
      </BlockView>
      <ChapterSeparator />
      <BlockView>
        <div className="mb-5 flex justify-center">
          <h2 className="font-headline self-center text-4xl font-bold">
            Projects
          </h2>
        </div>
        <ProjectCarousel />
      </BlockView>
      <ChapterSeparator />
      <BlockView variant="white">
        <p className="text-xl">
          I'm looking for a new project or trainee position starting from august
          2025. 👉 olli@majaluoma.fi
        </p>
        <SocialLinks />
      </BlockView>
      <PageEnd />
    </div>
  );
}
