package com.sss.stdprt.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sss.stdprt.beans.CourseDto;
import com.sss.stdprt.beans.DepartmentDto;
import com.sss.stdprt.beans.FacultyDto;
import com.sss.stdprt.beans.GroupDto;
import com.sss.stdprt.beans.SeriesDto;
import com.sss.stdprt.beans.StudentDto;
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
	
	@ApiOperation("Get Faculties Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/get-faculties")
	public ResponseEntity<List<FacultyDto>> getFaculties() {
		List<FacultyDto> faculties = adminService.getFaculties();
		
		return ResponseEntity.ok(faculties);
	}
	
	@ApiOperation("Add Department Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/add-department")
	public ResponseEntity<DepartmentDto> addDepartment(@RequestBody DepartmentDto department) {
		DepartmentDto newDeptDto = adminService.addDepartment(department);
		
		return ResponseEntity.ok(newDeptDto);
	}
	
	@ApiOperation("Get Departments Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/get-departments")
	public ResponseEntity<List<DepartmentDto>> getDepartments(@RequestBody Integer facId) {
		List<DepartmentDto> departments = adminService.getDepartments(facId);
		
		return ResponseEntity.ok(departments);
	}
	
	@ApiOperation("Add Series Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/add-series")
	public ResponseEntity<SeriesDto> addSeries(@RequestBody SeriesDto series) {
		SeriesDto newSeriesDto = adminService.addSeries(series);
		
		return ResponseEntity.ok(newSeriesDto);
	}
	
	@ApiOperation("Get Series Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/get-series")
	public ResponseEntity<List<SeriesDto>> getSeries(@RequestBody Integer deptId) {
		List<SeriesDto> series = adminService.getSeries(deptId);
		
		return ResponseEntity.ok(series);
	}

	@ApiOperation("Add Group Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/add-group")
	public ResponseEntity<GroupDto> addGroup(@RequestBody GroupDto group) {
		GroupDto newGroupDto = adminService.addGroup(group);
		
		return ResponseEntity.ok(newGroupDto);
	}

	@ApiOperation("Get Groups Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/get-groups")
	public ResponseEntity<List<GroupDto>> getGroups(@RequestBody Integer srsId) {
		List<GroupDto> groups = adminService.getGroups(srsId);
		
		return ResponseEntity.ok(groups);
	}

	@ApiOperation("Add Student Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/add-student")
	public ResponseEntity<StudentDto> addStudent(@RequestBody StudentDto student) {
		StudentDto newStudentDto = adminService.addStudent(student);
		
		return ResponseEntity.ok(newStudentDto);
	}

	@ApiOperation("Get Students Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/get-students")
	public ResponseEntity<List<StudentDto>> getStudents(@RequestBody Integer studId) {
		List<StudentDto> students = adminService.getStudents(studId);
		
		return ResponseEntity.ok(students);
	}

	@ApiOperation("Add Course Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/add-course")
	public ResponseEntity<CourseDto> addCourse(@RequestBody CourseDto course) {
		CourseDto newCourseDto = adminService.addCourse(course);
		
		return ResponseEntity.ok(newCourseDto);
	}

	@ApiOperation("Get Course Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
		@ApiResponse(code = 400, message = "Malformed request"),
		@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/admin/get-courses")
	public ResponseEntity<List<CourseDto>> getCourses(@RequestBody Integer crsId) {
		List<CourseDto> courses = adminService.getCourses(crsId);
		
		return ResponseEntity.ok(courses);
	}
}
