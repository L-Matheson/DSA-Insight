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
      </div>
    );
  }
};

export default ContentRoot;
