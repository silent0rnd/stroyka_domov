import { Icon } from "@/components/ui/icon";
import { faqs } from "@/data/site";

export function Faq() {
  return (
    <section id="faq" className="section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20" data-reveal>
        <div>
          <h2 className="max-w-[10ch] text-[clamp(2rem,4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)]">
            Отвечаем на важные вопросы заранее.
          </h2>
          <p className="mt-5 max-w-md text-[0.98rem] leading-7 text-[var(--ink-soft)]">
            Если не нашли свой вопрос, оставьте заявку. Поможем разобраться в спокойном разговоре.
          </p>
        </div>
        <div>
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item py-1">
              <summary className="flex min-h-17 items-center justify-between gap-5 py-5 text-left text-[0.98rem] font-extrabold tracking-[-0.025em] text-[var(--graphite)]">
                {faq.question}
                <Icon name="plus" className="faq-plus shrink-0 text-[var(--brick)]" size={24} weight="bold" />
              </summary>
              <div className="faq-answer">
                <p className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-[var(--ink-soft)]">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
