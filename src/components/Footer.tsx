import { navLinks, storeInfo } from "@/utils/siteContent";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="footer__brand" href="#home">
          {storeInfo.name}
        </a>
        <p>{storeInfo.locationLine}</p>
      </div>
      <nav aria-label="Footer navigation">
        {navLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <p>© 2026 Syed Cycle Mart. All rights reserved.</p>
    </footer>
  );
}
