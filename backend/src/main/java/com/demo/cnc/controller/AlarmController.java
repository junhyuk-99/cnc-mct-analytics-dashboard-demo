package com.demo.cnc.controller;

import com.demo.cnc.dto.AlarmHistoryDto;
import com.demo.cnc.dto.ApiResponse;
import com.demo.cnc.service.AlarmService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/alarms")
public class AlarmController {

    private final AlarmService alarmService;

    public AlarmController(AlarmService alarmService) {
        this.alarmService = alarmService;
    }

    @GetMapping
    public ApiResponse<List<AlarmHistoryDto>> getAlarms(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) String severity,
            @RequestParam(required = false) String machineId
    ) {
        return ApiResponse.ok(alarmService.getAlarms(from, to, severity, machineId));
    }
}
