package com.sss.stdprt.domain;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sss.stdprt.beans.DepartmentDto;
import com.sss.stdprt.beans.SeriesDto;

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
	@Column(name="DEPT_ID", unique = true, nullable = false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer deptId;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="FAC_ID")
	private Integer facId;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="FAC_ID", insertable = false, updatable = false)
	private Faculty faculty;
	
	@OneToMany
	@JoinColumn(name = "DEPT_ID")
	private List<Series> seriesList;
	
	public static DepartmentDto entityToDto(Department entity, boolean parent) {
		if (entity == null) {
			return null;
		}
		
		List<SeriesDto> seriesDtos = null;
		if (entity.getSeriesList() != null) {
			seriesDtos = entity.getSeriesList().stream().map(Series::entityToDto).collect(Collectors.toList());
		}
		
		DepartmentDto dto = new DepartmentDto(entity.getDeptId(), entity.getName(),
				(parent ? Faculty.entityToDto(entity.getFaculty(), false) : null), seriesDtos);
		
		return dto;
	}
}
