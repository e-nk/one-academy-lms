import { CourseCard } from "@/components/courses/CourseCard";
import { getCourses } from "@/sanity/lib/courses/getCourses";
import Container from "@/components/layouts/Container";
import { Section, ResponsiveText } from "@/components/layouts/ResponsiveUtils";

export default async function FeaturedCourses() {
  const courses = await getCourses();
  
  return (
    <Section smallSection className="bg-background">
      <Container variant="default">
        {/* Section Title with Decorative Lines */}
        <div className="flex items-center gap-6 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-one-primary-teal/30 to-transparent" />
          <ResponsiveText 
            variant="size6" 
            className="text-center text-foreground" 
            uppercase
          >
            Featured Courses
          </ResponsiveText>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-one-primary-teal/30 to-transparent" />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              href={`/courses/${course.slug}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}