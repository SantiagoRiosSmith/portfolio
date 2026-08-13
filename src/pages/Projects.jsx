import { useEffect, useState } from "react";

import conwayVideo from "../assets/projects/conway-game-of-life/GameOfLife.mp4";
import arduinoVideo from "../assets/projects/conway-arduino/conway-arduino.mp4";

import originalPhoto from "../assets/projects/pixelforge/originalPhoto.jpeg";
import pixelForgeImage from "../assets/projects/pixelforge/GitHubPFP.png";
import { Link } from "react-router-dom";

function Projects() {

    const [backgroundColor, setBackgroundColor] = useState({
        r: 15,
        g: 23,
        b: 42
    });

    useEffect(() => {

        let targetColor = {
            r: 15,
            g: 23,
            b: 42
        };

        let animationFrame;


        const updateTargetColor = () => {

            const sections =
                document.querySelectorAll(".project-section");


            let closestSection = null;
            let closestDistance = Infinity;


            sections.forEach((section) => {

                const rect =
                    section.getBoundingClientRect();

                const sectionCenter =
                    rect.top + rect.height / 2;

                const screenCenter =
                    window.innerHeight / 2;

                const distance =
                    Math.abs(
                        sectionCenter - screenCenter
                    );


                if (distance < closestDistance) {

                    closestDistance = distance;
                    closestSection = section;

                }

            });


            if (!closestSection) return;


            const nextSection =
                closestSection.nextElementSibling;


            const currentColor =
                JSON.parse(
                    closestSection.dataset.color
                );


            /*
             * If there is no next project,
             * stay on the current project's color.
             */

            if (
                !nextSection ||
                !nextSection.classList.contains(
                    "project-section"
                )
            ) {

                targetColor = currentColor;

                return;

            }


            const nextColor =
                JSON.parse(
                    nextSection.dataset.color
                );


            const currentRect =
                closestSection.getBoundingClientRect();


            const currentCenter =
                currentRect.top +
                currentRect.height / 2;


            const screenCenter =
                window.innerHeight / 2;


            /*
             * Calculate how far we have moved
             * from the current project toward
             * the next project.
             *
             * Larger number = slower,
             * more gradual transition.
             */

            let progress =
                (screenCenter - currentCenter) /
                (window.innerHeight * 1.5);


            progress =
                Math.max(
                    0,
                    Math.min(1, progress)
                );


            /*
             * Calculate the target RGB color.
             */

            targetColor = {

                r:
                    currentColor.r +
                    (nextColor.r -
                        currentColor.r) *
                        progress,

                g:
                    currentColor.g +
                    (nextColor.g -
                        currentColor.g) *
                        progress,

                b:
                    currentColor.b +
                    (nextColor.b -
                        currentColor.b) *
                        progress

            };

        };


        /*
         * Smoothly move the actual background
         * toward the target color.
         */

        const animateColor = () => {

            setBackgroundColor((current) => ({

                r:
                    current.r +
                    (targetColor.r -
                        current.r) *
                        0.04,

                g:
                    current.g +
                    (targetColor.g -
                        current.g) *
                        0.04,

                b:
                    current.b +
                    (targetColor.b -
                        current.b) *
                        0.04

            }));


            animationFrame =
                requestAnimationFrame(
                    animateColor
                );

        };


        /*
         * Update the target whenever
         * the user scrolls.
         */

        window.addEventListener(
            "scroll",
            updateTargetColor
        );


        /*
         * Calculate the initial color.
         */

        updateTargetColor();


        /*
         * Start smooth animation.
         */

        animationFrame =
            requestAnimationFrame(
                animateColor
            );


        /*
         * Cleanup when leaving the page.
         */

        return () => {

            window.removeEventListener(
                "scroll",
                updateTargetColor
            );

            cancelAnimationFrame(
                animationFrame
            );

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


            {/* PAGE HEADER */}

            <section className="projects-header">

                <h1>
                    My Projects
                </h1>

                <p>
                    A collection of software and programming
                    projects I have built.
                </p>

            </section>



            {/* PIXELFORGE */}

            <section
                className="project-section pixelforge-section"
                data-color={JSON.stringify({
                    r: 35,
                    g: 35,
                    b: 35
                })}
            >

                <div className="pixelforge-content">


                    <div className="project-title">

                        <h2>
                            PixelForge
                        </h2>

                        <span className="project-date">
                            Jan 2026
                        </span>

                    </div>



                    <div className="pixelforge-images">


                        <div className="pixelforge-image">

                            <img
                                src={originalPhoto}
                                alt="Original image before PixelForge"
                            />

                            <span>
                                Original
                            </span>

                        </div>



                        <div className="pixelforge-arrow">
                            →
                        </div>



                        <div className="pixelforge-image">

                            <img
                                src={pixelForgeImage}
                                alt="Image processed by PixelForge"
                            />

                            <span>
                                PixelForge
                            </span>

                        </div>


                    </div>



                    <div className="pixelforge-description">

                        <p>
                            A C++ and OpenGL application
                            that transforms JPG and PNG
                            images into monochrome
                            dot-based renderings. The
                            program analyzes image pixels
                            and uses OpenGL to generate a
                            randomized point-based
                            representation.
                        </p>



                        <div className="pixelforge-bottom">

                            <div className="tech-list">

                                <span>C++</span>
                                <span>OpenGL</span>
                                <span>GLFW</span>

                            </div>

                            <div className="pixelforge-buttons">

                                <button className="project-button">
                                    Learn More
                                </button>

                                <Link
                                    to="/pixelforge"
                                    className="project-button try-pixelforge-button"
                                >
                                    Try the Web Version
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>



            {/* CONWAY'S GAME OF LIFE */}

            <section
                className="project-section"
                data-color={JSON.stringify({
                    r: 45,
                    g: 75,
                    b: 115
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


                        <div className="project-title">

                            <h2>
                                Conway's Game of Life
                            </h2>

                            <span className="project-date">
                                Dec 2024 & Jun 2025
                            </span>

                        </div>



                        <p>
                            An implementation of Conway's
                            Game of Life, a cellular
                            automaton where cells live,
                            die, and reproduce according
                            to a set of rules.
                        </p>



                        <div className="tech-list">

                            <span>
                                Java
                            </span>

                        </div>



                        <Link
                            to="/conways-game-of-life"
                            className="project-button"
                        >
                            Learn More
                        </Link>


                    </div>


                </div>

            </section>



            {/* ARDUINO CONWAY'S GAME OF LIFE */}

            <section
                className="project-section"
                data-color={JSON.stringify({
                    r: 35,
                    g: 110,
                    b: 95
                })}
            >

                <div className="project-content">


                    <div className="project-video arduino-video">

                        <video
                            src={arduinoVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />

                    </div>



                    <div className="project-info">


                        <div className="project-title">

                            <h2>
                                Conway's Game of Life — Arduino
                            </h2>

                            <span className="project-date">
                                Dec 2024 & Jun 2025
                            </span>

                        </div>



                        <p>
                            A physical implementation
                            of Conway's Game of Life
                            using an Arduino,
                            breadboards, and LEDs.
                        </p>



                        <div className="tech-list">

                            <span>
                                Arduino
                            </span>

                            <span>
                                Electronics
                            </span>

                        </div>



                        <Link
                            to="/conways-game-of-life"
                            className="project-button"
                        >
                            Learn More
                        </Link>


                    </div>


                </div>

            </section>


        </main>

    );

}


export default Projects;