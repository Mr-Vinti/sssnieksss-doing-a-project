package com.sss.stdprt.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "dbo", name = "Group")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Group {
	
	@Id
	@Column(name="GRP_ID")
	private Integer grpId;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="SRS_ID")
	private Integer srsId;
}
