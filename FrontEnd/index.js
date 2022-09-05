
const result = document.getElementById("result");

const resultModal = document.getElementById("result-modal");

const tableBody = document.getElementById("tableBody");

const modal = document.getElementById("edit");

const bntPut = document.getElementById("submit2");

const bntCancel = document.getElementById("cancel");

const inputName = document.getElementById("name-edit");

const inputEmail = document.getElementById("email-edit");

const createUser = document.getElementById("create-user");

window.addEventListener("load", createUserTable());

createUser.addEventListener("click", createUserData);

function createUserTable() {
  fetch("http://localhost:8000/usuarios", {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((json) => {
      tableBody.innerHTML = "";
      json.forEach((user) => {
        if(user.delete == true) {

        } else {
            tableBody.innerHTML += `<tr class="create-event" >
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><img src="imgs/edit-solid-24.png"></td>
            <td><img src="imgs/x-circle-regular-24.png"></td>
        </tr>`
        }
      });
      createEventEditDelete();
    })
    .catch((err) => console.log(err));
}

function createUserData() {
  const nameUser = document.getElementById("name-user");
  const emailUser = document.getElementById("email-user");

  try {
    if(nameUser.value == "") {
      throw `Falha no cadastro do nome, insira um nome válido`
  }
  if(emailUser.value == "") {
      throw `Falha no cadastro do e-mail, insira um e-mail válido`
  }
  
  let _data = { name: nameUser.value, email: emailUser.value };


  fetch("http://localhost:8000/usuarios", {
    method: "POST",
    body: JSON.stringify(_data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
    result.innerHTML = `Usuário ${nameUser.value} cadastrado com sucesso!`

    createUserTable()
} catch (error) {
    result.innerHTML = error
}
}

function createEventEditDelete() {
  const selectTrs = document.querySelectorAll(".create-event");

  for (let i = 0; i < selectTrs.length; i++) {
    selectTrs[i].children[4].children[0].addEventListener(
      "click",
      deleteUserTable
    );
    selectTrs[i].children[3].children[0].addEventListener(
      "click",
      editUserTable
    );
  }
}

function editUserTable(e) {
  let id = e.path[2].children[0].textContent;
  fetch("http://localhost:8000/usuarios", {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((json) => {
      let userEdit = 0;
      json.forEach((user) => {
        if (user.id == id) {
            userEdit = user;
        }
      });
      modal.style.display = "flex"
      inputName.value = userEdit.name
      inputEmail.value = userEdit.email
      bntPut.onclick = () => {
        fetchEdit(userEdit.id);
      };

    });
}

function fetchEdit(id) {

    let objTest = {
        name : inputName.value,
        email : inputEmail.value,
    }

    try {
      if(inputName.value == "") {
        throw `Falha no cadastro do nome, insira um nome válido`
    }
    if(inputEmail.value == "") {
        throw `Falha no cadastro do e-mail, insira um e-mail válido`
    }

    fetch(`http://localhost:8000/usuarios/${id}`,{
        method: "PUT",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objTest)
    })
    .then(response => console.log(response.json()))
    .then(data => console.log(data))
    result.innerHTML = "Usuário atualizado com sucesso!"
    modal.style.display = "none";
    createUserTable();
  } catch (error) {
    resultModal.innerHTML = error;
}
}

function deleteUserTable(e) {

    let id = e.path[2].children[0].textContent;

    fetch(`http://localhost:8000/usuarios/${id}`,{
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'},
    })
    createUserTable();
    result.innerHTML = "Usuário deletado com sucesso!"

}


bntCancel.addEventListener("click", () => {
    modal.style.display = "none"
})

