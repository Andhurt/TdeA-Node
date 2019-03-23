function promedio1(nota_uno, nota_dos, nota_tres){
    let resultado=(nota_uno+nota_dos+nota_tres)/3;
    console.log('El promedio 1 es '+resultado);
}

let promedio2=(nota_uno, nota_dos, nota_tres)=>{
    setTimeout(function(){
        let resultado=(nota_uno+nota_dos+nota_tres)/3;
        console.log('El promedio 2 es '+resultado);
    }, 2000);
}

let promedio3=(nota_uno, nota_dos, nota_tres)=>
    console.log('El promedio 3 es '+ (nota_uno+nota_dos+nota_tres)/3);


promedio1(3,4,5);
promedio2(1,2,1);
promedio3(5,4,5);
