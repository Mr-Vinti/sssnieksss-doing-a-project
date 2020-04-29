package com.sss.stdprt.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sss.stdprt.beans.FacultyDto;
import com.sss.stdprt.service.AdminService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;

@RestController
@Api(tags = "Admin Controller")
@AllArgsConstructor
public class AdminController {
	private final AdminService adminService;

	@ApiOperation("Add Faculty Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/add-faculty")
	public ResponseEntity<FacultyDto> addFaculty(@RequestBody String name) {
		FacultyDto facultyDto = adminService.addFaculty(name);
		
		return ResponseEntity.ok(facultyDto);
	}
	
	@PostMapping("/admin/get-faculties")
	public ResponseEntity<List<FacultyDto>> getFaculties() {
		List<FacultyDto> faculties = adminService.getFaculties();
		
		return ResponseEntity.ok(faculties);
	}
}