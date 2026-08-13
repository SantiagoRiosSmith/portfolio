import { useEffect, useState } from "react";
import "./ConwaysGameOfLife.css";

const SIZE = 16;
const GENERATION_TIME = 400;

// --------------------------------------------------
// CREATE RANDOM GRID
// Matches createRandomStartGrid() from Java
// --------------------------------------------------

function createRandomGrid() {
    return Array.from(
        { length: SIZE },
        () =>
            Array.from(
                { length: SIZE },
                () => Math.random() < 0.5 ? 1 : 0
            )
    );
}

// --------------------------------------------------
// COPY GRID
// Matches copyGrid() from Java
// --------------------------------------------------

function copyGrid(grid) {
    return grid.map(row => [...row]);
}

// --------------------------------------------------
// CHECK NEIGHBOURS
// Matches checkNeighbours() from Java
// --------------------------------------------------

function checkNeighbours(grid, row, column) {

    let neighbours = 0;

    // ----------------------------------------------
    // Top-left through bottom-right
    // ----------------------------------------------

    for (
        let rowOffset = -1;
        rowOffset <= 1;
        rowOffset++
    ) {

        for (
            let columnOffset = -1;
            columnOffset <= 1;
            columnOffset++
        ) {

            // Don't count the current cell
            if (
                rowOffset === 0 &&
                columnOffset === 0
            ) {
                continue;
            }

            const newRow =
                row + rowOffset;

            const newColumn =
                column + columnOffset;

            // Ignore cells outside the 16x16 board
            if (
                newRow >= 0 &&
                newRow < SIZE &&
                newColumn >= 0 &&
                newColumn < SIZE
            ) {

                if (
                    grid[newRow][newColumn] === 1
                ) {
                    neighbours++;
                }

            }

        }

    }

    return neighbours;
}

// --------------------------------------------------
// CALCULATE NEXT GENERATION
// Matches the rules inside your Java main loop
// --------------------------------------------------

function calculateNextGeneration(grid) {

    const nextGrid = Array.from(
        { length: SIZE },
        () => Array(SIZE).fill(0)
    );

    for (let i = 0; i < SIZE; i++) {

        for (let j = 0; j < SIZE; j++) {

            const onNeighbours =
                checkNeighbours(
                    grid,
                    i,
                    j
                );

            // --------------------------------------
            // Fewer than 2 neighbours
            // Cell dies
            // --------------------------------------

            if (onNeighbours < 2) {

                nextGrid[i][j] = 0;

            }

            // --------------------------------------
            // More than 3 neighbours
            // Cell dies
            // --------------------------------------

            else if (onNeighbours > 3) {

                nextGrid[i][j] = 0;

            }

            // --------------------------------------
            // Exactly 2 or 3 neighbours
            // --------------------------------------

            else if (
                onNeighbours === 2 ||
                onNeighbours === 3
            ) {

                // Current cell is alive
                // It survives
                if (grid[i][j] === 1) {

                    nextGrid[i][j] = 1;

                }

                // Current cell is dead
                // and has exactly 3 neighbours
                // It becomes alive
                else if (onNeighbours === 3) {

                    nextGrid[i][j] = 1;

                }

            }

        }

    }

    return nextGrid;
}

// --------------------------------------------------
// GRID COMPARISON
// Matches copyGridCheck() and the other
// generation comparison methods from Java
// --------------------------------------------------

function gridsEqual(gridA, gridB) {

    for (let i = 0; i < SIZE; i++) {

        for (let j = 0; j < SIZE; j++) {

            if (
                gridA[i][j] !==
                gridB[i][j]
            ) {

                return false;

            }

        }

    }

    return true;
}

// --------------------------------------------------
// CHECK IF GRID IS EMPTY
// Matches gridEmpty()
// --------------------------------------------------

function gridEmpty(grid) {

    for (let i = 0; i < SIZE; i++) {

        for (let j = 0; j < SIZE; j++) {

            if (
                grid[i][j] !== 0
            ) {

                return false;

            }

        }

    }

    return true;
}

