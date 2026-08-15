import { BlueprintMedia } from "@/components/draft/blueprint-media";
import { SectionHead } from "@/components/draft/section-head";
import { galleryItems } from "@/data/site";

const gridSizes = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const aspectRatios = ["aspect-[16/10]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[16/10]"];

export function Gallery() {
  return (
    <section className="draft-sheet px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Архитектурные решения</span>
      </div>

      <div className="mx-auto max-w-[1440px]">
        <SectionHead
          sheet="А-06"
          kicker="Развёртки и виды"
          title="Архитектурные решения для вашего будущего дома."
          lead="Разные пропорции, свет и посадка на участок помогают найти образ, который будет близок именно вам."
          className="max-w-2xl"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {galleryItems.map((item, index) => (
            <figure key={item.title} className={`gallery-item ${gridSizes[index]}`}>
              <BlueprintMedia
                src={item.image}
                alt={item.alt}
                sizes="(max-width: 1023px) 100vw, 55vw"
                parallax={index === 0 || index === 3}
                className={aspectRatios[index]}
              >
                <span
                  className="gallery-note"
                  style={{ "--note-top": item.pointer.top, "--note-to": item.pointer.to } as React.CSSProperties}
                >
                  <span className="callout__dot" />
                  <span className="callout__leader" />
                  <span className="callout__label tech-sm">{item.note}</span>
                  <span className="callout__arrow" />
                </span>
              </BlueprintMedia>

              <figcaption className="gallery-caption">
                <span className="num gallery-caption__index">{String(index + 1).padStart(2, "0")}</span>
                <span>{item.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
