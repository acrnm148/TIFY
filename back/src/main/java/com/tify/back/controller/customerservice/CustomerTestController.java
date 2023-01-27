package com.tify.back.controller.customerservice;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/custom/test")
public class CustomerTestController {
    @RequestMapping(value = "/")
    public String index() {
        return "index.html";
    }
    @PostMapping(value = "/content", produces = "application/text; charset=euc-kr")
    public String testing(@RequestBody String message) {
        System.out.println(1111111111);
        System.out.println(message);
        return message;
    }
}
