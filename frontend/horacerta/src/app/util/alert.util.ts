export class AlertCreator {

  criarAlert(tipoAlert: String, idAlertContainer: any) {

    var alert = document.createElement('DIV');
    var textoBotao = document.createTextNode('x');

    switch (tipoAlert) {
      case 'sucessoRegistroPonto':

        if (document.getElementById(idAlertContainer).childNodes.length <= 0) {
          var textoTitulo = document.createTextNode('Sucesso!');
          var texto = document.createTextNode('Ponto registrado com sucesso!');
          alert.classList.add('alert');
          alert.classList.add('alert-success');
          alert.classList.add('alert-dismissible');

          var button = document.createElement('BUTTON');
          button.classList.add('close');
          button.setAttribute('data-dismiss', 'alert');
          button.setAttribute('aria-hidden', 'true');
          button.appendChild(textoBotao);

          var titulo = document.createElement('H4');

          var icon = document.createElement('I');
          icon.classList.add('icon');
          icon.classList.add('fa');
          icon.classList.add('fa-check');
          icon.appendChild(textoTitulo);

          titulo.appendChild(icon);

          alert.appendChild(button);
          alert.appendChild(titulo);
          alert.appendChild(texto);

          document.getElementById(idAlertContainer).appendChild(alert);
        }
        break;

      case 'erroRegistroPonto':
        if (document.getElementById(idAlertContainer).childNodes.length <= 0) {
          var textoTitulo = document.createTextNode('Erro!');
          var texto = document.createTextNode('Erro ao registrar o ponto!');
          alert.classList.add('alert');
          alert.classList.add('alert-danger');
          alert.classList.add('alert-dismissible');

          var button = document.createElement('BUTTON');
          button.classList.add('close');
          button.setAttribute('data-dismiss', 'alert');
          button.setAttribute('aria-hidden', 'true');
          button.appendChild(textoBotao);

          var titulo = document.createElement('H4');

          var icon = document.createElement('I');
          icon.classList.add('icon');
          icon.classList.add('fa');
          icon.classList.add('fa-check');
          icon.appendChild(textoTitulo);

          titulo.appendChild(icon);

          alert.appendChild(button);
          alert.appendChild(titulo);
          alert.appendChild(texto);

          document.getElementById(idAlertContainer).appendChild(alert);
        }
        break;
    }
  }

}