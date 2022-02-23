package org.tudelft.wis.crowdsourcing.config;

import org.tudelft.wis.crowdsourcing.storage.FileStorage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StorageConfig {


    private FileStorage fileStorage = FileStorage.getInstance();

    @Value("${server.files.storage}")
    private String rootFolderPath;

    @Value("${server.images.path}")
    private String imageFolderPath;

    @Value("${server.images.path2}")
    private String imageFolderPath2;


    @Bean
    public boolean initStorageConfiguration() {
        fileStorage.setRootFolderPath(rootFolderPath);
        fileStorage.setImageFolderPath(imageFolderPath);
        fileStorage.setImageFolderPath2(imageFolderPath2);
        return true;
    }

}
