import { SectionHead } from "@/components/draft/section-head";
import { Icon } from "@/components/ui/icon";
import { faqs } from "@/data/site";

export function Faq() {
  return (
    <section id="faq" className="draft-sheet section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Вопросы и ответы</span>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            sheet="А-11"
            kicker="Примечания к листам"
            title="Отвечаем на важные вопросы заранее."
            lead="Если не нашли свой вопрос, оставьте заявку. Поможем разобраться в спокойном разговоре."
            titleClassName="max-w-[10ch]"
            leadClassName="max-w-md"
          />
        </div>
        <div>
          {faqs.map((faq, index) => (
            <details key={faq.question} className="faq-item py-1">
              <summary className="flex min-h-17 items-center gap-5 py-5 text-left text-[0.98rem] font-extrabold tracking-[-0.025em] text-[var(--graphite)]">
                <span className="num faq-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1">{faq.question}</span>
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
