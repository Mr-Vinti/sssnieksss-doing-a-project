package com.sss.stdprt.beans;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CertificateDto {
	private Integer certId;
	private StudentDto student;
	private String purpose;
	private String status;
	private Date submittedAt;
	private Date approvedAt;
}
