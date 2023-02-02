package com.tify.back.Firebase;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/fcm")
@RequiredArgsConstructor
public class fcmController {
    private final FirebaseConfig firebase;

    @PostMapping
    public String fcmTest() throws FirebaseAuthException {
        String uid = "rkdrlgks321-naver-com";
        String customToken = FirebaseAuth.getInstance().createCustomToken(uid);
        return customToken;

    }

    @GetMapping("/addData")
    public void addData() {
        FirebaseDatabase database = FirebaseDatabase.getInstance("https://tify-noti-default-rtdb.firebaseio.com/");
        DatabaseReference reference = database.getReference("test/tify/rkdrlgks321-naver-com");
        Map<String, Object> updates = new HashMap<>();
        updates.put("data", "Hello, World!");
        reference.push().setValue(updates,new DatabaseReference.CompletionListener() {
            @Override
            public void onComplete(DatabaseError error, DatabaseReference ref) {
                if (error == null) {
                    System.out.println("Data updated successfully");
                } else {
                    System.out.println("Data update failed: " + error.getMessage());
                }
            }
        });
//        reference.updateChildren(updates, new DatabaseReference.CompletionListener() {
//            @Override
//            public void onComplete(DatabaseError error, DatabaseReference ref) {
//                if (error == null) {
//                    System.out.println("Data updated successfully");
//                } else {
//                    System.out.println("Data update failed: " + error.getMessage());
//                }
//            }
//        });
    }
}
