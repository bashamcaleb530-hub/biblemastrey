const KJV_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json";

const WEB_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/web/web.json";

const ASV_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/asv/asv.json";

let kjvBible = null;
let webBible = null;
let asvBible = null;


/* =========================
   KJV
========================= */

async function getKJV() {
  if (kjvBible) {
    return kjvBible;
  }

  const response = await fetch(KJV_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the King James Version");
  }

  kjvBible = await response.json();

  return kjvBible;
}


/* =========================
   WEB
========================= */

async function getWEB() {
  if (webBible) {
    return webBible;
  }

  const response = await fetch(WEB_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the World English Bible");
  }

  webBible = await response.json();

  return webBible;
}


/* =========================
   ASV
========================= */

async function getASV() {
  if (asvBible) {
    return asvBible;
  }

  const response = await fetch(ASV_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the American Standard Version");
  }

  asvBible = await response.json();

  return asvBible;
}


/* =========================
   MAKE FUNCTIONS AVAILABLE
========================= */

window.getKJV = getKJV;
window.getWEB = getWEB;
window.getASV = getASV;
