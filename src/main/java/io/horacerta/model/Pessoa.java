package io.horacerta.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * @author Pedro Ribeiro
 *
 */
@Entity
public class Pessoa {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   
   private String nome;
   
   private String cargo;
   
   @Temporal(TemporalType.DATE)
   private Date dataRegistro = new Date();

   private String username;

   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public String getNome() {
      return nome;
   }

   public void setNome(String nome) {
      this.nome = nome;
   }

   public String getCargo() {
      return cargo;
   }

   public void setCargo(String cargo) {
      this.cargo = cargo;
   }

public String getUsername() {
	return username;
}

public void setUsername(String username) {
	this.username = username;
}

}
