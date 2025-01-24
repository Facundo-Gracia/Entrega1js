// Buscamos los datos a traves del id
const info = document.getElementById('info');
const resultado = document.getElementById('resultado');
// Intereses
const intereses = {
  1: 0.05,
  3: 0.10,
  6: 0.15,
  9: 0.20,
  12: 0.25
};

info.addEventListener('submit', (e) => {
  e.preventDefault();
  const monto = parseFloat(document.getElementById('monto').value);
  const cuotas = parseInt(document.getElementById('cuotas').value);
  const interes = intereses[cuotas] || 0;
  const cuotaMensual = ((monto * (1 + interes)) / cuotas).toFixed(2); //Utilizo el tofixed para nada mas mostrar 2 decimales.
  mostrarResultado(monto, cuotas, interes, cuotaMensual);
});
// Funcion para mostrar la información con sus montos
function mostrarResultado(monto, cuotas, interes, cuotaMensual) {
  resultado.innerHTML = `
    <h2>Resultado</h2>
    <p>Monto del préstamo: $${monto}</p>
    <p>Número de cuotas: ${cuotas}</p>
    <p>Interés: ${interes * 100}%</p>
    <p>Cuota mensual: $${cuotaMensual}</p>
  `;

  info.addEventListener('submit', (e) => {
    e.preventDefault();
    const monto = parseFloat(document.getElementById('monto').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);
  // Condicional. Si el monto es inferior a 100000 no deja seleccionar 9 o 12 cuotas
    if ((cuotas === 9 || cuotas === 12) && monto < 100000) {
      resultado.innerHTML = `
        <p>Para seleccionar 9 o 12 cuotas, el monto debe ser mayor o igual a $100,000.</p>
      `;
      return;
    }
  
    const interes = intereses[cuotas] || 0;
    const cuotaMensual = ((monto * (1 + interes)) / cuotas).toFixed(2);
    mostrarResultado(monto, cuotas, interes, cuotaMensual);
  });
}