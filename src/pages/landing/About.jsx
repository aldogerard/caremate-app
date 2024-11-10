import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <>
            <section className="flex flex-col h-[80vh] gap-4 justify-center bg-red-50">
                <div className="w-full h-[80vh] absolute left-0 right-0">
                    <img
                        src="https://enigmacamp.com/images/program/offline-bootcamp.webp"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="w-full h-[80vh] bg-gradient-to-br from-dark/90 via-dark/70 to-dark/50 absolute top-0"></div>
                </div>
                <div className="flex flex-col gap-4 xl:gap-10 z-10 text-light">
                    <h1 className="text-5xl xl:text-8xl leading-[1.2] xl:leading-[1.3] font-bold max-w-4xl">
                        Helping People Help Each Other
                    </h1>
                    <Link
                        to="/partner/signup"
                        className="flex justify-center items-center py-3 bg-amber-500 rounded-full w-max px-8"
                    >
                        <h1 className="xl:text-lg text-sm font-medium text-light">
                            Register Now
                        </h1>
                    </Link>
                </div>
            </section>

            <section className="pt-20 pb-16 text-dark/90 z-20">
                <h1 className="text-3xl font-medium mb-6">
                    Welcome to caremate
                </h1>
                <div className="flex flex-col xl:flex-row justify-center items-center gap-6">
                    <div className="w-full xl:w-1/2 flex flex-col gap-4 font-medium">
                        <p>
                            A platform bridging compassionate donors and trusted
                            foundations to bring lasting change to the lives of
                            underprivileged children. Our partner institutions,
                            including orphanages and child-focused foundations,
                            create campaigns to support infrastructure,
                            operational needs, and educational aid. By making it
                            easy for donors to select and contribute to the
                            campaigns that resonate with them, CareMate fosters
                            a community-driven approach to social impact.
                        </p>
                        <p>
                            To further engage our donors, CareMate offers a
                            point system where 1 point is earned for every
                            10,000 rupiahs donated, with 200 points redeemable
                            for tree donations supporting reforestation in
                            Indonesia. This unique initiative allows our donors
                            to make a positive environmental impact alongside
                            their support for children in need.
                        </p>
                    </div>
                    <div className="w-full xl:w-1/2 h-80">
                        <img
                            className="w-full h-full object-cover"
                            src="../src/assets/about us.png"
                            alt="About Us Image 1"
                        />
                    </div>
                </div>
            </section>

            <section className="pt-20 pb-16 text-dark/90 z-20">
                <h1 className="text-3xl font-medium mb-6 text-center xl:text-right">
                    How We’re Different
                </h1>
                <div className="flex flex-col xl:flex-row-reverse items-center gap-6">
                    <div className="w-full xl:w-1/2 flex flex-col gap-4 font-medium">
                        <p>
                            What truly sets CareMate apart is our unwavering
                            commitment to creating a dual-impact donation
                            experience that goes beyond traditional giving. We
                            believe that a donation should not only support
                            those in need but also leave a positive mark on the
                            world. That’s why we’ve introduced a unique feature
                            that allows donors to make a lasting environmental
                            impact through tree donations.
                        </p>
                        <p>
                            With each contribution, donors not only help
                            children in need but also support the restoration of
                            our planet. By planting trees in areas affected by
                            deforestation, every donation contributes to both
                            social change and ecological healing, creating a
                            ripple effect of positive transformation for future
                            generations. This innovative approach transforms
                            each gift into a powerful catalyst for sustainable
                            change, giving donors the opportunity to make a
                            difference on two fronts—helping children and
                            protecting the environment.
                        </p>
                    </div>
                    <div className="w-full xl:w-1/2 h-80">
                        <img
                            className="w-full h-full object-cover"
                            src="../src/assets/about us.png"
                            alt="About Us Image 1"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
