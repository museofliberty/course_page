import Hero from '@/components/sections/Hero';
import Courses from '@/components/sections/Courses';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Mentor from '@/components/sections/Mentor';

export default function Home() {
  return (
    <main className='pb-2.5'>
      <Hero />
      <Courses />
      {/* <WhyChooseUs /> */}
      {/* <Mentor /> */}
    </main>
  );
}
