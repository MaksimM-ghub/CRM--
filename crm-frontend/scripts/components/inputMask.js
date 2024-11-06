 export function inputMask() {
    const contacts = document.querySelectorAll(".wrapper-contacts");

    contacts.forEach((contact) => {
      const select = contact.querySelector(".select-contacts");
      const input = contact.querySelector(".input-contacts");
      let mask;

      // Функция для создания маски
      function updateMask(type) {
        if (mask) {
          mask.destroy(); // Удаление старой маски
          input.value = ""; // Очищаем значение input
        }
        switch (type) {
          case "Телефон":
            mask = IMask(input, { mask: "+{7}(000)000-00-00" });
            break;
          case "Вконтакте":
            mask = IMask(input, {
              mask: "{vk.com/}{*************************}",
            });
            break;
          case "Facebook":
            mask = IMask(input, {
              mask: "{f\\acebook.com/}*************************",
            });
            break;
          case "Email":
            // для Email маска не нужна, просто чистим маску, если она была
            break;
          default:
          // no default case
        }
      }

      // Инициализация маски при загрузке страницы, если select уже имеет значение
      updateMask(select.value);

      select.addEventListener("change", () => {
        updateMask(select.value);
      });
    });
  }