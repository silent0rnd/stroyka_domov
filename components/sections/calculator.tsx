"use client";

import { ArrowRight, CheckCircle, HouseLine } from "@phosphor-icons/react";
import { type FormEvent, useEffect, useMemo, useState } from "react";

type EstimateForm = {
  area: number;
  floors: "1" | "2";
  garage: boolean;
  finish: "base" | "comfort" | "full";
  start: "soon" | "season" | "planning";
};

type LeadForm = {
  name: string;
  phone: string;
};

const initialEstimate: EstimateForm = {
  area: 200,
  floors: "2",
  garage: true,
  finish: "comfort",
  start: "season"
};

const initialLead: LeadForm = {
  name: "",
  phone: ""
};

const finishMultiplier = {
  base: 1,
  comfort: 1.12,
  full: 1.27
};

function useAnimatedNumber(target: number, enabled: boolean, run: number) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const startedAt = performance.now();
    const duration = 820;
    let animationFrame = 0;

    const updateValue = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 4;
      setValue(Math.round(target * easedProgress));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(updateValue);
      }
    };

    animationFrame = window.requestAnimationFrame(updateValue);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [enabled, run, target]);

  return value;
}

export function Calculator() {
  const [form, setForm] = useState<EstimateForm>(initialEstimate);
  const [showEstimate, setShowEstimate] = useState(false);
  const [areaError, setAreaError] = useState("");
  const [lead, setLead] = useState<LeadForm>(initialLead);
  const [leadErrors, setLeadErrors] = useState<Partial<LeadForm>>({});
  const [isSent, setIsSent] = useState(false);
  const [estimateRun, setEstimateRun] = useState(0);

  const estimate = useMemo(() => {
    const basePerMeter = form.floors === "2" ? 0.086 : 0.081;
    const garageAdjustment = form.garage ? 1.8 : 0;
    const startAdjustment = form.start === "soon" ? 1.04 : form.start === "planning" ? 0.96 : 1;
    const low = Math.max(
      12,
      Math.round((form.area * basePerMeter + garageAdjustment) * finishMultiplier[form.finish] * startAdjustment)
    );

    return {
      low,
      high: Math.max(low + 2, Math.round(low * 1.18))
    };
  }, [form]);
  const animatedLow = useAnimatedNumber(estimate.low, showEstimate, estimateRun);
  const animatedHigh = useAnimatedNumber(estimate.high, showEstimate, estimateRun);

  const calculate = () => {
    if (form.area < 80 || form.area > 650) {
      setAreaError("Укажите площадь от 80 до 650 м².");
      setShowEstimate(false);
      return;
    }

    setAreaError("");
    setShowEstimate(true);
    setIsSent(false);
    setEstimateRun((current) => current + 1);
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<LeadForm> = {};

    if (lead.name.trim().length < 2) {
      nextErrors.name = "Укажите имя, чтобы мы могли к вам обратиться.";
    }

    if (lead.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Введите номер телефона в понятном формате.";
    }

    setLeadErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsSent(true);
      setLeadErrors({});
    }
  };

  return (
    <section id="calculator" className="section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20" data-reveal>
        <div className="lg:pt-4">
          <h2 className="max-w-[11ch] text-[clamp(2rem,4vw,3.65rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)]">
            Предварительный расчет без лишних звонков.
          </h2>
          <p className="mt-5 max-w-md text-[0.98rem] leading-7 text-[var(--ink-soft)]">
            Выберите основные параметры, чтобы увидеть ориентир по инвестициям в будущий дом.
          </p>
          <div className="mt-9 border-l-2 border-[var(--brick)] pl-4 text-sm leading-6 text-[var(--ink-soft)]">
            Точная стоимость определяется после консультации, выбора проекта и анализа участка.
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-[var(--graphite)]">
              Площадь дома, м²
              <input
                className="field"
                type="number"
                min="80"
                max="650"
                value={form.area}
                onChange={(event) => setForm((current) => ({ ...current, area: Number(event.target.value) }))}
                aria-invalid={Boolean(areaError)}
                aria-describedby={areaError ? "area-error" : undefined}
              />
              {areaError && <span id="area-error" className="text-[0.78rem] font-medium text-[#a63d30]">{areaError}</span>}
            </label>
            <label className="grid gap-2 text-sm font-bold text-[var(--graphite)]">
              Этажность
              <select
                className="field"
                value={form.floors}
                onChange={(event) => setForm((current) => ({ ...current, floors: event.target.value as EstimateForm["floors"] }))}
              >
                <option value="1">1 этаж</option>
                <option value="2">2 этажа</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-[var(--graphite)]">
              Тип отделки
              <select
                className="field"
                value={form.finish}
                onChange={(event) => setForm((current) => ({ ...current, finish: event.target.value as EstimateForm["finish"] }))}
              >
                <option value="base">Базовая</option>
                <option value="comfort">Комфорт</option>
                <option value="full">Полная</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-[var(--graphite)]">
              Старт строительства
              <select
                className="field"
                value={form.start}
                onChange={(event) => setForm((current) => ({ ...current, start: event.target.value as EstimateForm["start"] }))}
              >
                <option value="soon">В ближайшие месяцы</option>
                <option value="season">В этом сезоне</option>
                <option value="planning">Планирую заранее</option>
              </select>
            </label>
          </div>

          <label className="mt-5 flex min-h-12 cursor-pointer items-center gap-3 rounded-[0.7rem] border border-[var(--line)] px-4 text-sm font-bold text-[var(--graphite)]">
            <input
              className="h-5 w-5 accent-[var(--brick)]"
              type="checkbox"
              checked={form.garage}
              onChange={(event) => setForm((current) => ({ ...current, garage: event.target.checked }))}
            />
            Нужен гараж
          </label>

          <button type="button" onClick={calculate} className="button-primary mt-6 w-full sm:w-auto">
            Показать ориентир
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </button>

          {showEstimate && (
            <div className="mt-7 border-t border-[var(--line)] pt-7" aria-live="polite">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                    Предварительный ориентир
                  </p>
                  <p className="estimate-number mt-2 text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.07em] text-[var(--brick-deep)]">
                    {animatedLow.toLocaleString("ru-RU")}-{animatedHigh.toLocaleString("ru-RU")} млн ₽
                  </p>
                </div>
                <HouseLine size={46} weight="thin" className="text-[var(--graphite-soft)]" aria-hidden="true" />
              </div>

              <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={submitLead} noValidate>
                <label className="grid gap-2 text-sm font-bold text-[var(--graphite)]">
                  Имя
                  <input
                    className="field"
                    value={lead.name}
                    onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))}
                    aria-invalid={Boolean(leadErrors.name)}
                    aria-describedby={leadErrors.name ? "calculator-name-error" : undefined}
                    autoComplete="name"
                  />
                  {leadErrors.name && <span id="calculator-name-error" className="text-[0.78rem] font-medium text-[#a63d30]">{leadErrors.name}</span>}
                </label>
                <label className="grid gap-2 text-sm font-bold text-[var(--graphite)]">
                  Телефон
                  <input
                    className="field"
                    type="tel"
                    value={lead.phone}
                    onChange={(event) => setLead((current) => ({ ...current, phone: event.target.value }))}
                    aria-invalid={Boolean(leadErrors.phone)}
                    aria-describedby={leadErrors.phone ? "calculator-phone-error" : undefined}
                    autoComplete="tel"
                  />
                  {leadErrors.phone && <span id="calculator-phone-error" className="text-[0.78rem] font-medium text-[#a63d30]">{leadErrors.phone}</span>}
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" className="button-primary">
                    Получить предварительную смету
                    <ArrowRight size={18} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              </form>

              {isSent && (
                <p className="mt-5 flex items-center gap-2 rounded-[0.7rem] bg-[rgb(168_69_48/10%)] px-4 py-3 text-sm font-bold text-[var(--brick-deep)]" role="status">
                  <CheckCircle size={19} weight="fill" aria-hidden="true" />
                  Данные сохранены в интерфейсе. Мы подготовим ориентир в течение одного рабочего дня.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
