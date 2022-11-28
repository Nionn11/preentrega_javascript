const precio = 1000;
let cantidad = 0;
let total = 0;
let cuadras = 0;
let envioLocal = 0;
let pais = 0;
let envioInternacional = 0;
let verificacion = true

alert("Bienvenido a la tienda de -producto-, vendemos -producto- por unidad; su valor es de 1000$. Por favor, seleccione el lugar de compra")

let venta = prompt("Es compra local o internacional?. Escriba local o internacional para confirmar");


function ventaLocal() {
    do {
        cantidad = parseInt(prompt ("Ingrese la cantidad de producto que desea comprar"));
        let cantidadValidada = validarCantidad(cantidad);
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
        }
        else {
            alert("Distancia no válida")
        }
        total += envioLocal + (precio * cantidadValidada)
        verificacion = confirm("¿Querés agregar otro producto?");
    } while (verificacion); 

}

function ventaInternacional() {
    do {
        cantidad = parseInt(prompt ("Ingrese la cantidad de producto que desea comprar"));
        let cantidadValidada = validarCantidad(cantidad);
        pais = parseInt(prompt("Seleccione un pais disponible con su correspondiente número: 1. Estados Unidos - 2. España - 3. Chile - 4. Japón"));
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
        
        total += envioInternacional + (precio * cantidadValidada)
        verificacion = confirm("¿Querés agregar otro producto?");
    } while (verificacion); 
}


const validarCantidad = (cantidad) => {
    while (Number.isNaN(cantidad) || cantidad === 0) {
        if (cantidad !== 0) {
            alert('Debe agregar un número.')
        } else {
            alert('Debe agregar una cantidad de producto.')
        }
        cantidad = parseInt(prompt("¿Cuántos querés comprar?"))
    }

    return cantidad;
};



if (venta == "local") {
    ventaLocal();
    alert("El precio total es: " +total)
} else if (venta == "internacional"){
    ventaInternacional();
    alert("El precio total es: " +total)
}
else {
    alert("Escriba -local-, si quiere realizar una compra en el mismo pais; o -internacional- si quiere realziar una compra desde el exterior")
}	