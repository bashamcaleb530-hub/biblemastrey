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
const BSB_SOURCE =
  "https://bible.helloao.org/api/BSB/complete.simple.json";
const MSB_SOURCE =
  "https://bible.helloao.org/api/eng_msb/complete.simple.json";
const YLT_SOURCE =
  "https://bible.helloao.org/api/eng_ylt/complete.simple.json";
const KJV1611_SOURCE =
  "https://raw.githubusercontent.com/aruljohn/Bible-kjv-1611/main/";
let kjvBible = null;
let webBible = null;
let asvBible = null;
let geneva1599Bible = null;
let draBible = null;
let bsbBible = null;
let msbBible = null;
let yltBible = null;
let kjv1611Bible = null;
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
async function getKJV1611() {
  if (kjv1611Bible) {
    return kjv1611Bible;
  }

 const bookFiles = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
  "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
  "James", "1 Peter", "2 Peter", "1 John", "2 John",
  "3 John", "Jude", "Revelation"
];

  kjv1611Bible = [];

for (const bookFile of bookFiles) {
  const response = await fetch(
    KJV1611_SOURCE + encodeURIComponent(bookFile) + ".json"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load KJV 1611 book: " + bookFile
    );
  }

  const bookData = await response.json();
  kjv1611Bible.push(bookData);
}

return kjv1611Bible;

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
async function getBSB() {
  if (bsbBible) {
    return bsbBible;
  }

  const response = await fetch(BSB_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the Berean Standard Bible");
  }

  const data = await response.json();

  bsbBible = data;

  return bsbBible;
}
async function getMSB() {
  if (msbBible) {
    return msbBible;
  }

  const response = await fetch(MSB_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the Majority Standard Bible");
  }

  const data = await response.json();

  msbBible = data;

  return msbBible;
}
async function getYLT() {
  if (yltBible) {
    return yltBible;
  }

  const response = await fetch(YLT_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load Young's Literal Translation");
  }

  const data = await response.json();

  yltBible = data;

  return yltBible;
}
/* =========================
   MAKE FUNCTIONS AVAILABLE
========================= */

window.getKJV = getKJV;
window.getKJV1611 = getKJV1611;
window.getWEB = getWEB;
window.getASV = getASV;
window.getGENEVA1599 = getGENEVA1599;
window.getDRA = getDRA;
window.getBSB = getBSB;
window.getMSB = getMSB;
window.getYLT = getYLT;
