type HistoryNodeProps = {
  icon: string;
};
export default function HistoryIcon({ icon }: Readonly<HistoryNodeProps>) {
  return (
      <div className="bg-primary relative h-15 w-15 cursor-default rounded-full shadow-black hover:shadow-md hover:brightness-125">
        <img
          className="absolute h-15 w-15 rounded-full object-cover "
          src={icon}
          alt={"experience"}
        />
      </div>
  );
}
