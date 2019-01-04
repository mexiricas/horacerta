package io.horacerta.service;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

/**
 * @author Pedro Ribeiro
 *
 */
public class EnvioEmailService {
   
   public void enviarEmail(String addressee, String subjects, String message) {
      HtmlEmail email = new HtmlEmail();
      email.setHostName("smtp.gmail.com");
      email.setSslSmtpPort("465");
      email.setSSLOnConnect(true);
      email.setAuthenticator(new DefaultAuthenticator("meusuportehoracerta@gmail.com", "horacerta@2019"));
      try {
         email.setFrom("meusuportehoracerta@gmail.com", "HORACERTA");
         //email.setDebug(true);
         email.setSubject(subjects);
         email.setHtmlMsg(message);

         email.addTo(addressee);
         email.addBcc("meusuportehoracerta@gmail.com");
         email.send();
      } catch (EmailException e) {
         e.printStackTrace();
      }
   }


}