// --------------------------------------------------
// CHECK IF GRID IS FULL
// Matches gridFull()
// --------------------------------------------------

function gridFull(grid) {

    for (let i = 0; i < SIZE; i++) {

        for (let j = 0; j < SIZE; j++) {

            if (
                grid[i][j] !== 1
            ) {

                return false;

            }

        }

    }

    return true;
}

// --------------------------------------------------
// INSERT RANDOM 4x4 GRID
// Matches insertAddGrid() from Java
// --------------------------------------------------

function insertRandom4x4(grid) {

    const newGrid =
        copyGrid(grid);

    // ----------------------------------------------
    // Create the 4x4 random grid
    // Matches:
    //
    // int value = new Random().nextInt(2);
    // ----------------------------------------------

    const addGrid = Array.from(
        { length: 4 },
        () =>
            Array.from(
                { length: 4 },
                () =>
                    Math.random() < 0.5
                        ? 1
                        : 0
            )
    );

    // ----------------------------------------------
    // Java:
    //
    // new Random().nextInt(13)
    //
    // produces 0 through 12.
    // ----------------------------------------------

    const insertX =
        Math.floor(
            Math.random() * 13
        );

    const insertY =
        Math.floor(
            Math.random() * 13
        );

    // ----------------------------------------------
    // Insert the random 4x4 pattern
    // Only overwrite cells that are currently 0.
    //
    // Matches your Java code.
    // ----------------------------------------------

    for (let i = 0; i < 4; i++) {

        for (let j = 0; j < 4; j++) {

            if (
                newGrid[
                    i + insertX
                ][
                    j + insertY
                ] === 0
            ) {

                newGrid[
                    i + insertX
                ][
                    j + insertY
                ] =
                    addGrid[i][j];

            }

        }

    }

    return newGrid;
}

// --------------------------------------------------
// CONWAY'S GAME OF LIFE
// --------------------------------------------------

