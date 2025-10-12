import ghLogo from "../assets/github-mark.svg";

function Footer() {
  return (
    <footer className="footer">
      {process.env.REACT_APP_IS_DEV === "true" ? (
        <div className="footer-hits">hit counter</div>
      ) : (
        <div className="footer-hits">
          <a href="https://hitscounter.dev/">
            <img
              alt="hits"
              src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fblog.anteater-lab.link%2Fnamu-soup%2F&label=&icon=tree&color=%23614d42&message=&style=flat&tz=UTC"
            />
          </a>
        </div>
      )}
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
