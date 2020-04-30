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
@Table(schema = "dbo", name = "Course")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Course {

    @Id
    @Column(name="CRS_ID", unique = true, nullable = false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer courseId;

    @Column(name="NAME")
    private String name;

    @Column(name="CRDT_PTS")
    private Integer creditPoints;

    @Column(name="TCHR")
    private String teacher;

    @Column(name="SMSTR")
    private Integer semester;

    @Column(name="STDY_YR")
    private Integer studyYear;

}
