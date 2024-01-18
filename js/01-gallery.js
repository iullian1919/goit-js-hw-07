import { galleryItems } from "./gallery-items.js";

const listEl = document.querySelector(".gallery");
listEl.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

listEl.addEventListener("click", onItemClick);

function createMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
         <a class="gallery__link" href="${original}">
          <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
          />
         </a>
        </li>
        `;
    })
    .join("");
}

function onItemClick(ev) {
  ev.preventDefault();
  if (!ev.target.classList.contains("gallery__image")) {
    return;
  }
  const url = ev.target.dataset.source;
  const instance = basicLightbox.create(
    `
        <img src="${url}">
        `
  );
  instance.show();

  const onEscClick = function (ev) {
    if (ev.key === "Escape" && ev.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onEscClick);
    }
  };

  document.addEventListener("keydown", onEscClick);
}
