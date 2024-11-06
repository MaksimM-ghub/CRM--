import { getSearchServer } from "./api.js";
import { updateStudentList, render, studentList } from "../main.js";

export function createSearchApp() {
  const $headerWrapper = document.createElement("div");
  const $searchInput = document.createElement("input");
  const $logo = document.createElement("img");
  $logo.src = "img/logo.png";
  $logo.alt = "Логотип приложения";

  $headerWrapper.classList.add("header-wrapper");
  $logo.classList.add("logo-img");
  $searchInput.classList.add("search-input");
  $searchInput.placeholder = "Введите запрос";
  $searchInput.addEventListener("input", () => {
    setTimeout(async () => {
      let client = await getSearchServer($searchInput.value);
      updateStudentList(client)
      render(studentList);
    }, 1000);
  });

  $headerWrapper.append($logo, $searchInput);

  return {
    $headerWrapper,
    $searchInput,
  };
}
