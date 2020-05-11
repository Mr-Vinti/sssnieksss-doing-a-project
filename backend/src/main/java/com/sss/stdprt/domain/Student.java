package com.sss.stdprt.domain;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.sss.stdprt.beans.ContractDto;
import com.sss.stdprt.beans.StudentDto;


@Entity
@Table(schema = "dbo", name = "Student")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    @Id
    @Column(name="STD_ID", unique = true, nullable = false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer stdId;

    @Column(name="FRSTNAM")
    private String firstName;

    @Column(name="LSTNAM")
    private String lastName;

    @Column(name="USRNAM")
    private String userName;

    @Column(name="FTHR_INIT")
    private String fatherInitial;

    @Column(name="CNP")
    private String cnp;

    @Column(name="PHN_NBR")
    private String phoneNumber;

    @Column(name="EMAIL")
    private String email;
    
    @Column(name="GRP_ID")
    private Integer grpId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="GRP_ID", insertable = false, updatable = false)
    private Group group;

    @Column(name="STDY_YR")
    private Integer studyYear;

    @OneToMany
    @JoinColumn(name = "STD_ID")
    private List<Contract> contractList;

    public static StudentDto entityToDto(Student entity, boolean parent) {
    	if (entity == null) {
			return null;
		}
    	
    	List<ContractDto> contractDtos = null;
    	if (entity.getContractList() != null) {
    		contractDtos = entity.getContractList().stream().map(ent -> Contract.entityToDto(ent, false)).collect(Collectors.toList());
    	}
    	
    	StudentDto dto = new StudentDto(entity.getStdId(), entity.getFirstName(), entity.getLastName(),
    			entity.getUserName(), entity.getFatherInitial(), entity.getCnp(), entity.getPhoneNumber(),
    			entity.getEmail(), (parent ? Group.entityToDto(entity.getGroup(), true) : null),
    			entity.getStudyYear(), contractDtos);
		
		return dto;
	}
}
