package com.sss.stdprt.service;

import org.springframework.stereotype.Service;

import com.sss.stdprt.beans.FacultyDto;
import com.sss.stdprt.domain.Faculty;
import com.sss.stdprt.repository.FacultyRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminService {
	private final FacultyRepository facultyRepository;
	
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
}
