package com.example.backend.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ChallengeDto(

        @NotNull(message = "Challenge ID is required")
        Integer id,

        @NotBlank(message = "Challenge type is required")
        String type,

        @NotBlank(message = "Challenge age category is required")
        String ageCategory,

        @Min(value = 0, message = "Number of participants must be greater than or equal to 0")
        Integer noParticipants
) { }
