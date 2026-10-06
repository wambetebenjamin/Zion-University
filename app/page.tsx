"use client";

import { useState } from "react";

const courses = [
  ["Business Administration", "School of Business and Economics", "courses-01.jpg"],
  ["Computer Science", "School of Engineering and Technology", "courses-02.jpg"],
  ["Education", "School of Education", "courses-03.jpg"],
  ["Law", "School of Law", "courses-04.jpg"],
  ["Public Health", "School of Health Sciences", "courses-05.jpg"],
];

export default function HomePage() {
  const [tab, setTab] = useState(0);
  const tabs = [
    ["Best Education", "choose-us-image-01.png", "Zion University provides practical, accredited education designed to prepare students for meaningful careers and service."],
    ["Top Management", "choose-us-image-02.png", "Our experienced academic leadership connects rigorous teaching with the needs of Kenya, Africa and the wider world."],
    ["Quality Community", "choose-us-image-03.png", "Learn in a supportive community with modern facilities, dedicated lecturers and opportunities to grow beyond the classroom."],
  ];
  return <main className="legacy-home">
    <section className="legacy-hero" id="top">
      <video autoPlay muted loop playsInline><source src="/images/hero/course-video.mp4" type="video/mp4" /></video>
      <div className="legacy-overlay"><div className="legacy-caption"><h6>Welcome to Zion University</h6><h1><em>Your</em> Classroom</h1><a className="legacy-button" href="#about">Discover more</a></div></div>
    </section>

    <section className="legacy-features"><div className="legacy-container legacy-three">
      {[['✎','All Programmes','Explore undergraduate and postgraduate programmes across our schools.','#about'],['⚑','Virtual Learning','Access flexible learning and digital resources wherever you are.','#admissions'],['▣','Zion Community','Join a vibrant university community in Nairobi and Mombasa.','#contact']].map(([icon,title,text,href])=><article key={title}><h3><span>{icon}</span>{title}</h3><p>{text}</p><a href={href}>More Info.</a></article>)}
    </div></section>

    <section className="legacy-section legacy-why" id="about"><div className="legacy-container"><div className="legacy-heading"><h2>Why choose Zion University?</h2></div><div className="legacy-tabs"><nav>{tabs.map((t,i)=><button className={tab===i?'active':''} onClick={()=>setTab(i)} key={t[0]}>{t[0]}</button>)}</nav><div className="legacy-tab-content"><img src={`/images/bg/${tabs[tab][1]}`} alt=""/><div><h2>{tabs[tab][0]}</h2><p>{tabs[tab][2]}</p><p>We are committed to excellence, integrity, innovation and service in higher education.</p></div></div></div></div></section>

    <section className="legacy-offer" id="admissions"><div className="legacy-container legacy-offer-grid"><div><h2>Begin your <em>Zion journey</em> today</h2><p>Applications are open for the 2026 academic year.</p><div className="legacy-counter"><b>2026</b><span>Admissions now open</span></div></div><form><h3>Request admission information</h3><input placeholder="Your Name"/><input placeholder="Your Email" type="email"/><input placeholder="Your Phone Number"/><button className="legacy-button">Get started</button></form></div></section>

    <section className="legacy-section legacy-courses"><div className="legacy-container"><div className="legacy-heading"><h2>Choose Your Programme</h2></div><div className="legacy-course-grid">{courses.map(([name,school,img])=><article key={name}><img src={`/images/bg/${img}`} alt=""/><div><small>{school}</small><h3>{name}</h3><a href="/faculties">View programme →</a></div></article>)}</div></div></section>

    <section className="legacy-contact" id="contact"><div className="legacy-container legacy-contact-grid"><div><div className="legacy-heading"><h2>Contact Zion University</h2></div><p>Talk to our admissions team about programmes, applications and student life.</p><p><strong>Nairobi:</strong> Zion Towers, University Way<br/><strong>Mombasa:</strong> Ocean View Academic Park</p><p>+254 112 272 061 · admissions@zion.ac.ke</p></div><form><input placeholder="Your Name"/><input placeholder="Your Email"/><textarea placeholder="Your message" rows={4}/><button className="legacy-button">Send message</button></form></div></section>
  </main>;
}
