import pr1_todistusvalinta from '@/assets/projects/pr1_todistusvalinta/mainImage.png';
import pr2_commonearth from '@/assets/projects/pr2_commonearth/mainImage.png';
import pr3_autopaikkoja from '@/assets/projects/pr3_autopaikkoja/mainImage.png';
import {
  AWSBadge,
  CPanelBadge,
  GitHubActionsBadge,
  GraphqlBadge,
  JavaBadge,
  MysqlBadge,
  NodejsBadge,
  PostgresBadge,
  ReactBadge,
  SpringBootBadge,
  TypescriptBadge,
  WordPressBadge,
} from '@/components/customUi/SkillBadges';

export const projects = [
  {
    name: 'Todistusvalinta.fi',
    mainImageUrl: pr1_todistusvalinta,
    url: new URL('https://www.todistusvalinta.fi'),
    description:
      'Popular Todistusvalinta.fi is a service which helps you to find right study program for your grades.',
    badges: [
      { badge: 'React', renderElement: <ReactBadge /> },
      { badge: 'Graphql', renderElement: <GraphqlBadge /> },
      { badge: 'Graphql', renderElement: <MysqlBadge /> },
      { badge: 'Graphql', renderElement: <NodejsBadge /> },
      { badge: 'Typescript', renderElement: <TypescriptBadge /> },
      { badge: 'Github Actions', renderElement: <GitHubActionsBadge /> },
    ],
  },
  {
    name: 'Commonearth.fi',
    mainImageUrl: pr2_commonearth,
    url: new URL('https://www.commonearth.fi'),
    description:
      'Website, which is planned to act as a online store for our board game to come. ',
    badges: [
      { badge: 'React', renderElement: <ReactBadge /> },
      { badge: 'AWS', renderElement: <AWSBadge /> },
      { badge: 'Github Actions', renderElement: <GitHubActionsBadge /> },
      { badge: 'Java', renderElement: <JavaBadge /> },
      { badge: 'SpringBoot', renderElement: <SpringBootBadge /> },
      { badge: 'Typescript', renderElement: <TypescriptBadge /> },
      { badge: 'Postgres', renderElement: <PostgresBadge /> },
    ],
  },
  {
    name: 'Autopaikkoja.fi',
    mainImageUrl: pr3_autopaikkoja,
    url: new URL('https://www.autopaikkoja.fi'),
    description:
      'Autopaikkoja.fi is a mini-project for a customer who is renting car spot places in Uusimaa area. Made exclusively with Wordpress using different complicated extensions',
    badges: [
      { badge: 'Wordpress', renderElement: <WordPressBadge /> },
      { badge: 'Wordpress', renderElement: <CPanelBadge /> },
    ],
  },
];
