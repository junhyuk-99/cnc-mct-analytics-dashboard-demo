package com.demo.cnc.service;

import com.demo.cnc.dto.MachineDto;
import com.demo.cnc.repository.MachineRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MachineService {

    private final MachineRepository machineRepository;

    public MachineService(MachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }

    public List<MachineDto> getEnabledMachines() {
        return machineRepository.findByEnabledTrueOrderByMachineTypeAscMachineIdAsc().stream()
                .map(machine -> new MachineDto(
                        machine.getMachineId(),
                        machine.getMachineName(),
                        machine.getMachineType(),
                        machine.getLine(),
                        machine.isEnabled(),
                        machine.getPlannedDailySeconds()
                ))
                .toList();
    }
}
