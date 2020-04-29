package com.sss.stdprt.service;

import java.util.LinkedList;
import java.util.List;

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
			return new FacultyDto(faculty.getFacId(), faculty.getName(), faculty.getDepartmentList());
		}

		faculty = new Faculty();
		faculty.setName(name);

		Faculty newFaculty = facultyRepository.save(faculty);
		return new FacultyDto(newFaculty.getFacId(), newFaculty.getName(), newFaculty.getDepartmentList());
	}

	public List<FacultyDto> getFaculties() {
		List<Faculty> faculties = facultyRepository.findAll();

		List<FacultyDto> facultyDtos = new LinkedList<FacultyDto>();

		for (Faculty faculty : faculties) {
			facultyDtos.add(new FacultyDto(faculty.getFacId(), faculty.getName(), faculty.getDepartmentList()));
		}

		return facultyDtos;
	}

	public List<DepartmentDto> getDepartments() {
		List<Department> departments = departmentRepository.findAll();

		List<DepartmentDto> departmentDtos = new LinkedList<DepartmentDto>();

		for (Department department : departments) {
			List<SeriesDto> seriesDto = new LinkedList<SeriesDto>();
			for (Series series : department.getSeriesList()) {
				seriesDto.add(new SeriesDto());
			}
			departmentDtos.add(new DepartmentDto(department.getDeptId(), department.getName(),
					department.getFacId(), seriesDto));
		}

		return departmentDtos;
	}
}
