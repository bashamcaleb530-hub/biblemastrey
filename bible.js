const KJV_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json";

let kjvBible = null;

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

window.getKJV = getKJV;
