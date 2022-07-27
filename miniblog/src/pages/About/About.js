
import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
        <h2>Sobre o Mini <span>Blog</span></h2>
        <p>Este projeto foi feito com React.js no front-end e Firebase no back-end.</p>
        <link to="posts/create" className="btn">Criar post</link>
    </div>
  )
}

export default About