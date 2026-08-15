"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  ["Local", "/local"],
  ["Open Records", "/records"],
  ["FLOCK Watch", "/flock-watch"],
  ["Citizen Resources", "/citizen-resources"],
  ["Contact", "/contact"],
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>Macon-Bibb &amp; Middle Georgia</span>
          <span>Saturday, August 15, 2026</span>
          <Link href="/contact">Send a confidential tip <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="shell masthead">
        <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="The Ocmulgee Free Press home">
          <span className="brand-mark" aria-hidden="true"><i>O</i>FP</span>
          <span className="brand-copy">
            <strong>The Ocmulgee</strong>
            <b>Free Press</b>
          </span>
        </Link>
        <p className="masthead-mission">Independent reporting for an informed and empowered public.</p>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-nav">
          <span>{open ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </div>
      <nav id="site-nav" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        <div className="shell nav-inner">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
