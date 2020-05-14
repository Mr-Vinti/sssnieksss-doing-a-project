package com.sss.stdprt.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sss.stdprt.beans.CourseDto;
import com.sss.stdprt.beans.DepartmentDto;
import com.sss.stdprt.beans.FacultyDto;
import com.sss.stdprt.beans.GroupDto;
import com.sss.stdprt.beans.SeriesDto;
import com.sss.stdprt.beans.StudentDto;
import com.sss.stdprt.domain.Course;
import com.sss.stdprt.domain.Department;
import com.sss.stdprt.domain.Faculty;
import com.sss.stdprt.domain.Group;
import com.sss.stdprt.domain.Series;
import com.sss.stdprt.domain.Student;
import com.sss.stdprt.repository.CourseRepository;
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
	private final CourseRepository courseRepository;

	public FacultyDto addFaculty(String name, String adminId) {
		Faculty faculty = facultyRepository.findByNameIgnoreCase(name);

		if (faculty != null) {
			return Faculty.entityToDto(faculty, true);
		}

		faculty = new Faculty();
		faculty.setName(name);
		faculty.setCreatedAt(new Date());
		faculty.setCreatedBy(adminId);
		faculty.setUpdatedAt(new Date());
		faculty.setUpdatedBy(adminId);

		Faculty newFaculty = facultyRepository.save(faculty);
		return Faculty.entityToDto(newFaculty, true);
	}

	public List<FacultyDto> getFaculties() {
		List<Faculty> faculties = facultyRepository.findAll();

		List<FacultyDto> facultyDtos = faculties.stream().map(ent -> Faculty.entityToDto(ent, true))
				.collect(Collectors.toList());

		return facultyDtos;
	}

	public String updateFaculty(FacultyDto faculty, String adminId) {
		Faculty newFaculty = facultyRepository.findByNameIgnoreCase(faculty.getName());

		if (newFaculty != null) {
			return "Faculty already exists";
		}

		Optional<Faculty> facOpt = facultyRepository.findById(faculty.getFacId());

		if (facOpt.isPresent()) {
			Faculty fac = facOpt.get();

			fac.setName(faculty.getName());
			fac.setUpdatedAt(new Date());
			fac.setUpdatedBy(adminId);

			facultyRepository.save(fac);

			return "Success";
		}

		return "Fail";
	}

	public String deleteFaculty(Integer facId) {
		Optional<Faculty> facOpt = facultyRepository.findById(facId);

		if (facOpt.isPresent()) {
			Faculty fac = facOpt.get();

			facultyRepository.delete(fac);

			return "Success";
		}

		return "Fail";
	}

	public DepartmentDto addDepartment(DepartmentDto deptDto, String adminId) {
		Department department = departmentRepository.findByNameIgnoreCaseAndFacId(deptDto.getName(),
				deptDto.getFaculty().getFacId());

		if (department != null) {
			return Department.entityToDto(department, true);
		}

		department = new Department();
		department.setName(deptDto.getName());
		department.setFacId(deptDto.getFaculty().getFacId());
		department.setCreatedAt(new Date());
		department.setCreatedBy(adminId);
		department.setUpdatedAt(new Date());
		department.setUpdatedBy(adminId);

		Department newDepartment = departmentRepository.save(department);

		return Department.entityToDto(newDepartment, true);
	}

	public List<DepartmentDto> getDepartments(Integer facId) {
		List<Department> departments = departmentRepository.findByFacId(facId);

		List<DepartmentDto> departmentDtos = departments.stream().map(ent -> Department.entityToDto(ent, true))
				.collect(Collectors.toList());

		return departmentDtos;
	}

	public String updateDepartment(DepartmentDto department, String adminId) {
		Department newDepartment = departmentRepository.findByNameIgnoreCaseAndFacId(department.getName(),
				department.getFaculty().getFacId());

		if (newDepartment != null) {
			return "Department already exists at this faculty.";
		}

		Optional<Department> deptOpt = departmentRepository.findById(department.getDeptId());

		if (deptOpt.isPresent()) {
			Department dept = deptOpt.get();

			dept.setName(department.getName());
			dept.setUpdatedAt(new Date());
			dept.setUpdatedBy(adminId);

			departmentRepository.save(dept);

			return "Success";
		}

		return "Fail";
	}

	public String deleteDepartment(Integer deptId) {
		Optional<Department> deptOpt = departmentRepository.findById(deptId);

		if (deptOpt.isPresent()) {
			Department dept = deptOpt.get();

			departmentRepository.delete(dept);

			return "Success";
		}

		return "Fail";
	}

	public SeriesDto addSeries(SeriesDto seriesDto, String adminId) {
		Series series = seriesRepository.findByNameIgnoreCaseAndDeptIdAndStdyYr(seriesDto.getName(),
				seriesDto.getDept().getDeptId(), seriesDto.getStdyYr());

		if (series != null) {
			return Series.entityToDto(series, false);
		}

		series = new Series();
		series.setName(seriesDto.getName());
		series.setDeptId(seriesDto.getDept().getDeptId());
		series.setStdyYr(seriesDto.getStdyYr());
		series.setCreatedAt(new Date());
		series.setCreatedBy(adminId);
		series.setUpdatedAt(new Date());
		series.setUpdatedBy(adminId);

		Series newSeries = seriesRepository.save(series);
		return Series.entityToDto(newSeries, false);
	}

	public List<SeriesDto> getSeries(Integer deptId) {
		List<Series> series = seriesRepository.findByDeptId(deptId);

		List<SeriesDto> seriesDtos = series.stream().map(ent -> Series.entityToDto(ent, true))
				.collect(Collectors.toList());

		return seriesDtos;
	}

	public String updateSeries(SeriesDto series, String adminId) {
		Series newSeries = seriesRepository.findByNameIgnoreCaseAndDeptIdAndStdyYr(series.getName(),
				series.getDept().getDeptId(), series.getStdyYr());

		if (newSeries != null) {
			return "Series for the study year " + series.getStdyYr() + " already exists in this department.";
		}

		Optional<Series> seriesOpt = seriesRepository.findById(series.getSrsId());

		if (seriesOpt.isPresent()) {
			Series srs = seriesOpt.get();

			srs.setName(series.getName());
			srs.setStdyYr(series.getStdyYr());
			srs.setUpdatedAt(new Date());
			srs.setUpdatedBy(adminId);

			seriesRepository.save(srs);

			return "Success";
		}

		return "Fail";
	}

	public String deleteSeries(Integer seriestId) {
		Optional<Series> seriesOpt = seriesRepository.findById(seriestId);

		if (seriesOpt.isPresent()) {
			Series series = seriesOpt.get();

			seriesRepository.delete(series);

			return "Success";
		}

		return "Fail";
	}

	public GroupDto addGroup(GroupDto groupDto, String adminId) {
		Group group = groupRepository.findByNameIgnoreCaseAndSrsId(groupDto.getName(), groupDto.getSeries().getSrsId());

		if (group != null) {
			return Group.entityToDto(group, false);
		}

		group = new Group();
		group.setName(groupDto.getName());
		group.setSrsId(groupDto.getSeries().getSrsId());
		group.setCreatedAt(new Date());
		group.setCreatedBy(adminId);
		group.setUpdatedAt(new Date());
		group.setUpdatedBy(adminId);

		Group newGroup = groupRepository.save(group);
		return Group.entityToDto(newGroup, false);
	}

	public List<GroupDto> getGroups(Integer srsId) {
		List<Group> groups = groupRepository.findBySrsId(srsId);

		List<GroupDto> groupDtos = groups.stream().map(ent -> Group.entityToDto(ent, true))
				.collect(Collectors.toList());

		return groupDtos;
	}

	public String updateGroup(GroupDto group, String adminId) {
		Group newGroup = groupRepository.findByNameIgnoreCaseAndSrsId(group.getName(), group.getSeries().getSrsId());

		if (newGroup != null) {
			return "Group already exists in the series " + group.getSeries().getStdyYr() + group.getSeries().getName();
		}

		Optional<Group> groupOpt = groupRepository.findById(group.getGrpId());

		if (groupOpt.isPresent()) {
			Group grp = groupOpt.get();

			grp.setName(group.getName());
			grp.setUpdatedAt(new Date());
			grp.setUpdatedBy(adminId);

			groupRepository.save(grp);

			return "Success";
		}

		return "Fail";
	}

	public String deleteGroup(Integer grpId) {
		Optional<Group> grpOpt = groupRepository.findById(grpId);

		if (grpOpt.isPresent()) {
			Group grp = grpOpt.get();

			groupRepository.delete(grp);

			return "Success";
		}

		return "Fail";
	}

	public StudentDto addStudent(StudentDto studentDto, String adminId) {
		Student student = studentRepository.findByCnpIgnoreCaseAndGrpId(studentDto.getCnp(),
				studentDto.getGroup().getGrpId());

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
		student.setCreatedAt(new Date());
		student.setCreatedBy(adminId);
		student.setUpdatedAt(new Date());
		student.setUpdatedBy(adminId);

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

		List<StudentDto> studentDtos = students.stream().map(ent -> Student.entityToDto(ent, true))
				.collect(Collectors.toList());

		return studentDtos;
	}

	public String updateStudent(StudentDto student, String adminId) {
		Optional<Student> studentOpt = studentRepository.findById(student.getStdId());

		if (studentOpt.isPresent()) {
			Student std = studentOpt.get();

			if (!student.getUserName().equals(std.getUserName())) {
				if (studentRepository.findByUserName(student.getUserName()) != null) {
					return "Student with that username already exists.";
				}
				std.setUserName(student.getUserName());
				std.setEmail(student.getUserName().concat("@ipsssnieksss.onmicrosoft.com"));
			}

			std.setCnp(student.getCnp());
			std.setFatherInitial(student.getFatherInitial());
			std.setFirstName(student.getFirstName());
			std.setLastName(student.getLastName());
			std.setPhoneNumber(student.getPhoneNumber());
			std.setUpdatedAt(new Date());
			std.setUpdatedBy(adminId);

			studentRepository.save(std);

			return "Success";
		}

		return "Fail";
	}

	public String deleteStudent(Integer stdId) {
		Optional<Student> stdOpt = studentRepository.findById(stdId);

		if (stdOpt.isPresent()) {
			Student std = stdOpt.get();

			studentRepository.delete(std);

			return "Success";
		}

		return "Fail";
	}

	public CourseDto addCourse(CourseDto courseDto, String adminId) {
		Course course = courseRepository.findByNameIgnoreCaseAndSrsId(courseDto.getName(),
				courseDto.getSeries().getSrsId());

		if (course != null) {
			CourseDto courseExistsDto = Course.entityToDto(course, false);
			courseExistsDto.setName(null);
			return courseExistsDto;
		}

		course = new Course();
		course.setName(courseDto.getName());
		course.setSrsId(courseDto.getSeries().getSrsId());
		course.setTeacher(courseDto.getTeacher());
		course.setSemester(courseDto.getSemester());
		course.setCreditPoints(courseDto.getCreditPoints());
		course.setStudyYear(courseDto.getStudyYear());
		course.setCreatedAt(new Date());
		course.setCreatedBy(adminId);
		course.setUpdatedAt(new Date());
		course.setUpdatedBy(adminId);

		Course newGroup = courseRepository.save(course);
		return Course.entityToDto(newGroup, false);
	}

	public List<CourseDto> getCourses(Integer crsId) {
		List<Course> courses = courseRepository.findBySrsId(crsId);

		List<CourseDto> courseDtos = courses.stream().map(ent -> Course.entityToDto(ent, true))
				.collect(Collectors.toList());

		return courseDtos;
	}

	public String updateCourse(CourseDto course, String adminId) {
		Course newCourse = courseRepository.findByNameIgnoreCaseAndSrsId(course.getName(),
				course.getSeries().getSrsId());

		if (newCourse != null) {
			return "Course already exists for the series " + course.getStudyYear() + course.getSeries().getName();
		}

		Optional<Course> courseOpt = courseRepository.findById(course.getCrsId());

		if (courseOpt.isPresent()) {
			Course crs = courseOpt.get();

			crs.setName(course.getName());
			crs.setCreditPoints(course.getCreditPoints());
			crs.setSemester(course.getSemester());
			crs.setTeacher(course.getTeacher());
			crs.setUpdatedAt(new Date());
			crs.setUpdatedBy(adminId);

			courseRepository.save(crs);

			return "Success";
		}

		return "Fail";
	}

	public String deleteCourse(Integer crsId) {
		Optional<Course> crsOpt = courseRepository.findById(crsId);

		if (crsOpt.isPresent()) {
			Course crs = crsOpt.get();

			courseRepository.delete(crs);

			return "Success";
		}

		return "Fail";
	}
}
