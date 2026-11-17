let largo=100, ancho=40, alto=40, grosor=8;
let scene, camera, renderer, acuario, agua, items=[];
let conAgua=true;

function init3D(){
  scene=new THREE.Scene();
  scene.background=new THREE.Color(0x050d1a);
  camera=new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(160,120,180);
  renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(document.getElementById('canvas-3d').clientWidth, 520);
  document.getElementById('canvas-3d').appendChild(renderer.domElement);
  let luz=new THREE.AmbientLight(0xffffff, 0.9); scene.add(luz);
  let dir=new THREE.DirectionalLight(0xffffff, 0.8); dir.position.set(100,200,100); scene.add(dir);
  dibujarAcuario();
  animar();
}
function dibujarAcuario(){
  if(acuario) scene.remove(acuario);
  acuario=new THREE.Group();
  // Cristales - caja transparente
  let geo=new THREE.BoxGeometry(largo, alto, ancho);
  let mat=new THREE.MeshPhysicalMaterial({color:0x9fd8ff, transparent:true, opacity:0.18, roughness:0.1});
  let cristal=new THREE.Mesh(geo, mat); cristal.position.y=alto/2; acuario.add(cristal);
  // Base negra
  let base=new THREE.Mesh(new THREE.BoxGeometry(largo+2, 3, ancho+2), new THREE.MeshStandardMaterial({color:0x111111}));
  base.position.y=0; acuario.add(base);
  // Agua
  if(conAgua){
    agua=new THREE.Mesh(new THREE.BoxGeometry(largo-2, alto-4, ancho-2), new THREE.MeshPhysicalMaterial({color:0x1e90ff, transparent:true, opacity:0.25}));
    agua.position.y=alto/2; acuario.add(agua);
  }
  // Tirantes si hacen falta - SE VEN EN ROJO
  if(largo>90 || alto>45){
    let tirante=new THREE.Mesh(new THREE.BoxGeometry(8, 2, ancho), new THREE.MeshStandardMaterial({color:0xff4444}));
    tirante.position.set(0, alto, 0); acuario.add(tirante);
    if(largo>130){
      let t2=tirante.clone(); t2.position.x=-largo/3; acuario.add(t2);
      let t3=tirante.clone(); t3.position.x=largo/3; acuario.add(t3);
    }
  }
  // Re-añadir items
  items.forEach(o=>acuario.add(o));
  scene.add(acuario);
}
function animar(){
  requestAnimationFrame(animar);
  if(acuario) acuario.rotation.y+=0.002;
  // Peces nadan
  items.forEach(o=>{ if(o.userData.esPez){ o.position.x+=o.userData.vel; if(Math.abs(o.position.x)>largo/2-10) o.userData.vel*=-1; }});
  renderer.render(scene,camera);
}
// AÑADIR PECES / ROCAS / PLANTAS
function addItem(tipo){
  let m;
  if(tipo==='pez'){
    m=new THREE.Mesh(new THREE.ConeGeometry(3,9,8), new THREE.MeshStandardMaterial({color:0xff7b00}));
    m.rotation.z=-Math.PI/2; m.userData.esPez=true; m.userData.vel=0.6; m.position.set(0, alto*0.6, 0);
  } else if(tipo==='roca'){
    m=new THREE.Mesh(new THREE.DodecahedronGeometry(9), new THREE.MeshStandardMaterial({color:0x777777, flatShading:true}));
    m.position.set((Math.random()-0.5)*largo*0.5, 5, (Math.random()-0.5)*ancho*0.5);
  } else if(tipo==='planta'){
    m=new THREE.Mesh(new THREE.ConeGeometry(5,22,6), new THREE.MeshStandardMaterial({color:0x2ecc71}));
    m.position.set((Math.random()-0.5)*largo*0.5, 12, (Math.random()-0.5)*ancho*0.5);
  } else if(tipo==='tronco'){
    m=new THREE.Mesh(new THREE.CylinderGeometry(2,3,28,6), new THREE.MeshStandardMaterial({color:0x8b5a2b}));
    m.rotation.z=Math.PI/2.5; m.position.set(0, 8, 0);
  } else {
    m=new THREE.Mesh(new THREE.BoxGeometry(12,12,6), new THREE.MeshStandardMaterial({color:0x222222}));
    m.position.set(largo/2-10, alto-8, 0);
  }
  items.push(m); acuario.add(m); actualizar();
}
function limpiar(){ items=[]; dibujarAcuario(); actualizar(); }
function cambiarVista(v){ conAgua=(v==='real'); dibujarAcuario(); }
function setGrosor(g){ grosor=g; document.querySelectorAll('.grosores button').forEach(b=>b.classList.toggle('active', b.textContent.includes(g))); actualizar(); }

