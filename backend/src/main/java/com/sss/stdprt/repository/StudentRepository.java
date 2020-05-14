package com.sss.stdprt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

	Student findByCnpIgnoreCaseAndGrpId(String cnp, Integer grpId);

	List<Student> findByGrpId(Integer grpId);

	Student findByUserName(String userName);

}
