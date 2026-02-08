import React from "react";
import courseHandler from "../handlers/courseHandler";
import PageTitle from "../components/PageTitle";
import PageDesc from "../components/PageDesc";
const ContentRoot = ({ title }: { title: string }) => {
  const course = courseHandler.findByTitle(title);

  if (!course) {
    return <div>Course not found</div>;
  } else {
    return (
      <div>
        <PageTitle title={course.title} />
        <PageDesc description={course.description} />
        <course.homepage />
        {/* Loops through gathered questions and chapters from the backend, depending where the questions are found */}
      </div>
    );
  }
};

export default ContentRoot;
