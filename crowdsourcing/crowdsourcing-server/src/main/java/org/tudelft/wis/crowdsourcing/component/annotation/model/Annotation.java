package org.tudelft.wis.crowdsourcing.component.annotation.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "annotations", schema = "public", catalog = "scene_recognition")
public class Annotation {
    private int pid;
    private Integer categoryId;
    private String imageName;
    private String object1Label;
    private String object1Bbox;
    private Double object1Score;
    private String object2Label;
    private String object2Bbox;
    private Double object2Score;
    private String relationLabel;
    private Double relationScore;
    private Integer weight;
    private Integer sessionId;
    private Boolean valid;
    private String reason;

    @JsonProperty("isTypical") private Boolean isTypical;
    @JsonProperty("isAnnotated") private Boolean isAnnotated;
    @JsonProperty("isChosen") private Boolean isChosen;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pid", nullable = false)
    public int getId() {
        return pid;
    }

    public void setId(int pid) {
        this.pid = pid;
    }

    @Basic
    @Column(name = "category_id", nullable = true)
    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
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
    @Column(name = "object1_label", nullable = true, length = 200)
    public String getObject1Label() {
        return object1Label;
    }

    public void setObject1Label(String object1Label) {
        this.object1Label = object1Label;
    }

    @Basic
    @Column(name = "object1_bbox", nullable = true, length = 250)
    public String getObject1Bbox() {
        return object1Bbox;
    }

    public void setObject1Bbox(String object1Bbox) {
        this.object1Bbox = object1Bbox;
    }

    @Basic
    @Column(name = "object1_score", nullable = true, precision = 0)
    public Double getObject1Score() {
        return object1Score;
    }

    public void setObject1Score(Double object1Score) {
        this.object1Score = object1Score;
    }

    @Basic
    @Column(name = "object2_label", nullable = true, length = 200)
    public String getObject2Label() {
        return object2Label;
    }

    public void setObject2Label(String object2Label) {
        this.object2Label = object2Label;
    }

    @Basic
    @Column(name = "object2_bbox", nullable = true, length = 250)
    public String getObject2Bbox() {
        return object2Bbox;
    }

    public void setObject2Bbox(String object2Bbox) {
        this.object2Bbox = object2Bbox;
    }

    @Basic
    @Column(name = "object2_score", nullable = true, precision = 0)
    public Double getObject2Score() {
        return object2Score;
    }

    public void setObject2Score(Double object2Score) {
        this.object2Score = object2Score;
    }

    @Basic
    @Column(name = "relation_label", nullable = true, length = 100)
    public String getRelationLabel() {
        return relationLabel;
    }

    public void setRelationLabel(String relationLabel) {
        this.relationLabel = relationLabel;
    }

    @Basic
    @Column(name = "relation_score", nullable = true, precision = 0)
    public Double getRelationScore() {
        return relationScore;
    }

    public void setRelationScore(Double relationScore) {
        this.relationScore = relationScore;
    }

    @Basic
    @Column(name = "weight", nullable = true)
    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    @Basic
    @Column(name = "session_id", nullable = true)
    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    @Basic
    @Column(name = "valid", nullable = true)
    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
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
    @Column(name = "is_annotated", nullable = true)
    public Boolean getAnnotated() {
        return isAnnotated;
    }

    public void setAnnotated(Boolean annotated) {
        isAnnotated = annotated;
    }

    @Basic
    @Column(name = "is_chosen", nullable = true)
    public Boolean getChosen() {
        return isChosen;
    }

    public void setChosen(Boolean chosen) {
        isChosen = chosen;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Annotation that = (Annotation) o;

        if (pid != that.pid) return false;
        if (categoryId != null ? !categoryId.equals(that.categoryId) : that.categoryId != null) return false;
        if (imageName != null ? !imageName.equals(that.imageName) : that.imageName != null) return false;
        if (object1Label != null ? !object1Label.equals(that.object1Label) : that.object1Label != null) return false;
        if (object1Bbox != null ? !object1Bbox.equals(that.object1Bbox) : that.object1Bbox != null) return false;
        if (object1Score != null ? !object1Score.equals(that.object1Score) : that.object1Score != null) return false;
        if (object2Label != null ? !object2Label.equals(that.object2Label) : that.object2Label != null) return false;
        if (object2Bbox != null ? !object2Bbox.equals(that.object2Bbox) : that.object2Bbox != null) return false;
        if (object2Score != null ? !object2Score.equals(that.object2Score) : that.object2Score != null) return false;
        if (relationLabel != null ? !relationLabel.equals(that.relationLabel) : that.relationLabel != null)
            return false;
        if (relationScore != null ? !relationScore.equals(that.relationScore) : that.relationScore != null)
            return false;
        if (weight != null ? !weight.equals(that.weight) : that.weight != null) return false;
        if (sessionId != null ? !sessionId.equals(that.sessionId) : that.sessionId != null) return false;
        if (valid != null ? !valid.equals(that.valid) : that.valid != null) return false;
        if (isTypical != null ? !isTypical.equals(that.isTypical) : that.isTypical != null) return false;
        if (reason != null ? !reason.equals(that.reason) : that.reason != null) return false;
        if (isAnnotated != null ? !isAnnotated.equals(that.isAnnotated) : that.isAnnotated != null) return false;
        if (isChosen != null ? !isChosen.equals(that.isChosen) : that.isChosen != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = pid;
        result = 31 * result + (categoryId != null ? categoryId.hashCode() : 0);
        result = 31 * result + (imageName != null ? imageName.hashCode() : 0);
        result = 31 * result + (object1Label != null ? object1Label.hashCode() : 0);
        result = 31 * result + (object1Bbox != null ? object1Bbox.hashCode() : 0);
        result = 31 * result + (object1Score != null ? object1Score.hashCode() : 0);
        result = 31 * result + (object2Label != null ? object2Label.hashCode() : 0);
        result = 31 * result + (object2Bbox != null ? object2Bbox.hashCode() : 0);
        result = 31 * result + (object2Score != null ? object2Score.hashCode() : 0);
        result = 31 * result + (relationLabel != null ? relationLabel.hashCode() : 0);
        result = 31 * result + (relationScore != null ? relationScore.hashCode() : 0);
        result = 31 * result + (weight != null ? weight.hashCode() : 0);
        result = 31 * result + (sessionId != null ? sessionId.hashCode() : 0);
        result = 31 * result + (valid != null ? valid.hashCode() : 0);
        result = 31 * result + (isTypical != null ? isTypical.hashCode() : 0);
        result = 31 * result + (reason != null ? reason.hashCode() : 0);
        result = 31 * result + (isAnnotated != null ? isAnnotated.hashCode() : 0);
        result = 31 * result + (isChosen != null ? isChosen.hashCode() : 0);
        return result;
    }
}
