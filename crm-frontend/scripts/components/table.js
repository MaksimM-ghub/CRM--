//Создание таблицы
  export function createTable() {
    const $tableWrapper = document.createElement("div");
    const $table = document.createElement("table");
    const $tableHead = document.createElement("thead");
    const $tableBody = document.createElement("tbody");
    const $trHead = document.createElement("tr");
    const $thID = document.createElement("th");
    const $thFIO = document.createElement("th");
    const $thDateAndTime = document.createElement("th");
    const $thLastChange = document.createElement("th");
    const $thContacts = document.createElement("th");
    const $thActions = document.createElement("th");

    $thID.textContent = "ID";
    $thFIO.textContent = "Фамилия Имя Отчество";
    $thDateAndTime.textContent = "Дата и время создания";
    $thLastChange.textContent = "Последние изменения";
    $thContacts.textContent = "Контакты";
    $thActions.textContent = "Действия";

    $thID.setAttribute("data-column", "id");
    $thFIO.setAttribute("data-column", "fio");
    $thDateAndTime.setAttribute("data-column", "createdAt");
    $thLastChange.setAttribute("data-column", "updatedAt");

    $tableWrapper.classList.add("table-wrapper");
    $table.classList.add("table-app");
    $tableHead.classList.add("table-head-app");
    $tableBody.classList.add("table-body-app");
    $thID.classList.add("th-id");
    $thFIO.classList.add("th-fio");
    $thDateAndTime.classList.add("th-date");
    $thLastChange.classList.add("th-changes");
    $thContacts.classList.add("th-contacts");
    $thActions.classList.add("th-action");

    $trHead.append(
      $thID,
      $thFIO,
      $thDateAndTime,
      $thLastChange,
      $thContacts,
      $thActions
    );

    $tableHead.append($trHead);
    $table.append($tableHead, $tableBody);
    $tableWrapper.append($table);

    return {
      $tableWrapper,
      $table,
      $tableBody,
    };
  }