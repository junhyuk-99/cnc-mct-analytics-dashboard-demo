package com.demo.cnc.repository;

import com.demo.cnc.model.RuntimeCuttimeEvent;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RuntimeCuttimeEventRepository extends MongoRepository<RuntimeCuttimeEvent, String> {
    List<RuntimeCuttimeEvent> findByWorkDateBetween(LocalDate from, LocalDate to);
}
