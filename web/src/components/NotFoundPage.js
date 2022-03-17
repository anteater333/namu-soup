function NotFoundPage() {
  let warning = "";

  let rand = Math.random();
  if (rand <= 0.3) {
    warning = "잘못 들어오셨어요!";
  } else if (rand <= 0.6) {
    warning = "이 길이 아닙니다.";
  } else if (rand <= 0.9) {
    warning = "페이지가 존재하지 않습니다.";
  } else {
    warning = "이상한짓 하지마요!";
  }

  return (
    <div className="not-found-page">
      {warning}
      <br />
      a.k.a.
      <br />
      404 Page Not Found
    </div>
  );
}

export default NotFoundPage;
