package com.nextstep.backend.resume;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResumeRepository extends JpaRepository<Resume, UUID> {
    List<Resume> findByUserId(UUID userId);
    Optional<Resume> findTopByUserIdOrderByUploadedAtDesc(UUID userId);
}