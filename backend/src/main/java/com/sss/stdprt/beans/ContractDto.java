package com.sss.stdprt.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContractDto {
	private Integer ctrId;
	private StudentDto student;
	private Integer stdyType;
}
