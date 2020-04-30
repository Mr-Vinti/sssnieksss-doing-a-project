package com.sss.stdprt.beans;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDto {
	private Integer deptId;
	private String name;
	private FacultyDto faculty;
	private List<SeriesDto> seriesList;
}
