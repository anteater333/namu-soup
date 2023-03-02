function NotFoundPage() {
  let warning = "";

  let rand = Math.random();
  if (rand <= 0.33) {
    warning = "잘못 들어오셨습니다.";
  } else if (rand <= 0.66) {
    warning = "이 길이 아닙니다.";
  } else {
    warning = "페이지가 존재하지 않습니다.";
  }

  return (
    <div className="not-found-page">
      {warning}
      <br />
      404 Page Not Found
    </div>
  );
}

export default NotFoundPage;
