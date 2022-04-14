import React, { useContext } from "react";
import "./works.css";
import Upwork from "../img/Upwork.png";
import Fiverr from "../img/fiverr.png";
import Amazon from "../img/amazon.png";
import Shopify from "../img/Shopify.png";
import Facebook from "../img/Facebook.png";
import { motion } from "framer-motion";
import {Link} from 'react-scroll'
const Works = () => {
  // context

  // transition
  return (
    <div className="works" id="works">
      {/* left side */}
      <div className="w-left">
        <div className="awesome">
          {/* dark Mode */}
          <span>
            Works for All these
          </span>
          <span>Relationships online</span>
          <spane>
            Lorem ispum is simpley dummy text of printing of printing Lorem
            <br />
            ispum is simpley dummy text of printingLorem ispum is simpley dummy
            text
            <br />
            y dummy text of printingLorem
            <br />
            ispum is simpley dummy text of printing
          </spane>

          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
          ></div>
        </div>

        {/* right side */}
      </div>
      <div className="w-right">
        <motion.div
          initial={{ rotate: 45 }}
          whileInView={{ rotate: 0 }}
          viewport={{ margin: "-40px" }}
          transition={{ duration: 3.5, type: "spring" }}
          className="w-mainCircle"
        >
          <div className="w-secCircle">
            <span style={{color:'red'}}>Friend</span>
          </div>
          <div className="w-secCircle">
            <span style={{color:'blue'}}>Learn</span>
          </div>
          <div className="w-secCircle">
            <span style={{color:'orange'}}>STUHOME</span>
          </div>{" "}
          <div className="w-secCircle">
            <span style={{color:'purple'}}>Question</span>
          </div>
          <div className="w-secCircle">
            <span>About U</span>
          </div>
        </motion.div>
        {/* background Circles */}
        <div className="w-backCircle blueCircle"></div>
        <div className="w-backCircle yellowCircle"></div>
      </div>
    </div>
  );
};

export default Works;