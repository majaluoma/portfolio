import HoverInfo from './HoverInfo';

type Skill = {
  name: string;
  icon: string;
  description: string;
};

type SkillBadgeProps = {
  skill: Skill;
};

function SkillBadge({ skill }: Readonly<SkillBadgeProps>) {
  return (
    <HoverInfo text={skill.description}>
      <div className="relative size-12 rounded-full hover:brightness-125 hover:shadow-md shadow-black cursor-default">
        <img
          className="absolute h-full w-full rounded-full object-cover"
          src={skill.icon}
          alt={skill.name}
        />
      </div>
    </HoverInfo>
  );
}

export function ReactBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'React',
        icon: 'https://reactjs.org/logo-og.png',
        description:
          'React is a JavaScript library for building user interfaces.',
      }}
    />
  );
}

export function TypescriptBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'TypeScript',
        icon: 'https://www.typescriptlang.org/icons/icon-48x48.png',
        description:
          'TypeScript is a strongly typed programming language that builds on JavaScript.',
      }}
    />
  );
}

export function GraphqlBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'GraphQL',
        icon: 'https://graphql.org/img/logo.svg',
        description:
          'GraphQL is a query language for APIs and a runtime for executing those queries.',
      }}
    />
  );
}

export function NodejsBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'Node.js',
        icon: 'https://nodejs.org/static/images/logo.svg',
        description:
          "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      }}
    />
  );
}

export function MysqlBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'MySQL / MariaDB',
        icon: 'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
        description:
          'MySQL and MariaDB are open-source relational database management systems.',
      }}
    />
  );
}

export function SaltStackBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'SaltStack',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/SaltStack_logo.png',
        description:
          'SaltStack is a configuration management and orchestration tool.',
      }}
    />
  );
}

export function CPanelBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'cPanel',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/CPanel_logo.svg',
        description:
          'cPanel is a web hosting control panel software that provides a graphical interface for managing websites.',
      }}
    />
  );
}

export function WordPressBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'WordPress',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/2/20/WordPress_logo.svg',
        description:
          'WordPress is a free and open-source content management system for building websites and blogs.',
      }}
    />
  );
}

export function DockerBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'Docker',
        icon: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png',
        description:
          'Docker is a platform for developing, shipping, and running applications in containers.',
      }}
    />
  );
}

export function LinuxBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'Linux',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png',
        description:
          'Linux is an open-source operating system kernel used in a variety of distributions.',
      }}
    />
  );
}

export function GitHubActionsBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'GitHub Actions',
        icon: 'https://avatars.githubusercontent.com/u/44036562?s=200&v=4',
        description:
          'GitHub Actions is a CI/CD platform that allows you to automate your build, test, and deployment pipeline.',
      }}
    />
  );
}

export function AWSBadge() {
  return (
    <SkillBadge
      skill={{
        name: 'Amazon Web services',
        icon: 'https://logospng.org/wp-content/uploads/amazon-web-services.png',
        description:
          'Amazon Web Services is a subsidiary of Amazon providing on-demand cloud computing platforms and APIs.',
      }}
    />
  );
}
