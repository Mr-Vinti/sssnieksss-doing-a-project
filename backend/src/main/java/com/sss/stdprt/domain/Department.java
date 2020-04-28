package com.sss.stdprt.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "dbo", name = "Department")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Department {
	
	@Id
	@Column(name="DEPT_ID")
	private Integer deptId;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="FAC_ID")
	private Integer facId;
	
	@OneToMany
	@JoinColumn(name = "DEPT_ID")
	private List<Series> seriesList;
}
