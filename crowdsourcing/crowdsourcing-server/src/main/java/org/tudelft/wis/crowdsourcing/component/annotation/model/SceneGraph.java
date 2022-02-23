package org.tudelft.wis.crowdsourcing.component.annotation.model;

import javax.persistence.*;

@Entity
@Table(name = "scene_graph", schema = "public", catalog = "scene_recognition")
public class SceneGraph {
    private int id;
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
    private Integer weight = 10;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    @Override
    public boolean equals(Object o) {
        SceneGraph that = (SceneGraph) o;
        if (this.relationLabel.equalsIgnoreCase(that.relationLabel)) {
            if (this.object1Label.replaceFirst("^(?:[^_]*\\_)", "").equalsIgnoreCase(that.object1Label.replaceFirst("^(?:[^_]*\\_)", ""))) {
                if (this.object2Label.replaceFirst("^(?:[^_]*\\_)", "").equalsIgnoreCase(that.object2Label.replaceFirst("^(?:[^_]*\\_)", "")))
                    return true;
                else
                    return false;
            } else
                return false;
        } else
            return false;
    }

    @Override
    public int hashCode() {
        int result = 1;
        return result;
    }
}
