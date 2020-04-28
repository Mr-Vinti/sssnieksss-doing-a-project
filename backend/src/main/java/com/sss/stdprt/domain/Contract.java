package com.sss.stdprt.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
	
	@Column(name="STD_ID")
	private Integer stdId;
	
	@Column(name="STDY_TYPE")
	private Integer stdyType;
}
