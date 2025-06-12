"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Loader } from "@/components/ui/loader";
import { CourseProgress } from "@/components/courses/CourseProgress";
import {
  GetCoursesQueryResult,
  GetEnrolledCoursesQueryResult,
} from "@/sanity.types";

interface CourseCardProps {
  course:
    | GetCoursesQueryResult[number]
    | NonNullable<
        NonNullable<GetEnrolledCoursesQueryResult>["enrolledCourses"][number]["course"]
      >;
  progress?: number;
  href: string;
}

export function CourseCard({ course, progress, href }: CourseCardProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group hover:no-underline flex"
    >
      <div className="bg-background rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] border border-border hover:border-one-primary-teal flex flex-col flex-1">
        <div className="relative h-52 w-full overflow-hidden">
          {course.image ? (
            <Image
              src={urlFor(course.image).url() || ""}
              alt={course.title || "Course Image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-one-primary-black/5 dark:bg-one-primary-white/5">
              <Loader size="lg" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-one-primary-black/90 via-one-primary-black/50 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-colfax font-bold uppercase tracking-wider px-3 py-1.5 bg-one-secondary-plum/90 text-white rounded-full backdrop-blur-sm">
              {course.category?.name || "Uncategorized"}
            </span>
            {"price" in course && typeof course.price === "number" && (
              <span className="text-white font-colfax font-bold text-sm px-3 py-1.5 bg-one-primary-teal/90 rounded-full backdrop-blur-sm">
                {course.price === 0
                  ? "Free"
                  : `$${course.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}`}
              </span>
            )}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-colfax font-bold mb-3 group-hover:text-one-primary-teal transition-colors duration-300 text-foreground">
            {course.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2 flex-1 font-colfax text-sm leading-relaxed">
            {course.description}
          </p>
          <div className="space-y-4 mt-auto">
            {course.instructor && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {course.instructor.photo ? (
                    <div className="relative h-8 w-8 mr-3">
                      <Image
                        src={urlFor(course.instructor.photo).url() || ""}
                        alt={course.instructor.name || "Instructor"}
                        fill
                        className="rounded-full object-cover border-2 border-one-primary-teal/20"
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-8 mr-3 rounded-full bg-one-secondary-peach/20 flex items-center justify-center border-2 border-one-primary-teal/20">
                      <Loader size="sm" />
                    </div>
                  )}
                  <span className="text-sm text-muted-foreground font-colfax">
                    by <span className="font-medium text-foreground">{course.instructor.name}</span>
                  </span>
                </div>
                <BookOpen className="h-4 w-4 text-one-primary-teal" />
              </div>
            )}
            {typeof progress === "number" && (
              <div className="pt-2">
                <CourseProgress
                  progress={progress}
                  variant="default"
                  size="sm"
                  label="Course Progress"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}