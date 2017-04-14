//  br.js 0.1.0
//  http://brunobrasilweb.com.br/br,js
//  (c) 2017 Bruno Brasil

(function () {

    // Constants
    var TESTE = "";

    // Cached array helpers
    var slice = Array.prototype.slice;

    // Constructor
    function Br (seed) {
        if (!(this instanceof Br)) {
            return seed == null ? new Br() : new Br(seed);
        }

        // if user has provided a function, use that as the generator
        if (typeof seed === 'function') {
            this.random = seed;
            return this;
        }

        if (arguments.length) {
            // set a starting value of zero so we can add to it
            this.seed = 0;
        }

        // otherwise, leave this.seed blank so that MT will receive a blank

        for (var i = 0; i < arguments.length; i++) {
            var seedling = 0;
            if (Object.prototype.toString.call(arguments[i]) === '[object String]') {
                for (var j = 0; j < arguments[i].length; j++) {
                    // create a numeric hash for each argument, add to seedling
                    var hash = 0;
                    for (var k = 0; k < arguments[i].length; k++) {
                        hash = arguments[i].charCodeAt(k) + (hash << 6) + (hash << 16) - hash;
                    }
                    seedling += hash;
                }
            } else {
                seedling = arguments[i];
            }
            this.seed += (arguments.length - i) * seedling;
        }

        return this;
    }

    Br.prototype.VERSION = "0.1.0";

    /**
     *  Function validate CPF
     *
     *  @param {string} [cpf] string cpf with or without format 
     *  @return {boolean} true/false valid
     */
    Br.prototype.isCpf = function (cpf) {
        var _validateCpf = function (cpf) {
            cpf = String(cpf);
            cpf = cpf.replace(/[^\d]+/g, '');

            if (cpf === '')
                return false;

            if (cpf.length !== 11 ||
                    cpf === "00000000000" ||
                    cpf === "11111111111" ||
                    cpf === "22222222222" ||
                    cpf === "33333333333" ||
                    cpf === "44444444444" ||
                    cpf === "55555555555" ||
                    cpf === "66666666666" ||
                    cpf === "77777777777" ||
                    cpf === "88888888888" ||
                    cpf === "99999999999")
                return false;

            var add = 0;
            for (var i = 0; i < 9; i ++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
            var rev = 11 - (add % 11);
            if (rev === 10 || rev === 11)
                rev = 0;
            if (rev !== parseInt(cpf.charAt(9)))
                return false;

            add = 0;
            for (var i = 0; i < 10; i ++)
                add += parseInt(cpf.charAt(i)) * (11 - i);
            rev = 11 - (add % 11);
            if (rev === 10 || rev === 11)
                rev = 0;
            if (rev !== parseInt(cpf.charAt(10)))
                return false;

            return true;
        };

        return _validateCpf(cpf);
    };

    /**
     *  Function validate CNPJ
     *
     *  @param {string} [cnpj] string cnpj with or without format 
     *  @return {boolean} true/false valid
     */
    Br.prototype.isCnpj = function (cnpj) {
        var _validateCnpj = function (cnpj) {
            cnpj = String(cnpj);
            cnpj = cnpj.replace(/[^\d]+/g, '');

            if (cnpj === '')
                return false;

            if (cnpj.length != 14)
                return false;

            if (cnpj == "00000000000000" ||
                    cnpj == "11111111111111" ||
                    cnpj == "22222222222222" ||
                    cnpj == "33333333333333" ||
                    cnpj == "44444444444444" ||
                    cnpj == "55555555555555" ||
                    cnpj == "66666666666666" ||
                    cnpj == "77777777777777" ||
                    cnpj == "88888888888888" ||
                    cnpj == "99999999999999")
                return false;

            var tamanho = cnpj.length - 2
            var numeros = cnpj.substring(0, tamanho);
            var digitos = cnpj.substring(tamanho);
            var soma = 0;
            var pos = tamanho - 7;
            for (var i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (var i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;

            return true;
        };

        return _validateCnpj(cnpj);
    };

    // CommonJS module
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Br;
        }
        exports.Br = Br;
    }

    // Register as an anonymous AMD module
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return Br;
        });
    }

    // if there is a importsScrips object define chance for worker
    if (typeof importScripts !== 'undefined') {
        br = new Br();
    }

    // If there is a window object, that at least has a document property,
    // instantiate and define chance on the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Br = Br;
        window.br = new Br();
    }
})();