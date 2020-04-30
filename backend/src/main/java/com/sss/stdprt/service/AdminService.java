package com.sss.stdprt.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sss.stdprt.beans.DepartmentDto;
import com.sss.stdprt.beans.FacultyDto;
import com.sss.stdprt.beans.SeriesDto;
import com.sss.stdprt.domain.Department;
import com.sss.stdprt.domain.Faculty;
import com.sss.stdprt.domain.Series;
import com.sss.stdprt.repository.DepartmentRepository;
import com.sss.stdprt.repository.FacultyRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminService {
	private final FacultyRepository facultyRepository;
	private final DepartmentRepository departmentRepository;

	public FacultyDto addFaculty(String name) {
		Faculty faculty = facultyRepository.findByNameIgnoreCase(name);

		if (faculty != null) {
			return Faculty.entityToDto(faculty, true);
		}

		faculty = new Faculty();
		faculty.setName(name);

		Faculty newFaculty = facultyRepository.save(faculty);
		return Faculty.entityToDto(newFaculty, true);
	}

	public List<FacultyDto> getFaculties() {
		List<Faculty> faculties = facultyRepository.findAll();

		List<FacultyDto> facultyDtos = faculties.stream().map(ent -> Faculty.entityToDto(ent, true)).collect(Collectors.toList());

		return facultyDtos;
	}

	public DepartmentDto addDepartment(DepartmentDto dept) {
		Department department = departmentRepository.findByNameIgnoreCaseAndFacId(dept.getName(), dept.getFaculty().getFacId());
		
		if (department != null) {
			return Department.entityToDto(department, true);
		}
		
		department = new Department();
		department.setName(dept.getName());
		department.setFacId(dept.getFaculty().getFacId());
		
		Department newDepartment = departmentRepository.save(department);
		
		return Department.entityToDto(newDepartment, true);
	}

	public List<DepartmentDto> getDepartments() {
		List<Department> departments = departmentRepository.findAll();

		List<DepartmentDto> departmentDtos = departments.stream().map(ent -> Department.entityToDto(ent, true)).collect(Collectors.toList());

		return departmentDtos;
	}
}
