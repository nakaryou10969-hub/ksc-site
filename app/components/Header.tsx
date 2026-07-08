import Link from "next/link";

const navItems = [
  { label: "KANDA Startup Commons とは", href: "/#about" },
  { label: "メンバーについて", href: "/#roles" },
  { label: "過去イベント", href: "/#openday" },
  { label: "トピック", href: "/#topics" },
  { label: "お問い合わせ", href: "/#contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "#E3E0DA" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[117px] h-[72px] flex items-center">
        <Link href="/" className="shrink-0 font-bold text-base lg:text-2xl tracking-wide" style={{ color: "#3B3C3E" }}>
          KANDA startup Commons
        </Link>

        <div className="hidden min-[1180px]:block" style={{ width: "1px", backgroundColor: "#3B3C3E", margin: "16px 40px", alignSelf: "stretch" }} />

        <nav className="hidden min-[1180px]:flex items-center justify-end gap-6 xl:gap-8 text-sm flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:opacity-60 transition-opacity whitespace-nowrap"
              style={{ color: "#3B3C3E" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          data-ksc-menu-button
          aria-expanded="false"
          aria-label="メニューを開く"
          className="ksc-menu-button min-[1180px]:hidden ml-auto p-2 relative w-8 h-8 flex items-center justify-center"
        >
          <span className="ksc-menu-line ksc-menu-line--top absolute block w-6 h-0.5 transition-all duration-300" style={{ backgroundColor: "#3B3C3E" }} />
          <span className="ksc-menu-line ksc-menu-line--middle absolute block w-6 h-0.5 transition-all duration-300" style={{ backgroundColor: "#3B3C3E" }} />
          <span className="ksc-menu-line ksc-menu-line--bottom absolute block w-6 h-0.5 transition-all duration-300" style={{ backgroundColor: "#3B3C3E" }} />
        </button>
      </div>

      <nav
        data-ksc-mobile-nav
        hidden
        className="min-[1180px]:hidden border-t px-6 py-6 flex flex-col gap-5 text-sm"
        style={{ backgroundColor: "#E3E0DA", borderColor: "#3B3C3E" }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:opacity-60 transition-opacity"
            style={{ color: "#3B3C3E" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(() => {
  if (window.__kscHeaderMenuBound) return;
  window.__kscHeaderMenuBound = true;

  const setOpen = (open) => {
    const button = document.querySelector("[data-ksc-menu-button]");
    const nav = document.querySelector("[data-ksc-mobile-nav]");
    if (!button || !nav) return;

    button.setAttribute("aria-expanded", String(open));
    button.toggleAttribute("data-open", open);
    nav.hidden = !open;
  };

  document.addEventListener("click", (event) => {
    const menuButton = event.target.closest("[data-ksc-menu-button]");
    if (menuButton) {
      setOpen(menuButton.getAttribute("aria-expanded") !== "true");
      return;
    }

    if (event.target.closest("[data-ksc-mobile-nav] a")) {
      setOpen(false);
    }
  });
})();
          `,
        }}
      />
    </header>
  );
}
