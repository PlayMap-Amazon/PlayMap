import { ArrowedButton, Button } from '../components/ui/button';

const PresentationPart = () => (
  <div className='flex-grow pt-5 pl-5'>
    <h1 className="text-5xl font-semibold tracking-tight text-nowrap text-gray-900 sm:text-7xl">
      PlayMap - Your AI Learning Companion
    </h1>
    <p className="mt-8 text-lg font-medium text-pretty text-neutral-100 sm:text-xl/8 w-[75%]">
      PlayMap turns your notes, slides, screenshots, and ideas into interactive mindmaps, stories, and games - in seconds. Powered by AI, it breaks down complex topics into simple, visual steps and lets your study through quizzes, puzzles, and create storytelling. Upload anything from a PDF to a photo - and start learning your way.
    </p>
    
    <ArrowedButton variant="secondary" className='w-50 h-10 text-xl mt-5' unroundOnHover>
      Continue
    </ArrowedButton>
  </div>
);

export default PresentationPart;