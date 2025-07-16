const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addBtn = document.getElementById("addBtn");
const contactList = document.getElementById("contactList");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !phone || !email) {
    alert("Please fill out all fields.");
    return;
  }

  const newContact = {
    id: Date.now(), // unique ID
    name,
    phone,
    email
  };

  contacts.push(newContact);
  saveToStorage();
  renderContacts();
  nameInput.value = phoneInput.value = emailInput.value = "";
});

function saveToStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts() {
  contactList.innerHTML = "";

  contacts.forEach((contact) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.innerHTML = `
      <strong>${contact.name}</strong><br>
      📞 ${contact.phone}<br>
      ✉️ ${contact.email}
    `;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", () => {
      contacts = contacts.filter(c => c.id !== contact.id);
      saveToStorage();
      renderContacts();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => {
      nameInput.value = contact.name;
      phoneInput.value = contact.phone;
      emailInput.value = contact.email;

      contacts = contacts.filter(c => c.id !== contact.id);
      saveToStorage();
      renderContacts();
    });

    const actions = document.createElement("div");
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(info);
    li.appendChild(actions);
    contactList.appendChild(li);
  });
}

// Initial display
renderContacts();
