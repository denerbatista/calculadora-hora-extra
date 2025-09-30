// ===== Utilidades de número ↔ texto pt-BR =====
const brCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Converte string "3.250,50" ou "3250.50" → Number(3250.50) */
function parseDecimalBR(value) {
  if (!value) return NaN;
  const normalized = String(value).trim().replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
}

/** Formata Number → "R$ 3.250,50" */
function toBRL(n) {
  if (!Number.isFinite(n)) return "—";
  return brCurrency.format(n);
}

// ===== DOM =====
const form = document.getElementById("form-calculadora");
const baseInput = document.getElementById("salario_base");
const anuInput = document.getElementById("anuenio");
const horasInput = document.getElementById("horas_extras");
const minInput = document.getElementById("minutos_extras");

const saida = document.getElementById("saida");
const explicacao = document.getElementById("explicacao");
const btnLimpar = document.getElementById("btn-limpar");

const modalTermos = document.getElementById("modal-termos");

// ===== Validação =====
function validarCampos() {
  const base = parseDecimalBR(baseInput.value);
  const anu = parseDecimalBR(anuInput.value);
  const horas = Number(horasInput.value);
  const mins = Number(minInput.value);

  const erros = [];
  if (!Number.isFinite(base) || base < 0) erros.push("Salário base inválido.");
  if (!Number.isFinite(anu) || anu < 0) erros.push("Anuênio inválido.");
  if (!Number.isFinite(horas) || horas < 0) erros.push("Horas inválidas.");
  if (!Number.isFinite(mins) || mins < 0 || mins > 59)
    erros.push("Minutos inválidos (0–59).");

  return { base, anu, horas, mins, erros };
}

// ===== Cálculo =====
function calcular() {
  const { base, anu, horas, mins, erros } = validarCampos();
  if (erros.length) {
    saida.textContent = erros.join(" ");
    saida.style.color = "var(--warn)";
    explicacao.hidden = true;
    return;
  }

  // Soma horas e minutos
  const horasTotais = horas + mins / 60;

  // Fórmula estimativa:
  // valorHora = ((base + anuênio) / 30 / 6)
  // totalExtra = valorHora * 1.5 * horasTotais
  const valorHora = (base + anu) / 30 / 6;
  const total = valorHora * 1.5 * horasTotais;

  saida.textContent = toBRL(total);
  saida.style.color = ""; // reset
  explicacao.hidden = false;
  explicacao.innerHTML = `
    Cálculo: valorHora (${toBRL(valorHora)}) × 1,5 ×
    ${horas.toLocaleString("pt-BR")}h ${mins.toLocaleString("pt-BR")}min
    = <strong>${toBRL(total)}</strong>.
  `;
}

// ===== Eventos =====
form.addEventListener("submit", (e) => {
  e.preventDefault();
  calcular();
});

btnLimpar.addEventListener("click", () => {
  form.reset();
  saida.textContent = "Preencha os campos acima";
  explicacao.hidden = true;
});

// Abre/fecha modais por atributo data-modal-target
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-modal-target]");
  if (btn) {
    const sel = btn.getAttribute("data-modal-target");
    const dialog = document.querySelector(sel);
    if (dialog?.showModal) dialog.showModal();
  }
});

// ABRIR TERMO AUTOMATICAMENTE AO ENTRAR NO SITE
window.addEventListener("DOMContentLoaded", () => {
  if (modalTermos?.showModal) {
    modalTermos.showModal();
  }
});

// ===== Menu hambúrguer mobile =====
const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const nav = document.querySelector(".nav");
const navOptions = document.querySelectorAll(".nav-option");

function openMenu() {
  nav.classList.add("open");
  document.body.classList.add("menu-open");
}
function closeMenu() {
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", openMenu);
}
if (menuClose) {
  menuClose.addEventListener("click", closeMenu);
}
navOptions.forEach((option) => {
  option.addEventListener("click", closeMenu);
});
