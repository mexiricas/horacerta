import { LIMITE_MINIMO_TAMANHO_HORA } from './../app.api';

export class InputHora {
    setInputMask(document: any, disablePontoButton: any) {
        let pontoInputs = document.getElementsByClassName('inputHora');

        for (let i = 0; i < pontoInputs.length; i++) {

            pontoInputs[i].addEventListener('input', (e: any) => {
                var target = e.target;
                var position = target.selectionStart;

                var horaPonto = target.value;

                if (horaPonto.length < LIMITE_MINIMO_TAMANHO_HORA) {
                    horaPonto = horaPonto + "-";
                }

                target.value = horaPonto;
                if (target.value.charAt(position - 1) == ':') {
                    target.selectionEnd = position - 1;
                }

                else if (position == 5 && target.value.charAt(position - 1).match(/^[0-9]+$/) == null) {
                    target.selectionEnd = 0;
                }
                else if (position == 5 && target.value.charAt(position - 1).match(/^[0-9]+$/) != null) {
                    target.selectionEnd = 5;
                }
                else {
                    target.selectionEnd = position;
                }

                if (!this.newDateFromHoraMin(target.value, (target.value.indexOf(':') > -1 ? ':' : ''))) {
                    target.classList.add("horaInvalida");
                    disablePontoButton = true;
                }
                else {
                    target.classList.remove("horaInvalida");
                    if (document.getElementsByClassName("horaInvalida").length <= 0) {
                        disablePontoButton = false;
                    }
                }

            })
        }
    }

    newDateFromHoraMin(horaMinStr, separator?) {

        if (horaMinStr.length < 4) {
            return false;
        }

        var str = horaMinStr.split(separator ? separator : '');
        var hora;
        var min;

        if (separator == null || separator == '') {
            hora = parseInt(str[0] + str[1]);
            min = parseInt(str[2] + str[3]);
        }
        else {
            hora = parseInt(str[0]);
            min = parseInt(str[1]);
        }

        if (hora > 23 || min > 59) {
            return false;
        }

        var ano = new Date().getFullYear();
        var mes = new Date().getMonth();
        var dia = new Date().getDate();
        var segundos = new Date().getSeconds();

        var data = new Date(ano, mes, dia, hora, min, segundos);
        return data;
    }
}