package com.sss.stdprt.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.sss.stdprt.beans.CourseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "dbo", name = "Course")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Course {

	@Id
	@Column(name = "CRS_ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer crsId;

	@Column(name = "NAME")
	private String name;

	@Column(name = "SRS_ID")
	private Integer srsId;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "SRS_ID", insertable = false, updatable = false)
	private Series series;

	@Column(name = "CRDT_PTS")
	private Integer creditPoints;

	@Column(name = "TCHR")
	private String teacher;

	@Column(name = "SMSTR")
	private Integer semester;

	@Column(name = "STDY_YR")
	private Integer studyYear;

	public static CourseDto entityToDto(Course entity, boolean parent) {
		if (entity == null) {
			return null;
		}

		CourseDto dto = new CourseDto(entity.getCrsId(), entity.getName(),
				(parent ? Series.entityToDto(entity.getSeries(), true) : null), entity.getCreditPoints(),
				entity.getTeacher(), entity.getSemester(), entity.getStudyYear());

		return dto;
	}

}
