import { Module, LessonStatus } from './types';



export const FULL_CURRICULUM: Module[] = [

  {

    id: 'module-1',

    title: '🚀 Quest 1: Moving Around',

    lessons: [

      {

        id: '1.2',

        title: 'Level 1: Treasure Hunt 💎', 

        description: 'Help the cat find the hidden treasure!',

        type: 'project',

        status: LessonStatus.AVAILABLE,

        stars: 300,

        content: 'COORDINATE_GAME'

      },

      {

        id: '1.3',

        title: 'Level 2: Secret Map Game 🗺️',

        description: 'Do you know the secret paths?',

        type: 'quiz',

        status: LessonStatus.AVAILABLE,

        stars: 150,

        content: 'QUIZ_COORDINATES'

      }

    ]

  },

  {

    id: 'module-2',

    title: '✨ Quest 2: Magic Buttons',

    lessons: [

      {

        id: '2.2',

        title: 'Level 1: Make a Dance 💃',

        description: 'Click buttons to make the cat move!',

        type: 'project',

        status: LessonStatus.AVAILABLE,

        stars: 400,

        content: 'EVENTS_GAME'

      },

      {

        id: '2.3',

        title: 'Level 2: Matching Game 🧩',

        description: 'Find the blocks that look the same!',

        type: 'quiz',

        status: LessonStatus.AVAILABLE,

        stars: 150,

        content: 'QUIZ_EVENTS'

      }

    ]

  },

  {

    id: 'module-3',

    title: '🤖 Quest 3: Robot Fun',

    lessons: [

      {

        id: '3.1',

        title: 'Level 1: Do It Again! 🔁',

        description: 'Make the robot dance forever and ever!',

        type: 'project',

        status: LessonStatus.AVAILABLE,

        stars: 250,

        content: 'LOOP_GAME_EASY'

      },

      {

        id: '3.2',

        title: 'Level 2: Robot Loop Game ⚙️',

        description: 'Show off your robot skills!',

        type: 'quiz',

        status: LessonStatus.AVAILABLE,

        stars: 150,

        content: 'QUIZ_MODULE_3'

      },

      {

        id: '3.3',

        title: 'Level 3: Smart Robot 🧠',

        description: 'Help the robot find the walls!',

        type: 'project',

        status: LessonStatus.AVAILABLE,

        stars: 300,

        content: 'CONDITION_GAME_EASY'

      },

      {

        id: '3.4',

        title: 'Level 4: Super Brain Game 💡',

        description: 'Are you a master coder?',

        type: 'quiz',

        status: LessonStatus.AVAILABLE,

        stars: 150,

        content: 'QUIZ_CONDITIONS'

      }

    ]

  },

  {

    id: 'module-6',

    title: '🎨 Quest 6: Creative Master',

    lessons: [

      {

        id: '6.1',

        title: 'Level 1: The Big Finale 🏆',

        description: 'Combine motion, loops, and logic to create something amazing!',

        type: 'project',

        status: LessonStatus.AVAILABLE,

        stars: 500,

        content: 'CREATIVE_GAME'

      },

      {

        id: '6.2',

        title: 'Level 2: Master Coder Game 🌟',

        description: 'Show us what you learned in your journey!',

        type: 'quiz',

        status: LessonStatus.AVAILABLE,

        stars: 200,

        content: 'QUIZ_MODULE_6'

      }

    ]

  }

];

