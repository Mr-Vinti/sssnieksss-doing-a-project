package com.sss.stdprt.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
	@Column(name="CTR_ID")
	private Integer ctrId;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="STD_ID")
	private Student student;
	
	@Column(name="STDY_TYPE")
	private Integer stdyType;
	
	public static ContractDto entityToDto(Contract entity) {
		if (entity == null) {
			return null;
		}
		
		ContractDto dto = new ContractDto(entity.getCtrId(), Student.entityToDto(entity.getStudent()),
				entity.getStdyType());
		
		return dto;
	}
}
