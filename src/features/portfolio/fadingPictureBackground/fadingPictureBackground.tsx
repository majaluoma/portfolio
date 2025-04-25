import { useState, useEffect } from 'react';
import natureImage1 from '@/assets/natureImage1.jpeg';

export default function FadingPictureBackground() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight - 170; // Adjust based on how quickly you want the fade
      const newOpacity = Math.max(1 - scrollY / maxScroll, 0.1); // Fade out as you scroll
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="z-0 mb-50 h-screen w-full overflow-hidden transition-opacity duration-500 ease-out">
      <img
        className="fixed left-0 h-screen w-full object-cover"
        src={natureImage1}
        alt="nature"
        style={{ opacity: opacity }}
      />
      <div className="relative top-0 z-10 flex flex-row justify-between sm:text-lg m-4 sm:ml-8 md:ml-16 lg:ml-30 md:text-xl">
        <div className="ml-2 flex h-screen min-w-0 flex-col flex-wrap justify-between gap-10 overflow-visible sm:ml-3 md:ml-12 lg:ml-12">
          <div className="mt-20">
            <h1 className="font-headline text-6xl font-bold">
              Software and web development from Finland <br /> <br />
              <div className="font-headline text-xl font-bold bg-[#eaede9] md:bg-none lg:bg-none w-fit">
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
