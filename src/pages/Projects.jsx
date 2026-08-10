import { useEffect, useState } from "react";
import conwayVideo from "../assets/projects/conway-game-of-life/GameOfLife.mp4";

function Projects() {
    const [backgroundColor, setBackgroundColor] = useState({
        r: 15,
        g: 23,
        b: 42
    });

    useEffect(() => {
        const updateBackground = () => {
            const sections = document.querySelectorAll(".project-section");

            let closestSection = null;
            let closestDistance = Infinity;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();

                const sectionCenter = rect.top + rect.height / 2;
                const screenCenter = window.innerHeight / 2;

                const distance = Math.abs(sectionCenter - screenCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = section;
                }
            });

            if (!closestSection) return;

            const nextSection = closestSection.nextElementSibling;

            const currentColor = JSON.parse(
                closestSection.dataset.color
            );

            if (!nextSection || !nextSection.classList.contains("project-section")) {
                setBackgroundColor(currentColor);
                return;
            }

            const nextColor = JSON.parse(
                nextSection.dataset.color
            );

            const currentRect = closestSection.getBoundingClientRect();
            const currentCenter =
                currentRect.top + currentRect.height / 2;

            const screenCenter = window.innerHeight / 2;

            let progress =
                (screenCenter - currentCenter) /
                (window.innerHeight / 2);

            progress = Math.max(0, Math.min(1, progress));

            const r =
                currentColor.r +
                (nextColor.r - currentColor.r) * progress;

            const g =
                currentColor.g +
                (nextColor.g - currentColor.g) * progress;

            const b =
                currentColor.b +
                (nextColor.b - currentColor.b) * progress;

            setBackgroundColor({
                r,
                g,
                b
            });
        };

        window.addEventListener("scroll", updateBackground);

        updateBackground();

        return () => {
            window.removeEventListener("scroll", updateBackground);
        };
    }, []);

    return (
        <main
            className="projects-page"
            style={{
                "--background-color": `rgb(
                    ${backgroundColor.r},
                    ${backgroundColor.g},
                    ${backgroundColor.b}
                )`
            }}
        >

            <div className="projects-background"></div>

            <section className="projects-header">

                <h1>My Projects</h1>

                <p>
                    A collection of software and programming projects I have built.
                </p>

            </section>

            <section
                className="project-section"
                data-color={JSON.stringify({
                    r: 35,
                    g: 55,
                    b: 80
                })}
            >

                <div className="project-content">

                    <div className="project-video">

                        <video
                            src={conwayVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />

                    </div>

                    <div className="project-info">

                        <h2>Conway's Game of Life</h2>

                        <p>
                            An implementation of Conway's Game of Life,
                            a cellular automaton where cells live, die,
                            and reproduce according to a set of rules.
                        </p>

                        <div className="tech-list">
                            <span>Java</span>
                        </div>

                        <button className="project-button">
                            View Project
                        </button>

                    </div>

                </div>

            </section>
            {/* TEST PROJECT */}

            <section
                className="project-section"
                data-color={JSON.stringify({
                    r: 65,
                    g: 45,
                    b: 80
                })}
            >

                <div className="project-content">

                    <div className="project-video">

                        <div className="test-video">
                            TEST PROJECT
                        </div>

                    </div>

                    <div className="project-info">

                        <h2>Test Project</h2>

                        <p>
                            This is a temporary project used to test
                            the scrolling background transition.
                        </p>

                        <div className="tech-list">
                            <span>Testing</span>
                        </div>

                        <button className="project-button">
                            Test Project
                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Projects;