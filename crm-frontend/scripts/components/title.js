  // Создаем заголовок
  export function createTitleApp() {
    const title = document.createElement("h1");
    title.textContent = "Клиенты";
    title.classList.add("title-app");

    return title;
  }