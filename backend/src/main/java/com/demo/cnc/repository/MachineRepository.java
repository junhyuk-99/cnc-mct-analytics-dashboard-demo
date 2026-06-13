package com.demo.cnc.repository;

import com.demo.cnc.model.Machine;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MachineRepository extends MongoRepository<Machine, String> {
    List<Machine> findByEnabledTrueOrderByMachineTypeAscMachineIdAsc();
}