// LOGICA PROFESIONAL - FISICA
function actualizar(){
  document.getElementById('v-largo').textContent=largo+' cm';
  document.getElementById('v-ancho').textContent=ancho+' cm';
  document.getElementById('v-alto').textContent=alto+' cm';
  let litros=Math.round(largo*ancho*alto/1000);
  document.getElementById('litros').textContent=litros+' L';
  document.getElementById('peso').textContent='Peso total ~'+Math.round(litros*1.15+15)+' kg - Cristal '+grosor+'mm';
  // Grosor recomendado por altura
  let recomendado = alto<=30?6 : alto<=40?8 : alto<=50?10 : 12;
  let avisos='';
  if(grosor>=recomendado) avisos+=`<div class="ok">✅ CORRECTO: ${grosor}mm es seguro para ${alto}cm de alto. Factor de seguridad ~4.0</div>`;
  else avisos+=`<div class="bad">🚨 PELIGRO: Con ${alto}cm de alto necesitas ${recomendado}mm mínimo. Con ${grosor}mm el frontal puede reventar por presión.</div>`;
  if(largo>90) avisos+=`<div class="warn">⚠️ TIRANTE OBLIGATORIO: Largo ${largo}cm > 90cm. Pon 1 tirante central de ${ancho-2} x 8cm.</div>`;
  if(largo>130) avisos+=`<div class="warn">⚠️ PON 2 TIRANTES: Largo ${largo}cm > 130cm. Uno solo no basta.</div>`;
  if(alto>45) avisos+=`<div class="warn">⚠️ REFUERZO INFERIOR: Alto ${alto}cm > 45cm. Base de 10mm mínimo + refuerzo.</div>`;
  if(items.filter(i=>i.userData.esPez).length>litros/10) avisos+=`<div class="bad">🐟 SOBREPOBLACIÓN: Tienes demasiados peces para ${litros}L.</div>`;
  if(!avisos) avisos=`<div class="ok">✅ Montaje seguro, sin errores.</div>`;
  document.getElementById('avisos').innerHTML=avisos;
  // Ficha de cortes
  let lat = ancho - grosor*2/10;
  let tubos = litros<=100?1 : litros<=250?2 : 3;
  document.getElementById('ficha').innerHTML=`
    <li>Frontal/Trasero: 2x ${largo} x ${alto} cm (${grosor}mm)</li>
    <li>Laterales: 2x ${lat.toFixed(1)} x ${alto} cm</li>
    <li>Base: 1x ${largo} x ${ancho} cm</li>
    <li>Silicona neutra acuarios: ${tubos} tubo(s) 310ml</li>
    <li>Tirantes: ${largo>90? (largo>130?2:1)+'x '+(ancho-2)+' x 8cm' : 'No necesita'}</li>`;
  dibujarAcuario();
}
document.getElementById('largo').addEventListener('input', e=>{ largo=+e.target.value; actualizar(); });
document.getElementById('ancho').addEventListener('input', e=>{ ancho=+e.target.value; actualizar(); });
document.getElementById('alto').addEventListener('input', e=>{ alto=+e.target.value; actualizar(); });
function descargarFicha(){ window.print(); }
init3D(); actualizar();
