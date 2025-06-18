import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/images/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      {/* Section Title */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Image Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] "
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to empower every individual with access to quality
            products through a seamless and enjoyable shopping experience. We
            are committed to delivering exceptional value, promoting innovation,
            and continuously enhancing our platform to meet the evolving needs
            of our customers. At the heart of our mission lies a dedication to
            customer satisfaction, ethical practices, and a relentless pursuit
            of excellence in everything we do.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        {/* Quality Assurance */}
        <div className="border bd-g px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance :</b>
          <p className="text-gray-600">
            We are dedicated to offering only the finest products, rigorously
            tested and sourced from trusted suppliers. Our quality assurance
            process ensures that every item meets high standards of durability,
            reliability, and customer satisfaction.
          </p>
        </div>

        {/* Convenience */}
        <div className="border bd-g px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience :</b>
          <p className="text-gray-600">
            From effortless browsing to fast and secure checkout, our platform
            is designed for a smooth shopping experience. With easy navigation,
            personalized recommendations, and prompt delivery, we make shopping
            simple and stress-free.
          </p>
        </div>

        {/* Exceptional Customer Service */}
        <div className="border bd-g px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service :</b>
          <p className="text-gray-600">
            We believe in putting our customers first. Our dedicated support
            team is available to assist with any inquiries, ensuring that every
            interaction is helpful, friendly, and resolves your needs promptly
            and professionally.
          </p>
        </div>
      </div>
      <NewsLetterBox  />
    </div>
  );
};

export default About;
