package io.horacerta.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PostLoad;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import io.horacerta.util.Utils;


@Entity
@Table(name = "PontoDiario")
public class PontoDiario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date entrada;

	@Temporal(TemporalType.TIMESTAMP)
	private Date pausaini;

	@Temporal(TemporalType.TIMESTAMP)
	private Date pausafim;

	@Temporal(TemporalType.TIMESTAMP)
	// @Column(nullable=false)
	private Date saida;

	@Temporal(TemporalType.DATE)
	private Date dataRegistro = new Date();

	@ManyToOne()
	@JoinColumn(nullable=false) 
	private Pessoa pessoa;

	// Saldo em mlisegundos
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

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public Date getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(Date dataRegistro) {
		this.dataRegistro = dataRegistro;
	}


	public long getSaldo() {
		return saldo;
	}

	@PostLoad
	public void setSaldo() {
		if (entrada != null && pausaini != null && pausafim != null && saida != null) {
			long primeiroPeriodo = pausaini.getTime() - entrada.getTime();
			long segundoPeriodo = saida.getTime() - pausafim.getTime();
			long saldo = primeiroPeriodo + segundoPeriodo;
			this.saldo = (Utils.OITO_HORAS_EM_MILLISEGUNDOS - saldo)*(-1);
		}
	}
}
