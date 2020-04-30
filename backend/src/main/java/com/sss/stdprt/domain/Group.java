package com.sss.stdprt.domain;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.sss.stdprt.beans.GroupDto;

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
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="SRS_ID")
	private Series series;
	
	@OneToMany
	@JoinColumn(name = "GRP_ID")
	private List<Student> studentList;
	
	public static GroupDto entityToDto(Group entity) {
		if (entity == null) {
			return null;
		}
		
		GroupDto dto = new GroupDto(entity.getGrpId(), entity.getName(),
				Series.entityToDto(entity.getSeries()),
				entity.getStudentList().stream().map(Student::entityToDto).collect(Collectors.toList()));
		
		return dto;
	}
}
