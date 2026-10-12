
document.getElementById('formLogin').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('mensajeError').textContent = 'Esta es una demostración visual. Elegí uno de los botones de abajo para continuar.';
  document.getElementById('mensajeError').hidden = false;
});
document.getElementById('verVendedor').onclick = () => location.href='ventas.html';
document.getElementById('verAdmin').onclick = () => location.href='admin.html';
