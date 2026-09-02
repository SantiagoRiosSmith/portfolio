function Contact() {
    return (
        <div className="contact-page">

            <div className="purple-circle"></div>
            <div className="yellow-diamond"></div>
            <div className="blue-circle"></div>
            <div className="green-rectangle"></div>

            <div className="contact-content">

                <h1>Contact Me</h1>

                <p className="contact-intro">
                    If you'd like to get in touch with me, feel free to reach
                    out through email or connect with me on GitHub.
                </p>

                <div className="contact-cards">

                    <div className="contact-card">
                        <h2>Email</h2>
                        <p>
                            <a href="mailto:riossmithsantiago@gmail.com">
                                riossmithsantiago@gmail.com
                            </a>
                        </p>
                    </div>

                    <div className="contact-card">
                        <h2>GitHub</h2>
                        <p>
                            <a
                                href="https://github.com/SantiagoRiosSmith"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                github.com/SantiagoRiosSmith
                            </a>
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Contact;