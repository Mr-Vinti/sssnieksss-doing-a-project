package com.sss.stdprt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.Certificate;

public interface CertificateRepository extends JpaRepository<Certificate, Integer> {

}
