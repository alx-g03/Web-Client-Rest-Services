package com.example.backend.controller;

import com.example.backend.model.dto.AddChallengeDto;
import com.example.backend.model.dto.ChallengeDto;
import com.example.backend.service.ChallengeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(origins ="*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping
    public ResponseEntity<ChallengeDto> addChallenge(@Valid @RequestBody AddChallengeDto challengeDto) throws URISyntaxException {
        ChallengeDto challenge = this.challengeService.addChallenge(challengeDto);
        return ResponseEntity.created(new URI("/api/challenges/" + challenge.id())).body(challenge);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChallengeDto> getChallengeById(@PathVariable Integer id) {
        return ResponseEntity.ok(this.challengeService.getChallengeById(id));
    }

    @PutMapping
    public ResponseEntity<ChallengeDto> updateChallenge(@Valid @RequestBody ChallengeDto challengeDto) {
        return ResponseEntity.ok(this.challengeService.updateChallenge(challengeDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Integer id) {
        this.challengeService.deleteChallenge(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ChallengeDto>> getAllChallenges() {
        return ResponseEntity.ok(this.challengeService.getAllChallenges());
    }
}
