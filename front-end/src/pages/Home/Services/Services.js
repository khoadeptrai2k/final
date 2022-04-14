import React, { useContext } from "react";
import "./services.css";
import Card from "../Card/Card";
import HeartEmoji from "../img/heartemoji.png";
import Glasses from "../img/glasses.png";
import Humble from "../img/humble.png";
import { motion } from "framer-motion";
import { CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";

const Services = () => {
  // context


  // transition
  const transition = {
    duration: 1,
    type: "spring",
  };

  return (
    <div className="services" id="services">
      {/* left side */}
      <div className="awesome">
        {/* dark mode */}
        <span>My Awesome</span>
        <span>services</span>
        <span>
          Lorem ispum is simpley dummy text of printing of printing Lorem
          <br />
          ispum is simpley dummy text of printing
        </span>

        <div className="blur s-blur1" style={{ background: "#ABF1FF94" }}></div>
      </div>
      {/* right */}
      <div className="cards">
        {/* first card */}
        <motion.div
          initial={{ left: "25rem" }}
          whileInView={{ left: "14rem" }}
          transition={transition}
        >
        <Link to="/forum">
            <button>FORUM</button>
        </Link>
          <Card
            emoji={HeartEmoji}
            heading={"FORUM"}
            detail={"Lorem ispum dummy text are usually use in section where we need some random text"}
          />
        </motion.div>
        {/* second card */}
        <motion.div
          initial={{ left: "-11rem", top: "12rem" }}
          whileInView={{ left: "-4rem" }}
          transition={transition}
        >
        <Link to="/member">
            <button>MEMBER</button>
        </Link>
          <Card
            emoji={Glasses}
            heading={"MEMBER"}
            detail={"Lorem ispum dummy text are usually use in section where we need some random text"}
          />
        </motion.div>
        {/* 3rd */}
        <motion.div
          initial={{ top: "19rem", left: "25rem" }}
          whileInView={{ left: "12rem" }}
          transition={transition}
        >
        <Link to="/message">
            <button>CHAT</button>
        </Link>


          <Card
            emoji={Humble}
            heading={"MESSAGE"}
            detail={
              "Lorem ispum dummy text are usually use in section where we need some random text"
            }
          />
        </motion.div>
        <div
          className="blur s-blur2"
          style={{ background: "var(--purple)" }}
        ></div>
      </div>
    </div>
  );
};

export default Services;