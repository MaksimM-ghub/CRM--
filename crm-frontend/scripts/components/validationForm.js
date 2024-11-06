
  export function validation(form) {
    function removeError(input) {
      const parent = input.parentNode;
      if (parent.classList.contains("input-error")) {
        parent.querySelector(".label-error").remove();
        parent.classList.remove("input-error");
      }
    }

    function removeErrorContacts(item) {
      const parent = item;

      if (parent.classList.contains("input-contacts-error")) {
        parent.querySelector(".contacts-error").remove();

        parent.classList.remove("input-contacts-error");
      }
    }

    function createError(input) {
      const parent = input.parentNode;
      const label = document.createElement("label");
      label.textContent = "Поле обязательное для заполнения";
      label.classList.add("label-error");
      parent.classList.add("input-error");
      parent.append(label);
    }

    function createErrorContacts(item) {
      const parent = item;
      const label = document.createElement("label");
      label.textContent = "Заполните данные контакта";
      label.classList.add("contacts-error");
      parent.classList.add("input-contacts-error");
      parent.append(label);
    }

    let result = true;

    let inputs = document.querySelectorAll(".input-required");

    Array.from(inputs).forEach((input) => {
      removeError(input);
      if (input.value.trim() == "") {
        createError(input);
        result = false;
      }
    });

    let contactsWrap = document.querySelector(".contacts-container").children;

    Array.from(contactsWrap).forEach((item) => {
      removeErrorContacts(item);
      let input = item.querySelector(".input-contacts");
      if (input.value.trim() == "") {
        createErrorContacts(item);
        result = false;
      }
    });

    return result;
  }