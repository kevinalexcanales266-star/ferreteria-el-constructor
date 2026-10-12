
document.getElementById('nombreUsuario').textContent='Administrador (demostración)';
document.getElementById('botonSalir').onclick=()=>location.href='index.html';
const vendedores=[
 ['Carlos Mejía','Sucursal central','Activo'],
 ['Ana Martínez','Sucursal central','Activo'],
 ['Luis Hernández','Sucursal norte','De vacaciones'],
 ['María Gómez','Sucursal central','Activo'],
 ['José Ramírez','Sucursal norte','Bloqueado']
];
for (const [nombre,sucursal,estado] of vendedores) {
 const tr=document.createElement('tr');
 for(const texto of [nombre,sucursal,estado]) {const td=document.createElement('td');td.textContent=texto;tr.append(td);}
 const td=document.createElement('td');td.textContent='Vista de ejemplo';tr.append(td);
 document.getElementById('cuerpoVendedores').append(tr);
}
const intentos=[['11/10/2026 08:15','cmejia','Permitido','No aplica'],['11/10/2026 22:30','amartinez','Fuera de horario','Enviado']];
for(const datos of intentos){const tr=document.createElement('tr');for(const valor of datos){const td=document.createElement('td');td.textContent=valor;tr.append(td)}document.getElementById('cuerpoIntentos').append(tr)}
document.querySelectorAll('dialog').forEach(d=>d.remove());
