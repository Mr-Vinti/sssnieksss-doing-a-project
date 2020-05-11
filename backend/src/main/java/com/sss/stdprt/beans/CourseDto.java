package com.sss.stdprt.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
	private Integer crsId;
	private String name;
	private SeriesDto series;
	private Integer creditPoints;
	private String teacher;
	private Integer semester;
	private Integer studyYear;
}
