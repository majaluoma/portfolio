import HoverInfo from '../../../components/customUi/HoverInfo';
import { HistoryBranch } from './types';

type HistoryNodeProps = {
  node: HistoryBranch;
};
export default function HistoryNode({ node }: Readonly<HistoryNodeProps>) {
  return (
    <HoverInfo text={node.description}>
      <div className="relative size-12 cursor-default rounded-full shadow-black hover:shadow-md hover:brightness-125">
        <img
          className="absolute h-full w-full rounded-full object-cover"
          src={node.icon}
          alt={node.name}
        />
      </div>
    </HoverInfo>
  );
}
