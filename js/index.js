const $galleryList = document.querySelector(".galleryList");
const $searchField = document.querySelector("#searchField");
const $btnSearch = document.querySelector("#btnSearch");

$btnSearch.addEventListener("click", () => search($searchField));

search($searchField);

function createCard(twoThinCoats, citadel, colorCode, $parent) {
  const list = document.createElement("li");
  list.classList.add("item");
  list.style.backgroundColor = colorCode;

  const ttc = document.createElement("h3");
  const imgT = document.createElement("img");
  const aT = document.createElement("a");
  aT.href = "https://www.duncanrhodes.com/ttc-paints/";
  aT.target = "_blank";
  imgT.src =
    "https://www.duncanrhodes.com/wp-content/uploads/2022/10/cropped-Sir-Coates-Logo-small-175px-x-175px.png";
  ttc.innerText = twoThinCoats;
  aT.appendChild(imgT);
  ttc.appendChild(aT);
  ttc.classList.add("ttc");
  const cit = document.createElement("h4");
  const a = document.createElement("a");
  a.href = "https://citadelcolour.com";
  a.target = "_blank";
  const imgC = document.createElement("img");
  imgC.src =
    "https://citadelcolour.com/wp-content/themes/gw-citadel-colour/assets/images/citadel-colour-logo.png";
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
  fetch("https://gerinfact.github.io/ttc_citadel//colors.json")
    .then((data) => data.json())
    .then((res) => {
      res.colors
        .filter((colorEntry) => {
          console.log(colorEntry);
          return (
            colorEntry.ttc
              .toLowerCase()
              .includes($searchField.value.toLowerCase()) ||
            colorEntry.cit
              .toLowerCase()
              .includes($searchField.value.toLowerCase())
          );
        })
        .forEach((colorEntry) => {
          createCard(
            colorEntry.ttc,
            colorEntry.cit,
            colorEntry.color,
            $galleryList
          );
        });
    })
    .catch((err) => console.log(err.message));
}
