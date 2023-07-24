import ghLogo from "../assets/github-mark.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-gh-logo">
        <a href="https://github.com/anteater333/namu-soup">
          <img src={ghLogo} alt="github repo" />
        </a>
      </div>
      <div className="footer-copyright">
        Copyright© 2023.
        <a className="text-dark" href="https://github.com/anteater333">
          {" "}
          anteater333
        </a>{" "}
        All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
