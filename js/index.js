const $galleryList = document.querySelector(".galleryList");
const $searchField = document.querySelector("#searchField");
const $btnSearch = document.querySelector("#btnSearch");

$btnSearch.addEventListener("click", () => search($searchField));

search($searchField);

function createCard(twoThinCoats, citadel, $parent) {
  const list = document.createElement("li");
  list.classList.add("item");

  const ttc = document.createElement("h3");
  const imgT = document.createElement("img");
  const aT = document.createElement("a");
  aT.href = "https://www.duncanrhodes.com/ttc-paints/";
  aT.target = "_blank";
  imgT.src = "/img/cropped-Sir-Coates-Logo-small-175px-x-175px.png";
  ttc.innerText = twoThinCoats;
  aT.appendChild(imgT);
  ttc.appendChild(aT);
  ttc.classList.add("ttc");
  const cit = document.createElement("h4");
  const a = document.createElement("a");
  a.href = "https://citadelcolour.com";
  a.target = "_blank";
  const imgC = document.createElement("img");
  imgC.src = "/img/citadel-colour-logo.png";
  cit.innerText = citadel;
  a.appendChild(imgC);
  cit.appendChild(a);
  cit.classList.add("citadel");

  list.appendChild(ttc);
  list.appendChild(cit);
  $parent.appendChild(list);
}

function search($searchField) {
  $galleryList.innerHTML = "";
  fetch("/colors.json")
    .then((data) => data.json())
    .then((res) => {
      res.colors
        .filter((colorEntry) => {
          return (
            colorEntry.ttc.toLowerCase().includes($searchField.value) ||
            colorEntry.cit.toLowerCase().includes($searchField.value)
          );
        })
        .forEach((colorEntry) => {
          createCard(colorEntry.ttc, colorEntry.cit, $galleryList);
        });
    })
    .catch((err) => console.log(err.message));
}
