import React, { useEffect, useState } from 'react';
import { HistoryBranch } from './types';
import HistoryIcon from '../workExperience.tsx/HistoryNode';

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

  useEffect(
    function drawLines() {
      if (nodeRef.current) {
        setThisNode(nodeRef.current);
      }
    },
    [nodeRef],
  );

  return (
    <div className="flex-coil flex min-w-full w-full justify-center items-center gap-20">
      <div ref={nodeRef} className="relative z-10">
        <HistoryIcon node={branch} />
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




const historyTree: HistoryBranch = {
  name: 'University',
  icon: "uez",
  description: 'Completed university studies in education and ICT.',
  branches: [
    {
      name: 'Career Counselor',
      icon: "ohjaamo",
      description:
        'Started a career as a career counselor, helping individuals navigate their professional paths.',
      branches: [
        {
          name: 'Public Sector',
          icon: "nurmijarvi",
          description:
            'Worked in the public sector, providing career guidance to students and job seekers.',
          branches: [
            {
              name: 'Public Sector',
              icon: "vantaa",
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
      icon: "coding",
      description:
        'Started an ICT business focusing on software development and consulting.',
      branches: [
        {
          name: 'Web Development',
          icon: "haagaHelia",
          description: 'Built websites and web applications for clients.',
          branches: [],
        },
      ],
    },
  ],
};