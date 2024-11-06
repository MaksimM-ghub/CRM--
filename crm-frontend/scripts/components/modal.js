  import { validationEmail } from './validationEmail.js';
  import { inputMask } from './inputMask.js';
  import { deleteClientServer } from './api.js';
  import { createDeleteModal } from './function.js';
  import { studentList, $wrapper } from '../main.js';

  export function createModalWindow(
    classwrapper,
    classInner,
    title,
    mainPart,
    btnSaveDel,
    btnCancel
  ) {
    // Создаем обертку
    const $modalWrapper = document.createElement("div");
    const $modalInner = document.createElement("div");
    $modalWrapper.classList.add("modal-close", classwrapper);
    $modalInner.classList.add(classInner);
    // Заголовок модального окна
    const header = title;
    // Основная часть модального окна (форма и подтверждение удаления)
    const body = mainPart;
    // Кнопка сохранить/Удалить
    const btn = btnSaveDel;
    // Кнопка отмена/Удалить
    const btnCanc = btnCancel;
    // Создаем «кнопку-крестик» для закрытия окна
    const $closeBtn = document.createElement("button");
    $closeBtn.classList.add("close-btn");
    // Закрытие модального окна при клике на крестик
    $closeBtn.addEventListener("click", () => {
      $modalWrapper.classList.remove("open");
      $modalInner.classList.remove("open");
      document.querySelector(".modal-close").remove();
    });

    //Закрытие модально окна при клике на темный фон
    $modalWrapper.addEventListener("click", function (event) {
      if (event.target.classList.contains("modal-wrapper")) {
        $modalWrapper.classList.remove("open");
        $modalInner.classList.remove("open");
        document.querySelector(".modal-close").remove();
      } else if (event.target.classList.contains("modal-delete-wrapper")) {
        $modalWrapper.classList.remove("open");
        $modalInner.classList.remove("open");
      }
    });

    $modalInner.append(header, body, btn, btnCanc, $closeBtn);
    $modalWrapper.append($modalInner);
    $wrapper.append($modalWrapper);

    return {
      $modalInner,
      $modalWrapper,
    };
  }

  // Создание заголовка модального окна (Для добавления и удаления клиента)
  export function createTitleClient(text, className) {
    const $title = document.createElement("h2");
    $title.textContent = text;
    $title.classList.add(className);
    return $title;
  }

  //Создание заголовка модального окна (Для изменения клиента);
  export function createTitleChangeClient(client) {
    const $titleWrapper = document.createElement("div");
    $titleWrapper.classList.add("title-wrapper");

    const $title = document.createElement("h2");
    $title.textContent = "Изменить данные";
    $title.classList.add("change-client-title");

    const $clientId = document.createElement("span");
    $clientId.classList.add("client-id");
    $clientId.textContent = `ID: ${client.id}`;

    $titleWrapper.append($title, $clientId);

    return $titleWrapper;
  }

  // Создание формы для добавления/изменения клиента
  export function createFormNewClient(client) {
    const $form = document.createElement("form");
    $form.classList.add("form");
    $form.setAttribute("id", "data");

    const $inputWrapperName = document.createElement("div");
    const $inputWrapperSurname = document.createElement("div");
    const $inputWrapperLastname = document.createElement("div");

    $inputWrapperName.classList.add("input-wrapper");
    $inputWrapperSurname.classList.add("input-wrapper");
    $inputWrapperLastname.classList.add("input-wrapper");

    const $labelName = document.createElement("label");
    const $labelSurname = document.createElement("label");
    const $labelLastname = document.createElement("label");

    $labelName.innerHTML = "Имя<span>*</span>";
    $labelSurname.innerHTML = "Фамилия<span>*</span>";
    $labelLastname.textContent = "Отчество";

    $labelName.classList.add("label-name", "label-placeholder");
    $labelSurname.classList.add("label-surname", "label-placeholder");
    $labelLastname.classList.add("label-lastname", "label-placeholder");

    const $inputName = document.createElement("input");
    const $inputSurname = document.createElement("input");
    const $inputLastname = document.createElement("input");

    $inputName.placeholder = "";
    $inputSurname.placeholder = "";
    $inputLastname.placeholder = "";

    if (client) {
      $inputName.value = client.name;
      $inputSurname.value = client.surname;
      $inputLastname.value = client.lastName;
    }

    $inputSurname.classList.add(
      "modal-input",
      "input-surname",
      "input-required"
    );
    $inputName.classList.add("modal-input", "input-name", "input-required");
    $inputLastname.classList.add("modal-input", "last-name");

    const $contactsContainer = document.createElement("div");
    $contactsContainer.classList.add("contacts-container");

    if (client) {
      client.contacts.forEach((item) => {
        const formContacts = createListContacts();
        $contactsContainer.append(formContacts.$wrapperContacts);
        formContacts.$select.value = item.type;
        formContacts.$inputContacts.value = item.value;
      });
    }

    $inputWrapperName.append($inputName, $labelName);
    $inputWrapperSurname.append($inputSurname, $labelSurname);
    $inputWrapperLastname.append($inputLastname, $labelLastname);

    //Создаем кнопку для добавления контактов
    function createAddbnt() {
      const $modalAddBtn = document.createElement("button");
      $modalAddBtn.setAttribute("type", "button");
      $modalAddBtn.classList.add("modal-add-btn");
      $modalAddBtn.textContent = "Добавить контакт";

      const icon = document.createElement("span");
      icon.classList.add("icon-add");
      $modalAddBtn.prepend(icon);

      //Добавляем форму для заполнения контактов клиента
      $modalAddBtn.addEventListener("click", () => {
        const select = createListContacts();
        $contactsContainer.append(select.$wrapperContacts);

        validationEmail();
        inputMask();

        let countContacts =
          document.querySelectorAll(".wrapper-contacts").length;
        if (countContacts >= 10) {
          $modalAddBtn.classList.add("hide");
        }
      });

      return $modalAddBtn;
    }

    $form.append(
      $inputWrapperSurname,
      $inputWrapperName,
      $inputWrapperLastname,
      $contactsContainer,
      createAddbnt()
    );

    return {
      $form,
      $contactsContainer,
      $inputName,
      $inputSurname,
      $inputLastname,
    };
  }

  //Cоздаем список контактов
  function createListContacts() {
    const $wrapperContacts = document.createElement("div");
    $wrapperContacts.classList.add("wrapper-contacts");

    const $select = document.createElement("select");
    $select.classList.add("select-contacts");
    $select.setAttribute("id", "contactsType");
    const $selectWrapper = document.createElement("div");
    $selectWrapper.classList.add("select-wrapper");

    const $optionTel = document.createElement("option");
    const $optionVK = document.createElement("option");
    const $optionEmail = document.createElement("option");
    const $optionFacebook = document.createElement("option");
    const $optionAddTel = document.createElement("option");

    $optionTel.value = "Телефон";
    $optionVK.value = "Вконтакте";
    $optionEmail.value = "Email";
    $optionFacebook.value = "Facebook";
    $optionAddTel.value = "Телефон";

    $optionTel.textContent = "Телефон";
    $optionVK.textContent = "Вконтакте";
    $optionEmail.textContent = "Email";
    $optionFacebook.textContent = "Facebook";
    $optionAddTel.textContent = "Доп. телефон";

    const $inputContacts = document.createElement("input");
    $inputContacts.placeholder = "";
    $inputContacts.classList.add("input-contacts");

    const $labelplaceholber = document.createElement("label");
    $labelplaceholber.classList.add("contacts-placeholder");
    $labelplaceholber.textContent = "Введите данные контакта";

    const $btn = document.createElement("button");
    $btn.classList.add("btn-contacts");

    // Удаление элементов контактов
    $btn.addEventListener("click", () => {
      let countContacts =
        document.querySelectorAll(".wrapper-contacts").length - 1;
      if (countContacts < 10) {
        document.querySelector(".modal-add-btn").classList.remove("hide");
      }
      $wrapperContacts.remove();
    });

    $select.append(
      $optionTel,
      $optionVK,
      $optionEmail,
      $optionFacebook,
      $optionAddTel
    );

    $selectWrapper.append($select);
    $wrapperContacts.append(
      $selectWrapper,
      $inputContacts,
      $labelplaceholber,
      $btn
    );

    return {
      $wrapperContacts,
      $select,
      $inputContacts,
    };
  }

  // Подтверждение удаления клиента
  export function createTextDeleteClient() {
    const $text = document.createElement("p");
    $text.textContent = "Вы действительно хотите удалить данного клиента";
    $text.classList.add("text-delete");

    return $text;
  }

  //Создаем кнопку Сохранить
  export function createSaveBtn() {
    const $modalSaveBtn = document.createElement("button");
    $modalSaveBtn.setAttribute("type", "submit");
    $modalSaveBtn.setAttribute("form", "data");
    $modalSaveBtn.classList.add("modal-btn");
    $modalSaveBtn.textContent = "Сохранить";

    return $modalSaveBtn;
  }

  //Создаем кнопку Удалить
  export function createDeleteBtn(row) {
    const $modalDeleteBtn = document.createElement("button");
    $modalDeleteBtn.setAttribute("type", "button");
    $modalDeleteBtn.classList.add("modal-delete-btn");
    $modalDeleteBtn.textContent = "Удалить";

    $modalDeleteBtn.addEventListener("click", async (event) => {
      const idClient = row.dataset.id;
      await deleteClientServer(idClient);
      document.querySelector(".modal-close").remove();
      row.remove();
      studentList.forEach((client, index) => {
        if (client.id == idClient) {
          studentList.splice(index, 1);
        }
      });
      createDeleteModal(".modal-delete-wrapper", ".modal-delete-inner");
    });

    return $modalDeleteBtn;
  }

  //Создаем кнопку Отмена
  export function createCancelBtn() {
    const $modalCancelBtn = document.createElement("button");
    $modalCancelBtn.classList.add("modal-cancel-btn");
    $modalCancelBtn.textContent = "Отмена";

    $modalCancelBtn.addEventListener("click", () => {
      createDeleteModal(".modal-wrapper", ".modal-inner");
      createDeleteModal(".modal-delete-wrapper", ".modal-delete-inner");
      document.querySelector(".modal-close").remove();
    });

    return $modalCancelBtn;
  }
  //Создаем кнопку Удалить клиента
  export function createDeleteClientBtn(row) {
    const $modalDelBtn = document.createElement("button");
    $modalDelBtn.classList.add("modal-delete-client-btn");
    $modalDelBtn.textContent = "Удалить клиента";

    $modalDelBtn.addEventListener("click", (event) => {
      createDeleteModal(".modal-wrapper", ".modal-inner");
      document.querySelector(".modal-close").remove();
      createDeleteModal(".modal-delete-wrapper", ".modal-delete-inner");
      const modalWidow = createModalWindow(
        "modal-delete-wrapper",
        "modal-delete-inner",
        createTitleClient("Удалить клиента", "remove-client"),
        createTextDeleteClient(),
        createDeleteBtn(row),
        createCancelBtn()
      );

      modalWidow.$modalWrapper.classList.add("open");
      modalWidow.$modalInner.classList.add("open");
    });

    return $modalDelBtn;
  }