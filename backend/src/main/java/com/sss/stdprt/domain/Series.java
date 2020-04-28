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
@Table(schema = "dbo", name = "Series")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Series {
	
	@Id
	@Column(name="SRS_ID")
	private Integer srsId;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="STDY_YR")
	private Integer stdyYr;
	
	@Column(name="DEPT_ID")
	private Integer deptId;
	
	@OneToMany
	@JoinColumn(name = "SRS_ID")
	private List<Group> groupList;
}
