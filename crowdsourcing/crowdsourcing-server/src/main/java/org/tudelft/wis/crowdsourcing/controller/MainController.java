package org.tudelft.wis.crowdsourcing.controller;

import eu.bitwalker.useragentutils.UserAgent;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.tudelft.wis.crowdsourcing.component.annotation.model.*;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Objects;
import org.tudelft.wis.crowdsourcing.component.annotation.service.*;

import org.tudelft.wis.crowdsourcing.storage.FileStorage;
import org.tudelft.wis.crowdsourcing.util.IPDetector;
import org.tudelft.wis.crowdsourcing.util.RandomGenerator;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.activation.FileTypeMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@RestController
public class MainController {


    @Autowired
    private SessionService sessionService;

    @Autowired
    private AnnotationService annotationService;

    @Autowired
    private SceneAnnotationService sceneAnnotationService;

    @Autowired
    private SceneService sceneService;

    @Autowired
    private SceneGraphService sceneGraphService;

    @Autowired
    private SceneMetadataService sceneMetadataService;


    private FileStorage fileStorage = FileStorage.getInstance();


    @RequestMapping(value = "scene/get/metadata", method = RequestMethod.GET)
    @ResponseBody
    public String getSceneGraphMetadata() throws Exception {
        Map<String, Object> result = new HashMap<>();
        List<Objects> objects = sceneMetadataService.getAllObjects();
        List<Relations> relations = sceneMetadataService.getAllRelations();
        result.put("objects", objects);
        result.put("relations", relations);
        String json = new Gson().toJson(result);
        return json;
    }


    @RequestMapping(value = {"scene/get","scene/get/{query}"}, method = RequestMethod.GET)
    @ResponseBody
    public String getSceneGraph(@PathVariable(value = "query",required = false) String query) throws Exception {
        Map<String, Object> result = new HashMap<>();
        Scene scene = (query == null) ? sceneService.getOneRandomly() : sceneService.getSceneByImageName(query);
        //scene.setCategoryId(1);
        sceneService.insert(scene);
        List<SceneGraph> graphs = sceneGraphService.getAllBySceneName(scene.getImageName());
        if(graphs.size() == 0){
            scene = sceneService.getOneRandomly();
            graphs = sceneGraphService.getAllBySceneName(scene.getImageName());
        }
        List<SceneGraph> finalGraphs = graphs.stream()
                .distinct()
                .collect(Collectors.toList());
        result.put("image", scene.getImageName());
        result.put("category", scene.getName().replaceAll("_", " "));
        result.put("prediction", scene.getPrediction().replaceAll("_", " "));
        result.put("graph", finalGraphs);
        result.put("task_id", RandomGenerator.getRandomBinary());
        String json = new Gson().toJson(result);
        return json;
    }



    @RequestMapping(value = "session/get/{taskId}", method = RequestMethod.GET)
    @ResponseBody
    public String getSession(@PathVariable("taskId") Integer taskId) throws Exception {
        List<Map<String,Object>> result = sessionService.getAll().stream().filter(
                item->item.get("task_id") == taskId).collect(Collectors.toList());
        String json = new Gson().toJson(result);
        return json;
    }


    @RequestMapping(value = "annotation/get/{sessionId}", method = RequestMethod.GET)
    @ResponseBody
    public String getAnnotation(@PathVariable("sessionId") Integer sessionId) throws Exception {
        Map<String, Object> result = new HashMap<>();
        List<Annotation> annotations = annotationService.getAnnotationsBySessionId(sessionId);
        Scene scene = sceneService.getSceneByImageName(annotations.get(0).getImageName());
        result.put("image", scene.getImageName());
        result.put("category", scene.getName().replaceAll("_", " "));
        result.put("prediction", scene.getPrediction().replaceAll("_", " "));
        result.put("graph", annotations);
        String json = new Gson().toJson(result);
        return json;
    }


    @RequestMapping(value = "scene/save", method = RequestMethod.POST)
    @ResponseBody
    public String saveAnnotations(@RequestBody Task task, HttpServletRequest request) throws Exception {
        JsonObject jsonObject = new JsonObject();

        Integer sessionId = null;
        try {
            UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
            Session session = new Session();
            session.setBrowserName(userAgent.getBrowser().getName());
            session.setBrowserVersion(userAgent.getBrowserVersion().toString());
            session.setOperatingSystem(userAgent.getOperatingSystem().getName());
            session.setCreationDate(new Timestamp(new Date().getTime()));
            session.setIpAddress(IPDetector.getClientIp(request));
            if (task.getWidth() != null)
                session.setWidth(task.getWidth());
            if (task.getHeight() != null)
                session.setHeight(task.getHeight());
            if(task.getTaskID() != null)
                session.setTaskID(task.getTaskID());
            if(task.getPid() != null)
                session.setPid(task.getPid());
            if(task.getSessionId() != null)
                session.setSessionId(task.getSessionId());
            if(task.getStudyId() != null)
                session.setStudyId(task.getStudyId());
            if(task.getElapsedTime() != null)
                session.setElapsedTime(task.getElapsedTime());
            if(task.getInstructionTimeEffort() != null)
                session.setInstructionTimeEffort(task.getInstructionTimeEffort());
            sessionId = sessionService.insert(session);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        try {
            List<Annotation> annotations = task.getAnnotations();
            List<String> objects = task.getObjects();
            SceneAnnotation sceneAnnotation = task.getSceneAnnotation();
            if (sessionId == null)
                sessionId = RandomGenerator.getRandomNumberInRange(150000, 580000);
            Integer finalSessionId = sessionId;
            annotations.forEach(f -> f.setSessionId(finalSessionId));
            annotationService.insertAll(annotations);
            if (sceneAnnotation != null) {
                if (objects != null && objects.size() > 0) {
                    String listOfObjects = String.join(",", objects);
                    sceneAnnotation.setObjects(listOfObjects);
                }
                sceneAnnotation.setSessionId(finalSessionId);
                sceneAnnotationService.insert(sceneAnnotation);
            }
            jsonObject.addProperty("status", "ok");
        } catch (Exception ex) {
            ex.printStackTrace();
            jsonObject.addProperty("status", "error");
            jsonObject.addProperty("error", ex.getMessage());
            throw new Exception(ex);
        }
        return jsonObject.toString();
    }


    @RequestMapping(value = "/image/{path:.+}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getImage(@PathVariable("path") String path) throws IOException {
        File img = new File(fileStorage.getRootFolderPath() + fileStorage.getImageFolderPath() + path);
        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(FileTypeMap.getDefaultFileTypeMap().getContentType(img)))
                .body(Files.readAllBytes(img.toPath()));
    }


    @RequestMapping(value = "/image2/{path:.+}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getImage2(@PathVariable("path") String path) throws IOException {
        File img = new File(fileStorage.getRootFolderPath() + fileStorage.getImageFolderPath2() + path);
        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(FileTypeMap.getDefaultFileTypeMap().getContentType(img)))
                .body(Files.readAllBytes(img.toPath()));
    }


    @PostMapping("/image/upload")
    @ResponseBody
    public String uploadFile(@RequestParam("file") MultipartFile file) throws Exception{
        RestTemplate restTemplate = new RestTemplate();
        String targetURL = "http://145.100.58.225:5000/search";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", file.getResource());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(targetURL, requestEntity, String.class);
        return response.getBody();
    }



}
