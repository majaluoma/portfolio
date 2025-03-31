/** Shown to user at the top of site
 */
export default function Header() {
  return (
    <div className="z-1 bg-primary shadow-secondary will-change-scroll:w-10 fixed top-0 z-40 flex w-screen justify-center overflow-hidden p-4 shadow-sm">
      <a href="/">
        <h1 className="bg-secondary w-min rounded-full px-3 py-0 text-center text-sm text-white">
          majaluoma.fi
        </h1>
      </a>
    </div>
  );
}
