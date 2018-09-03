package horacerta.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Hora {
   
   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   private long id;
   private Date entrada;
   private Date pausaini;
   private Date pausafim;
   private Date saida;

   public Date getEntrada() {
      return entrada;
   }

   public void setEntrada(Date entrada) {
      this.entrada = entrada;
   }

   public Date getPausaini() {
      return pausaini;
   }

   public void setPausaini(Date pausaini) {
      this.pausaini = pausaini;
   }

   public Date getPausafim() {
      return pausafim;
   }

   public void setPausafim(Date pausafim) {
      this.pausafim = pausafim;
   }

   public Date getSaida() {
      return saida;
   }

   public void setSaida(Date saida) {
      this.saida = saida;
   }

}
