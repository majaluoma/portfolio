import FadingPictureBackground from './fadingPictureBackground/fadingPictureBackground';
import profileImage1 from '@/assets/profileImage1.jpeg';
import ProjectCarousel from './projectCarousel/ProjectCarousel';
import BlockView from '../../components/customUi/BlockView';
import { HistoryBranch } from './historyTree/types';

import uefIcon from '@/assets/history/uef.jpg';
import ohjaamoIcon from '@/assets/history/ohjaamo.png';
import nurmijarviIcon from '@/assets/history/nurmijarvi.png';
import tikkurilanLukioIcon from '@/assets/history/tikkurilanLukio.jpeg';
import haagaHeliaIcon from '@/assets/history/haagaHelia.jpg';
import codingIcon from '@/assets/history/coding.jpeg';
import HistoryTree from './historyTree/HistoryTree';

const historyTree: HistoryBranch = {
  name: 'University',
  icon: uefIcon,
  description: 'Completed university studies in education and ICT.',
  branches: [
    {
      name: 'Career Counselor',
      icon: ohjaamoIcon,
      description:
        'Started a career as a career counselor, helping individuals navigate their professional paths.',
      branches: [
        {
          name: 'Public Sector',
          icon: nurmijarviIcon,
          description:
            'Worked in the public sector, providing career guidance to students and job seekers.',
          branches: [
            {
              name: 'Public Sector',
              icon: tikkurilanLukioIcon,
              description:
                'Worked in the public sector, providing career guidance to students and job seekers.',
              branches: [],
            },
          ],
        },
      ],
    },
    {
      name: 'ICT Entrepreneur',
      icon: codingIcon,
      description:
        'Started an ICT business focusing on software development and consulting.',
      branches: [
        {
          name: 'Web Development',
          icon: haagaHeliaIcon,
          description: 'Built websites and web applications for clients.',
          branches: [],
        },
      ],
    },
  ],
};

export default function OnePagePortfolio() {
  return (
    <div className="relative bottom-8 max-w-screen">
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

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl">Historia</h2>
        <HistoryTree branch={historyTree} />
      </div>

      <BlockView>
        <h2 className="mb-2 text-4xl">Projekteja</h2>
        <ProjectCarousel />
      </BlockView>
    </div>
  );
}
