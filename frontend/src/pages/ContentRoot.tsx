import React from "react";
import courseHandler from "../handlers/courseHandler";
import PageTitle from "../components/PageTitle";
const ContentRoot = ({ title }: { title: string }) => {

    const course = courseHandler.findByTitle(title);

    if (!course) {
        return <div>Course not found</div>;
    } else {
    return (
        <div >
            <PageTitle title={course.title} />
        </div>
    );
    }
    
};

export default ContentRoot;
