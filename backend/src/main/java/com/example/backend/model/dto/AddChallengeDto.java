package com.example.backend.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record AddChallengeDto(

        @NotBlank
        String type,

        @NotBlank
        String ageCategory,

        @Min(0)
        Integer noParticipants
) { }
