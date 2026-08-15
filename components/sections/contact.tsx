"use client";

import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import Image from "next/image";
import { type FormEvent, useState } from "react";

type ContactValues = {
  name: string;
  phone: string;
  consent: boolean;
};

export function Contact() {
  const [values, setValues] = useState<ContactValues>({ name: "", phone: "", consent: false });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [success, setSuccess] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof ContactValues, string>> = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = "Укажите имя, чтобы мы могли к вам обратиться.";
    }
    if (values.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Введите номер телефона в понятном формате.";
    }
    if (!values.consent) {
      nextErrors.consent = "Нужно согласие на обработку данных.";
    }

    setErrors(nextErrors);
    setSuccess(Object.keys(nextErrors).length === 0);
  };

  return (
    <section id="contact" className="px-4 pb-20 pt-8 sm:px-6 lg:px-10 lg:pb-28">
      <div className="contact-panel relative mx-auto overflow-hidden bg-[var(--graphite)] px-5 py-10 text-[#f8f6f0] sm:px-8 lg:max-w-[1440px] lg:px-14 lg:py-14">
        <div className="architect-grid contact-grid pointer-events-none absolute inset-0" />
        <div className="contact-visual pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block">
          <Image
            src="./images/project-birch.png"
            alt=""
            fill
            sizes="55vw"
            className="object-cover object-center"
          />
        </div>

        <span className="contact-stage tech-sm" aria-hidden="true">
          Лист 13 · Передача объекта
        </span>

        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="sheet-head__meta tech">
              <span className="sheet-head__code contact-code">А-13</span>
              <span className="sheet-head__rule contact-rule" aria-hidden="true" />
              <span className="text-[var(--terracotta-on-dark)]">Следующий шаг</span>
            </p>
            <h2
              data-draft="text"
              className="mt-6 max-w-[42rem] text-[clamp(2.25rem,4.3vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.065em]"
            >
              Обсудим дом, который подходит именно вашей семье.
            </h2>
            <p data-draft="text" className="mt-5 max-w-md text-[0.98rem] leading-7 text-[#d6d2ca]">
              Оставьте контакты. Подготовим предварительный расчет и свяжемся в течение одного рабочего дня.
            </p>
          </div>
          <form className="grid gap-4" onSubmit={submit} noValidate>
            <label className="grid gap-2 text-sm font-bold text-[#f8f6f0]">
              Имя
              <input
                className="field bg-[rgb(255_255_255/96%)]"
                value={values.name}
                onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
              />
              {errors.name && <span id="contact-name-error" className="text-[0.78rem] font-medium text-[#f4b6a9]">{errors.name}</span>}
            </label>
            <label className="grid gap-2 text-sm font-bold text-[#f8f6f0]">
              Телефон
              <input
                className="field bg-[rgb(255_255_255/96%)]"
                type="tel"
                value={values.phone}
                onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              />
              {errors.phone && <span id="contact-phone-error" className="text-[0.78rem] font-medium text-[#f4b6a9]">{errors.phone}</span>}
            </label>
            <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm leading-6 text-[#d6d2ca]">
              <input
                className="mt-1 h-5 w-5 shrink-0 accent-[var(--terracotta)]"
                type="checkbox"
                checked={values.consent}
                onChange={(event) => setValues((current) => ({ ...current, consent: event.target.checked }))}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "contact-consent-error" : undefined}
              />
              Согласен на обработку персональных данных для обратной связи.
            </label>
            {errors.consent && <span id="contact-consent-error" className="text-[0.78rem] font-medium text-[#f4b6a9]">{errors.consent}</span>}
            <button type="submit" className="mt-2 inline-flex min-h-[3.15rem] items-center justify-center gap-2 bg-[var(--terracotta)] px-6 text-sm font-extrabold text-[#1a1512] transition hover:-translate-y-0.5 hover:bg-[#dd8165] active:scale-[0.98] sm:w-fit">
              Получить расчет
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </button>
            {success && (
              <p className="flex items-center gap-2 text-sm font-bold text-[#f4c2b6]" role="status">
                <CheckCircle size={20} weight="fill" aria-hidden="true" />
                Спасибо. Данные сохранены в интерфейсе, мы свяжемся с вами в течение рабочего дня.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
