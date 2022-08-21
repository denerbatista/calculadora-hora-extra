const inputBase = document.querySelector("#salario_base");
const inputAnuenio = document.querySelector("#anuenio");
const inputCh = document.querySelector("#carga_horaria");
const result = document.querySelector("#result");
const button = document.querySelector("#button");

function calc() {
  if (inputAnuenio.value || inputCh.value || inputBase.value) {
    const inputBaseReplace = inputBase.value.replace(",", ".");
    const inputAnuenioReplace = inputAnuenio.value.replace(",", ".");
    const inputChReplace = inputCh.value.replace(",", ".");
    if (button.innerText === "Calcular") {
      result.innerText = `R$ ${String(
        (
          ((Number(inputAnuenioReplace) + Number(inputBaseReplace)) / 30 / 6) *
          1.5 *
          Number(inputChReplace)
        ).toFixed(2)
      ).replace(".", ",")}`;
      button.innerText = "Limpar";
    } else {
      button.innerText = "Calcular";
      inputAnuenio.value = "";
      inputBase.value = "";
      inputCh.value = "";
      result.innerText = "Preencha os campos acima";
    }
  }
}
