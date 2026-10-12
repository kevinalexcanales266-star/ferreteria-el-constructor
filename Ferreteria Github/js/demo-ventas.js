
const $=id=>document.getElementById(id);
const clientes=['Mauricio Ernesto Pineda','Gloria Beatriz Funes','Ricardo Alberto Molina','Patricia del Carmen Rivas','Óscar Armando Quintanilla'];
const productos=[{nombre:'Cemento gris',precio:8.50,stock:25},{nombre:'Martillo',precio:6.75,stock:12},{nombre:'Tubo PVC',precio:4.25,stock:30},{nombre:'Pintura blanca',precio:19.99,stock:10}];
let carrito=[],facturas=[['CF-101','Mauricio Ernesto Pineda','$17.00','Enviado'],['CCF-102','Gloria Beatriz Funes','$19.99','Enviado']];
const dinero=n=>'$'+n.toFixed(2);
$('usuarioActual').textContent='Carlos Mejía (demostración)';
$('salir').onclick=()=>location.href='index.html';
$('volverAdmin').hidden=true;
$('correoCliente').textContent='Datos de ejemplo. No se enviarán correos.';
clientes.forEach((nombre,i)=>$('cliente').add(new Option(nombre,i)));
productos.forEach((p,i)=>$('producto').add(new Option(`${p.nombre} (${dinero(p.precio)}, disponibles: ${p.stock})`,i)));
$('tipo').onchange=()=>{$('datosFiscales').hidden=$('tipo').value!=='CCF';$('nit').value='';$('nrc').value='';$('giro').value='';};
$('nit').placeholder='Ejemplo: 0614-120300-102-5';
$('nrc').placeholder='Ejemplo: 128456-7';
$('giro').placeholder='Ejemplo: Venta de materiales de construcción';
function mostrar(v){
 $('seccionVenta').hidden=v!=='venta';$('seccionHistorial').hidden=v!=='facturas';
 $('pestanaNueva').classList.toggle('activa',v==='venta');
 $('pestanaFacturas').classList.toggle('activa',v==='facturas');
}
$('pestanaNueva').onclick=()=>mostrar('venta');
$('pestanaFacturas').onclick=()=>mostrar('facturas');
function pintar(){
 $('detalle').replaceChildren();
 for(const item of carrito){
  const tr=document.createElement('tr');
  [item.nombre,item.cantidad,dinero(item.precio),dinero(item.cantidad*item.precio)].forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.append(td)});
  const td=document.createElement('td'),btn=document.createElement('button');btn.textContent='Quitar';btn.onclick=()=>{carrito=carrito.filter(x=>x!==item);pintar()};td.append(btn);tr.append(td);$('detalle').append(tr);
 }
 $('total').textContent=dinero(carrito.reduce((s,p)=>s+p.cantidad*p.precio,0));
}
function pintarHistorial(){
 $('historial').replaceChildren();
 for(const fila of facturas){const tr=document.createElement('tr');fila.forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.append(td)});$('historial').append(tr)}
}
$('agregar').onclick=()=>{
 const p=productos[Number($('producto').value)],cantidad=Number($('cantidad').value);
 if(!Number.isInteger(cantidad)||cantidad<1||cantidad>p.stock){$('resultado').textContent='Ingresá una cantidad válida.';return}
 const actual=carrito.find(x=>x.nombre===p.nombre);
 if(actual){if(actual.cantidad+cantidad>p.stock){$('resultado').textContent='La cantidad supera las existencias.';return}actual.cantidad+=cantidad}
 else carrito.push({...p,cantidad});
 $('resultado').textContent='';pintar();
};
$('facturar').onclick=()=>{
 if(!carrito.length){$('resultado').textContent='Agregá al menos un producto.';return}
 if($('tipo').value==='CCF'&&(!($('nit').value.trim()&&$('nrc').value.trim()&&$('giro').value.trim()))){$('resultado').textContent='Completá los datos fiscales.';return}
 const total=carrito.reduce((s,p)=>s+p.cantidad*p.precio,0),tipo=$('tipo').value;
 facturas.unshift([`${tipo}-DEMO-${facturas.length+1}`,clientes[Number($('cliente').value)],dinero(total),'Demostración']);
 $('resultado').textContent='Venta de demostración registrada. No se guardaron datos reales ni se enviaron correos.';
 carrito=[];pintar();pintarHistorial();
};
pintarHistorial();mostrar('venta');
