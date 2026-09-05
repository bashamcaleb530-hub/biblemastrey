
Those **cannot be inside JavaScript**. They cause the entire `bible.js` file to fail before KJV can load.

So let's fix **only `bible.js` first**. Don't change your `index.html`.

### Replace your entire `bible.js` with this:

```javascript
const KJV_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json";

const WEB_SOURCE =
  "https://api.midvash.com/v1/web";

const ASV_SOURCE =
  "https://api.getbible.net/v2/asv.json";

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

  const data = await response.json();

  kjvBible = normalizeBibleData(data);

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

  const data = await response.json();

  console.log("WEB original data:", data);

  webBible = normalizeBibleData(data);

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

  const data = await response.json();

  console.log("ASV original data:", data);

  asvBible = normalizeBibleData(data);

  return asvBible;
}


/* =========================
   NORMALIZE BIBLE DATA
========================= */

function normalizeBibleData(data) {

  /* Already in reader format */

  if (
    data &&
    data.bible &&
    Array.isArray(data.bible.books)
  ) {
    return {
      bible: {
        books: data.bible.books
      }
    };
  }


  /* Data with books array */

  if (
    data &&
    Array.isArray(data.books)
  ) {
    return {
      bible: {
        books: data.books.map(function(book) {

          return {
            book:
              book.book ||
              book.name ||
              book.title ||
              "Unknown Book",

            chapters:
              Array.isArray(book.chapters)
                ? book.chapters.map(function(chapter) {

                    return {
                      chapter:
                        chapter.chapter ||
                        chapter.number,

                      verses:
                        Array.isArray(chapter.verses)
                          ? chapter.verses.map(function(verse) {

                              return {
                                verse:
                                  verse.verse ||
                                  verse.number,

                                text:
                                  verse.text ||
                                  verse.content ||
                                  ""
                              };

                            })
                          : []
                    };

                  })
                : []
          };

        })
      }
    };
  }


  /* Unknown format */

  console.error("Unrecognized Bible data:", data);

  throw new Error(
    "Bible data format was not recognized."
  );
}


/* =========================
   MAKE FUNCTIONS AVAILABLE
========================= */

window.getKJV = getKJV;
window.getWEB = getWEB;
window.getASV = getASV;
