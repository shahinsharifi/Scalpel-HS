package org.tudelft.wis.crowdsourcing.component.annotation.model;

import javax.persistence.*;

@Entity
@Table(name = "scene", schema = "public")
public class Scene {
    private Integer id;
    private String imageName;
    private Integer categoryId;
    private String name;
    private String prediction;

    @Id
    @Column(name = "id", nullable = true)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
    @Column(name = "category_id", nullable = true)
    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    @Basic
    @Column(name = "name", nullable = true, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Basic
    @Column(name = "category1", nullable = true, length = 100)
    public String getPrediction() {
        return prediction;
    }

    public void setPrediction(String prediction) {
        this.prediction = prediction;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Scene scenes = (Scene) o;

        if (id != null ? !id.equals(scenes.id) : scenes.id != null) return false;
        if (imageName != null ? !imageName.equals(scenes.imageName) : scenes.imageName != null) return false;
        if (categoryId != null ? !categoryId.equals(scenes.categoryId) : scenes.categoryId != null) return false;
        if (name != null ? !name.equals(scenes.name) : scenes.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (imageName != null ? imageName.hashCode() : 0);
        result = 31 * result + (categoryId != null ? categoryId.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
