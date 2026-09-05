const KJV_SOURCE =

  "https://raw.githubusercontent.com/renniemaharaj/kjv-bible/main/kjv.json";

async function getKJV() {

  const response = await fetch(KJV_SOURCE);

  if (!response.ok) {

    throw new Error("Unable to load the KJV Bible.");

  }

  return await response.json();

}

