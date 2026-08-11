import { useState, useRef } from "react";

function PixelForge() {

    const [image, setImage] = useState(null);

    const [dots, setDots] = useState(50000);

    const [dotSize, setDotSize] = useState(1.5);

    const [randomness, setRandomness] = useState(0.3);

    const [isGenerating, setIsGenerating] = useState(false);

    const canvasRef = useRef(null);


    const handleImageUpload = (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const imageURL = URL.createObjectURL(file);

        setImage(imageURL);

    };


    const generatePixelForge = () => {

        if (!image) return;

        setIsGenerating(true);

        const img = new Image();

        img.onload = () => {

            const canvas = canvasRef.current;

            const ctx = canvas.getContext("2d");

            const maxWidth = 900;

            let width = img.width;
            let height = img.height;


            if (width > maxWidth) {

                const scale =
                    maxWidth / width;

                width =
                    Math.round(width * scale);

                height =
                    Math.round(height * scale);

            }


            canvas.width = width;
            canvas.height = height;


            ctx.drawImage(
                img,
                0,
                0,
                width,
                height
            );


            const imageData =
                ctx.getImageData(
                    0,
                    0,
                    width,
                    height
                );


            const pixels =
                imageData.data;


            const blackPixels = [];


            for (
                let y = 0;
                y < height;
                y++
            ) {

                for (
                    let x = 0;
                    x < width;
                    x++
                ) {

                    const index =
                        (y * width + x) * 4;


                    const red =
                        pixels[index];

                    const green =
                        pixels[index + 1];

                    const blue =
                        pixels[index + 2];


                    const grayscale =
                        0.299 * red +
                        0.587 * green +
                        0.114 * blue;


                    if (grayscale < 128) {

                        blackPixels.push({
                            x,
                            y
                        });

                    }

                }

            }


            if (blackPixels.length === 0) {

                alert(
                    "No dark pixels were found in this image."
                );

                setIsGenerating(false);

                return;

            }


            /*
             * Shuffle black pixels
             */

            for (
                let i = blackPixels.length - 1;
                i > 0;
                i--
            ) {

                const j =
                    Math.floor(
                        Math.random() *
                        (i + 1)
                    );


                [
                    blackPixels[i],
                    blackPixels[j]
                ] = [
                    blackPixels[j],
                    blackPixels[i]
                ];

            }


            /*
             * White background
             */

            ctx.fillStyle = "white";

            ctx.fillRect(
                0,
                0,
                width,
                height
            );


            ctx.fillStyle = "black";


            /*
             * Draw dots
             */

            for (
                let i = 0;
                i < dots;
                i++
            ) {

                const pixel =
                    blackPixels[
                        i % blackPixels.length
                    ];


                const jitterAmount =
                    randomness * 3;


                const jitterX =
                    (Math.random() * 2 - 1) *
                    jitterAmount;


                const jitterY =
                    (Math.random() * 2 - 1) *
                    jitterAmount;


                const x =
                    pixel.x + jitterX;

                const y =
                    pixel.y + jitterY;


                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    dotSize / 2,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }


            setIsGenerating(false);

        };


        img.src = image;

    };


    return (

        <main className="pixelforge-page">


            <div className="pixelforge-tool">


                {/* HEADER */}

                <div className="pixelforge-header">

                    <h1>
                        PixelForge
                    </h1>

                    <p>
                        Transform an image into a
                        randomized monochrome
                        dot rendering.
                    </p>

                </div>



                {/* UPLOAD */}

                <div className="pixelforge-upload">

                    <label className="upload-button">

                        Upload Image

                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleImageUpload}
                        />

                    </label>

                    <span>
                        PNG or JPG
                    </span>

                </div>



                {/* IMAGE PREVIEW */}

                {image && (

                    <div className="pixelforge-preview">


                        {/* ORIGINAL */}

                        <div className="pixelforge-preview-card">

                            <h2>
                                Original
                            </h2>

                            <div className="pixelforge-image-frame">

                                <img
                                    src={image}
                                    alt="Original uploaded image"
                                />

                            </div>

                        </div>



                        {/* RESULT */}

                        <div className="pixelforge-preview-card">

                            <h2>
                                PixelForge
                            </h2>

                            <div className="pixelforge-image-frame">

                                <canvas
                                    ref={canvasRef}
                                />

                            </div>

                        </div>


                    </div>

                )}



                {/* CONTROLS */}

                <div className="pixelforge-controls">


                    {/* DOT COUNT */}

                    <div className="control">

                        <div className="control-label">

                            <span>
                                Number of dots
                            </span>

                            <span>
                                {dots.toLocaleString()}
                            </span>

                        </div>


                        <input
                            type="range"
                            min="10000"
                            max="200000"
                            step="1000"
                            value={dots}
                            onChange={(event) =>
                                setDots(
                                    Number(
                                        event.target.value
                                    )
                                )
                            }
                        />

                    </div>



                    {/* DOT SIZE */}

                    <div className="control">

                        <div className="control-label">

                            <span>
                                Dot size
                            </span>

                            <span>
                                {dotSize}px
                            </span>

                        </div>


                        <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={dotSize}
                            onChange={(event) =>
                                setDotSize(
                                    Number(
                                        event.target.value
                                    )
                                )
                            }
                        />

                    </div>



                    {/* RANDOMNESS */}

                    <div className="control">

                        <div className="control-label">

                            <span>
                                Randomness
                            </span>

                            <span>
                                {randomness}
                            </span>

                        </div>


                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={randomness}
                            onChange={(event) =>
                                setRandomness(
                                    Number(
                                        event.target.value
                                    )
                                )
                            }
                        />

                    </div>


                </div>



                {/* GENERATE */}

                <button
                    className="pixelforge-generate-button"
                    onClick={generatePixelForge}
                    disabled={!image || isGenerating}
                >

                    {isGenerating
                        ? "Generating..."
                        : "Generate PixelForge"
                    }

                </button>


            </div>

        </main>

    );

}

export default PixelForge;