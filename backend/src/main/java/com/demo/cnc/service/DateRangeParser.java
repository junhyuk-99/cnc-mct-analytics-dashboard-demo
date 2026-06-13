package com.demo.cnc.service;

import com.demo.cnc.exception.BadRequestException;
import java.time.LocalDate;

final class DateRangeParser {

    private static final LocalDate DEFAULT_FROM = LocalDate.of(2026, 1, 1);
    private static final LocalDate DEFAULT_TO = LocalDate.of(2026, 1, 30);

    private DateRangeParser() {
    }

    static DateRange parse(String from, String to) {
        LocalDate start = isBlank(from) ? DEFAULT_FROM : LocalDate.parse(from);
        LocalDate end = isBlank(to) ? DEFAULT_TO : LocalDate.parse(to);
        if (start.isAfter(end)) {
            throw new BadRequestException("from must be before or equal to to");
        }
        return new DateRange(start, end);
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    record DateRange(LocalDate from, LocalDate to) {
    }
}
