import React, { useState } from "react";

// markup
const IndexPage = () => {
  const [contactMessage, setContactMessage] = useState("empty");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [comment, setComment] = useState("");

  const handleFName = (e) => {
    setFName(e.target.value);
  };

  const handleLName = (e) => {
    setLName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleArea = (e) => {
    setArea(e.target.value);
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    let formData = {
      firstName: fName,
      lastName: lName,
      email: email,
      area: area === "" ? "No area selected" : area,
      comment: comment,
    };

    fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          setContactMessage("An error occured! Please try again.");
        } else {
          setContactMessage("Successfully submitted!");
        }
        setFName("");
        setLName("");
        setEmail("");
        setArea("");
        setComment("");
        return res;
      })
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={handleContactSubmit} className="contactForm">
      <div>
        <div>
          <label htmlFor="fname">First name</label>
          <input
            id="fname"
            name="fname"
            type="text"
            placeholder="First name"
            value={fName}
            required
            onChange={handleFName}
          />
        </div>
        <div>
          <label htmlFor="lname">Last name</label>
          <input
            id="lname"
            name="lname"
            type="text"
            placeholder="Last name"
            value={lName}
            required
            onChange={handleLName}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={handleEmail}
        />
      </div>
      <div>
        <label htmlFor="areaInterest">Area of interest</label>
        <select
          id="areaInterest"
          name="areaInterest"
          value={area}
          onChange={handleArea}
        >
          <option value="" disabled defaultValue>
            Select an option
          </option>
          <option value="Access to Capital / Funding as a BIPOC-led Venture">
            Access to Capital / Funding as a BIPOC-led Venture
          </option>
          <option value="Access to Revenue / Pipeline Opportunities as a Venture or BIPOC-led organization">
            Access to Revenue / Pipeline Opportunities as a Venture or BIPOC-led
            organization
          </option>
          <option value="Mentor / Sponsor  as a Youth">
            Mentor / Sponsor as a Youth
          </option>
          <option value="Mentor / Sponsor as a Mid-level Manager or Director+">
            Mentor / Sponsor as a Mid-level Manager or Director+
          </option>
          <option value="Mentor / Sponsor as a C-Suite or aspiring Corporate Board Member">
            Mentor / Sponsor as a C-Suite or aspiring Corporate Board Member
          </option>
          <option value="Support one of our Pillars as a member or affiliate">
            Support one of our Pillars as a member or affiliate
          </option>
          <option value="Get more general information">
            Get more general information
          </option>
        </select>
      </div>
      <div>
        <label htmlFor="commentSection">Comments / More info</label>
        <textarea
          id="commentSection"
          name="commentSection"
          value={comment}
          onChange={handleComment}
          placeholder="Please leave a comment..."
        />
      </div>
      <button>Get in Contact!</button>
      <p>{contactMessage}</p>
    </form>
  );
};

export default IndexPage;
