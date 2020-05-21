package com.sss.stdprt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.Certificate;
import com.sss.stdprt.domain.Student;

public interface CertificateRepository extends JpaRepository<Certificate, Integer> {

	List<Certificate> findByStudent(Student student);

}
