import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'eFone'
})

export class EFonePipe implements PipeTransform {

    /**
	 * Formata um Telefone ou retorna seu valor passado caso inválido. 
     * O Telefone informado deve ser composto por 11 caracteres numéricos.
	 *
	 * @param string fone
	 * @return string
	 */

    transform(fone: string): string {
        if (!fone) {
            return '';
        }
        var foneValor = fone.replace(/\D/g, '');

        if (foneValor.length !== 11) {
            return fone;
        }

        var foneLista = foneValor.match(/^(\d{2})(\d{5})(\d{4})$/);

        if (foneLista && foneLista.length === 4) {
            fone = '(' + foneLista[1] + ') ' + foneLista[2] + '-' + foneLista[3];
        }
        
        return fone;
    }


}