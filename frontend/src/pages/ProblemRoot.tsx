import React, { use, useEffect, useRef } from "react";
import courseHandler from "../handlers/courseHandler";
import PageTitle from "../components/PageTitle";
import PageDesc from "../components/PageDesc";
import { useParams } from "react-router-dom";
import type { Course } from "../interfaces/course";

const ProblemRoot = () => {
  const {
    "course-title": courseTitle,
    chapter: chapter,
    question: question,
  } = useParams();

  const course: React.RefObject<Course | undefined> = useRef(undefined);
  const courseChapter: React.RefObject<string> = useRef('')
  const chapterQuestion: React.RefObject<string> = useRef('')

  useEffect(() => {
    if (courseTitle && chapter && question) {
    course.current = courseHandler.findByTitle(courseTitle);
    courseChapter.current = chapter;
    chapterQuestion.current = question;  
    }
    return () => {
      console.log("Component is unmounting. Cleanup done.");
    };
  }, []);

  // Note, the url is /:course/:chapter/:question

  if (!course.current) {
    return <div>Course not found</div>;
  } else {
    return (
      <div>
        <PageTitle title={course.current.title} />
        <PageDesc description={course.current.description} />
        <course.current.homepage />
      </div>
    );
  }
};

export default ProblemRoot;
