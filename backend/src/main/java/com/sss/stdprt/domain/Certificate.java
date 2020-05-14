package com.sss.stdprt.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.sss.stdprt.beans.CertificateDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "dbo", name = "Certificate")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Certificate {
	@Id
	@Column(name = "CERT_ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer certId;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "STD_ID")
	private Student student;

	@Column(name = "PRPSE")
	private String purpose;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "STA_ID")
	private CertificateStatus status;

	@Column(name = "SBM_AT")
	private Date submittedAt;

	@Column(name = "APRV_AT")
	private Date approvedAt;
	
	@Column(name = "CREAT_BY")
	private String createdBy;
	
	@Column(name = "CREAT_DT")
	private Date createdAt;
	
	@Column(name = "UPDT_BY")
	private String updatedBy;
	
	@Column(name = "UPDT_DT")
	private Date updatedAt;

	public static CertificateDto entityToDto(Certificate entity, boolean parent) {
		if (entity == null) {
			return null;
		}

		CertificateDto dto = new CertificateDto(entity.getCertId(),
				(parent ? Student.entityToDto(entity.getStudent(), true) : null), entity.getPurpose(),
				entity.getStatus().getStatus(), entity.getSubmittedAt(), entity.getApprovedAt());

		return dto;
	}
}
