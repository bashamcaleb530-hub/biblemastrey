const KJV_SOURCE =

  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json";

let kjvBible = null;

async function getKJV() {

  if (kjvBible) {

    return kjvBible;

  }

  const response = await fetch(KJV_SOURCE);

  if (!response.ok) {

    throw new Error("Unable to load the KJV Bible.");

  }

  kjvBible = await response.json();

  return kjvBible;
