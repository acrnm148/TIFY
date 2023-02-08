package com.tify.back.Firebase;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/fcm")
@RequiredArgsConstructor
public class fcmController {
    private final FirebaseConfig firebase;

    @PostMapping
    public String fcmTest(@RequestBody String email) throws FirebaseAuthException {

        String uid = email.replace("@","-").replace(".","-");
        System.out.println(uid);
//        String uid = "rkdrlgks321-naver-com";
        String customToken = FirebaseAuth.getInstance().createCustomToken(uid);
        return customToken;
    }

    @PostMapping("/addData")
    public Map<String, Object> addData(String collection) {
        FirebaseDatabase database = FirebaseDatabase.getInstance("https://tify-noti-default-rtdb.firebaseio.com/");
        System.out.println(collection);
        DatabaseReference reference = database.getReference("test/tify/"+collection);
        Map<String, Object> updates = new HashMap<>();
        updates.put("data", "Hello, World!");
        updates.put("time", System.currentTimeMillis()); // 발송 시간
        updates.put("state", false); // 읽은 상태
        updates.put("title", "test title"); // 알림 제목
        updates.put("content", "content"); // 알림 내용
        updates.put("image_url","img"); // 알림 첨부 이미지
        updates.put("link_url","link"); // 알림 첨부 링크
        updates.put("type","friends"); // 어떤 알림인지 ?
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
        return updates;
    }

    @DeleteMapping("/deleteData/{key}")
    public void deleteData(@PathVariable String key) {
        FirebaseDatabase database = FirebaseDatabase.getInstance("https://tify-noti-default-rtdb.firebaseio.com/");
        DatabaseReference reference = database.getReference("test/tify/rkdrlgks321-naver-com").child(key);
        reference.removeValue(new DatabaseReference.CompletionListener() {
            @Override
            public void onComplete(DatabaseError error, DatabaseReference ref) {
                if (error == null) {
                    System.out.println("Data deleted successfully");
                } else {
                    System.out.println("Data delete failed: " + error.getMessage());
                }
            }
        });
    }

    @PostMapping("/newuser")
    public String newCollection(@RequestBody String email) {
        FirebaseDatabase database = FirebaseDatabase.getInstance("https://tify-noti-default-rtdb.firebaseio.com/");
        DatabaseReference reference = database.getReference("test/tify");
        String uid = email.replace("@","-").replace(".","-");
        reference.child(uid).setValueAsync("");
        return "collection for " + uid + " created";
    }
}
