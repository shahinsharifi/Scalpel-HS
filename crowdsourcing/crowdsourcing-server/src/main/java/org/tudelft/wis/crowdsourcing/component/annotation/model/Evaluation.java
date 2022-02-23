package org.tudelft.wis.crowdsourcing.component.annotation.model;

import javax.persistence.*;

@Entity
public class Evaluation {
    private int id;
    private String imageName;
    private String label;
    private Integer atypical;
    private String reason;
    private String reason2;
    private Integer wrongLabel;
    private Integer session_id;

    private Integer width;
    private Integer height;
    private Integer taskID;
    private String sId;
    private String studyId;
    private String pid;
    private Double elapsedTime;
    private Double instructionTimeEffort;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "image_name", nullable = true, length = 250)
    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    @Basic
    @Column(name = "label", nullable = true, length = 250)
    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    @Basic
    @Column(name = "atypical", nullable = true)
    public Integer getAtypical() {
        return atypical;
    }

    public void setAtypical(Integer atypical) {
        this.atypical = atypical;
    }

    @Basic
    @Column(name = "reason", nullable = true, length = -1)
    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    @Basic
    @Column(name = "reason2", nullable = true, length = -1)
    public String getReason2() {
        return reason2;
    }

    public void setReason2(String reason) {
        this.reason2 = reason;
    }

    @Basic
    @Column(name = "wrong_label", nullable = true)
    public Integer getWrongLabel() {
        return wrongLabel;
    }

    public void setWrongLabel(Integer wrongLabel) {
        this.wrongLabel = wrongLabel;
    }

    @Basic
    @Column(name = "session_id", nullable = true)
    public Integer getSession_id() {
        return session_id;
    }

    public void setSession_id(Integer session_id) {
        this.session_id = session_id;
    }

    @Transient
    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    @Transient
    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    @Transient
    public Integer getTaskID() {
        return taskID;
    }

    public void setTaskID(Integer taskID) {
        this.taskID = taskID;
    }

    @Transient
    public String getSid() {
        return sId;
    }

    public void setSid(String sessionId) {
        this.sId = sessionId;
    }

    @Transient
    public String getStudyId() {
        return studyId;
    }

    public void setStudyId(String studyId) {
        this.studyId = studyId;
    }

    @Transient
    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    @Transient
    public Double getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(Double elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    @Transient
    public Double getInstructionTimeEffort() {
        return instructionTimeEffort;
    }

    public void setInstructionTimeEffort(Double instructionTimeEffort) {
        this.instructionTimeEffort = instructionTimeEffort;
    }
}
