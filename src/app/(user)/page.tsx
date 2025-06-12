import HomePage from '@/components/home/HomePage';
import FeaturedCourses from '@/components/home/FeaturedCourses';

export const dynamic = "force-static";
export const revalidate = 3600; // revalidate at most every hour

export default async function Home() {
  return (
    <div>
      <HomePage />
      <FeaturedCourses />
    </div>
  );
}