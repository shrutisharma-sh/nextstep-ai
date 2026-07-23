package com.nextstep.backend.resume;

import com.fasterxml.jackson.databind.JsonNode;
import com.nextstep.backend.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String fileName;

    @Column(columnDefinition = "TEXT")
    private String rawText;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private JsonNode parsedData;

    @Column(nullable = false, updatable = false)
    private Instant uploadedAt;

    @PrePersist
    protected void onCreate() {
        uploadedAt = Instant.now();
    }
}