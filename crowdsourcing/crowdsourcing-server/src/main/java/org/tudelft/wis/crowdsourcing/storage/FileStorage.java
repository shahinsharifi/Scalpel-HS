package org.tudelft.wis.crowdsourcing.storage;

public class FileStorage {

    private String rootFolderPath = "";
    private String imageFolderPath = "";
    private String imageFolderPath2 = "";

    private static FileStorage ourInstance = new FileStorage();

    public static FileStorage getInstance() {
        return ourInstance;
    }

    public String getRootFolderPath() {
        return rootFolderPath;
    }

    public void setRootFolderPath(String rootFolderPath) {
        this.rootFolderPath = rootFolderPath;
    }

    public String getImageFolderPath() {
        return imageFolderPath;
    }

    public String getImageFolderPath2() {
        return imageFolderPath2;
    }

    public void setImageFolderPath(String imageFolderPath) {
        this.imageFolderPath = imageFolderPath;
    }

    public void setImageFolderPath2(String imageFolderPath) {
        this.imageFolderPath2 = imageFolderPath;
    }
}
