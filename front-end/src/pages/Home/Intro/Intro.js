import React, { useRef } from "react";
import "./intro.css";
import Vector1 from "../img/Vector1.png";
import Vector2 from "../img/Vector2.png";
import boy from "../img/boy.png";
import glassesimoji from "../img/glassesimoji.png";
import thumbup from "../img/thumbup.png";
import crown from "../img/crown.png";
import FloatingDiv from "./FloatingDiv/FloatingDiv";
import Github from "../img/github.png";
import LinkedIn from "../img/linkedin.png";
import Instagram from "../img/instagram.png";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
const Intro = ({gotoNextSection}) => {
  // Transition
  const transition = { duration: 2, type: "spring" };



  return (
    <div className="Intro" id="Intro">
      {/* left name side */}
      <div className="i-left" >
        <div className="i-name">
          {/* yahan change hy darkmode ka */}
          <span>Hello! I Am</span>
          <span>STU-HOME</span>
          <span>
          Study with the world's most productive community of students
          </span>
            <button onClick={gotoNextSection} >Services</button>
        </div>

        {/* social icons */}
        <div className="i-icons">
          <img src={Github} alt="" />
          <img src={LinkedIn} alt="" />
          <img src={Instagram} alt="" />
        </div>
      </div>
      {/* right image side */}
      <div className="i-right">
        <img src={Vector1} alt="" />
        <img src={Vector2} alt="" />
        <img src='' alt="" />
        {/* animation */}
        <motion.img
          initial={{ left: "-36%" }}
          whileInView={{ left: "-24%" }}
          transition={transition}
          src={glassesimoji}
          alt=""
        />

        <motion.div
          initial={{ top: "-4%", left: "74%" }}
          whileInView={{ left: "68%" }}
          transition={transition}
          className="floating-div"
        >
          <FloatingDiv img={crown} text1="Web" text2="Developer" />
        </motion.div>

        {/* animation */}
        <motion.div
          initial={{ left: "9rem", top: "18rem" }}
          whileInView={{ left: "0rem" }}
          transition={transition}
          className="floating-div"
        >
          {/* floatinDiv mein change hy dark mode ka */}
          <FloatingDiv img={thumbup} text1="Best Design" text2="Award" />
        </motion.div>

        <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
        <div
          className="blur"
          style={{
            background: "#C1F5FF",
            top: "17rem",
            width: "21rem",
            height: "11rem",
            left: "-9rem",
          }}
        ></div>
      </div>
      <div />

    </div>
  );
};

export default Intro;