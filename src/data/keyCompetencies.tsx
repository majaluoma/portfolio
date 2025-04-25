import { ReactBadge, NodejsBadge, MysqlBadge, HumanBadge } from '@/components/customUi/SkillBadges';

export const keyCompetencies = [
  {
    title: 'React',
    badge: <ReactBadge />,
    description:
      'I have extensive experience in building dynamic web applications using React. I create user-friendly interfaces in cooperation with my users and try to follow guidelines for functional programming.',
  },
  {
    title: 'Node.js',
    badge: <NodejsBadge />,
    description:
      'I specialize in server-side development using Node.js. My expertise includes managing server-side logic, ensuring security, and integrating with databases and APIs for full-stack applications.',
  },
  {
    title: 'MySQL',
    badge: <MysqlBadge />,
    description:
      'I have hands-on experience in designing and managing relational databases using MySQL. I write efficient queries, optimize database performance, and ensure sustainable and robust development databases that suit different situations.',
  },
  {
    title: 'Humans',
    badge: <HumanBadge />,
    description:
      'As a career counselor, I excel in understanding human behavior and guiding individuals toward better decisions. My communication skills are my strength also as a web developer.',
  },
];