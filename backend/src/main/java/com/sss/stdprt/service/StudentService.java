package com.sss.stdprt.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sss.stdprt.beans.CertificateDto;
import com.sss.stdprt.beans.ContractDto;
import com.sss.stdprt.beans.CourseDto;
import com.sss.stdprt.beans.StudentDto;
import com.sss.stdprt.domain.Certificate;
import com.sss.stdprt.domain.Contract;
import com.sss.stdprt.domain.Course;
import com.sss.stdprt.domain.Student;
import com.sss.stdprt.repository.CertificateRepository;
import com.sss.stdprt.repository.CertificateStatusRepository;
import com.sss.stdprt.repository.CourseRepository;
import com.sss.stdprt.repository.StudentRepository;
import com.sss.stdprt.util.Constants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudentService {
	private StudentRepository studentRepository;
	private CourseRepository courseRepository;
	private CertificateRepository certificateRepository;
	private CertificateStatusRepository certificateStatusRepository;

	public StudentDto getPersonalData(String userId) {
		Student stud = studentRepository.findByUserName(userId);

		if (stud != null) {
			return Student.entityToDto(stud, true);
		}
		return new StudentDto();
	}

	public List<CourseDto> getCourses(String userId) {
		Student stud = studentRepository.findByUserName(userId);

		if (stud != null) {
			List<Course> courses = courseRepository.findBySrsId(stud.getGroup().getSrsId());
			return courses.stream().map(ent -> Course.entityToDto(ent, true)).collect(Collectors.toList());
		}
		return new ArrayList<>();
	}

	public List<ContractDto> getContracts(String userId) {
		Student stud = studentRepository.findByUserName(userId);

		if (stud != null) {
			return stud.getContractList().stream().map(ent -> Contract.entityToDto(ent, true))
					.collect(Collectors.toList());
		}
		return new ArrayList<>();
	}

	public List<CertificateDto> getCertificates(String userId) {
		Student stud = studentRepository.findByUserName(userId);

		if (stud != null) {
			List<Certificate> certificates = certificateRepository.findByStudent(stud);
			return certificates.stream().map(ent -> Certificate.entityToDto(ent, true)).collect(Collectors.toList());
		}
		return new ArrayList<>();
	}

	public CertificateDto requestCertificate(String purpose, String email, String userId) {
		Student stud = studentRepository.findByUserName(userId);

		Certificate cert = new Certificate();
		cert.setPurpose(purpose);
		cert.setStudent(stud);
		cert.setStatus(certificateStatusRepository.getOne(Constants.PENDING_CERT_ID));
		cert.setSubmittedAt(new Date());
		cert.setCreatedAt(new Date());
		cert.setCreatedBy(email);
		cert.setUpdatedAt(new Date());
		cert.setUpdatedBy(email);

		Certificate newCert = certificateRepository.save(cert);
		return Certificate.entityToDto(newCert, true);
	}
}
