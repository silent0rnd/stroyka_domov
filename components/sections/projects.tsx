"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { type KeyboardEvent, useRef, useState } from "react";
import { BlueprintMedia } from "@/components/draft/blueprint-media";
import { SectionHead } from "@/components/draft/section-head";
import { TitleBlock } from "@/components/draft/title-block";
import { projects } from "@/data/site";

export function Projects() {
  const rail = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);

  const scrollProjects = (direction: number) => {
    rail.current?.scrollBy({ left: direction * 380, behavior: "smooth" });
  };

  /** Какой лист сейчас в кадре — для счётчика над рельсом. */
  const trackCurrent = () => {
    const node = rail.current;

    if (!node) {
      return;
    }

    const step = node.scrollWidth / projects.length;
    setCurrent(Math.min(projects.length, Math.floor(node.scrollLeft / step) + 1));
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
    <section id="projects" className="draft-sheet section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Концептуальные проекты</span>
      </div>

      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            sheet="А-05"
            kicker="Концептуальные проекты"
            title="Пространства с характером будущего дома."
            lead="Это варианты для вдохновения и обсуждения. Каждый проект адаптируется под участок и привычки вашей семьи."
            className="max-w-2xl"
            leadClassName="max-w-xl"
          />

          <div className="flex items-center gap-4">
            <span className="tech-sm tech text-[var(--ink-faint)]">
              Лист <span className="num text-[var(--brick-deep)]">{String(current).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2" aria-label="Управление галереей проектов">
              <button
                type="button"
                onClick={() => scrollProjects(-1)}
                className="rail-button"
                aria-label="Предыдущий проект"
              >
                <ArrowLeft size={20} weight="bold" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollProjects(1)}
                className="rail-button"
                aria-label="Следующий проект"
              >
                <ArrowRight size={20} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={rail}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onScroll={trackCurrent}
          className="project-rail mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 pr-4 outline-none"
          aria-label="Галерея концептуальных проектов. Используйте стрелки влево и вправо для прокрутки."
        >
          {projects.map((project, index) => (
            <article key={project.title} className="project-card flex w-[min(84vw,25rem)] shrink-0 snap-start flex-col">
              <BlueprintMedia
                src={project.image}
                alt={project.alt}
                sizes="(max-width: 640px) 84vw, 400px"
                className="aspect-[4/3]"
              >
                <span className="project-tag project-tag--index tech-sm num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="project-tag project-tag--scale tech-sm">М 1:100</span>
              </BlueprintMedia>

              <div className="project-card__body">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-extrabold tracking-[-0.045em] text-[var(--graphite)]">{project.title}</h3>
                  <span className="num whitespace-nowrap text-sm font-extrabold text-[var(--brick-deep)]">
                    {project.price}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{project.character}</p>
              </div>

              <TitleBlock
                columns={2}
                className="project-card__stamp"
                cells={[
                  { key: "Площадь", value: project.area },
                  { key: "Этажность", value: project.floors },
                  { key: "Спальни", value: project.bedrooms },
                  { key: "Гараж", value: project.garage }
                ]}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
