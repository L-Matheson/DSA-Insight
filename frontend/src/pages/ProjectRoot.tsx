import PageTitle from "../components/PageTitle";
import PageDesc from "../components/PageDesc";
import { useParams } from "react-router-dom";
import projectHandler from "../handlers/projectHandler";

const ProjectRoot = () => {
  const { "project-name": projectName } = useParams();

  const project = projectHandler.findBySlug(projectName || "");

  if (!project) {
    return (
      <div>
        <PageTitle title="Project Not Found" />
        <p style={{ padding: "20px" }}>
          The project you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageTitle title={project.name} />
      <PageDesc description={project.description} />

    
      <div style={{ marginBottom: "40px", padding: "20px" }}>
        {project.component ? (
          <project.component />
        ) : (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              border: "2px dashed #ccc",
            }}
          >
            <h3 style={{ color: "#666", margin: 0 }}>
              Project not yet implemented
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRoot;
