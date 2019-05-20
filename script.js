function change() {
  temp = Number(document.getElementById("tempSlider").value);
  co2 = Number(document.getElementById("co2Slider").value);
  hum = Number(document.getElementById("humSlider").value);
  updateUI();
}
function updateUI() {
  document.getElementById("tempSlider").value = temp;
  document.getElementById("co2Slider").value = co2;
  document.getElementById("humSlider").value = hum;
  document.getElementById("tempDisplay").innerText = temp;
  document.getElementById("humDisplay").innerText = hum;
  document.getElementById("co2Display").innerText = co2;
  calc();
}
function shift() {
  change();
  temp = Math.min(50, Math.max(0, temp + (Math.random() - 0.5) * 30));
  co2 = Math.min(100, Math.max(0, co2 + (Math.random() - 0.5) * 30));
  hum = Math.min(100, Math.max(0, hum + (Math.random() - 0.5) * 30));
  updateUI();
}
function calc() {
  var fl = new FuzzyLogic();
  debugger;
  var rules = {
    crisp_input: [Number(temp), Number(hum), Number(co2)],
    variables_input: [
      {
        name: "Temperatura",
        setsName: [
          "Niebezpiecznie niska",
          "Niekomfortowo niska",
          "Przeciętna",
          "Niekomfortowo wysoka",
          "Niebezpiecznie wysoka",
        ],
        sets: [
          [0, 0, 10, 15],
          [10, 15, 16, 20],
          [15, 17, 19, 21],
          [19, 21, 25, 30],
          [30, 35, 50, 50],
        ],
      },
      {
        name: "Wilgotoność powietrza",
        setsName: ["Niska", "Przeciętna", "Wysoka"],
        sets: [[0, 0, 10, 20], [20, 30, 40, 60], [50, 70, 100, 100]],
      },
      {
        name: "Stęzenie dwutlenku węgla",
        setsName: ["Bezpieczne", "Wymagające wentylacji", "Niebezpieczne"],
        sets: [[0, 0, 0, 10], [5, 10, 100, 100], [40, 50, 100, 100]],
      },
    ],
    variable_output: {
      name: "Moc klimatyzacji (%)",
      setsName: ["Wyłączona", "Niska", "Średnia", "Wysoka", "Maksymalna"],
      sets: [
        [0, 0, 0, 5],
        [0, 25, 26, 30],
        [30, 40, 41, 50],
        [50, 70, 80, 90],
        [97, 98, 99, 100],
      ],
    },
    inferences: [[0, 0, 1, 2, 3], [1, 2, 3], [1, 3, 4]],
  };
  console.log(rules);
  document.getElementById("result").innerText = fl.getResult(rules);
}
window.onload = () => change();
