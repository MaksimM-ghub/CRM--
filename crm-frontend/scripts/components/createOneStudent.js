import { createFIO, createDate, createTime, addBtns, createActionBtn } from './tableElements.js'

//Создание одного студента
  export function createOneStudent(student) {
    const $trStudent = document.createElement("tr");
    const $thStudentID = document.createElement("th");
    const $thStudentFIO = document.createElement("th");
    const $thStudentDate = document.createElement("th");
    const $thStudentChanges = document.createElement("th");
    const $thStudentContacts = document.createElement("th");
    const $thStudentActions = document.createElement("th");

    const $dateAddWrapper = document.createElement("div");
    const $dateChangesWrapper = document.createElement("div");
    const $spanDateCreate = document.createElement("span");
    const $spanDateChanges = document.createElement("span");

    const $spanTimeCreate = document.createElement("span");
    const $spanTimeChanges = document.createElement("span");

    $trStudent.classList.add("tr-body");
    $thStudentID.classList.add("id-student");
    $thStudentFIO.classList.add("fio-student");
    $thStudentDate.classList.add("date-student");
    $thStudentChanges.classList.add("changes-student");
    $thStudentContacts.classList.add("contacts-student");
    $thStudentActions.classList.add("action-student");
    $dateAddWrapper.classList.add("date-add-wrapper");
    $dateChangesWrapper.classList.add("date-changes-wrapper");
    $spanTimeCreate.classList.add("time-student");
    $spanDateChanges.classList.add("date-change");
    $spanTimeChanges.classList.add("time-student");
    $trStudent.setAttribute("data-id", student.id);

    $thStudentID.textContent = student.id;
    $thStudentFIO.textContent = createFIO(student);
    $spanDateCreate.textContent = createDate(new Date(student.createdAt));
    $spanTimeCreate.textContent = createTime(new Date(student.createdAt));
    $spanDateChanges.textContent = createDate(new Date(student.updatedAt));
    $spanTimeChanges.textContent = createTime(new Date(student.updatedAt));
    $thStudentContacts.append(addBtns(student.contacts));
    $thStudentActions.append(createActionBtn(student));

    $dateAddWrapper.append($spanDateCreate, $spanTimeCreate);
    $dateChangesWrapper.append($spanDateChanges, $spanTimeChanges);

    $thStudentDate.append($dateAddWrapper);
    $thStudentChanges.append($dateChangesWrapper);

    $trStudent.append(
      $thStudentID,
      $thStudentFIO,
      $thStudentDate,
      $thStudentChanges,
      $thStudentContacts,
      $thStudentActions
    );

    let clientObj = student;

    return {
      $trStudent,
      clientObj,
    };
  }