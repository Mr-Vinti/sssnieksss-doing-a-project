package com.sss.stdprt.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microsoft.azure.spring.autoconfigure.aad.UserPrincipal;
import com.sss.stdprt.beans.CertificateDto;
import com.sss.stdprt.beans.ContractDto;
import com.sss.stdprt.beans.CourseDto;
import com.sss.stdprt.beans.StudentDto;
import com.sss.stdprt.service.StudentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;

@RestController
@Api(tags = "Student Controller")
@AllArgsConstructor
public class StudentController {
	private StudentService studentService;

	@ApiOperation("Get Student Personal Data Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/student/get-personal-data")
	public ResponseEntity<StudentDto> getPersonalData(PreAuthenticatedAuthenticationToken auth) {
		String userId = ((UserPrincipal) auth.getPrincipal()).getClaims().get("preferred_username").toString()
				.split("@")[0];
		StudentDto student = studentService.getPersonalData(userId);

		return ResponseEntity.ok(student);
	}

	@ApiOperation("Get Student Courses Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/student/get-courses")
	public ResponseEntity<List<CourseDto>> getCourses(PreAuthenticatedAuthenticationToken auth) {
		String userId = ((UserPrincipal) auth.getPrincipal()).getClaims().get("preferred_username").toString()
				.split("@")[0];
		List<CourseDto> courses = studentService.getCourses(userId);

		return ResponseEntity.ok(courses);
	}

	@ApiOperation("Get Student Contracts Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/student/get-contracts")
	public ResponseEntity<List<ContractDto>> getContracts(PreAuthenticatedAuthenticationToken auth) {
		String userId = ((UserPrincipal) auth.getPrincipal()).getClaims().get("preferred_username").toString()
				.split("@")[0];
		List<ContractDto> contracts = studentService.getContracts(userId);

		return ResponseEntity.ok(contracts);
	}

	@ApiOperation("Get Student Certificates Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/student/get-certificates")
	public ResponseEntity<List<CertificateDto>> getCertificates(PreAuthenticatedAuthenticationToken auth) {
		String userId = ((UserPrincipal) auth.getPrincipal()).getClaims().get("preferred_username").toString()
				.split("@")[0];
		List<CertificateDto> certificates = studentService.getCertificates(userId);

		return ResponseEntity.ok(certificates);
	}

	@ApiOperation("Get Student Certificates Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/student/request-certificate")
	public ResponseEntity<CertificateDto> requestCertificate(@RequestBody String purpose,
			PreAuthenticatedAuthenticationToken auth) {
		String email = ((UserPrincipal) auth.getPrincipal()).getClaims().get("preferred_username").toString();
		String userId = email.split("@")[0];
		CertificateDto certificate = studentService.requestCertificate(purpose, email, userId);

		return ResponseEntity.ok(certificate);
	}
}
