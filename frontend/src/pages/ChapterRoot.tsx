import React from "react";
import algorithmDesignHandler from "../handlers/algorithmDesignHandler";

import courseHandler from "../handlers/courseHandler";
import PageTitle from "../components/PageTitle";
import PageDesc from "../components/PageDesc";
import { useParams } from "react-router-dom";
const ChapterRoot = () => {
  const {
    "course-title": courseTitle,
    chapter: chapterTitle,
  } = useParams();

  const chapter = algorithmDesignHandler.findByTitle(chapterTitle || '');

  if (!chapter) {
    return <div>Chapter not found</div>;
  } else {
    return (
      <div>
        <PageTitle title={chapter.title} />
        <PageDesc description={chapter.description} />
        <chapter.homepage />
      </div>
    );
  }
};

export default ChapterRoot;
