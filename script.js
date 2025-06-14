const categories = [
  "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo",
  "Lunes (2)", "Martes (2)", "Miércoles (2)", "Jueves (2)", "Viernes (2)", "Sábado (2)", "Domingo (2)"
];

let data = {};

function saveData() {
  localStorage.setItem("myHoursData", JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem("myHoursData");
  if (saved) {
    data = JSON.parse(saved);
  } else {
    categories.forEach(cat => {
      data[cat] = [];
    });
  }
}

function createApp() {
  const container = document.getElementById("categories-container");
  container.innerHTML = '';
  loadData();

  categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "category";

    const header = document.createElement("div");
    header.className = "category-header";

    const title = document.createElement("h2");
    title.textContent = cat;

    const btnAdd = document.createElement("button");
    btnAdd.textContent = "+ Añadir Hora";
    btnAdd.onclick = () => addHour(cat);

    header.appendChild(title);
    header.appendChild(btnAdd);
    div.appendChild(header);

    const list = document.createElement("div");
    list.className = "hours-list";
    list.id = `list-${cat}`;
    div.appendChild(list);

    container.appendChild(div);

    renderHours(cat);
  });

  updateTotal();
}

function addHour(category) {
  const hours = prompt("Ingrese cantidad de horas:");
  if (!hours || isNaN(hours)) return;

  data[category].push(parseFloat(hours));
  renderHours(category);
  updateTotal();
  saveData();
}

function renderHours(category) {
  const list = document.getElementById(`list-${category}`);
  list.innerHTML = '';

  data[category].forEach((value, index) => {
    const item = document.createElement("div");
    item.className = "hour-item";

    const input = document.createElement("input");
    input.type = "number";
    input.value = value;
    input.onchange = () => {
      data[category][index] = parseFloat(input.value) || 0;
      updateTotal();
      saveData();
    };

    const btnDel = document.createElement("button");
    btnDel.textContent = "Borrar";
    btnDel.onclick = () => {
      data[category].splice(index, 1);
      renderHours(category);
      updateTotal();
      saveData();
    };

    item.appendChild(input);
    item.appendChild(btnDel);
    list.appendChild(item);
  });
}

function updateTotal() {
  let total = 0;
  for (let cat in data) {
    total += data[cat].reduce((a, b) => a + b, 0);
  }

  document.getElementById("total-hours").textContent = total;
  document.getElementById("total-money").textContent = `$${(total * 15).toFixed(2)}`;
}

createApp();