package com.tify.back.Firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void init(){
        try{
            String userDirectory = System.getProperty("user.dir");
            String filePath = userDirectory + "/src/main/resources/firebaseconfig/tify-noti-firebase.json";

            FileInputStream serviceAccount =
                    new FileInputStream(filePath);
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setServiceAccountId("firebase-adminsdk-35g8k@tify-noti.iam.gserviceaccount.com")
                    .build();
            FirebaseApp.initializeApp(options);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}