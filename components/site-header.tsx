"use client";

import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { navItems } from "@/data/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">
        К основному содержанию
      </a>
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgb(238_236_231/82%)] backdrop-blur-xl">
        <div className="mx-auto flex h-[4.25rem] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <a href="#top" className="group flex items-center gap-2.5" aria-label="ДомКирпич, на главную">
            <span className="grid h-8 w-8 place-items-center rounded-[0.6rem] bg-[var(--brick)] text-sm font-black text-[#f8f6f0] transition-transform duration-200 group-hover:-rotate-6">
              Д
            </span>
            <span className="text-[0.96rem] font-extrabold tracking-[-0.04em] text-[var(--graphite)]">
              ДомКирпич
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.78rem] font-bold text-[var(--ink-soft)] transition-colors hover:text-[var(--brick-deep)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a href="#calculator" className="button-primary text-[0.76rem]">
              Рассчитать стоимость
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--graphite)] lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={22} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>

        {isOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-[var(--line)] bg-[var(--paper)] px-4 py-5 lg:hidden"
            aria-label="Мобильная навигация"
          >
            <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center rounded-[0.7rem] px-3 text-[0.95rem] font-bold text-[var(--graphite)] transition-colors hover:bg-[var(--paper-strong)]"
                >
                  {item.label}
                </a>
              ))}
              <a href="#calculator" onClick={closeMenu} className="button-primary mt-3 w-full">
                Рассчитать стоимость
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
