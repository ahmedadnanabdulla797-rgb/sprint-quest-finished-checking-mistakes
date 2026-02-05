import { Module, LessonStatus } from './types';

export const FULL_CURRICULUM: Module[] = [
  {
    id: 'module-1',
    title: '🚀 Quest 1: Moving Around', // Changed 'Module' to 'Quest' and removed 'Coordinates'
    lessons: [
      {
        id: '1.2',
        title: 'Level 1: Treasure Hunt 💎', 
        description: 'Help the cat find the hidden treasure!', // More descriptive goal
        type: 'project',
        status: LessonStatus.AVAILABLE,
        stars: 300,
        content: 'COORDINATE_GAME'
      },
      {
        id: '1.3',
        title: 'Level 2: Secret Map Game 🗺️', // Removed 'Quiz' from title
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
    title: '✨ Quest 2: Magic Buttons', // Removed 'Module' and 'Magic Rules'
    lessons: [
      {
        id: '2.2',
        title: 'Level 1: Make a Dance 💃',
        description: 'Click buttons to make the cat move!', // Removed 'Connect rules'
        type: 'project',
        status: LessonStatus.AVAILABLE,
        stars: 400,
        content: 'EVENTS_GAME'
      },
      {
        id: '2.3',
        title: 'Level 2: Matching Game 🧩', // Removed 'Quiz'
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
    title: '🤖 Quest 3: Robot Fun', // Removed 'Robot Brains' (scary/complex)
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
        title: 'Level 3: Smart Robot 🧠', // Removed 'Thinking Robot'
        description: 'Help the robot find the walls!',
        type: 'project',
        status: LessonStatus.AVAILABLE,
        stars: 300,
        content: 'CONDITION_GAME_EASY'
      },
      {
        id: '3.4',
        title: 'Level 4: Super Brain Game 💡', // Changed 'Brain Quiz'
        description: 'Are you a master coder?',
        type: 'quiz',
        status: LessonStatus.AVAILABLE,
        stars: 150,
        content: 'QUIZ_CONDITIONS'
      }
    ]
  }
];
