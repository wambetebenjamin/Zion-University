"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar(){
 const [open,setOpen]=useState(false);
 return <header className="legacy-header"><div className="legacy-nav-inner"><Link href="/" className="legacy-logo"><em>Zion</em> University</Link><button className="legacy-menu-button" onClick={()=>setOpen(!open)} aria-label="Open menu">☰</button><nav className={open?'legacy-nav open':'legacy-nav'}><Link href="/">Home</Link><Link href="/#about">About Us</Link><Link href="/faculties">Programmes</Link><Link href="/admissions">Admissions</Link><Link href="/research">Research</Link><Link href="/campus-life">Campus Life</Link><Link href="/news">News</Link><Link href="/contact">Contact</Link></nav></div></header>
}
