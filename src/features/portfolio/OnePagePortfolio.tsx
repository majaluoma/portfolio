import FadingPictureBackground from './fadingPictureBackground/fadingPictureBackground';
import profileImage1 from '@/assets/profileImage1.jpeg';
import ProjectCarousel from './projectCarousel/ProjectCarousel';
import BlockView from '../../components/customUi/BlockView';
import ResumeTable from './workExperience.tsx/ResumeTable';
import ChapterSeparator from './ChapterSeparator/ChapterSeparator';
import { experienceBranches } from '@/data/experienceBranches';
import PageEnd from './ChapterSeparator/PageEnd';
import SocialLinks from './SocialLinks/SocialLinks';
import { HumanBadge, MysqlBadge, NodejsBadge, ReactBadge } from '@/components/customUi/SkillBadges';

export default function OnePagePortfolio() {
  return (
    <div className="relative bottom-8 flex max-w-screen flex-col gap-40">
      <FadingPictureBackground />
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
        <div className="mb-6 flex w-full items-center justify-center">
          <h2 className="font-headline mb-2 text-4xl">Key Competencies</h2>
        </div>
        <div className="z-10 flex flex-wrap items-center justify-center gap-8">
          <div className="w-70 lg:w-80">
            <div className="mr-6 flex flex-row justify-between gap-2">
              <h2 className="font-headline mb-2 text-2xl">React</h2>{' '}
              <ReactBadge />
            </div>

            <p>
              I have extensive experience in building dynamic web applications
              using React. I create user-friendly interfaces in cooperation with
              my users and try to follow guidelines for functional programming.
            </p>
          </div>
          <div className="w-70 lg:w-80">
          <div className='flex flex-row justify-between gap-2 mr-6'>
            <h2 className="font-headline mb-2 text-2xl">Node.js</h2>{' '}
            <NodejsBadge />
          </div>
            <p>
              I specialize in server-side development using Node.js. My
              expertise includes managing server-side logic, ensuring security,
              and integrating with databases and API for full-stack
              applications.
            </p>
          </div>
          <div className="w-70 lg:w-80">
          <div className='flex flex-row justify-between gap-2 mr-6'>
            <h2 className="font-headline mb-2 text-2xl">MySQL</h2>{' '}
            <MysqlBadge />
          </div>
            <p>
              I have hands-on experience in designing and managing relational
              databases using MySQL. I write efficient queries, optimizing
              database performance, and ensure sustainable and robust
              development databases that suit for different situations.
            </p>
          </div>
          <div className="w-70 lg:w-80">
          <div className='flex flex-row justify-between gap-2 mr-6'>
            <h2 className="font-headline mb-2 text-2xl">Humans</h2>
            <HumanBadge/>
          </div>
            <p>
              As a career counselor, I excel in understanding human behavior and
              guiding individuals toward better decisions. My communication
              skills are my strength also as a webdeveloper.
            </p>
          </div>
        </div>
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
