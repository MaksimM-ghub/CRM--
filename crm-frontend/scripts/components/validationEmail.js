  export function validationEmail() {
    const form = document.querySelector(".form");

    function isEmailValid(value) {
      const EMAIL_REGEXP = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
      return EMAIL_REGEXP.test(value);
    }

    // Определение обработчика input для валидации email
    function onInput(input) {
      const handler = () => {
        if (isEmailValid(input.value)) {
          input.classList.remove("invalid", "icon-invalid");
          input.classList.add("valid", "icon-valid");
          document.querySelector(".modal-btn").style.pointerEvents = "auto";
        } else {
          input.classList.remove("valid", "icon-valid");
          input.classList.add("invalid", "icon-invalid");
          document.querySelector(".modal-btn").style.pointerEvents = "none";
        }
      };

      input.addEventListener("input", handler);
      return handler;
    }

    const contacts = form.querySelector(".contacts-container").children;
    Array.from(contacts).forEach((contact) => {
      const select = contact.querySelector(".select-contacts");
      const input = contact.querySelector(".input-contacts");
      let inputHandler = null;

      select.addEventListener("change", () => {
        // Удаление предыдущего обработчика, если он был установлен
        if (inputHandler) {
          input.removeEventListener("input", inputHandler);
          input.classList.remove("valid", "icon-valid");
          input.classList.remove("invalid", "icon-invalid");
          inputHandler = null;
        }

        if (select.value === "Email") {
          inputHandler = onInput(input); // Присваиваем новый обработчик
        }
      });

      // Удаление стилей при потере фокуса
      input.addEventListener("blur", () => {
        input.classList.remove("valid", "icon-valid");
        input.classList.remove("invalid", "icon-invalid");
      });
    });
  }
