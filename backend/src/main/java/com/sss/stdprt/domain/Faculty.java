package com.sss.stdprt.domain;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sss.stdprt.beans.DepartmentDto;
import com.sss.stdprt.beans.FacultyDto;

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
	@Column(name = "FAC_ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer facId;

	@Column(name = "NAME")
	private String name;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "faculty")
	private List<Department> departmentList;

	public static FacultyDto entityToDto(Faculty entity, boolean parent) {
		if (entity == null) {
			return null;
		}

		List<DepartmentDto> departmentDtos = null;
		if (entity.getDepartmentList() != null && parent) {
			departmentDtos = entity.getDepartmentList().stream().map(ent -> Department.entityToDto(ent, false))
					.collect(Collectors.toList());
		}

		FacultyDto dto = new FacultyDto(entity.getFacId(), entity.getName(), departmentDtos);

		return dto;
	}
}
