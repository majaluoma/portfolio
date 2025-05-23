import natureImage1 from '@/assets/natureImage1.jpeg';
import FadingBackground from '@/components/customUi/FadingBackgorund';

export default function PortfolioTitle() {

  return (
    <div className="z-0 mb-50 h-screen w-full overflow-hidden transition-opacity duration-500 ease-out">
     <FadingBackground image={natureImage1} />
      <div className="relative top-0 z-10 m-4 flex flex-row justify-between sm:ml-8 sm:text-lg md:ml-16 md:text-xl lg:ml-30">
        <div className="ml-2 flex h-screen min-w-0 flex-col flex-wrap justify-between gap-10 overflow-visible sm:ml-3 md:ml-12 lg:ml-12">
          <div className="mt-20">
            <h1 className="font-headline text-6xl font-bold">
              Software and web development from Finland <br /> <br />
              <div className="font-headline text-card w-fit rounded-3xl p-2 text-xl font-bold shadow-2xl backdrop-brightness-75 md:bg-none lg:bg-none">
                <p>Business administration, Information technology </p>
                <p>Master in education, Career counselling</p>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
