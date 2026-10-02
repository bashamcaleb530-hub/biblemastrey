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

const KJVPLUS_SOURCE =
  "https://raw.githubusercontent.com/prive8/bible-llm-reference/main/kjv.json";

const HELLOAO_TRANSLATIONS_SOURCE =
  "https://bible.helloao.org/api/available_translations.json";

let kjvBible = null;
let webBible = null;
let asvBible = null;
let geneva1599Bible = null;
let draBible = null;
let bsbBible = null;
let msbBible = null;
let yltBible = null;
let kjv1611Bible = null;
let kjvplusBible = null;
let helloAOTranslationList = null;

const publicDomainBibleCache = {};

/* =========================
   NORMALIZE HELLOAO BIBLES
========================= */

function normalizeHelloAOComplete(data) {
  if (!data || !Array.isArray(data.books)) {
    return data;
  }

  return {
    translation: data.translation || null,
    books: data.books.map(function(book) {
      return {
        id: book.id || "",
        bookId: book.id || "",
        book: book.commonName || book.name || book.title || book.id || "Unknown Book",
        name: book.name || book.commonName || book.title || book.id || "Unknown Book",
        englishName: book.commonName || book.name || book.title || book.id || "Unknown Book",
        title: book.title || book.name || book.commonName || book.id || "Unknown Book",
        chapters: (book.chapters || []).map(function(entry, chapterIndex) {
          const chapterData = entry && entry.chapter ? entry.chapter : entry;
          const content = chapterData && Array.isArray(chapterData.content)
            ? chapterData.content
            : [];

          return {
            chapter:
              (chapterData && chapterData.number) ||
              (entry && entry.number) ||
              (chapterIndex + 1),
            verses: content
              .filter(function(item) {
                return item && item.type === "verse";
              })
              .map(function(item, verseIndex) {
                return {
                  number: item.number || (verseIndex + 1),
                  text: item.text || ""
                };
              })
          };
        })
      };
    })
  };
}

async function loadHelloAOCompleteByUrl(url, errorMessage) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorMessage || "Failed to load Bible translation");
  }

  const data = await response.json();
  return normalizeHelloAOComplete(data);
}

async function getHelloAOTranslationList() {
  if (helloAOTranslationList) {
    return helloAOTranslationList;
  }

  const response = await fetch(HELLOAO_TRANSLATIONS_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the public-domain translation list");
  }

  const data = await response.json();
  helloAOTranslationList = Array.isArray(data.translations)
    ? data.translations
    : [];

  return helloAOTranslationList;
}

function translationFieldValues(item) {
  return [
    item && item.id,
    item && item.shortName,
    item && item.name,
    item && item.englishName
  ]
    .filter(Boolean)
    .map(function(value) {
      return String(value).trim().toLowerCase();
    });
}

async function loadPublicDomainHelloAOBible(cacheKey, matchers, displayName) {
  if (publicDomainBibleCache[cacheKey]) {
    return publicDomainBibleCache[cacheKey];
  }

  const translations = await getHelloAOTranslationList();
  const wanted = matchers.map(function(value) {
    return String(value).trim().toLowerCase();
  });

  let match = translations.find(function(item) {
    const values = translationFieldValues(item);
    return wanted.some(function(target) {
      return values.includes(target);
    });
  });

  if (!match) {
    match = translations.find(function(item) {
      const values = translationFieldValues(item);
      return wanted.some(function(target) {
        return values.some(function(value) {
          return value.includes(target) || target.includes(value);
        });
      });
    });
  }

  if (!match || !match.id) {
    throw new Error("Could not find " + displayName + " in the public-domain Bible API");
  }

  const url =
    "https://bible.helloao.org/api/" +
    encodeURIComponent(match.id) +
    "/complete.simple.json";

  const bible = await loadHelloAOCompleteByUrl(
    url,
    "Failed to load " + displayName
  );

  publicDomainBibleCache[cacheKey] = bible;
  return bible;
}

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

  const books = [];

  for (const bookFile of bookFiles) {
    const response = await fetch(
      KJV1611_SOURCE + encodeURIComponent(bookFile) + ".json"
    );

    if (!response.ok) {
      throw new Error("Failed to load KJV 1611 book: " + bookFile);
    }

    books.push(await response.json());
  }

  kjv1611Bible = { books: books };
  return kjv1611Bible;
}

async function getKJVPLUS() {
  if (kjvplusBible) {
    return kjvplusBible;
  }

  const response = await fetch(KJVPLUS_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load King James Version Plus");
  }

  const data = await response.json();
  kjvplusBible = Array.isArray(data.books)
    ? { books: data.books }
    : data;

  return kjvplusBible;
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
   BSB / MSB / YLT
========================= */

async function getBSB() {
  if (bsbBible) {
    return bsbBible;
  }

  bsbBible = await loadHelloAOCompleteByUrl(
    BSB_SOURCE,
    "Failed to load the Berean Standard Bible"
  );

  return bsbBible;
}

async function getMSB() {
  if (msbBible) {
    return msbBible;
  }

  msbBible = await loadHelloAOCompleteByUrl(
    MSB_SOURCE,
    "Failed to load the Majority Standard Bible"
  );

  return msbBible;
}

async function getYLT() {
  if (yltBible) {
    return yltBible;
  }

  yltBible = await loadHelloAOCompleteByUrl(
    YLT_SOURCE,
    "Failed to load Young's Literal Translation"
  );

  return yltBible;
}

/* =========================
   NEW PUBLIC-DOMAIN BIBLES
========================= */

async function getBBE() {
  return await loadPublicDomainHelloAOBible(
    "BBE",
    ["engBBE", "BBE", "Bible in Basic English"],
    "Bible in Basic English"
  );
}

async function getDBY() {
  return await loadPublicDomainHelloAOBible(
    "DBY",
    ["engDBY", "DBY", "Darby Translation"],
    "Darby Translation"
  );
}

async function getWEBSTER() {
  return await loadPublicDomainHelloAOBible(
    "WEBSTER",
    ["engwebster", "ENGWBS", "Webster", "Noah Webster Bible", "Webster Bible"],
    "Noah Webster Bible"
  );
}

async function getWMB() {
  return await loadPublicDomainHelloAOBible(
    "WMB",
    ["engwmb", "WMB", "World Messianic Bible"],
    "World Messianic Bible"
  );
}

async function getRV() {
  return await loadPublicDomainHelloAOBible(
    "RV",
    ["eng-rv", "ENGRV5", "RV", "Revised Version with Apocrypha (1895)", "Revised Version"],
    "Revised Version"
  );
}

/* =========================
   MAKE FUNCTIONS AVAILABLE
========================= */

window.getKJV = getKJV;
window.getKJV1611 = getKJV1611;
window.getKJVPLUS = getKJVPLUS;
window.getWEB = getWEB;
window.getASV = getASV;
window.getGENEVA1599 = getGENEVA1599;
window.getDRA = getDRA;
window.getBSB = getBSB;
window.getMSB = getMSB;
window.getYLT = getYLT;
window.getBBE = getBBE;
window.getDBY = getDBY;
window.getWEBSTER = getWEBSTER;
window.getWMB = getWMB;
window.getRV = getRV;
