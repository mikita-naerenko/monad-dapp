export const getReferralFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("ref");
};
