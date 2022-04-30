import React from "react";
import teamData from "./../handle/teamData";
import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
const AboutUS = () => {
  return (
    <section className="text-white mt-20 flex flex-col items-center py-10">
      <h2 className="py-2 text-5xl uppercase font-bold ">Meet Our Team</h2>
      <p className="font-light italic ">Who are we?</p>
      <div className="flex gap-x-5 gap-y-28 mt-36 flex-wrap justify-center">
        {teamData.map((memData, i) => (
          <div
            className="bg-gray-50 relative text-gray-800 rounded-3xl text-center min-w-[13rem] flex flex-col items-center pt-16"
            key={memData.social.github + i}
          >
            <div className="w-40 absolute -top-1/2 rounded-full overflow-hidden">
              <img
                src={memData.profile}
                alt=""
                className="object-cover w-40 "
              />
            </div>
            <h3 className="font-bold text-xl ">{memData.name}</h3>
            <p>{memData.role}</p>
            <p>{memData.data}</p>
            <div className="flex w-full gap-2 bg-gray-800 text-white text-4xl mt-8 rounded-3xl px-5">
              <a href={memData.social.insta} target="_blank" className="p-2">
                <AiOutlineInstagram />
              </a>
              <a href={memData.social.twitter} target="_blank" className="p-2">
                <AiOutlineTwitter />
              </a>
              <a href={memData.social.linkedIn} target="_blank" className="p-2">
                <AiOutlineLinkedin />
              </a>
              <a href={memData.social.github} target="_blank" className="p-2">
                <AiOutlineGithub />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUS;
