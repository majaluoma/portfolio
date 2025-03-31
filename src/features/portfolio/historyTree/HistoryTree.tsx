import React, { useEffect, useState } from 'react';
import { HistoryBranch } from './types';
import HistoryNode from './HistoryNode';

type HistoryBranchIteratedProps = {
  branch: HistoryBranch;
  parent?: HTMLDivElement | null;
};

export default function HistoryTree({
  branch,
  parent,
}: Readonly<HistoryBranchIteratedProps>) {
  const nodeRef = React.createRef<HTMLDivElement>();
  const [thisNode, setThisNode] = useState<HTMLDivElement | null>(null);

  const positionYToParent = (thisNode : HTMLDivElement | null) => {
    if (!parent || !thisNode) {
      return 0;
    }
    console.log("MORONST")
    return parent.offsetTop - thisNode.offsetTop;
  };

  useEffect(
    function drawLines() {
      if (nodeRef.current) {
        setThisNode(nodeRef.current);
      }
    },
    [nodeRef],
  );

  return (
    <div className="flex-coil flex items-center gap-20">
      <div ref={nodeRef} className="relative z-10">
        <HistoryNode node={branch} />
      </div>
      {parent && thisNode && (
        <svg
          className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M${parent.offsetLeft + parent.offsetWidth / 2},${
              parent.offsetTop + parent.offsetHeight / 2
            } 
              ${parent.offsetLeft + parent.offsetWidth / 2 +20},${
              parent.offsetTop + parent.offsetHeight / 2
            }
              
              C${parent.offsetLeft + parent.offsetWidth / 2 + 100},${
                parent.offsetTop + parent.offsetHeight / 2 
              }
              ${parent.offsetLeft + parent.offsetWidth / 2 + 20},${
                thisNode.offsetTop + parent.offsetHeight / 2 
              }
              ${thisNode.offsetLeft + thisNode.offsetWidth / 2},${
                thisNode.offsetTop + thisNode.offsetHeight / 2
              }`}
            stroke="black"
            fill="none"
            strokeWidth="2"
          ></path>
        </svg>
      )}

      <div className="flex flex-col items-center gap-20">
        {branch.branches.map(function mapHistoryBranches(branch, index) {
          return (
            <HistoryTree
              key={`${branch.name}_${index}`}
              branch={branch}
              parent={thisNode}
            />
          );
        })}
      </div>
    </div>
  );
}
