package com.example.backend.service;

import com.example.backend.model.dto.AddChallengeDto;
import com.example.backend.model.dto.ChallengeDto;
import com.example.backend.model.mapper.ChallengeMapper;
import com.example.backend.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;

    public ChallengeDto addChallenge(AddChallengeDto challengeDto) {
        return Optional.of(challengeDto)
                .map(ChallengeMapper::mapFromAddDtoToModel)
                .map(this.challengeRepository::save)
                .map(ChallengeMapper::mapToDto)
                .orElseThrow();
    }

    public ChallengeDto getChallengeById(Integer id) {
        return this.challengeRepository.findById(id)
                .map(ChallengeMapper::mapToDto)
                .orElseThrow();
    }

    public ChallengeDto updateChallenge(ChallengeDto challengeDto) {
        return this.challengeRepository.findById(challengeDto.id())
                .map(challenge -> this.challengeRepository.save(ChallengeMapper.mapToModel(challengeDto)))
                .map(ChallengeMapper::mapToDto)
                .orElseThrow();
    }

    public void deleteChallenge(Integer id) {
        this.challengeRepository.findById(id)
                .ifPresent(this.challengeRepository::delete);
    }

    public List<ChallengeDto> getAllChallenges() {
        return this.challengeRepository.findAll().stream()
                .map(ChallengeMapper::mapToDto)
                .toList();
    }
}
