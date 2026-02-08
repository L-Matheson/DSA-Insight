import React from "react";
import UnitCard from "../../components/UnitCard";

const DataScienceHome = () => {
  const units = [
    {
      title: "Unit 1: Introduction to Data Science",
      subTopics: [
        "Data science workflow and methodologies",
        "Python for data science (NumPy, Pandas)",
        "Exploratory Data Analysis (EDA)",
      ],
    },
    {
      title: "Unit 2: Statistical Foundations",
      subTopics: [
        "Descriptive and inferential statistics",
        "Probability distributions and hypothesis testing",
        "Regression analysis and correlation",
      ],
    },
    {
      title: "Unit 3: Machine Learning Fundamentals",
      subTopics: [
        "Supervised vs unsupervised learning",
        "Classification and regression algorithms",
        "Model evaluation and validation",
      ],
    },
    {
      title: "Unit 4: Deep Learning & Neural Networks",
      subTopics: [
        "Neural network architectures",
        "Backpropagation and gradient descent",
        "CNNs, RNNs, and transformers",
      ],
    },
    {
      title: "Unit 5: Data Visualization",
      subTopics: [
        "Matplotlib and Seaborn basics",
        "Interactive visualizations with Plotly",
        "Dashboard creation and storytelling",
      ],
    },
    {
      title: "Unit 6: Big Data & Deployment",
      subTopics: [
        "Big data tools (Spark, Hadoop basics)",
        "Model deployment and MLOps",
        "Ethics and bias in machine learning",
      ],
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ display: "flex", textAlign: "left" }}>1. Covered Topics</h2>
        <ul style={{ lineHeight: "1.8", textAlign: "left", fontSize: "1.1em" }}>
          <li>Apply statistical methods to analyze and interpret data</li>
          <li>Build and evaluate machine learning models for prediction and classification</li>
          <li>Create effective data visualizations to communicate insights</li>
          <li>Process and manipulate large datasets using Python libraries</li>
          <li>Understand deep learning architectures and their applications</li>
          <li>Deploy machine learning models in production environments</li>
        </ul>
      </div>

      {/* Course Topics */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ display: "flex", textAlign: "left" }}>2. Course Topics</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {units.map((unit, index) => (
            <UnitCard key={index} title={unit.title} topics={unit.subTopics} />
          ))}
        </div>
      </div>

      {/* Python Libraries Reference */}
      <div style={{ marginBottom: "40px", padding: "20px", borderRadius: "8px", textAlign: "left" }}>
        <h2>3. Essential Python Libraries</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <div>
            <strong>NumPy:</strong> Numerical computing and array operations
          </div>
          <div>
            <strong>Pandas:</strong> Data manipulation and analysis
          </div>
          <div>
            <strong>Scikit-learn:</strong> Machine learning algorithms and tools
          </div>
          <div>
            <strong>Matplotlib/Seaborn:</strong> Data visualization libraries
          </div>
          <div>
            <strong>TensorFlow/PyTorch:</strong> Deep learning frameworks
          </div>
          <div>
            <strong>Jupyter:</strong> Interactive computing environment
          </div>
        </div>
      </div>

      {/* Key Topics Covered */}
      <div style={{ marginBottom: "40px" }}>
        <h2>4. Key Techniques & Algorithms</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Supervised Learning</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>Linear & Logistic Regression</li>
              <li>Decision Trees & Random Forests</li>
              <li>Support Vector Machines (SVM)</li>
            </ul>
          </div>

          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Unsupervised Learning</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>K-Means & Hierarchical Clustering</li>
              <li>Principal Component Analysis (PCA)</li>
              <li>Anomaly Detection</li>
            </ul>
          </div>

          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Deep Learning</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>Feedforward Neural Networks</li>
              <li>Convolutional Neural Networks (CNNs)</li>
              <li>Recurrent Neural Networks (RNNs)</li>
            </ul>
          </div>

          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Statistical Analysis</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>Hypothesis Testing (t-tests, ANOVA)</li>
              <li>Time Series Analysis</li>
              <li>A/B Testing & Experimentation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Practice Resources */}
      <div style={{ marginBottom: "40px" }}>
        <h2>5. Practice & Resources</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Datasets & Projects</h3>
            <ul>
              <li>Kaggle competitions and datasets</li>
              <li>UCI Machine Learning Repository</li>
              <li>Course project assignments</li>
            </ul>
          </div>

          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Online Platforms</h3>
            <ul>
              <li>DataCamp interactive courses</li>
              <li>Coursera ML specializations</li>
              <li>Google Colab notebooks</li>
            </ul>
          </div>

          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Additional Resources</h3>
            <ul>
              <li>Research papers and tutorials</li>
              <li>Python documentation</li>
              <li>Community forums and blogs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataScienceHome;
