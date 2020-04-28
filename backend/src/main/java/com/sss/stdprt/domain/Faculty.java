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
@Table(schema = "dbo", name = "Faculty")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Faculty {

	@Id
	@Column(name="FAC_ID")
	private Integer facId;
	
	@Column(name="NAME")
	private String name;
	
	@OneToMany
	@JoinColumn(name = "FAC_ID")
	private List<Department> departmentList;
}
