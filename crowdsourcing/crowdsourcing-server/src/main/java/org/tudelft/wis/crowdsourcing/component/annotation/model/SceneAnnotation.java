package org.tudelft.wis.crowdsourcing.component.annotation.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "scene_annotation", schema = "public", catalog = "scene_recognition")
public class SceneAnnotation {
    private int id;
    private int sessionId;
    @JsonProperty("isTypical") private Boolean isTypical;
    @JsonProperty("isNoRelation") private boolean noRelation;
    @JsonProperty("isWrongLabel") private boolean wrongLabel;
    private String reason;
    private String objects;

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
    @Column(name = "session_id", nullable = false)
    public int getSessionId() {
        return sessionId;
    }

    public void setSessionId(int sessionId) {
        this.sessionId = sessionId;
    }

    @Basic
    @Column(name = "is_typical", nullable = true)
    public Boolean getTypical() {
        return isTypical;
    }

    public void setTypical(Boolean typical) {
        isTypical = typical;
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
    @Column(name = "no_relation", nullable = true, length = -1)
    public boolean isNoRelation() {
        return noRelation;
    }

    public void setNoRelation(boolean noRelation) {
        this.noRelation = noRelation;
    }

    @Basic
    @Column(name = "wrong_label", nullable = true, length = -1)
    public boolean isWrongLabel() {
        return wrongLabel;
    }

    public void setWrongLabel(boolean wrongLabel) {
        this.wrongLabel = wrongLabel;
    }

    @Basic
    @Column(name = "objects", nullable = true, length = -1)
    public String getObjects() {
        return objects;
    }

    public void setObjects(String objects) {
        this.objects = objects;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SceneAnnotation that = (SceneAnnotation) o;

        if (id != that.id) return false;
        if (sessionId != that.sessionId) return false;
        if (isTypical != null ? !isTypical.equals(that.isTypical) : that.isTypical != null) return false;
        if (reason != null ? !reason.equals(that.reason) : that.reason != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + sessionId;
        result = 31 * result + (isTypical != null ? isTypical.hashCode() : 0);
        result = 31 * result + (reason != null ? reason.hashCode() : 0);
        return result;
    }
}
