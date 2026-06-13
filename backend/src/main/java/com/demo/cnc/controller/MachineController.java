package com.demo.cnc.controller;

import com.demo.cnc.dto.ApiResponse;
import com.demo.cnc.dto.MachineDto;
import com.demo.cnc.service.MachineService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/machines")
public class MachineController {

    private final MachineService machineService;

    public MachineController(MachineService machineService) {
        this.machineService = machineService;
    }

    @GetMapping
    public ApiResponse<List<MachineDto>> getMachines() {
        return ApiResponse.ok(machineService.getEnabledMachines());
    }
}
