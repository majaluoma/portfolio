import FadingPictureBackground from './fadingPictureBackground/fadingPictureBackground';
import profileImage1 from '@/assets/profileImage1.jpeg';
import ProjectCarousel from './projectCarousel/ProjectCarousel';
import BlockView from '../../components/customUi/BlockView';
import ResumeTable from './workExperience.tsx/ResumeTable';
import ChapterSeparator from './ChapterSeparator/ChapterSeparator';

import uef from '@/assets/history/uef.svg';
import haagaHelia from '@/assets/history/haagaHelia.svg';
import ohjaamo from '@/assets/history/ohjaamo.svg';
import vantaa from '@/assets/history/vantaa.svg';
import coding from '@/assets/history/coding.svg';
import nurmijarvi from '@/assets/history/nurmijarvi.svg';

const experienceBranches = [
  {
    title: 'Career counsellor',
    description: `Holistic counselling in all youth's situations, close cooperation with partners, communication and development of a project.`,
    experience: [
      {
        name: 'Tikkurila High School',
        employer: 'City of Vantaa',
        icon: vantaa,
        decription:
          'private and class counselling in all grades, Digione-project.',
        startDate: new Date('2018-05-01'),
        endDate: new Date('2019-12-31'),
      },
      {
        name: 'Nurmijärvi Comprehensive school',
        employer: 'Municipality of Nurmijärvi',
        icon: nurmijarvi,
        decription:
          "Counselling in all grades and responsibility of three special education group's career counselling.",
        startDate: new Date('2020-08-01'),
        endDate: new Date('2021-09-29'),
      },
      {
        name: 'Ohjaamo',
        employer: 'Tietoa ja neuvontaa ohjaamosta -project',
        icon: ohjaamo,
        decription:
          "Holistic counselling in all youth's situations, close cooperation with partners, communication and development of a project.",
        startDate: new Date('2019-07-31'),
        endDate: new Date('2020-07-31'),
      },
    ],
  },
  {
    title: 'Webdeveloper',
    description:
      'Experience in server-side programming and database management.',
    experience: [
      {
        name: 'Entrepenour',
        employer: 'self-employed',
        icon: coding,
        decription:
          'Webdevelopment, project management, social networking and sales',
        startDate: new Date('2019-12-01'),
      },
    ],
  },
  {
    title: 'Education',
    description: 'Experience in CI/CD pipelines and cloud infrastructure.',
    experience: [
      {
        name: 'Bachelor of bussiness administration, information technology',
        employer: 'Haaga-Helia',
        icon: haagaHelia,
        decription: 'Containerized applications and optimized workflows.',
        startDate: new Date('2021-08-01'),
      },
      {
        name: 'Master of education, career counselling',
        employer: 'UEF',
        icon: uef,
        decription: 'Managed cloud infrastructure and deployment pipelines.',
        startDate: new Date('2014-08-01'),
        endDate: new Date('2019-05-01'), // Currently working
      },
    ],
  },
];

export default function OnePagePortfolio() {
  return (
    <div className="relative bottom-8 flex max-w-screen flex-col gap-40">
      <FadingPictureBackground />
      <BlockView variant="white">
        <div className="z-10 flex items-center">
          <div>
            <h2 className="mb-2 text-4xl">Olli Majaluoma</h2>
            <p>
              PORTFOLIO TEXT. To make the image static (or sticky) so that it
              doesn't change its position when the window is scrolled but still
              fades out, you can use the position: fixed CSS property. This
              ensures the image stays in place while the rest of the content
              scrolls.
            </p>
          </div>
          <img src={profileImage1} alt="Me" className="ml-20 h-96" />
        </div>
      </BlockView>
      <ChapterSeparator />
      <BlockView>
        <div className="mb-5 flex justify-center">
          <h1 className="self-center text-4xl font-bold">Resume</h1>
        </div>
        <div className="w-full min-w-full">
          <ResumeTable experienceBranches={experienceBranches} />
        </div>
      </BlockView>
      <ChapterSeparator />
      <BlockView>
        <div className="mb-5 flex justify-center">
          <h2 className="self-center text-4xl font-bold">Projects</h2>
        </div>
        <ProjectCarousel />
      </BlockView>
      <ChapterSeparator />
      <BlockView>
      <p className='text-xl'>Etsin työpaikkaa ja/tai harjoittelupaikkaa elokuusta 2025 lähtien. 👉 olli@majaluoma.fi</p>
      </BlockView>
    </div>
  );
}
