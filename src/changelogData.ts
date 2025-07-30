
import { type ChangelogEntry } from './types';

export const changelogData: ChangelogEntry[] = [
  {
    version: '1.4.0',
    date: 'July 29, 2024',
    author: '༯𝙎ค૯𝙀𝘿✘🫀',
    changes: [
      'Replaced the static theme switcher icons with new animated button graphics.',
      'Enhanced the visual flair of the header with the new theme toggle animation.'
    ],
  },
  {
    version: '1.2.0',
    date: 'July 28, 2024',
    author: '༯𝙎ค૯𝙀𝘿✘🫀',
    changes: [
      'Added a theme switcher to toggle between light and dark modes.',
      'User preference for theme is saved in local storage.',
      'Updated all components with styles for a consistent dark mode experience.',
      'Added custom icons for the theme switcher as requested.'
    ],
  },
  {
    version: '1.1.0',
    date: 'July 27, 2024',
    author: '༯𝙎ค૯𝙀𝘿✘🫀',
    changes: [
      'Added a changelog feature to track application updates.',
      'Implemented a modal to display version history, accessible from the header.',
      'Changelog now shows the latest 5 entries by default with a "Show More" option.',
    ],
  },
  {
    version: '1.0.1',
    date: 'July 26, 2024',
    author: '༯𝙎ค૯𝙀𝘿✘🫀',
    changes: [
      'Replaced the "copy" icon on prompt cards with a new, more detailed SVG for better visual clarity.',
    ],
  },
  {
    version: '1.0.0',
    date: 'July 25, 2024',
    author: '༯𝙎ค૯𝙀𝘿✘🫀',
    changes: [
      'Initial release of the TSun Veo3 Prompt Generator.',
      'Implemented core prompt generation functionality using the Gemini API.',
      'Added support for simple and detailed JSON output formats.',
      'Included customization for character limits, number of prompts, and dynamic logo name integration.',
    ],
  },
   {
    version: '0.9.5',
    date: 'July 24, 2024',
    author: '༯𝙎ค૯𝙀𝘿✘🫀',
    changes: [
      'Refined UI styling for better responsiveness on mobile devices.',
      'Improved error handling for API requests.',
    ],
  },
   {
    version: '0.9.2',
    date: 'July 22, 2024',
    author: '༯𝙎ค૯𝙀𝘿✘🫀',
    changes: [
      'Added loading spinner to the "Generate Prompts" button.',
      'Standardized color palette across all components.',
    ],
  },
   {
    version: '0.9.0',
    date: 'July 20, 2024',
    author: '༯𝙎ค૯𝙀𝘿✘🫀',
    changes: [
      'Initial setup of the React project with TypeScript.',
      'Designed the basic layout and components (Header, Controls, Prompt Cards).',
    ],
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());