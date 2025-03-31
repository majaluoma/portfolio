import { useState, useEffect } from 'react';
import natureImage1 from '@/assets/natureImage1.jpeg';

export default function FadingPictureBackground() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight - 170; // Adjust based on how quickly you want the fade
      const newOpacity = Math.max(1 - scrollY / maxScroll,0.1); // Fade out as you scroll
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="z-0 h-screen w-full overflow-hidden transition-opacity duration-500 ease-out mb-50"
    >
      <img
        className="fixed left-0 h-screen w-full object-cover"
        src={natureImage1}
        alt="nature"
        style={{ opacity: opacity }}
      />
      <div className="relative top-0 z-10 flex flex-row justify-between md:text-xl sm:text-lg ml-12 md:ml-16 lg:ml-40">
        <div className="lg:ml-12 md:ml-12 sm:ml-3 ml-2 flex h-screen flex-col flex-wrap justify-between gap-10 overflow-visible min-w-0">
          <h1 className="mt-20 text-wrap text-4xl font-bold">
            Suomalaista ohjelmistotekniikkaa
          </h1>
          <div className="text-card mb-40 flex flex-col gap-2 font-bold text-2xl">
            <p>Tradenomi, tietojenkäsittely </p>
            <p>Kasvatustieteiden maisteri</p>
          </div>
        </div>
      </div>
    </div>
  );
}
