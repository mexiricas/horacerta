package io.horacerta.model;

import java.util.Date;

import javax.annotation.PostConstruct;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;


@Entity
@Table(name="PontoDiario")
public class PontoDiario {
	
	
	   @Id
	   @GeneratedValue(strategy = GenerationType.AUTO)
	   private long id;
	   
	   @Temporal(TemporalType.TIMESTAMP)
	   private Date entrada;
	   
	   @Temporal(TemporalType.TIMESTAMP)
	   private Date pausaini;
	   
	   @Temporal(TemporalType.TIMESTAMP)
	   private Date pausafim;
	   
	   @Temporal(TemporalType.TIMESTAMP)
	   @Column(nullable=false)
	   private Date saida;
	   
	   @Temporal(TemporalType.DATE)
	   private Date dataRegistro;
	   
	   //Saldo em mlisegundos
	   @Transient
	   private long saldo;
	   
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
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
	public Date getDataRegistro() {
		return dataRegistro;
	}
	public void setDataRegistro(Date dataRegistro) {
		this.dataRegistro = dataRegistro;
	}
	
	@PostConstruct
	public void calculaSaldoDiario() {
		long primeiroPeriodo = entrada.getTime() - pausaini.getTime();
		long segundoPeriodo = pausafim.getTime() - saida.getTime();
		long saldo = primeiroPeriodo + segundoPeriodo;
		this.saldo = saldo;
	}
}
