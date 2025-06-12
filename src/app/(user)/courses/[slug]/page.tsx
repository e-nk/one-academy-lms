import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import EnrollButton from "@/components/EnrollButton";
import getCourseBySlug from "@/sanity/lib/courses/getCourseBySlug";
import { isEnrolledInCourse } from "@/sanity/lib/student/isEnrolledInCourse";
import { auth } from "@clerk/nextjs/server";
import Container from "@/components/layouts/Container";
import { Section, ResponsiveText } from "@/components/layouts/ResponsiveUtils";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const { userId } = await auth();

  const isEnrolled =
    userId && course?._id
      ? await isEnrolledInCourse(userId, course._id)
      : false;

  if (!course) {
    return (
      <Section className="bg-background min-h-screen flex items-center">
        <Container variant="default">
          <div className="text-center">
            <ResponsiveText variant="size8" className="text-foreground mb-4">
              Course not found
            </ResponsiveText>
            <Link
              href="/"
              className="inline-flex items-center text-one-primary-teal hover:text-one-secondary-fuchsia transition-colors font-colfax font-semibold"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Courses
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {course.image && (
          <Image
            src={urlFor(course.image).url() || ""}
            alt={course.title || "Course Title"}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-one-primary-black via-one-primary-black/70 to-one-primary-black/40" />
        
        <Container variant="default" className="absolute inset-0 flex flex-col justify-end pb-12">
          <Link
            href="/"
            prefetch={false}
            className="text-white mb-8 flex items-center hover:text-one-primary-neon transition-colors w-fit font-colfax font-semibold"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Courses
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-4 py-2 bg-one-secondary-plum/90 text-white rounded-full text-xs font-colfax font-bold uppercase tracking-wider backdrop-blur-sm">
                  {course.category?.name || "Uncategorized"}
                </span>
              </div>
              
              <ResponsiveText 
                variant="size8" 
                as="h1" 
                className="text-white mb-6"
              >
                {course.title}
              </ResponsiveText>
              
              <ResponsiveText 
                variant="size4" 
                className="text-white/90 max-w-3xl leading-relaxed"
              >
                {course.description}
              </ResponsiveText>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 lg:min-w-[320px] border border-white/20">
              <ResponsiveText 
                variant="size7" 
                className="text-white mb-6 font-black"
              >
                {course.price === 0 ? "Free" : `$${course.price}`}
              </ResponsiveText>
              <EnrollButton courseId={course._id} isEnrolled={isEnrolled} />
            </div>
          </div>
        </Container>
      </div>

      {/* Content Section */}
      <Section className="bg-background">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-background rounded-xl p-8 mb-8 border border-border shadow-lg">
                <ResponsiveText 
                  variant="size6" 
                  as="h2" 
                  className="text-foreground mb-6"
                >
                  Course Content
                </ResponsiveText>
                
                <div className="space-y-6">
                  {course.modules?.map((module, index) => (
                    <div
                      key={module._id}
                      className="border border-border rounded-xl overflow-hidden bg-background hover:border-one-primary-teal/50 transition-colors"
                    >
                      <div className="p-6 bg-one-primary-teal/5 border-b border-border">
                        <ResponsiveText 
                          variant="size5" 
                          as="h3" 
                          className="text-foreground font-colfax font-bold"
                        >
                          Module {index + 1}: {module.title}
                        </ResponsiveText>
                      </div>
                      
                      <div className="divide-y divide-border">
                        {module.lessons?.map((lesson, lessonIndex) => (
                          <div
                            key={lesson._id}
                            className="p-6 hover:bg-one-primary-teal/5 transition-colors group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-one-primary-teal/10 text-one-primary-teal flex items-center justify-center font-colfax font-bold border-2 border-one-primary-teal/20 group-hover:border-one-primary-teal/40 transition-colors">
                                {lessonIndex + 1}
                              </div>
                              <div className="flex items-center gap-3 text-foreground">
                                <BookOpen className="h-5 w-5 text-one-primary-teal" />
                                <ResponsiveText 
                                  variant="size3" 
                                  className="font-colfax font-medium group-hover:text-one-primary-teal transition-colors"
                                >
                                  {lesson.title}
                                </ResponsiveText>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-background rounded-xl p-8 sticky top-8 border border-border shadow-lg">
                <ResponsiveText 
                  variant="size5" 
                  as="h2" 
                  className="text-foreground mb-6 font-colfax font-bold"
                >
                  Instructor
                </ResponsiveText>
                
                {course.instructor && (
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      {course.instructor.photo && (
                        <div className="relative h-16 w-16">
                          <Image
                            src={urlFor(course.instructor.photo).url() || ""}
                            alt={course.instructor.name || "Course Instructor"}
                            fill
                            className="rounded-full object-cover border-3 border-one-primary-teal/20"
                          />
                        </div>
                      )}
                      <div>
                        <ResponsiveText 
                          variant="size4" 
                          className="text-foreground font-colfax font-bold mb-1"
                        >
                          {course.instructor.name}
                        </ResponsiveText>
                        <ResponsiveText 
                          variant="size2" 
                          className="text-one-primary-teal font-colfax font-semibold uppercase tracking-wider"
                        >
                          Instructor
                        </ResponsiveText>
                      </div>
                    </div>
                    
                    {course.instructor.bio && (
                      <ResponsiveText 
                        variant="size3" 
                        className="text-muted-foreground leading-relaxed font-colfax"
                      >
                        {course.instructor.bio}
                      </ResponsiveText>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}