function ConwaysGameOfLife() {

    const [grid, setGrid] =
        useState(
            createRandomGrid()
        );

    const [generation, setGeneration] =
        useState(0);

    // --------------------------------------------------
    // GAME LOOP
    // --------------------------------------------------

    useEffect(() => {
        window.scrollTo(0, 0);

        /*
         * Your Java program keeps:
         *
         * grid
         * checkDoublesGrid
         * checkTriplesGrid
         * checkQuadruplesGrid
         * checkQuintuplesGrid
         * checkSextuplesGrid
         * checkSeptuplesGrid
         * checkOctuplesGrid
         * nine
         * ten
         * eleven
         * twelve
         * thirteen
         * fourteen
         *
         * These represent previous generations.
         *
         * We represent those same generations
         * with this history array.
         */

        const history = [];

        const interval =
            setInterval(() => {

                setGrid(currentGrid => {

                    // ----------------------------------
                    // Calculate the next generation
                    // ----------------------------------

                    const nextGrid =
                        calculateNextGeneration(
                            currentGrid
                        );

                    // ----------------------------------
                    // Java checks:
                    //
                    // copyGridCheck()
                    // copyGridDoubleCheck()
                    // copyGridTripleCheck()
                    // ...
                    // copyGridFourteenCheck()
                    //
                    // This asks:
                    //
                    // "Does nextGrid match any
                    // previous generation?"
                    // ----------------------------------

                    let repeated = false;

                    for (
                        let i = 0;
                        i < history.length;
                        i++
                    ) {

                        if (
                            gridsEqual(
                                nextGrid,
                                history[i]
                            )
                        ) {

                            repeated = true;
                            break;

                        }

                    }

                    // ----------------------------------
                    // REPEATING PATTERN DETECTED
                    // ----------------------------------

                    if (repeated) {

                        // --------------------------------
                        // Matches:
                        //
                        // if(gridEmpty() || gridFull())
                        // --------------------------------

                        if (
                            gridEmpty(nextGrid) ||
                            gridFull(nextGrid)
                        ) {

                            /*
                             * Java:
                             *
                             * createRandomStartGrid();
                             * printGrid();
                             * continue;
                             *
                             * IMPORTANT:
                             *
                             * We do NOT clear history here.
                             *
                             * The Java program does not
                             * clear any of its generation
                             * history when it creates a
                             * random starting grid.
                             */

                            return createRandomGrid();

                        }

                        // --------------------------------
                        // Otherwise insert random 4x4
                        // patterns.
                        //
                        // Java:
                        //
                        // while(true) {
                        //
                        //     int value =
                        //         new Random().nextInt(3);
                        //
                        //     if(value != 2) {
                        //         insertAddGrid();
                        //     }
                        //     else {
                        //         break;
                        //     }
                        //
                        // }
                        //
                        // 0 = insert
                        // 1 = insert
                        // 2 = stop
                        //
                        // Therefore:
                        //
                        // 2/3 chance of inserting
                        // 1/3 chance of stopping
                        // --------------------------------

                        let modifiedGrid =
                            copyGrid(nextGrid);

                        while (true) {

                            const value =
                                Math.floor(
                                    Math.random() * 3
                                );

                            if (value !== 2) {

                                modifiedGrid =
                                    insertRandom4x4(
                                        modifiedGrid
                                    );

                            }
                            else {

                                break;

                            }

                        }

                        /*
                         * IMPORTANT:
                         *
                         * Do NOT clear history here.
                         *
                         * Your Java code does not clear:
                         *
                         * checkDoublesGrid
                         * checkTriplesGrid
                         * checkQuadruplesGrid
                         * ...
                         * fourteen
                         *
                         * when a repeating pattern is
                         * detected.
                         *
                         * The modified grid simply becomes
                         * the new current grid.
                         */

                        return modifiedGrid;

                    }

                    // ----------------------------------
                    // NO REPEATING PATTERN
                    // ----------------------------------

                    /*
                     * This corresponds to:
                     *
                     * copyGrid();
                     *
                     * in your Java program.
                     *
                     * The current grid gets stored
                     * in the generation history before
                     * moving to nextGrid.
                     */

                    history.push(
                        copyGrid(currentGrid)
                    );

                    // ----------------------------------
                    // Keep the same number of historical
                    // generations as the Java program.
                    //
                    // checkDoubles
                    // checkTriples
                    // checkQuadruples
                    // checkQuintuples
                    // checkSextuples
                    // checkSeptuples
                    // checkOctuples
                    // nine
                    // ten
                    // eleven
                    // twelve
                    // thirteen
                    // fourteen
                    //
                    // = 13 previous generations
                    // ----------------------------------

                    if (
                        history.length > 13
                    ) {

                        history.shift();

                    }

                    // ----------------------------------
                    // Move to next generation
                    // ----------------------------------

                    return nextGrid;

                });

                // ----------------------------------
                // Increment generation exactly once
                // every 400ms.
                // ----------------------------------

                setGeneration(
                    currentGeneration =>
                        currentGeneration + 1
                );

            }, GENERATION_TIME);

        // ------------------------------------------
        // CLEANUP
        // ------------------------------------------

        return () => {

            clearInterval(interval);

        };

    }, []);

    // --------------------------------------------------
    // DISPLAY
    // --------------------------------------------------

    return (

        <div className="conway-page">

            {/* --------------------------------------
                BACKGROUND GAME OF LIFE
            -------------------------------------- */}

            <div className="conway-background">

                <div className="conway-grid">

                    {grid.map(
                        (row, rowIndex) =>

                            row.map(
                                (
                                    cell,
                                    columnIndex
                                ) => (

                                    <div
                                        key={
                                            `${rowIndex}-${columnIndex}`
                                        }

                                        className={
                                            cell === 1
                                                ? "conway-cell alive"
                                                : "conway-cell dead"
                                        }
                                    />

                                )
                            )

                    )}

                </div>

            </div>

            {/* INFORMATION */}

            <div className="conway-overlay">

                <div className="conway-content">

                    <h1>
                        The Game of Life
                    </h1>

                    <h2 className="conway-subtitle">
                        for "Manufactured Ecosystems"
                    </h2>

                    <span className="conway-date">
                        Dec. 2024 & Jun. 2025 &nbsp; • &nbsp; Commissioned Project
                    </span>


                    <p className="conway-intro">

                        Collaborated with the Cultural Ecosystems Services
                        team for the "Manufactured Ecosystems" exhibition,
                        a transdisciplinary project exploring climate
                        adaptation through art and technology.

                    </p>


                    {/* HOW IT WORKS */}

                    <div className="conway-section">

                        <h2>
                            The Game of Life
                        </h2>

                        <p>

                            The technical design and build replicates John
                            Conway's "The Game of Life", a cellular automaton
                            controlled by four simple rules applied to each
                            cell in the simulation.

                        </p>


                        <div className="conway-rules">

                            <div>

                                <strong>
                                    1. Underpopulation
                                </strong>

                                <span>
                                    A live cell dies if it has fewer than
                                    two live neighbours.
                                </span>

                            </div>


                            <div>

                                <strong>
                                    2. Survival
                                </strong>

                                <span>
                                    A live cell with two or three live
                                    neighbours lives on.
                                </span>

                            </div>


                            <div>

                                <strong>
                                    3. Overpopulation
                                </strong>

                                <span>
                                    A live cell with more than three live
                                    neighbours dies.
                                </span>

                            </div>


                            <div>

                                <strong>
                                    4. Birth
                                </strong>

                                <span>
                                    A dead cell comes to life if it has
                                    exactly three live neighbours.
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* PROJECT DEVELOPMENT */}

                    <div className="conway-section">

                        <h2>
                            Game of Life Simulation System
                        </h2>

                        <p>

                            I designed and programmed the software system
                            to simulate a dynamic grid-based environment
                            where each cell represents an alive or dead
                            state. The system continuously calculates new
                            generations based on the surrounding cells.

                        </p>

                        <p>

                            The project was implemented as a 256-cell
                            digital Game of Life matrix, allowing
                            individually adjustable cells to accommodate
                            the non-uniform spacing of the physical display.

                        </p>

                    </div>


                    {/* HARDWARE */}

                    <div className="conway-section">

                        <h2>
                            Hardware & Installation
                        </h2>

                        <p>

                            I built and wired the hardware components for
                            the 512-LED matrix, including the breadboard,
                            creating a functional and visually engaging
                            digital art installation.

                        </p>

                        <p>

                            During the installation phase, I installed and
                            calibrated the projection equipment and created
                            a custom Java tool to adjust the dimensions of
                            the projected grid.

                        </p>

                        <p>

                            Each projected cell was individually calibrated
                            using Java to precisely align the digital grid
                            with the physical board.

                        </p>

                    </div>


                    {/* RESULT */}

                    <div className="conway-section">

                        <h2>
                            Exhibition
                        </h2>

                        <p>

                            The project was delivered ahead of the
                            two-week deadline and debuted at the University
                            of Guelph's international "Manufactured
                            Ecosystems" exhibition in June 2025.

                        </p>

                    </div>


                    {/* TECHNOLOGIES */}

                    <div className="conway-tech">

                        <span>
                            Java
                        </span>

                        <span>
                            Arduino Uno
                        </span>

                        <span>
                            Java Swing
                        </span>

                        <span>
                            LED Matrix
                        </span>

                        <span>
                            2D Arrays
                        </span>

                    </div>


                    {/* GENERATION COUNTER */}

                    <div className="conway-generation">

                        Generation {generation}

                    </div>


                </div>

            </div>
        </div>

    );
}

export default ConwaysGameOfLife;