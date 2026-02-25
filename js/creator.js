import { submitVerificationToBackend } from "./api.js";

const form = document.querySelector("#verification-form");
const status = document.querySelector("#verification-status");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();

    const payload = {
      name,
      cv: String(data.get("cv") || "").trim(),
      certificate: String(data.get("certificate") || "").trim(),
      demoVideo: String(data.get("demoVideo") || "").trim()
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
}
