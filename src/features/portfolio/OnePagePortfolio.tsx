import FadingPictureBackground from './fadingPictureBackground/fadingPictureBackground';
import profileImage1 from '@/assets/profileImage1.jpeg';
import ProjectCarousel from './projectCarousel/ProjectCarousel';
import BlockView from '../../components/customUi/BlockView';

export default function OnePagePortfolio() {
  return (
    <div className="relative bottom-8">
      <FadingPictureBackground />
      <BlockView variant="white" >
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
        <h2 className="mb-2 text-4xl">Projekteja</h2>
        <ProjectCarousel />
      </BlockView>
    </div>
  );
}
