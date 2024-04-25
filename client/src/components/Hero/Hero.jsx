import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
import FormComponent from "../Form/FormComponent";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            >
              Find <br />
              The Perfect
              <br /> Price
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Hi I'm Firang 👋</span>
            <span>I’ll help you with accurate house prices & rents in Tunisia </span>
          </div>

          <FormComponent/>

          
        </div>

        {/* right side */}
        
      </div>
    </section>
  );
};

export default Hero;
