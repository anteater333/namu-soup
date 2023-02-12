import ghLogo from "../assets/github-mark.svg";

function Footer() {
  return (
    <footer class="footer">
      <div class="footer-gh-logo">
        <a href="https://github.com/anteater333/namu-soup">
          <img src={ghLogo} alt="github repo" />
        </a>
      </div>
      <div class="footer-copyright">
        Copyright© 2023.
        <a class="text-dark" href="https://github.com/anteater333">
          {" "}
          anteater333
        </a>{" "}
        All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
