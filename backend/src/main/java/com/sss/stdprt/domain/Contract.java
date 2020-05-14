package com.sss.stdprt.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.sss.stdprt.beans.ContractDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "dbo", name = "Contract")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contract {

	@Id
	@Column(name = "CTR_ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ctrId;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "STD_ID")
	private Student student;

	@Column(name = "STDY_TYPE")
	private Integer stdyType;

	public static ContractDto entityToDto(Contract entity, boolean parent) {
		if (entity == null) {
			return null;
		}

		ContractDto dto = new ContractDto(entity.getCtrId(),
				(parent ? Student.entityToDto(entity.getStudent(), true) : null), entity.getStdyType());

		return dto;
	}
}
