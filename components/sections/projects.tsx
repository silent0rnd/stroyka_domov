"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { type KeyboardEvent, useRef } from "react";
import { projects } from "@/data/site";

export function Projects() {
  const rail = useRef<HTMLDivElement>(null);

  const scrollProjects = (direction: number) => {
    rail.current?.scrollBy({ left: direction * 380, behavior: "smooth" });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollProjects(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollProjects(-1);
    }
  };

  return (
    <section id="projects" className="section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]" data-reveal>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker">Концептуальные проекты</p>
            <h2 className="mt-5 text-[clamp(2rem,4.3vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)]">
              Пространства с характером будущего дома.
            </h2>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-[var(--ink-soft)]">
              Это варианты для вдохновения и обсуждения. Каждый проект адаптируется под участок и привычки вашей семьи.
            </p>
          </div>
          <div className="flex gap-2" aria-label="Управление галереей проектов">
            <button
              type="button"
              onClick={() => scrollProjects(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--graphite)] transition hover:border-[var(--brick)] hover:text-[var(--brick-deep)] active:scale-[0.97]"
              aria-label="Предыдущий проект"
            >
              <ArrowLeft size={20} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollProjects(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--graphite)] transition hover:border-[var(--brick)] hover:text-[var(--brick-deep)] active:scale-[0.97]"
              aria-label="Следующий проект"
            >
              <ArrowRight size={20} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={rail}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="project-rail mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 pr-4 outline-none"
          aria-label="Галерея концептуальных проектов. Используйте стрелки влево и вправо для прокрутки."
        >
          {projects.map((project) => (
            <article key={project.title} className="w-[min(84vw,25rem)] shrink-0 snap-start">
              <div className="image-frame relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 640px) 84vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 grid gap-3 border-t border-[var(--line)] pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-[-0.045em] text-[var(--graphite)]">{project.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">{project.character}</p>
                  </div>
                  <span className="whitespace-nowrap text-sm font-extrabold text-[var(--brick-deep)]">{project.price}</span>
                </div>
                <p className="text-[0.76rem] font-bold leading-5 text-[var(--ink-soft)]">
                  {project.area}, {project.floors}, {project.bedrooms}, {project.garage}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
