import { LIMITE_MINIMO_TAMANHO_DATA } from './../app.api';

export class InputData {
    setInputMask(document: any, disablePontoButtonId: any) {

        let pontoInputs = document.getElementsByClassName('inputData');
        let button = document.getElementById(disablePontoButtonId);

        //Limpar os status para cada vez que a máscara for utilizada
        this.cleanEventListeners(pontoInputs, button);

        for (let i = 0; i < pontoInputs.length; i++) {

            pontoInputs[i].addEventListener('input', (e: any) => {
                var target = e.target;
                var position = target.selectionStart;

                var dataPonto = target.value;

                if (dataPonto.length < LIMITE_MINIMO_TAMANHO_DATA) {
                    dataPonto = dataPonto + '-';
                }

                target.value = dataPonto;
                // console.log(position);
                if (target.value.charAt(position - 1) == '/') {
                    target.selectionEnd = position - 1;
                }
                else if (position == 10 && target.value.charAt(position - 1).match(/^[0-9]+$/) == null) {
                    target.selectionEnd = 0;
                }
                else if (position == 10 && target.value.charAt(position - 1).match(/^[0-9]+$/) != null) {
                    target.selectionEnd = 10;
                }
                else {
                    target.selectionEnd = position;
                }

                if (!this.newDateFromDate(target.value, (target.value.indexOf('/') > -1 ? '/' : ''))) {
                    target.classList.add('horaInvalida');
                    document.getElementById(disablePontoButtonId).disabled = true;
                }
                else {
                    target.classList.remove('horaInvalida');
                    // console.log(document.getElementsByClassName('horaInvalida').length);
                    if (document.getElementsByClassName('horaInvalida').length <= 0) {
                        document.getElementById(disablePontoButtonId).disabled = false;
                    }
                }

            })
        }
    }

    newDateFromDate(dataStr: String, separator?) {

        if (dataStr.length < 8) {
            // console.log('Tamanho mínimo não respeitado: ' + dataStr.length + ' Data: ' + dataStr);
            return false;
        }

        var str = dataStr.split(separator ? separator : '');
        var dia;
        var mes;
        var ano: any = '';
        // console.log(dataStr);

        if (separator == null || separator == '') {
            dia = parseInt(str[0] + str[1]);
            mes = parseInt(str[2] + str[3]);
            for (let i = 4, len = str.length; i < len; i++) {
                ano = ano + str[i];
            }
            ano = parseInt(ano);
        }
        else {
            dia = parseInt(str[0]);
            mes = parseInt(str[1]);
            ano = parseInt(str[2]);
        }
        // console.log(ano + '-' + mes + '-' + dia);

        var daysInMonth = (mes, ano) => {
            switch (mes) {
                case 1:
                    return (ano % 4 == 0 && ano % 100) || ano % 400 == 0 ? 29 : 28;
                case 8: case 3: case 5: case 10:
                    return 30;
                default:
                    return 31
            }
        };

        var isValidDate = (dia, mes, ano) => {
            mes = parseInt(mes, 10) - 1;
            return mes >= 0 && mes < 12 && dia > 0 && dia <= daysInMonth(mes, ano);
        };

        var hoje = new Date();
        var diaPonto = new Date(ano, mes - 1, dia, hoje.getHours(), hoje.getMinutes(), hoje.getSeconds());

        if (isValidDate(dia, mes, ano) && diaPonto.getTime() <= hoje.getTime()) {
            // console.log(ano + '-' + ('0' + (mes)).substr(-2) + '-' + ('0' + (dia)).substr(-2));
            return ano + '-' + ('0' + (mes)).substr(-2) + '-' + ('0' + (dia)).substr(-2);
        }
        else {
            // console.log('Data inválida ou a frente do dia de hoje: ' + ano + '-' + mes + '-' + dia);
            return false;
        }
    }

    cleanEventListeners(inputElements: any, buttonElement) {
        for (let i = 0; i < inputElements.length; i++) {
            inputElements[i].removeEventListener('input', this.cleanErrorStyle(inputElements[i], buttonElement))
        }
    }
    cleanErrorStyle(element, buttonElement) {
        element.classList.remove('horaInvalida');
        buttonElement.disabled = false;
    }


    /**
     * Converte data do formato YYYY-MM-dd para dd-MM-YYYY ou dd-MM-YYYY para YYYY-MM-dd
     * @param data
     * @returns dd-MM-YYYY
     */
    convertDate(data) {
        let arrayDataRegistro;
        let dataConvertida: String = '';

        arrayDataRegistro = data.split('-');
        for (let i = arrayDataRegistro.length - 1, len = 0; i >= len; i--) {
            dataConvertida = dataConvertida + (i == arrayDataRegistro.length - 1 ? '' : '-') + arrayDataRegistro[i];
        }
        return dataConvertida;
    }

}