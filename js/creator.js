import { submitVerificationToBackend } from "./api.js";

const form = document.querySelector("#verification-form");
const status = document.querySelector("#verification-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");

  const payload = {
    name,
    cv: data.get("cv"),
    certificate: data.get("certificate"),
    demoVideo: data.get("demoVideo")
  };

  localStorage.setItem(
    "skillbanao-verification",
    JSON.stringify({
      ...payload,
      status: "pending"
    })
  );

  status.textContent = "Submitting verification...";
  const result = await submitVerificationToBackend(payload);

  if (!result.ok) {
    status.textContent = result.message || "Saved locally but backend submission failed.";
    return;
  }

  status.textContent = `Verification submitted for ${name}. Review status: Pending (${result.mode || "local"} mode).`;
  form.reset();
});
