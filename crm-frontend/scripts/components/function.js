  // Функция создания ошибки сервера
  export function createErrorServer(text) {
    const form = document.getElementById("data");

    const errorElem = document.createElement("p");
    errorElem.textContent = text;
    errorElem.classList.add("text-error");

    form.append(errorElem);
  }

  //Создание элемента загрузки
  export function createPreLoader(classLoader) {
    const $loader = document.createElement("div");
    $loader.classList.add(classLoader);

    return $loader;
  }

  export function clearModalInfo() {
    // Отчищаем инпуты добавления клиента
    let inputs = document.querySelectorAll(".modal-input");
    Array.from(inputs).forEach((input) => (input.value = ""));

    // Удаляем форму контактов
    let contacts = document.querySelectorAll(".wrapper-contacts");
    if (contacts.length > 0) {
      Array.from(contacts).forEach((contacts) => contacts.remove());
    }
  }

  //Функция закрытия модального окна
  export function createDeleteModal(classWrapper, classInner) {
    const modalWrapper = document.querySelectorAll(classWrapper);
    const modalInner = document.querySelectorAll(classInner);
    modalWrapper.forEach((item) => item.classList.remove("open"));
    modalInner.forEach((item) => item.classList.remove("open"));
  }

 //Получаем данные клиента из формы
  export function getInfoClient() {
    let clientObj = {};
    let arrContacts = [];

    const contactsWrapper = document.querySelectorAll(".wrapper-contacts");
    const contactsArr = Array.from(contactsWrapper).forEach((item) => {
      const select = item.querySelector(".select-contacts");
      const selectValue = select.value;
      const inputValue = item.querySelector(".input-contacts").value;

      const contactsObj = {
        type: selectValue,
        value: inputValue,
      };

      arrContacts.push(contactsObj);
    });

    clientObj = {
      id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      name: document.querySelector(".input-name").value,
      surname: document.querySelector(".input-surname").value,
      lastName: document.querySelector(".last-name").value,
      contacts: arrContacts,
    };

    return clientObj;
  }