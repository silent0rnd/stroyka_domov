import Image from "next/image";
import { galleryItems } from "@/data/site";

const gridSizes = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const aspectRatios = ["aspect-[16/10]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[16/10]"];

export function Gallery() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]" data-reveal>
        <div className="max-w-2xl">
          <h2 className="text-[clamp(2rem,4.2vw,3.7rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)]">
            Архитектурные решения для вашего будущего дома.
          </h2>
          <p className="mt-5 text-[0.98rem] leading-7 text-[var(--ink-soft)]">
            Разные пропорции, свет и посадка на участок помогают найти образ, который будет близок именно вам.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {galleryItems.map((item, index) => (
            <figure key={item.title} className={gridSizes[index]}>
              <div className={`image-frame relative ${aspectRatios[index]}`}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm font-bold text-[var(--graphite)]">{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
