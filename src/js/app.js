document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    posicionFija();
    crearGaleria();
    scrollNav();
}

function posicionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const bodyScroll = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            bodyScroll.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            bodyScroll.classList.remove('body-scroll');
        }
    });
}

function scrollNav(){ //funcion del scroll suave
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( enlace =>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    
    for(let i=1; i <= 12; i++){

        const imagenes = document.createElement('picture');
        imagenes.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galería">
        `;

        imagenes.onclick = function(){
            mostrarImagen(i);
        }
        
        galeria.appendChild(imagenes);
        
    }
}

function mostrarImagen (id){
    const imagenes = document.createElement('picture');
    imagenes.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galería">
    `;

    //crear overlay con la imagen grande

    const overlay = document.createElement('div');//crea etiqueta html
    overlay.appendChild(imagenes);//etiqueta html padre.appChild('etiqueta asociar al padre')
    overlay.classList.add('overlay');
    overlay.onclick = function (){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //boton para cerrar el modal

    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    //añadir al html

    const body = document.querySelector('body');
    body.appendChild(overlay);//appendChild se agrega al final
    body.classList.add('fijar-body');
}