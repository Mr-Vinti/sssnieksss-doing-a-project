package com.sss.stdprt.beans;

import java.util.List;

import com.sss.stdprt.domain.Department;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacultyDto {
	private Integer facId;
	private String name;
	private List<Department> departmentList;
}
