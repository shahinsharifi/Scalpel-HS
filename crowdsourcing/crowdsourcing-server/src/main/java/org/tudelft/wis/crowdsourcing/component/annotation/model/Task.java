package org.tudelft.wis.crowdsourcing.component.annotation.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;


public class Task {

    private Integer width;
    private Integer height;
    private Integer taskID;
    private String sessionId;
    private String studyId;
    private String pid;
    private Double elapsedTime;
    private Double instructionTimeEffort;
    private SceneAnnotation sceneAnnotation;
    private List<Annotation> annotations;
    private List<String> objects;

    public SceneAnnotation getSceneAnnotation() {
        return sceneAnnotation;
    }

    public void setSceneAnnotation(SceneAnnotation sceneAnnotation) {
        this.sceneAnnotation = sceneAnnotation;
    }

    public List<Annotation> getAnnotations() {
        return annotations;
    }

    public void setAnnotations(List<Annotation> annotations) {
        this.annotations = annotations;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getTaskID() {
        return taskID;
    }

    public void setTaskID(Integer taskID) {
        this.taskID = taskID;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getStudyId() {
        return studyId;
    }

    public void setStudyId(String studyId) {
        this.studyId = studyId;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public Double getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(Double elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    public Double getInstructionTimeEffort() {
        return instructionTimeEffort;
    }

    public void setInstructionTimeEffort(Double instructionTimeEffort) {
        this.instructionTimeEffort = instructionTimeEffort;
    }

    public List<String> getObjects() {
        return objects;
    }

    public void setObjects(List<String> objects) {
        this.objects = objects;
    }
}
