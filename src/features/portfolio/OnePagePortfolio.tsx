import FadingPictureBackground from './fadingPictureBackground/fadingPictureBackground';
import profileImage1 from '@/assets/profileImage1.jpeg';
import ProjectCarousel from './projectCarousel/ProjectCarousel';
import BlockView from '../../components/customUi/BlockView';
import ResumeTable from './workExperience.tsx/ResumeTable';

const experienceBranches = [
  {
    title: "Frontend Development",
    description: "Experience in building user interfaces and web applications.",
    experience: [
      {
        name: "React Developer",
        icon: "react-icon.png",
        decription: "Developed dynamic web applications using React.",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2022-06-30"),
      },
      {
        name: "Vue.js Developer",
        icon: "vue-icon.png",
        decription: "Built reusable components and optimized performance.",
        startDate: new Date("2018-05-01"),
        endDate: new Date("2019-12-31"),
      },
    ],
  },
  {
    title: "Backend Development",
    description: "Experience in server-side programming and database management.",
    experience: [
      {
        name: "Node.js Developer",
        icon: "node-icon.png",
        decription: "Created RESTful APIs and managed server-side logic.",
        startDate: new Date("2019-01-01"),
        endDate: new Date("2021-12-31"),
      },
      {
        name: "Django Developer",
        icon: "django-icon.png",
        decription: "Developed backend systems and integrated databases.",
        startDate: new Date("2017-03-01"),
        endDate: undefined, // Currently working
      },
    ],
  },
  {
    title: "DevOps",
    description: "Experience in CI/CD pipelines and cloud infrastructure.",
    experience: [
      {
        name: "AWS Engineer",
        icon: "aws-icon.png",
        decription: "Managed cloud infrastructure and deployment pipelines.",
        startDate: new Date("2021-07-01"),
        endDate: undefined, // Currently working
      },
      {
        name: "Docker Specialist",
        icon: "docker-icon.png",
        decription: "Containerized applications and optimized workflows.",
        startDate: new Date("2020-03-01"),
        endDate: new Date("2021-06-30"),
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

      <BlockView>
        <div className="mb-5 flex justify-center">
          <h1 className="self-center text-4xl font-bold">Resume</h1>
        </div>
        <div className="w-full min-w-full">
          <ResumeTable experienceBranches={experienceBranches}/>
        </div>
      </BlockView>

      <BlockView>
        <div className="mb-5 flex justify-center">
          <h2 className="self-center text-4xl font-bold">Projects</h2>
        </div>
        <ProjectCarousel />
      </BlockView>
    </div>
  );
}
