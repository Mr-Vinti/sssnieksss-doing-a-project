package com.sss.stdprt.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

	@Column(name = "STD_ID")
	private Integer stdId;

	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "STD_ID", insertable = false, updatable = false)
	private Student student;

	@Column(name = "STDY_TYPE")
	private String stdyType;

	@Column(name = "STDY_YR")
	private Integer stdyYr;

	@Column(name = "YEAR")
	private Integer year;

	@Column(name = "CREAT_BY")
	private String createdBy;

	@Column(name = "CREAT_DT")
	private Date createdAt;

	@Column(name = "UPDT_BY")
	private String updatedBy;

	@Column(name = "UPDT_DT")
	private Date updatedAt;

	public static ContractDto entityToDto(Contract entity, boolean parent) {
		if (entity == null) {
			return null;
		}

		ContractDto dto = new ContractDto(entity.getCtrId(),
				(parent ? Student.entityToDto(entity.getStudent(), true) : null), entity.getStdyType(),
				entity.getStdyYr(), entity.getYear());

		return dto;
	}
}
