
//***************************************************//
//********Ultima Entrega del Proyecto Final**********//
//***************************************************//

//**********************************//
//*********OBJETO PRODUCTO**********//
//**********************************//

class Producto {

    constructor(name, price, img, stock, category){
        this.name = name;
        this.price = price;
        this.img = img;
        this.stock = stock;
        this.category = category;
    }

    validaStock(){
        if(this.stock != 0){
            return true;
        }
        else {
            return false;
        }
    }   

}

//********************************************************************************//
//********Se intancian los Productos y se crea el array Base de Datos*************//
//********************************************************************************//

function instanciarProductos() {
    const producto_uno = new Producto("Zapatillas", 9000, "img/zapatillas.png", 450, "Calzado");
    const producto_dos = new Producto("Remeras", 1500, "img/remeras.png", 650, "Indumentaria");
    const producto_tres = new Producto("Gorras", 500, "img/gorras.png", 800, "Accesorio");
    const producto_cuatro = new Producto("Lentes", 2000, "img/lentes.png", 500, "Accesorio");
    const producto_cinco = new Producto("Camperas", 15000, "img/camperas.png", 400, "Indumentaria");
    const producto_seis = new Producto("Zapatos", 8000, "img/zapatos.png", 350, "Calzado");
    const producto_siete = new Producto("Medias", 600, "img/medias.png", 900, "Indumentaria");
    const producto_ocho = new Producto("Cintos", 900, "img/cintos.png", 250, "Accesorio");
 
    const baseDeDatos = [producto_uno, producto_dos, producto_tres, producto_cuatro, producto_cinco, producto_seis, producto_siete, producto_ocho];
    
    return baseDeDatos;
}

let baseDeDatos = instanciarProductos();


//*******************************************************************//
//***********OBJETO ECOMMERCE con ARREGLO CARRITO y métodos***********//
//*******************************************************************//

class Ecommerce {
    constructor(){
        this.carrito = [];
    }

    agregarAlCarrito(name){
        const productoEncontrado = baseDeDatos.find(producto => producto.name === name);
        if(productoEncontrado != undefined){
            this.carrito.push(productoEncontrado);
            console.log(name);
            darMensaje("Me agregaste al carrito.");
            console.log(this.carrito);
            localStorage.setItem("carritoPendiente", JSON.stringify(this.carrito)); //Guarda los productos pendiente del carrito en el LOCAL STORAGE
            this.actualizaCarrito();
        } else {
            darMensaje("No se pudo realizar la acción al no encontrarse el producto.");
        }
    }

    removerDelCatalogo(name){
        const card = document.getElementById(name);
        card.parentNode.removeChild(card);
    }

    removerDelCarrito(name){
        const productoEncontrado = this.carrito.find(producto => producto.name === name);
        if(productoEncontrado != undefined){
            const posicion = this.carrito.indexOf(productoEncontrado)
            this.carrito.splice(posicion, 1);
            darMensaje("Me removiste del carrito.");
            console.log(posicion);
            console.log(this.carrito);
            localStorage.setItem("carritoPendiente", JSON.stringify(this.carrito)); //Guarda los productos pendiente del carrito en el LOCAL STORAGE
            this.actualizaCarrito();
        } else {
            darMensaje("No se pudo realizar la acción al no encontrarse el producto.");
        }

    }

    actualizaCarrito() {
        let cantidad = this.carrito.length;
        document.getElementById("carrito-lleno").innerHTML = cantidad;
    }

    vaciarCarrito() {
        this.carrito = [];
        localStorage.removeItem('carritoPendiente');
        this.actualizaCarrito();
        darMensaje("Se vació el carrito.");
    }

    mostrarCarrito() {
        let carritoPendiente = this.carrito;
        let mostrar = `<h3 style="text-align:left">Articulos seleccionados:</h3>`;
        let total = 0;

        carritoPendiente.forEach((producto) => {
            mostrar += `<ul><li>${producto.name}: ${producto.price}</li></ul>`;
            total += producto.price;
        })

        mostrar += `<hr><p><strong>Precio Total:</strong> ${total}</p>`

        darMensaje(mostrar);

    }

}

const ecommerce = new Ecommerce();

//************************************************************************************************//
//*********INCORPORO LOCAL STORAGE para validar nombre del visitante y carrito pendiente**********//
//************************************************************************************************//

const validarUsuario = () => {
    if(localStorage.getItem("nombre")){
       const nombreUsuario = localStorage.getItem("nombre");
       darMensaje("Bienvenido nuevamente al sitio "+nombreUsuario);
    } else{
        const nombreUsuario = prompt("Ingrese su nombre de usuario"); 
        localStorage.setItem("nombre", nombreUsuario);
        darMensaje("Bienvenido por primera vez "+nombreUsuario);
    }
}

validarUsuario();

//*Primero parseo el JSON que levanté del LOCAL STORAGE y luego le asigno la clase PRODUCTO a cada objeto del array carrito*////

const validarCarrito = () => {
    const cantidad = localStorage.getItem("carritoPendiente");
    if(cantidad && cantidad != "[]"){
        const productos = JSON.parse(localStorage.getItem("carritoPendiente"));
        ecommerce.carrito = productos.map (producto => new Producto(producto.name, producto.price, producto.img, producto.stock, producto.category));
    }
   ecommerce.actualizaCarrito();
}

