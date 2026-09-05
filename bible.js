const KJV_SOURCE =
  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json";

const WEB_SOURCE = "https://api.midvash.com/v1/web";

const ASV_SOURCE = "https://api.getbible.net/v2/asv.json";

let kjvBible = null;
let webBible = null;
let asvBible = null;

async function getKJV() {
  if (kjvBible) return kjvBible;

  const response = await fetch(KJV_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the King James Version");
  }

  kjvBible = await response.json();

  return kjvBible;
}

async function getWEB() {
  if (webBible) return webBible;

  const response = await fetch(WEB_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the World English Bible");
  }

  webBible = await response.json();

  return webBible;
}

async function getASV() {
  if (asvBible) return asvBible;

  const response = await fetch(ASV_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load the American Standard Version");
  }

  asvBible = await response.json();

  return asvBible;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const bible = await getKJV();

    const reader = document.querySelector("#bible-reader");

    if (!reader) return;

    reader.innerHTML = `
      <h2>King James Version</h2>
      <p>The KJV Bible is loaded and ready.</p>
    `;
  } catch (error) {
    console.error(error);
  }
});

window.getKJV = getKJV;
window.getWEB = getWEB;
window.getASV = getASV;
