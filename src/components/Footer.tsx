import Image from "next/image";
import Link from "next/link";

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const FOOTER_NAV_LINKS = [
  { label: "The problem", href: "/#about" },
  { label: "Our approach", href: "/#sparks" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why us", href: "/#difference" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Desktop: 3 columns / Mobile: stacked centered */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-8">
          {/* Left: Logo + Tagline */}
          <div className="md:max-w-[340px] text-center md:text-left">
            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <Image
                src="/logos/humanta-mark-white.png"
                alt="Humanta logo"
                width={36}
                height={36}
                className="w-8 h-8 lg:w-9 lg:h-9"
              />
              <span className="text-white text-lg lg:text-xl font-bold font-heading">
                Humanta
              </span>
            </div>
            <p className="text-[#999999] text-sm lg:text-[15px] leading-[1.6] mt-4 max-w-[320px] mx-auto md:mx-0">
              Your competitive edge will increasingly come from how human it
              feels to work for you.
            </p>
          </div>

          {/* Center: Nav Links */}
          <nav className="flex flex-row flex-wrap justify-center md:flex-col gap-4 md:gap-3">
            {FOOTER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#999999] hover:text-white transition-colors duration-200 text-sm lg:text-[15px] hover-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Social + Legal */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <a
              href="https://www.linkedin.com/company/humanta/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#999999] hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <Link
              href="/privacy"
              className="text-[#999999] hover:text-white transition-colors duration-200 text-sm lg:text-[15px]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 mt-10 pt-8">
          <p className="text-[#666666] text-xs lg:text-[13px] text-center md:text-left">
            &copy; 2026 Humanta
          </p>
        </div>
      </div>
    </footer>
  );
}
