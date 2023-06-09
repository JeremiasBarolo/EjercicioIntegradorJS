/*
En el archivo tarea2.js podemos encontrar un código de un supermercado que vende productos.
El código contiene 
    - una clase Producto que representa un producto que vende el super
    - una clase Carrito que representa el carrito de compras de un cliente
    - una clase ProductoEnCarrito que representa un producto que se agrego al carrito
    - una función findProductBySku que simula una base de datos y busca un producto por su sku
El código tiene errores y varias cosas para mejorar / agregar
​
Ejercicios
1) Arreglar errores existentes en el código (hecho)
2) Agregar la función eliminarProducto a la clase Carrito (hecho)
3) Utilizar la función eliminarProducto utilizando .then() y .catch() (hecho)
​
*/




// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por defecto
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }
}

// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];

// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vacío
    constructor() {
        this.productos = [];
        this.categorias = [];
        this.precioTotal = 0;
    }

    // 1) Arreglar errores existentes en el código
    // a) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades.
    // b) Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista.
    // c) Si intento agregar un producto que no existe debería mostrar un mensaje de error.

    /**
     * Función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async agregarProducto(Sku, cantidad) {
        console.log(`Agregando ${cantidad} con el identificador ${Sku}`);

        // Busco el producto en la "base de datos"
        const PRODUCTO = await findProductBySku(Sku);
        console.log("Producto encontrado", PRODUCTO);


        //Constante de productos dentro del carrito
        const PRODUCTOS_CARRITO = this.productos


        // Validacion de Stock/Cantidad
        let cantidadRestanteStock = await validarCantidadStock(cantidad, PRODUCTO.stock);  
        try {
            if(cantidadRestanteStock){
                PRODUCTO.stock = cantidadRestanteStock
                console.log('paso');
            }
        } catch (error) {
            console.log('ocurrio un error: ', error);
        }



        //Validamos si existe el Sku
        let skuExistentes = this.productos.some(productosku => productosku.sku === Sku);
            if(skuExistentes){ // si existe, sumamos las cantidades...
                console.log('ya existe este sku...');
                let productoDelCarrito = PRODUCTOS_CARRITO.find(producto => producto.sku === Sku); // Aqui instanciamos el Producto requerido

                
                
            

            }else{
                // Y si no existe, lo creamos.
                console.log('cree un nuevo producto...');
                const nuevoProducto = new ProductoEnCarrito(Sku, PRODUCTO.nombre, cantidad);
                PRODUCTOS_CARRITO.push(nuevoProducto);
                this.precioTotal = this.precioTotal + (PRODUCTO.precio * cantidad);

                // Filtrado de categorias
                let categoriaExistente = this.categorias.some(categoria => categoria === PRODUCTO.categoria);
                if(!categoriaExistente){
                    this.categorias.push(PRODUCTO.categoria);
                }
                    
            }
                
                
        


    }


    // 2) Agregar la función eliminarProducto a la clase Carrito

    // (hecho)  a) La función eliminarProducto recibe un sku y una cantidad (debe devolver una promesa)
    // (hecho)  b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto
    // (hecho)  c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito
    // (hecho)  d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error
    // (hecho)  e) La función debe retornar una promesa



    /**
     * función que elimina @{cantidad} de productos con @{sku} del carrito
     */

    async eliminarProducto(Sku, cantidad){

        //Constante de Productos en carrito
        const PRODUCTOS_CARRITO = this.productos

    
        const PRODUCTO = await encontrarProducto(Sku, PRODUCTOS_CARRITO)
        //then y catch
        .then(PRODUCTO =>{
            if (PRODUCTO){
                let cantidad_restante = PRODUCTO.cantidad - cantidad
                if(cantidad_restante > 0){
                    PRODUCTO.cantidad = cantidad_restante
                    console.log(`Ahora el producto dentro del carrito tiene una cantidad de: ${PRODUCTO.cantidad}`)
                }else{
                    PRODUCTOS_CARRITO.splice(PRODUCTO)
                    console.log('Producto Eliminado...');
                }
            }
        })

        .catch(error=> {
            console.log(`hubo un error en la ejecucion del codigo: ${error}`);
        })
        
        
        
        
    }



    
}
    


// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) { 
    try{ return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct); 
            } else {
                reject(new Error(`Operacion fallida, no se encontro: ${sku}`));
            }
        }, 1500);
        })
        ;}
    catch(error){
        console.log('Ocurrio un error: ', error)
    }
}

// Función que busca un producto por su sku en el carrito.

function encontrarProducto(Sku, PRODUCTOS_CARRITO){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Busco el producto en la "carrito"
            let productoEncontrado = PRODUCTOS_CARRITO.find(producto => producto.sku === Sku);
            //Si lo encuentra...
            if (productoEncontrado) {
                resolve(productoEncontrado) //devuelve el producto
            } else {
                reject(`Error: No se encontro el Producto ${Sku}`); // Rechaza la promesa con un mensaje de error
            }
        }, 1500);
        
    });
}

// Funcion para validar cantidad en stock
function validarCantidadStock(canReq, stock) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calculando stock restante....');
            if (canReq > stock) {
                reject(`Error: solo dispone de ${stock} en Stock`);
            } else {
                let cantidadRestante = stock - canReq;
                resolve(cantidadRestante);
            }
        }, 1500);
    });
}

// ejecucion del programa
const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 1);
carrito.agregarProducto('WE328NJ', 2);
// carrito.agregarProducto('KS944RUR', 4);
// carrito.agregarProducto('WE328NJ', 4);


