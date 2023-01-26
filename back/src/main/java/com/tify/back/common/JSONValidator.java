package com.tify.back.common;
import org.json.JSONObject;
import org.json.JSONTokener;

public class JSONValidator {
    public static boolean isValidJSON(String json) {
        try {
            new JSONObject(new JSONTokener(json));
        } catch (org.json.JSONException ex) {
            return false;
        }
        return true;
    }
}
