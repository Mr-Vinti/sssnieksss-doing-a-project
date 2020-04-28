package com.sss.stdprt.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(schema = "dbo", name = "Student")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    @Id
    @Column(name="STD_ID")
    private Integer studentId;

    @Column(name="FRSTNAM")
    private String firstName;

    @Column(name="LSTNAM")
    private String lastName;

    @Column(name="USRNAM")
    private String userName;

    @Column(name="FTHR_INIT")
    private String fatherInitial;

    @Column(name="CNP")
    private String CNP;

    @Column(name="PHN_NBR")
    private String phoneNumber;

    @Column(name="EMAIL")
    private String email;

    @Column(name="GRP_ID")
    private Integer groupId;

    @Column(name="STDY_YR")
    private Integer studyYear;

    @OneToMany
    @JoinColumn(name = "STD_ID")
    private List<Contract> contractIds;

}
