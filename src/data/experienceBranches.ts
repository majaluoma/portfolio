import uef from '@/assets/history/uef.svg';
import haagaHelia from '@/assets/history/haagaHelia.svg';
import ohjaamo from '@/assets/history/ohjaamo.svg';
import vantaa from '@/assets/history/vantaa.svg';
import coding from '@/assets/history/coding.svg';
import nurmijarvi from '@/assets/history/nurmijarvi.svg';


export const experienceBranches = [
    {
      title: 'Career counsellor',
      description: `I help people to find better-than-average solutions to life problems and discover new career paths`,
      experience: [
        {
          name: 'Tikkurila High School',
          employer: 'City of Vantaa',
          icon: vantaa,
          description:
            'Private and class counselling in all grades, Digione project.',
          startDate: new Date('2018-05-01'),
          endDate: new Date('2019-12-31'),
        },
        {
          name: 'Nurmijärvi Comprehensive school',
          employer: 'Municipality of Nurmijärvi',
          icon: nurmijarvi,
          description:
            "Counselling in all grades and responsibility for the career counseling of three special education groups.",
          startDate: new Date('2020-08-01'),
          endDate: new Date('2021-09-29'),
        },
        {
          name: 'Ohjaamo',
          employer: 'Tietoa ja neuvontaa ohjaamosta -project',
          icon: ohjaamo,
          description:
            "Holistic counseling for all youth situations, close cooperation with partners, communication and development of a project.",
          startDate: new Date('2019-07-31'),
          endDate: new Date('2020-07-31'),
        },
      ],
    },
    {
      title: 'Web Developer',
      description:
        'Informal experience in full-stack development and dev ops',
      experience: [
        {
          name: 'Entrepreneur',
          employer: 'Self-employed',
          icon: coding,
          description:
            'Web development, project management, social networking and sales',
          startDate: new Date('2019-12-01'),
        },
      ],
    },
    {
      title: 'Education',
      description: 'I will never stop learning new things',
      experience: [
        {
          name: 'Bachelor of business administration, information technology',
          employer: 'Haaga-Helia',
          icon: haagaHelia,
          description: 'I have specialized in webdevelopment but also infrastructure and cyber security',
          startDate: new Date('2021-08-01'),
        },
        {
          name: 'Master of education, career counselling',
          employer: 'UEF',
          icon: uef,
          description: 'Included psychology, philosophy, educational governance, and ICT studies',
          startDate: new Date('2014-08-01'),
          endDate: new Date('2019-05-01'), // Currently working
        },
      ],
    },
  ];