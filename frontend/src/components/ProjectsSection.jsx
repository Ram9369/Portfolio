
"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Resume Reviewer - Personal Portfolio Template",
    description:
      "An AI-powered resume reviewer that analyzes resumes and provides feedback to help job seekers improve their chances of landing interviews.",
    image: "images/projects/6.png",
    tag: ["All", "Ai-Project 🤖"],
    gitUrl: "https://github.com/Ram9369",
    previewUrl: "#",
  },

  {
    id: 2,
    title: "BlogSmith - Personal Blog Template",
    description:
      "A refined personal brand site with premium motion and clean information architecture.",
    image: "images/projects/1.png",
    tag: ["All", "Project 🎓"],
    gitUrl: "https://github.com/Ram9369",
    previewUrl: "https://blog-smith-nu.vercel.app/",
  },

  {
    id: 3,
    title: "Ram-gpt - AI-Powered GPT-Clone",
    description:
      "A ChatGPT Clone built with AI capabilities. It provides intelligent responses and interactive conversations, About 90% accurate as Originnal ChatGPT.",
    image: "/images/GptClone.png",
    tag: ["All", "Ai-Project 🤖"],
    gitUrl: "https://github.com/Ram9369",
    previewUrl: "https://example.com",
  },

  {
    id: 4,
    title: "JobeefieUrjaTech - E-commerce Platform",

    description:
      "An E-commerce plateform which sell products and provide government schemes to the customers.",
    image: "/images/projects/2.png",
    tag: ["All", "Project 🎓"],
    gitUrl: "https://github.com/Ram9369",
    previewUrl: "https://www.jobeefieurjatech.in/",
  },

  {
    id: 5,
    title: "CaptGen - AI Powered Caption Generation",
    description:
      "An AI-powered caption generator that creates engaging and contextually relevant captions for social media posts, enhancing user engagement and content reach.",
    image: "/images/capGen.png",
    tag: ["All", "Ai-Project 🤖"],
    gitUrl: "https://github.com/Ram9369",
    previewUrl: "https://example.com",
  },
  {
    id: 6,
    title: "MoodyPlayer - AI-Powered Music Streaming App",
    description:
      "A music streaming app that uses AI to analyze user preferences and moods, providing personalized playlists and recommendations for an enhanced listening experience.",
    image: "/images/projects/5.png",
    tag: ["All", "Ai-Project 🤖"],
    gitUrl: "https://github.com/Ram9369",
    previewUrl: "https://example.com",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag),
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="  overflow-hidden bg-[#030712] py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="rounded-full border mb-3  border-blue-500/30 bg-blue-500/10 px-5 py-2 text-xl tracking-[0.3em] text-blue-400 uppercase">
          • Project📂
        </span>
        <h2 className="text-3xl mt-4 font-bold text-white sm:text-4xl">
          Featured work crafted for impact.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-300">
          A curated collection of interfaces built to
          <br />• feel &nbsp; &nbsp;• fast&nbsp; &nbsp; • focused&nbsp; &nbsp; •
          visually strong.
        </p>
      </div>
      <div className="flex flex-wrap justify-center  gap-3 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Project 🎓"
          isSelected={tag === "Project 🎓"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Ai-Project 🤖"
          isSelected={tag === "Ai-Project 🤖"}
        />
      </div>
      <ul ref={ref} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              tags={project.tag}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;

