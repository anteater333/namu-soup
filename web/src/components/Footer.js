import ghLogo from "../assets/github-mark.svg";

function Footer() {
  return (
    <footer className="footer">
      {process.env.REACT_APP_IS_DEV ? (
        <div class="footer-hits">hit counter</div>
      ) : (
        <div class="footer-hits">
          <a href="https://hits.seeyoufarm.com">
            <img
              src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fblog.anteater-lab.link%2Fnamu-soup%2F&count_bg=%23614D42&title_bg=%23614D42&icon=&icon_color=%23E7E7E7&title=%EB%B0%A9%EB%AC%B8%EA%B0%9D%EB%93%A4&edge_flat=false"
              alt="hits"
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
