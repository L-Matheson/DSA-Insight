import Tag from "../components/Tag";
import courseHandler from "../handlers/courseHandler";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const courses = courseHandler.getAll();
    const navigate = useNavigate();
    const features = [
        { title: "Visual Notes", description: "Comprehensive visual documentation of course concepts" },
        { title: "Code Examples", description: "Real-world implementations and practice problems" },
        { title: "Reference Hub", description: "Quick access to key concepts and algorithms" }
    ];

    return (
        <div style={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "var(--bg-primary)",
            minHeight: "100vh",
            color: "var(--text-primary)",
            paddingTop: "64px",
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            <section>
                <h1 style={{
                    fontSize: "56px",
                    fontWeight: 700,
                    marginBottom: "25px",
                    letterSpacing: "-1px",
                    background: "var(--gradient-text)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    height: "68px",
                }}>
                    CS-Insight
                </h1>
                <p style={{
                    fontSize: "20px",
                    color: "var(--text-secondary)",
                    maxWidth: "800px",
                    margin: "0 auto 40px",
                    lineHeight: "1.6"
                }}>
                    A comprehensive learning hub for Data Science, Data Structures, Algorithm Design, and Systems Programming. 
                    All notes takes over this semester will be transformed into visual notes to serve as a portfolio project.
                </p>
                <div style={{
                    display: "flex",
                    gap: "40px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginTop: "40px"
                }}>
                    {features.map((feature, index) => (
                        <div key={index} style={{
                            textAlign: "center"
                        }}
                        >
                            <div style={{
                                fontSize: "16px",
                                fontWeight: 700,
                                color: "var(--accent-primary)",
                                marginBottom: "8px"
                            }}>
                                {feature.title}
                            </div>
                            <div style={{
                                fontSize: "14px",
                                color: "var(--text-secondary)"
                            }}>
                                {feature.description}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Courses Grid */}
            <section style={{
                maxWidth: "1200px",

                padding: "60px 24px"
            }}>
                <h2 style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    marginBottom: "48px",
                    textAlign: "center",
                    letterSpacing: "-0.5px"
                }}>
                    Course Overview
                </h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px"
                }}>
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: "var(--bg-surface)",
                                border: "1px solid var(--border-subtle)",
                                borderRadius: "12px",
                                padding: "32px",
                                transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                                cursor: "pointer"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.borderColor = "var(--accent-primary)";
                                e.currentTarget.style.boxShadow = "var(--shadow-accent-sm)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "var(--border-subtle)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                            onClick={() => navigate(course.link)}
                        >
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                                {course.icon}
                            </div>
                            <h3 style={{
                                fontSize: "22px",
                                fontWeight: 700,
                                marginBottom: "12px",
                                color: "var(--text-primary)"
                            }}>
                                {course.title}
                            </h3>
                            <p style={{
                                fontSize: "14px",
                                color: "var(--text-secondary)",
                                lineHeight: "1.6",
                                marginBottom: "20px"
                            }}>
                                {course.description}
                            </p>
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px"
                            }}>
                                {course.topics.map((topic) => (                                   
                                        <Tag displayTag={topic} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "60px 24px 100px",
                textAlign: "center"
            }}>
                <h2 style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    marginBottom: "24px",
                    letterSpacing: "-0.5px"
                }}>
                    About This Project
                </h2>
                <p style={{
                    fontSize: "16px",
                    color: "var(--text-secondary)",
                    lineHeight: "1.8",
                    marginBottom: "16px"
                }}>
                    CS-Insight serves as both as notes for current semester coursework and a portfolio piece showcasing 
                    my journey through computer science fundamentals. Each section contains detailed notes, code examples, 
                    and practical implementations of concepts learned throughout the semester.
                </p>
                <p style={{
                    fontSize: "16px",
                    color: "var(--text-secondary)",
                    lineHeight: "1.8"
                }}>
                    This project demonstrates not only technical knowledge but also the ability to organize, document, 
                    and present complex information in an accessible format.
                </p>
            </section>
        </div>
    );
};

export default Home;
