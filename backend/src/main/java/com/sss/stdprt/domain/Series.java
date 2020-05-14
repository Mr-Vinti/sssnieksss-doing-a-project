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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.sss.stdprt.beans.GroupDto;
import com.sss.stdprt.beans.SeriesDto;

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
	@Column(name = "SRS_ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer srsId;

	@Column(name = "NAME")
	private String name;

	@Column(name = "STDY_YR")
	private Integer stdyYr;

	@Column(name = "DEPT_ID")
	private Integer deptId;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "DEPT_ID", insertable = false, updatable = false)
	private Department dept;

	@OneToMany
	@JoinColumn(name = "SRS_ID")
	private List<Group> groupList;

	public static SeriesDto entityToDto(Series entity, boolean parent) {
		if (entity == null) {
			return null;
		}

		List<GroupDto> groupDtos = null;
		if (entity.getGroupList() != null) {
			groupDtos = entity.getGroupList().stream().map(ent -> Group.entityToDto(ent, false))
					.collect(Collectors.toList());
		}

		SeriesDto dto = new SeriesDto(entity.getSrsId(), entity.getName(), entity.getStdyYr(),
				(parent ? Department.entityToDto(entity.getDept(), true) : null), groupDtos);

		return dto;
	}
}
