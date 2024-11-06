  import { createSearchApp } from './components/header.js'
  import { createBtnAddStudent } from './components/addedButton.js'
  import { createTable } from './components/table.js'
  import { createOneStudent } from './components/createOneStudent.js'
  import { sortClients } from './components/sorting.js'
  import { getClientsServer } from './components/api.js'
  import { createTitleApp } from './components/title.js'


  const $body = document.body;
  const $container = document.createElement("div");
  export const $wrapper = document.createElement("div");

  $wrapper.classList.add("wrapper-app");
  $container.classList.add("container");
  
  const searchApp = createSearchApp();
  const table = createTable();
  const btnApp = createBtnAddStudent();
  
  $wrapper.append(
    searchApp.$headerWrapper,
    createTitleApp(),
    table.$tableWrapper,
    btnApp
  );

  $container.append($wrapper);
  $body.append($container);
  let columnDir = true;
  
  let servreData = await getClientsServer();
  
  export let studentList = [];

  export function updateStudentList(newList) {
    studentList.length = 0; // Очистка массива
    studentList.push(...newList); // Добавление новых данных
  }
  if (servreData != null) {
    studentList = servreData;
  } 

  export function render(studentList) {
    table.$tableBody.innerHTML = "";
    let copyListStudent = [...studentList];

    for (let student of copyListStudent) {
      let trStudent = createOneStudent(student);
      student.fio = `${student.surname} ${student.name} ${student.lastName}`;
      table.$tableBody.append(trStudent.$trStudent);
      table.$table.append(table.$tableBody);
    }
  }
  render(studentList);


  const thColumn = document.querySelectorAll(".table-head-app th");
  Array.from(thColumn).forEach((element) => {
    element.addEventListener("click", function () {
      element.classList.toggle("sort");
      let property = this.dataset.column;
      sortClients(studentList, property, columnDir);
      columnDir = !columnDir;
      render(studentList);
    });
  });

