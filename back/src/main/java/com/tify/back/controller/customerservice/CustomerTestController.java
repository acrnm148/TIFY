package com.tify.back.controller.customerservice;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomerTestController {
    @RequestMapping(value = "/")
    public String index() {
        return "index.html";
    }
}
