import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProjectCard = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
  tags = [],
}) => {
  return (
    <a href={previewUrl} target="_blank" rel="noreferrer" className="block">
      <article className="group overflow-hidden rounded-[1rem] border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/20 cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          <img
            src={imgUrl}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          <div className="absolute inset-x-0 top-0 flex flex-wrap gap-2 p-4">
            {tags.slice(1).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 p-5 opacity-0 transition duration-300 group-hover:opacity-100">
            {/* GitHub Button */}
            <a
              href={gitUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition hover:border-white hover:bg-white/20"
            >
              <CodeBracketIcon className="h-5 w-5 text-white" />
            </a>

            {/* Preview Button */}
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition hover:border-white hover:bg-white/20"
            >
              <EyeIcon className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>

        <div className="space-y-4 p-6 text-white">
          <div>
            <h5 className="text-xl font-semibold">{title}</h5>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </a>
  );
};

export default ProjectCard;
