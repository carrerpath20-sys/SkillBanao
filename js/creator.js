const form = document.querySelector("#verification-form");
const status = document.querySelector("#verification-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  localStorage.setItem(
    "skillbanao-verification",
    JSON.stringify({
      name,
      cv: data.get("cv"),
      certificate: data.get("certificate"),
      demoVideo: data.get("demoVideo"),
      status: "pending"
    })
  );

  status.textContent = `Verification submitted for ${name}. Review status: Pending.`;
  form.reset();
});
