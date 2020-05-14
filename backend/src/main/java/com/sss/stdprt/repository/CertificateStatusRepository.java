package com.sss.stdprt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.CertificateStatus;

public interface CertificateStatusRepository extends JpaRepository<CertificateStatus, Integer> {

}
