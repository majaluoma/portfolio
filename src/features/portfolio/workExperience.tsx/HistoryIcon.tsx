type HistoryNodeProps = {
  icon: string;
};
export default function HistoryIcon({ icon }: Readonly<HistoryNodeProps>) {
  return (
      <div className="bg-primary relative size-12 cursor-default rounded-full shadow-black hover:shadow-md hover:brightness-125">
        <img
          className="absolute h-full w-full rounded-full object-cover"
          src={icon}
          alt={"experience"}
        />
      </div>
  );
}
