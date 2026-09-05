const KJV_SOURCE =

  "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json";
const WEB_SOURCE = "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/WEB/WEB.json"
let kjvBible = null;

async function getKJV() {

  if (kjvBible) return kjvBible;

  const response = await fetch(KJV_SOURCE);

  if (!response.ok) {

    throw new Error("Unable to load the KJV Bible.");

  }
async function getWEB() {
  const response = await fetch(WEB_SOURCE);

  if (!response.ok) {
    throw new Error("Failed to load World English Bible");
  }

  const data = await response.json();
  return data;
}
  kjvBible = await response.json();

  return kjvBible;

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

