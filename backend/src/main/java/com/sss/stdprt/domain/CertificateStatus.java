package com.sss.stdprt.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "dbo", name = "Certificate_Status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CertificateStatus {
	@Id
	@Column(name = "STA_ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer staId;

	@Column(name = "STA")
	private String status;
}