validarCarrito();

//**********************************************************************************************//
//*********Función para agregar productos al catálogo y tambien mostrarlos en el Front**********//
//**********************************************************************************************//

function cargarProducto(){
    
    const name = document.getElementById("nombre").value;
    const price = document.getElementById("precio").value;
    const img = document.getElementById("img").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("categoria").value;

    let valores = [name, price, img, stock, category,];
    
    let valido = true;

    valores.forEach((campo) => {
        if(campo == ''){
            valido = false;
        }
    })

    if (valido){
        const producto = new Producto(name, price, img, stock, category);
        console.log(producto);
        baseDeDatos.push(producto);
        armarCatalogo(baseDeDatos);
        darMensaje("El producto ingresado "+name+" se creó correctamente.");
    } else {
        darMensaje("Hay campos incompletos. Por favor revise los datos ingresados");
    }
}

//************************************************************//
//********ORDENAR arreglo por PRECIO de menor a mayor*********//
//***********************************************************//

function ordenaMenorPrecio() {
    baseDeDatos.sort(function (a, b) {
        if(a.price > b.price) {
            return 1;
        }
        if(a.price < b.price) {
            return -1;
        }
        return 0;
    });
    return baseDeDatos;
}

// ordenaMenorPrecio();
// console.log(baseDeDatos);

//************************************************************//
//********ORDENAR arreglo por PRECIO de mayor a menor*********//
//***********************************************************//

function ordenaMayorPrecio() {
    baseDeDatos.sort(function (a, b) {
        if(a.price < b.price) {
            return 1;
        }
        if(a.price > b.price) {
            return -1;
        }
        return 0;
    });
    return baseDeDatos;
}

// ordenaMayorPrecio();
// console.log(baseDeDatos);

//*********************************************************************************************************//
//Arma el catálogo de productos en el Front con la información del Array de BaseDeDatos, asignando clase y ID.
//*********************************************************************************************************//

function armarCatalogo (bd){
    let acumulador = ``;
    bd.forEach((producto) => {
        acumulador += `<div class="col mb-5" id="${producto.name}">
        <div class="card h-100">
            <img class="card-img-top" src="${producto.img}" alt="${producto.name}" title="${producto.name}" />
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">${producto.name}</h5>
                    <p>Precio: ${producto.price}</p>
                    <p>Unidades: ${producto.stock}</p>
                    <p>Categoría: ${producto.category}</p>
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" onclick="ecommerce.agregarAlCarrito('${producto.name}')">Agregar al carrito</a></div>
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" onclick="ecommerce.removerDelCarrito('${producto.name}')">Remover del carrito</a></div>
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" onclick="ecommerce.removerDelCatalogo('${producto.name}')">Remover del catalogo</a></div>
            </div>
        </div>
    </div>`;
    })
    document.getElementById("listado-de-producto").innerHTML = acumulador;
}

armarCatalogo(baseDeDatos);


//*********************************************************************************************************//
//*******************Filtro por categoría para el catálogo de productos en el Front ***********************//
//*********************************************************************************************************//

/**
 * @param filtro
 * El parametro filtro es para filtrar los productos por categoria 
**/

function filtrarPorCategoria(filtro = "default"){
    let nuevosProductos = (filtro !== "default") ? baseDeDatos.filter(producto => producto.category == filtro) : baseDeDatos; //Base de datos FILTRADA o COMPLETA
    armarCatalogo(nuevosProductos);
}


//*******************************************//
//********Mensaje de Alerta en Modal*******//
//*******************************************//

function darMensaje(mensaje){
    const divAlerta = document.getElementById("alerta");
    divAlerta.firstChild.remove();
    const p = document.createElement("p");
    p.innerHTML = mensaje;
    divAlerta.appendChild(p);

    //Los Objetos MODAL en BootStrap ya viene con sus metodos
    var divModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
    })
    divModal.show();
}


//*************************************************************//
//********Aplico jQuery al Form para dar mas estilos************//
//*************************************************************//

$("input").focus(function(){
    $(this).animate({height : "40px"})
           .css("background", "blanchedalmond")
});


$("input").blur(function(){
    $(this).animate({height : "25px"})
           .css("background", "#FFFFFF")
});

$("select").focus(function(){
    $(this).animate({height : "50px"})
           .css("background", "blanchedalmond")
});

$("select").blur(function(){
    $(this).animate({height : "40px"})
           .css("background", "#FFFFFF")        
});

//*************************************************************************************//
//*******Trae el STOCK desde un JSON, lo agrega al array Base de datos*****************//
//*****************de productos y muestra el catálogo en el front**********************//
//*************************************************************************************//

function cargarStock(){
    let data = [];

    fetch("js/stock.json")
    .then(response => response.json() )
    .then(data => {
        baseDeDatos = baseDeDatos.concat(data);
        console.log(data); 
        console.log(baseDeDatos);
        armarCatalogo(baseDeDatos);
        darMensaje("El Stock se cargó correctamente!");
    })
    .catch(error => console.log(error) )
}

//*********************************************************************************************************//
//*********************************************************************************************************//

