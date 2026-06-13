package com.demo.cnc.repository;

import com.demo.cnc.model.DailySummary;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DailySummaryRepository extends MongoRepository<DailySummary, String> {
    List<DailySummary> findByWorkDateBetweenOrderByWorkDateAsc(LocalDate from, LocalDate to);
}
