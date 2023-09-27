document.addEventListener('DOMContentLoaded', function () {
    const carrito = document.getElementById('carrito');
    const elementos1 = document.getElementById('lista-1');
    const lista = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const servicioPopup = document.getElementById('servicio-popup');
    const abrirServicioPopup = document.querySelectorAll('.open-service-popup');
    const cerrarServicioPopup = document.getElementById('cerrar-servicio-popup');
    const contratarServicioBtn = document.getElementById('contratar-servicio');


    const popupYaAbierto = localStorage.getItem('popupAbierto');

    if (!popupYaAbierto) {
        cargarEventListeners();
    } else {
        servicioPopup.style.display = 'none'; 
    }

    function cargarEventListeners() {
        elementos1.addEventListener('click', comprarElemento);
        carrito.addEventListener('click', eliminarElemento);
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
        abrirServicioPopup.forEach(function (enlace) {
            enlace.addEventListener('click', function (e) {
                e.preventDefault();
                servicioPopup.style.display = 'flex';
                localStorage.setItem('popupAbierto', 'true');
            });
        });
        cerrarServicioPopup.addEventListener('click', function () {
            servicioPopup.style.display = 'none';
        });
        contratarServicioBtn.addEventListener('click', function () {
            servicioPopup.style.display = 'none';
        });
    }

    function comprarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const elemento = e.target.parentElement.parentElement;
            leerDatosElemento(elemento);
        }
    }

    function leerDatosElemento(elemento) {
        const infoElemento = {
            imagen: elemento.querySelector('img').src,
            titulo: elemento.querySelector('h3').textContent,
            precio: elemento.querySelector('.precio').textContent,
            id: elemento.querySelector('a').getAttribute('data-id')
        }
        insertarCarrito(infoElemento);
    }

    function insertarCarrito(elemento) {
        const row = document.createElement('tr');
        row.innerHTML = `
         <td>
            <img src="${elemento.imagen}" width="100" />
         </td>
         <td>
            ${elemento.titulo}
         </td>
         <td>
            ${elemento.precio}
         </td>
         <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
         </td>
        `;

        lista.appendChild(row);
    }

    function eliminarElemento(e) {
        e.preventDefault();
        let elemento, elementoId;
        if (e.target.classList.contains('borrar')) {
            e.target.parentElement.parentElement.remove();
            elemento = e.target.parentElement.parentElement;
            elementoId = elemento.querySelector('a').getAttribute('data-id');
        }
        return false;
    }

    function vaciarCarrito() {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        return false;
    }
});
