const carrito = [];

const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
}

const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
}

const mostrarListaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio
    });
    alert('Lista de precios:'+'\n\n'+listaOrdenada.join('\n'))
    comprarProductos(listaOrdenada)
};

const comprarProductos = (listaDeProductos) => {
    let otroProducto = false;
    let productoNombre = '';
    let productoCantidad = 0;

    do {
        productoNombre = prompt('¿Que producto desea comprar?'+'\n\n'+listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuántos querés comprar?'));
        if (Number.isNaN(productoCantidad) || productoCantidad === 0) {
            if (productoCantidad !== 0) {
                alert('Debe agregar un número.')
                mostrarListaOrdenada()
            } else {
                alert('Debe agregar una cantidad de producto.')
                mostrarListaOrdenada()
            }
            return productoCantidad;
        }
        else {
            const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())
            if (producto) {
                agregarAlCarrito(producto, producto.id, productoCantidad)
            } else {
                alert('El producto no se encuentra en el catálogo')
            }
    
            otroProducto = confirm('¿Desea agregar otro producto?')
        }
        
        
    } while (otroProducto);
   confirmarCompra();
};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId);
    if (productoRepetido) {
        productoRepetido.cantidad += productoCantidad
    } else {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    }
};

const eliminarProductoCarrito = (productoNombre) => {
    carrito.forEach((producto, posicion) => {
        if (producto.nombre.toLowerCase() === productoNombre.toLowerCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(posicion, 1)
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad
    });

    const confirmar = confirm('Checkout: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar productos del carrito'
    );

    if (confirmar) {
        finalizarCompra(listaProductos)
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar:');
        eliminarProductoCarrito(productoAEliminar)
    }
};


const finalizarCompra = (listaProductos) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    let total = 0;
    let cuadras = 0;
    let envioLocal = 0;
    let verificacion = true
    
    
    let venta = prompt("Es compra local o internacional?. Escriba local o internacional para confirmar");
    
    
    function ventaLocal() {
        do {
            cuadras = parseInt(prompt ("Ingrese el numero de cuadras del 0 al 100"));
            if ((cuadras == 0) || (cuadras <= 5)) {
                envioLocal = 0
            } 
            else if ((cuadras >= 6) && (cuadras <= 10)) {
                envioLocal = 20
            } 
            else if ((cuadras >= 11) && (cuadras <= 50)){
                envioLocal = 50
            } 
            else if ((cuadras >= 51) && (cuadras <= 100)){
                envioLocal = 80
            } 
            else if (cuadras > 100){
                alert("Se encuentra fuera del rango de envio. Deberá acercarse a nuestro local mas cercano")
                envioLocal = 0
                mostrarListaOrdenada()
            }
            else {
                alert("Distancia no válida")
                mostrarListaOrdenada()
            }
            total += envioLocal + precioTotal
            verificacion = !confirm("Desea finalizar la compra?");
        } while (verificacion); 
    }

    function ventaInternacional() {
        do {
            pais = parseInt(prompt("Seleccione un pais disponible con su correspondiente número:'\n\n1. Estados Unidos - 2. España - 3. Chile - 4. Japón"));
            switch (pais) {
                case 1:
                    envioInternacional = 1100
                    verificacion = false
                    break;
                case 2:
                    envioInternacional = 1200
                    verificacion = false
                    break;	
                case 3:
                    envioInternacional = 500
                    verificacion = false
                    break;
                case 4:
                    envioInternacional = 1500
                    verificacion = false
                    break;
                default:
                    alert("Por favor, seleccione un país válido")
                    break;
            }
            
            total += envioInternacional + precioTotal
            verificacion = !confirm("Desea finalizar la compra?");
            if(verificacion == true){
                mostrarListaOrdenada()
            }   
        } while (verificacion); 
    }

    if (venta == "local") {
        ventaLocal();
        alert('Detalle de su compra:'
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPrecio por unidad: $'+(total / cantidadTotal)
        +'\n\nEl envio es: $'+envioLocal
        +'\n\nEl total de la compra es: $'+total
        +'\n\nGracias por su compra!'
    )
    } else if (venta == "internacional"){
        ventaInternacional();
        alert('Detalle de su compra:'
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPrecio por unidad: $'+(total / cantidadTotal)
        +'\n\nEl envio es: $'+envioInternacional
        +'\n\nEl total de la compra es: $'+total
        +'\n\nGracias por su compra!'
    )
    }
    else {
        alert("Escriba -local-, si quiere realizar una compra en el mismo pais; o -internacional- si quiere realziar una compra desde el exterior")
        mostrarListaOrdenada()
    }

    
};

const comprar = () => {
    const productosBaratos = confirm('¿Querés ordenar la lista de productos del más barato al más caro?');

    if (productosBaratos) {
        ordenarMenorMayor();
    } else {
        ordenarMayorMenor();
    }
};

comprar();

