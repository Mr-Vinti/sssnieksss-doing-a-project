package com.sss.stdprt.service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sss.stdprt.beans.DepartmentDto;
import com.sss.stdprt.beans.FacultyDto;
import com.sss.stdprt.beans.GroupDto;
import com.sss.stdprt.beans.SeriesDto;
import com.sss.stdprt.beans.StudentDto;
import com.sss.stdprt.domain.Department;
import com.sss.stdprt.domain.Faculty;
import com.sss.stdprt.domain.Group;
import com.sss.stdprt.domain.Series;
import com.sss.stdprt.domain.Student;
import com.sss.stdprt.repository.DepartmentRepository;
import com.sss.stdprt.repository.FacultyRepository;
import com.sss.stdprt.repository.GroupRepository;
import com.sss.stdprt.repository.SeriesRepository;
import com.sss.stdprt.repository.StudentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminService {
	private final FacultyRepository facultyRepository;
	private final DepartmentRepository departmentRepository;
	private final SeriesRepository seriesRepository;
	private final GroupRepository groupRepository;
	private final StudentRepository studentRepository;

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

	public DepartmentDto addDepartment(DepartmentDto deptDto) {
		Department department = departmentRepository.findByNameIgnoreCaseAndFacId(
				deptDto.getName(), deptDto.getFaculty().getFacId());
		
		if (department != null) {
			return Department.entityToDto(department, true);
		}
		
		department = new Department();
		department.setName(deptDto.getName());
		department.setFacId(deptDto.getFaculty().getFacId());
		
		Department newDepartment = departmentRepository.save(department);
		
		return Department.entityToDto(newDepartment, true);
	}

	public List<DepartmentDto> getDepartments(Integer facId) {
		List<Department> departments = departmentRepository.findByFacId(facId);

		List<DepartmentDto> departmentDtos = departments.stream().map(ent -> Department.entityToDto(ent, true)).collect(Collectors.toList());

		return departmentDtos;
	}

	public SeriesDto addSeries(SeriesDto seriesDto) {
		Series series = seriesRepository.findByNameIgnoreCaseAndDeptIdAndStdyYr(seriesDto.getName(), seriesDto.getDept().getDeptId(),
				seriesDto.getStdyYr());
		
		if (series != null) {
			return Series.entityToDto(series, false);
		}
		
		series = new Series();
		series.setName(seriesDto.getName());
		series.setDeptId(seriesDto.getDept().getDeptId());
		series.setStdyYr(seriesDto.getStdyYr());
		
		Series newSeries = seriesRepository.save(series);
		return Series.entityToDto(newSeries, false);
	}

	public List<SeriesDto> getSeries(Integer deptId) {
		List<Series> series = seriesRepository.findByDeptId(deptId);

		List<SeriesDto> seriesDtos = series.stream().map(ent -> Series.entityToDto(ent, true)).collect(Collectors.toList());

		return seriesDtos;
	}
	
	public GroupDto addGroup(GroupDto groupDto) {
		Group group = groupRepository.findByNameIgnoreCaseAndSrsId(groupDto.getName(), groupDto.getSeries().getSrsId());
		
		if (group != null) {
			return Group.entityToDto(group, false);
		}
		
		group = new Group();
		group.setName(groupDto.getName());
		group.setSrsId(groupDto.getSeries().getSrsId());
		
		Group newGroup = groupRepository.save(group);
		return Group.entityToDto(newGroup, false);
	}

	public List<GroupDto> getGroups(Integer srsId) {
		List<Group> groups = groupRepository.findBySrsId(srsId);

		List<GroupDto> groupDtos = groups.stream().map(ent -> Group.entityToDto(ent, true)).collect(Collectors.toList());

		return groupDtos;
	}

	public StudentDto addStudent(StudentDto studentDto) {
		Student student = studentRepository.findByCnpIgnoreCaseAndGrpId(studentDto.getCnp(), studentDto.getGroup().getGrpId());
		
		if (student != null) {
			return Student.entityToDto(student, false);
		}
		
		student = new Student();
		student.setFirstName(studentDto.getFirstName());
		student.setLastName(studentDto.getLastName());
		student.setFatherInitial(studentDto.getFatherInitial());
		student.setCnp(studentDto.getCnp());
		student.setPhoneNumber(studentDto.getPhoneNumber());
		student.setStudyYear(studentDto.getStudyYear());
		student.setGrpId(studentDto.getGroup().getGrpId());
		
		String userName = findValidUsername(studentDto);
		student.setUserName(userName);
		student.setEmail(userName.concat("@ipsssnieksss.onmicrosoft.com"));
		
		Student newStudent = studentRepository.save(student);
		return Student.entityToDto(newStudent, false);
	}

	private String findValidUsername(StudentDto studentDto) {
		String firstName = studentDto.getFirstName().toLowerCase();
		String lastName = studentDto.getLastName().toLowerCase();
		
		String[] firstNames = firstName.split("-");
		for (String name : firstNames) {
			String user = name.concat(".").concat(lastName);
			Student student = studentRepository.findByUserName(user);
			if (student == null) {
				return user;
			}
		}
		
		String user = firstNames[0].concat(".").concat(lastName);
		Random random = new Random();
		while (true) {
			Integer randId = random.nextInt(10000);
			String randUser = user.concat(String.format("%04d", randId));
			Student student = studentRepository.findByUserName(randUser);
			if (student == null) {
				return randUser;
			}
		}
	}

	public List<StudentDto> getStudents(Integer grpId) {
		List<Student> students = studentRepository.findByGrpId(grpId);

		List<StudentDto> studentDtos = students.stream().map(ent -> Student.entityToDto(ent, true)).collect(Collectors.toList());

		return studentDtos;
	}

}
