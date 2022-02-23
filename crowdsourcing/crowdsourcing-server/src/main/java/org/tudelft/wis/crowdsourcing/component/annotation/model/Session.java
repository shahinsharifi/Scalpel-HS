package org.tudelft.wis.crowdsourcing.component.annotation.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "session", schema = "public", catalog = "scene_recognition")
public class Session {
    private int id;
    private String browserName;
    private String browserVersion;
    private String operatingSystem;
    private String ipAddress;
    private Timestamp creationDate;
    private Integer width;
    private Integer height;
    private Integer taskID;
    private String sessionId;
    private String studyId;
    private String pid;
    private Double elapsedTime;
    private Double instructionTimeEffort;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "browser_name", nullable = true, length = 250)
    public String getBrowserName() {
        return browserName;
    }

    public void setBrowserName(String browserName) {
        this.browserName = browserName;
    }

    @Basic
    @Column(name = "browser_version", nullable = true, length = 250)
    public String getBrowserVersion() {
        return browserVersion;
    }

    public void setBrowserVersion(String browserVersion) {
        this.browserVersion = browserVersion;
    }

    @Basic
    @Column(name = "operating_system", nullable = true, length = 250)
    public String getOperatingSystem() {
        return operatingSystem;
    }

    public void setOperatingSystem(String operatingSystem) {
        this.operatingSystem = operatingSystem;
    }

    @Basic
    @Column(name = "ip_address", nullable = true, length = 100)
    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    @Basic
    @Column(name = "creation_date", nullable = true)
    public Timestamp getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Timestamp creationDate) {
        this.creationDate = creationDate;
    }

    @Basic
    @Column(name = "width", nullable = true)
    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    @Basic
    @Column(name = "height", nullable = true)
    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }


    @Basic
    @Column(name = "task_id", nullable = true)
    public Integer getTaskID() {
        return taskID;
    }

    public void setTaskID(Integer taskID) {
        this.taskID = taskID;
    }


    @Basic
    @Column(name = "session_id", nullable = true)
    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    @Basic
    @Column(name = "study_id", nullable = true)
    public String getStudyId() {
        return studyId;
    }

    public void setStudyId(String studyId) {
        this.studyId = studyId;
    }

    @Basic
    @Column(name = "pid", nullable = true)
    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }


    @Basic
    @Column(name = "time_elapsed", nullable = true)
    public Double getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(Double elapsedTime) {
        this.elapsedTime = elapsedTime;
    }


    @Basic
    @Column(name = "instruction_time_effort", nullable = true)
    public Double getInstructionTimeEffort() {
        return instructionTimeEffort;
    }

    public void setInstructionTimeEffort(Double instructionTimeEffort) {
        this.instructionTimeEffort = instructionTimeEffort;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Session session = (Session) o;

        if (id != session.id) return false;
        if (browserName != null ? !browserName.equals(session.browserName) : session.browserName != null) return false;
        if (browserVersion != null ? !browserVersion.equals(session.browserVersion) : session.browserVersion != null)
            return false;
        if (operatingSystem != null ? !operatingSystem.equals(session.operatingSystem) : session.operatingSystem != null)
            return false;
        if (ipAddress != null ? !ipAddress.equals(session.ipAddress) : session.ipAddress != null) return false;
        if (creationDate != null ? !creationDate.equals(session.creationDate) : session.creationDate != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (browserName != null ? browserName.hashCode() : 0);
        result = 31 * result + (browserVersion != null ? browserVersion.hashCode() : 0);
        result = 31 * result + (operatingSystem != null ? operatingSystem.hashCode() : 0);
        result = 31 * result + (ipAddress != null ? ipAddress.hashCode() : 0);
        result = 31 * result + (creationDate != null ? creationDate.hashCode() : 0);
        return result;
    }
}
