import { icon } from './icon.js';
import { createFormNewClient, createModalWindow, createTitleChangeClient, createTitleClient, createDeleteClientBtn, createSaveBtn, createDeleteBtn, createTextDeleteClient, createCancelBtn } from './modal.js';
import { validationEmail } from './validationEmail.js';
import { inputMask } from './inputMask.js';
import { validation } from './validationForm.js';
import { studentList } from '../main.js'
import { changeClientInfo } from './api.js'

  export function createFIO(student) {
    return `${student.surname} ${student.name} ${student.lastName}`;
  }

  //Функция создания даты добавления и изменения клиента
  export function createDate(student) {
    let year = student.getFullYear();
    let month = student.getMonth() + 1;
    let day = student.getDate();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    let date = `${day}.${month}.${year}`;

    return date;
  }

  //Функция создания времени добавления и изменения клиента
  export function createTime(student) {
    let hours = student.getHours();
    if (hours < 10) hours = "0" + hours;
    let minutes = student.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let time = `${hours}:${minutes}`;
    return time;
  }

 // Создание списка контактов
  function createContacts(student) {
    let type;
    switch (student.type) {
      case "Телефон":
        type = "tel";
        break;
      case "Facebook":
        type = "fb";
        break;
      case "Email":
        type = "email";
        break;
      case "Вконтакте":
        type = "Вконтакте";
        break;
    }
    let $item = document.createElement("span");
    $item.classList.add("contacts-item");
    $item.innerHTML = icon[type];
    $item.setAttribute("data-tooltip", `${student.type}: ${student.value}`);

    let tooltipElem;
    $item.addEventListener("mouseover", function (event) {
      let target = event.currentTarget;
      let tooltipDOM = target.dataset.tooltip;
      if (!tooltipDOM) return;

      tooltipElem = document.createElement("div");
      tooltipElem.classList.add("tooltip");
      tooltipElem.innerHTML = tooltipDOM;
      document.body.append(tooltipElem);

      let coords = target.getBoundingClientRect();
      let left =
        coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 5;

      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) left = coords.top + target.offsetHeight + 5;

      tooltipElem.style.left = left + "px";
      tooltipElem.style.top = top + "px";
    });

    $item.addEventListener("mouseout", function (event) {
      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
    });

    return $item;
  }

  // Создание кнопки раскрытия иконок контактов
  function createBtnNum(num) {
    const $btnNum = document.createElement("span");
    $btnNum.classList.add("icon-btn");
    $btnNum.textContent = `+${num}`;

    return $btnNum;
  }

  //Проверяем массив и в зависимости от количества добавляем кнопку
  function checkContactsLength(contacts) {
    let btn;
    if (contacts.length > 4) {
      let contactsHide = contacts.slice(4);
      contactsHide.forEach((element) => element.classList.add("hide"));
      btn = createBtnNum(contactsHide.length);
      btn.addEventListener("click", () => {
        contactsHide.forEach((element) => element.classList.remove("hide"));
        btn.remove();
      });
    }

    return btn;
  }
  // Добавляем список контактов в таблицу
  export function addBtns(contacts) {
    const contactElems = contacts.map((contact) => createContacts(contact));
    const $contactsWrapper = document.createElement("div");
    $contactsWrapper.classList.add("contacts-wrapper");
    $contactsWrapper.append(...contactElems);
    if (contacts.length > 4)
      $contactsWrapper.append(checkContactsLength(contactElems));
    checkContactsLength(contactElems);

    return $contactsWrapper;
  }

//Создаем кнопки Изменить и Удалить
  export function createActionBtn(student) {
    const wrapperBtn = document.createElement("div");
    const changesBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    wrapperBtn.classList.add("btn-wrapper");
    changesBtn.classList.add("btn-changes");
    removeBtn.classList.add("btn-remove");

    changesBtn.textContent = "Изменить";
    removeBtn.textContent = "Удалить";

    changesBtn.addEventListener("click", function (event) {
      const row = event.target.closest("tr");
      const id = row.dataset.id;
      const changesData = row.dataset.info;
      const formChange = createFormNewClient(student);
      const modalWindow = createModalWindow(
        "modal-wrapper",
        "modal-inner",
        createTitleChangeClient(student),
        formChange.$form,
        createSaveBtn(),
        createDeleteClientBtn(row)
      );

      modalWindow.$modalWrapper.classList.add("open");
      modalWindow.$modalInner.classList.add("open");

      validationEmail();
      inputMask();

      //Получаем из формы данные от клиента и отправлчем их на сервер
      formChange.$form.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (validation(this)) {
          let arrContacts = [];
          const contactsWrapper =
            document.querySelectorAll(".wrapper-contacts");
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
          let clientObj = {
            id: id,
            createdAt: new Date(),
            updatedAt: new Date(),
            name: formChange.$inputName.value,
            surname: formChange.$inputSurname.value,
            lastName: formChange.$inputLastname.value,
            contacts: arrContacts,
          };

          student = await changeClientInfo(clientObj);

          studentList.forEach((studentObj, index) => {
            if (studentObj.id == id) {
              studentList.splice(index, 1, student);
            }
          });

          console.log(studentList);

          updateInfoTable(row, student);
          modalWindow.$modalWrapper.remove();
        }
      });
    });
    // Удаляем клиента из таблицы
    removeBtn.addEventListener("click", (event) => {
      const row = event.target.closest("tr");
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

    wrapperBtn.append(changesBtn, removeBtn);

    return wrapperBtn;
  }

  // Обновляем информацию в таблице при изменении клиента
  function updateInfoTable(row, changeObj) {
    const fio = row.querySelector(".fio-student");
    const dateChange = row.querySelector(".date-change");
    const timeChange = row.querySelector(".time-student");
    const contacts = row.querySelector(".contacts-student");

    fio.textContent = createFIO(changeObj);
    dateChange.textContent = createDate(new Date(changeObj.updatedAt));
    timeChange.textContent = createTime(new Date(changeObj.updatedAt));
    contacts.innerHTML = "";
    contacts.append(addBtns(changeObj.contacts));
  }
