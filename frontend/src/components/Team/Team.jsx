import React, { useEffect, useRef } from "react";
import "./Team.css";

const teamMembers = [
  { id: 1, name: "Precious P P", role: "Designer", img: "./assets/1.jpg" },
  { id: 2, name: "Akhil V", role: "Developer", img: "./assets/2.jpg" },
  { id: 3, name: "Divya Sree Kala", role: "Project Manager", img: "./assets/3.jpg" },
  { id: 4, name: "Ajmi M", role: "QA Lead", img: "./assets/4.jpg" },
  { id: 5, name: "Gowri N", role: "Content Writer", img: "./assets/5.jpg" },
];

const Team = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Center the middle card on load
    const container = scrollRef.current;
    const cardWidth = 250; // Card width in pixels
    const cardGap = 32; // Gap between cards in pixels (as defined in CSS)

    const totalCardWidth = cardWidth + cardGap;
    const middleIndex = Math.floor(teamMembers.length / 2);

    // Scroll position to center the middle card
    const scrollPosition =
      middleIndex * totalCardWidth -
      container.offsetWidth / 2 +
      totalCardWidth / 2;

    container.scrollLeft = scrollPosition;
  }, []);

  return (
    <section className="team-container">
      {/* Header Section */}
      <div className="team-header">
        <h2>
          Meet the <span>Team</span>
        </h2>
        <p>
        We’re a team of passionate food lovers, chefs, and tech enthusiasts who came together to create a solution for everyone who loves cooking but struggles to find recipes easily. From testing recipes to perfecting our app’s features, we’re here to make your cooking experience seamless and joyful.

        </p>
      </div>

      {/* Scrollable Team Cards */}
      <div className="team-cards-container" ref={scrollRef}>
        <div className="team-cards">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-image">
                <img src={member.img} alt={member.name} />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Toggler */}
      <div className="scroll-toggler"></div>
    </section>
  );
};

export default Team;
