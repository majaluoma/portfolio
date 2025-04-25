import pr1_todistusvalinta from '@/assets/projects/pr1_todistusvalinta/mainImage.png';
import pr4_todistusvalintaAPI from '@/assets/projects/pr4_todistusvalintaAPI/mainImage.png';
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
      'Established in 2019, popular Todistusvalinta.fi is a service which helps you to find right a suitable study program for your grades.',
    badges: [
      { badge: 'React', renderElement: <ReactBadge /> },
      { badge: 'Typescript', renderElement: <TypescriptBadge /> },
      { badge: 'Github Actions', renderElement: <GitHubActionsBadge /> },
    ],
  },
  {
    name: 'todistusvalinta API',
    mainImageUrl: pr4_todistusvalintaAPI,
    url: new URL('https://www.todistusvalinta.fi/graphql'),
    description:
      'It is more than just a backend for my site; it forms an independent service that I provide to other companies. Todistusvalinta API is a service that provides calculators for Todistusvalinta.fi, Studentum, Eezy and Jamekertaus.',
    badges: [
      { badge: 'Graphql', renderElement: <GraphqlBadge /> },
      { badge: 'Mysql', renderElement: <MysqlBadge /> },
      { badge: 'NodeJs', renderElement: <NodejsBadge /> },
      { badge: 'Typescript', renderElement: <TypescriptBadge /> },
      { badge: 'CPanel', renderElement: <CPanelBadge /> },
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
      { badge: 'CPanel', renderElement: <CPanelBadge /> },
    ],
  },
];
