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
public class SeriesDto {
	private Integer srsId;
	private String name;
	private Integer stdyYr;
	private DepartmentDto dept;
	private List<GroupDto> groupList;
}
