package com.sss.stdprt.domain;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.sss.stdprt.beans.GroupDto;
import com.sss.stdprt.beans.StudentDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "dbo", name = "[Group]")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Group {

	@Id
	@Column(name = "GRP_ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer grpId;

	@Column(name = "NAME")
	private String name;

	@Column(name = "SRS_ID")
	private Integer srsId;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "SRS_ID", insertable = false, updatable = false)
	private Series series;

	@OneToMany
	@JoinColumn(name = "GRP_ID")
	private List<Student> studentList;

	@Column(name = "CREAT_BY")
	private String createdBy;

	@Column(name = "CREAT_DT")
	private Date createdAt;

	@Column(name = "UPDT_BY")
	private String updatedBy;

	@Column(name = "UPDT_DT")
	private Date updatedAt;

	public static GroupDto entityToDto(Group entity, boolean parent) {
		if (entity == null) {
			return null;
		}

		List<StudentDto> studentDtos = null;
		if (entity.getStudentList() != null) {
			studentDtos = entity.getStudentList().stream().map(ent -> Student.entityToDto(ent, false))
					.collect(Collectors.toList());
		}

		GroupDto dto = new GroupDto(entity.getGrpId(), entity.getName(),
				(parent ? Series.entityToDto(entity.getSeries(), true) : null), studentDtos);

		return dto;
	}
}
