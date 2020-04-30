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
public class GroupDto {
	private Integer grpId;
	private String name;
	private SeriesDto series;
	private List<StudentDto> studentList;
}
