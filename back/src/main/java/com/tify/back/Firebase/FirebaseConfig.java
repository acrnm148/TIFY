package com.tify.back.Firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.annotation.PostConstruct;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {
    InputStream serviceAccount = this.getClass().getResourceAsStream("/firebaseconfig/tify-noti-firebase.json");
    @Primary
    @PostConstruct
    public void init(){
        try{
            String userDirectory = System.getProperty("user.dir");
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
