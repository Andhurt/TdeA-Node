// let promedio = (nota_uno, nota_dos, nota_tres)=>{
// 	setTimeout(function(){
// 		let resultado = (nota_uno+nota_dos+nota_tres)/3;
// 		return resultado;
// 	}, 2000);
// }

// console.log("El promedio es " + promedio(5,4,5));

let promedio = (nota_uno, nota_dos, nota_tres, callback)=>{
 	setTimeout(function(){
 		let resultado = (nota_uno+nota_dos+nota_tres)/3;
 		callback(resultado);
 	}, 2000);
 }

 promedio(5,4,5,function(resultado){
	 console.log("El promedio es " + resultado);
 })