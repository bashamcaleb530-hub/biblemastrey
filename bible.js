const KJV_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json";

const WEB_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/web/web.json";

const ASV_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/asv/asv.json";

const GENEVA1599_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/geneva1599/geneva1599.json";

const DRA_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/dra/dra.json";


let kjvBible = null;
let webBible = null;
let asvBible = null;
let geneva1599Bible = null;
let draBible = null;


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
   GENEVA 1599
========================= */

async function getGENEVA1599() {
  if (geneva1599Bible) {
    return geneva1599Bible;
  }

  const response = await fetch(GENEVA1599_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the Geneva Bible 1599");
  }

  geneva1599Bible = await response.json();

  return geneva1599Bible;
}


/* =========================
   DOUAY-RHEIMS
========================= */

async function getDRA() {
  if (draBible) {
    return draBible;
  }

  const response = await fetch(DRA_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the Douay-Rheims Bible");
  }

  draBible = await response.json();

  return draBible;
}


/* =========================
   MAKE FUNCTIONS AVAILABLE
========================= */

window.getKJV = getKJV;
window.getWEB = getWEB;
window.getASV = getASV;
window.getGENEVA1599 = getGENEVA1599;
window.getDRA = getDRA;
