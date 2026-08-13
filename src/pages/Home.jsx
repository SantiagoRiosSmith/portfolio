import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">

    <h1>
        Santiago Rios Smith
    </h1>

    <h2>
        Computer Science Student
    </h2>

    <p className="description">
        I'm a Computer Science student at Western University
        passionate about software development, web applications,
        DevOps, and learning new technologies.
    </p>

    <div className="buttons">
        <Link to="/projects" className="hero-button">
            View Projects
        </Link>

        <button>
            Download Resume
        </button>
    </div>

</div>
  );
}

export default Home;