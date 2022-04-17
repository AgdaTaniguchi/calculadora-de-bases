var base1, base2;
mudarBase(1, baseInicial.value);
mudarBase(2, baseFinal.value);

// Decimal para binário
// Octal para binário
// Hexadecimal para binário
// Binário para octal
// Binário para decimal
// Binário para hexadecimal

function calcular(numero, baseInicial, baseFinal, numeroInputTroca){
    let numeroBinario;
    let resultado;

    // Transformando todos os números em binários
    if(baseInicial != 2){
        switch(baseInicial){
            case '8':
                numeroBinario = paraBinario(numero, 8);
                break;
                
            case '10':
                numeroBinario = decimalParaBinario(numero);
                break;
                    
            case '16':
                numeroBinario = paraBinario(numero, 16);
                break;
        }
    }
    else{
        numeroBinario = numero;
    }

    // Calculando resultados
    if(baseFinal == 2){
        resultado = numeroBinario;
    }
    else{
        resultado = binarioPara(numeroBinario, baseFinal);
    }

    preencherResultado(numeroInputTroca, resultado);
}

function preencherResultado(numeroInput, resultado){
    window['inpNumero' + numeroInput].value = resultado;
}

function separarDigitos(numero, quantidadeDigitos){
    let digitosSeparados = [];

    let quantidadeVezes = Math.ceil(numero.length / quantidadeDigitos);

    if(numero.length % quantidadeDigitos != 0){
        for (let index = quantidadeDigitos  - (numero.length % quantidadeDigitos); index > 0; index--) {
            numero = [numero.slice(0, 0), '0', numero.slice(0)].join('');
        }
    }

    let contador = 0;

    for(quantidadeVezes; quantidadeVezes > 0; quantidadeVezes--) {
        let digitos = "";
        for (let i = quantidadeDigitos; i > 0; i--) {
            digitos += numero[contador];
            contador++;
        }
        digitosSeparados.push(digitos);
    }

    return digitosSeparados;
}

// Arrumar os números hexadecimais para colocarem as LETRAS!!!!
function binarioPara(numeroBinario, baseFinal){
    let quantidadeAlgarismos = {'8' : 3, '10' : numeroBinario.length, '16' : 4};
    let numeroBinarioSeparado = separarDigitos(numeroBinario, quantidadeAlgarismos[baseFinal]);
    let numeroFinal = baseFinal == '10' ? 0 : '';
    let letras = {1010 : 'A', 1011 : 'B', 1100 : 'C', 1101 : 'D', 1110 : 'E', 1111 : 'F'};

    for(let index = 0; index <= numeroBinarioSeparado.length - 1; index++){
        let algarismoProvisorio = 0;
        let contador = 0;
        // Checando se é letra na base hexadecimal
        if(Object.keys(letras).includes(numeroBinarioSeparado[index]) && baseFinal == '16'){
            numeroFinal += letras[numeroBinarioSeparado[index]];
            continue;
        }
        // Calculando o número
        for (let i = numeroBinarioSeparado[index].length - 1; i >= 0; i--){
            if(numeroBinarioSeparado[index][i] == 1){
                algarismoProvisorio += 2 ** contador;
            }
            contador++;
        }
        numeroFinal += algarismoProvisorio;
    }

    return numeroFinal;
}

function decimalParaBinario(numero){
    let numeroBinario = "";
    let maiorPotencia;

    for (let i = 0; 2 ** i <= numero; i++){
        maiorPotencia = i;
    }

    for (maiorPotencia; maiorPotencia >= 0; maiorPotencia--){
        if(numero >= 2 ** maiorPotencia){
            numero -= 2 ** maiorPotencia;
            numeroBinario += '1';
        }
        else{
            numeroBinario += '0';
        }
    }

    return numeroBinario;
}

function paraBinario(numero, base){
    let numeroBinario = "";
    let quantidade;
    let letras = {};

    if(base == 8){
        quantidade = 3;
    }
    else if(base == 16){
        quantidade = 4;
        letras = {'A' : 1010, 'B' : 1011, 'C' : 1100, 'D' : 1101, 'E' : 1110, 'F' : 1111};
    }

    numero = numero.toString().split('');
    
    numero.forEach(algarismo => {
        for(let i = quantidade - 1; i >= 0; i--){
            if(algarismo >= 2 ** i){
                numeroBinario += '1';
                algarismo -= 2 ** i;
            }
            else if(isNaN(algarismo) && letras[algarismo.toUpperCase()]){
                numeroBinario += `${letras[algarismo.toUpperCase()]}`;
                break;
            }
            else{
                numeroBinario += '0';
            }
        }
    });

    while(numeroBinario.charAt(0) === '0'){
        numeroBinario = numeroBinario.substring(1);
    }

    return numeroBinario;
}

function mudarBase(idInput, baseValor){
    let bases = {2: 'binário', 8: 'octal', 10: 'decimal', 16: 'hexadecimal'};
    window['spnBase'+ idInput].innerHTML = bases[baseValor];
    
    window['base'+ idInput] = baseValor;

    if(inpNumero1.value != '' && inpNumero2.value != ''){
        calcular(window['inpNumero' + (3 - idInput)].value, window['base' + (3 - idInput)], baseValor, idInput);
    }

}

function verificarNumero(input, base){
    let algarismos = {
        '2': {
            regExp: /[^0-1]/g,
            nomeBase: 'binária',
            algarismos: '0 e 1'
        },
        '8': {
            regExp: /[^0-7]/g,
            nomeBase: 'octal',
            algarismos: '0 a 7'
        },
        '10': {
            regExp: /[^0-9]/g,
            nomeBase: 'decimal',
            algarismos: '0 a 9'
        },
        '16': {
            regExp: /[^a-fA-F0-9]/g,
            nomeBase: 'hexadecimal',
            algarismos: '0 a 9 e A a F'
        }
    };

    let numero = input.value;

    input.value = numero.replace(algarismos[base].regExp, '');
}