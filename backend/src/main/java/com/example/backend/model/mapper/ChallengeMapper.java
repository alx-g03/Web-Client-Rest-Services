package com.example.backend.model.mapper;

import com.example.backend.model.Challenge;
import com.example.backend.model.dto.AddChallengeDto;
import com.example.backend.model.dto.ChallengeDto;

public class ChallengeMapper {

    public static ChallengeDto mapToDto(Challenge challenge) {
        return ChallengeDto.builder()
                .id(challenge.getId())
                .type(challenge.getType())
                .ageCategory(challenge.getAgeCategory())
                .noParticipants(challenge.getNoParticipants())
                .build();
    }

    public static Challenge mapToModel(ChallengeDto challengeDto) {
        return Challenge.builder()
                .id(challengeDto.id())
                .type(challengeDto.type())
                .ageCategory(challengeDto.ageCategory())
                .noParticipants(challengeDto.noParticipants())
                .build();
    }

    public static Challenge mapFromAddDtoToModel(AddChallengeDto addChallengeDto) {
        return Challenge.builder()
                .type(addChallengeDto.type())
                .ageCategory(addChallengeDto.ageCategory())
                .noParticipants(addChallengeDto.noParticipants())
                .build();
    }
}
