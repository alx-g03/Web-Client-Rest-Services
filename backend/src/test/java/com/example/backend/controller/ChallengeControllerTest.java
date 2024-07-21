package com.example.backend.controller;

import com.example.backend.model.dto.AddChallengeDto;
import com.example.backend.model.dto.ChallengeDto;
import com.example.backend.service.ChallengeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ChallengeController.class)
public class ChallengeControllerTest {

    @MockBean
    private ChallengeService challengeService;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(new ChallengeController(challengeService)).build();
    }

    @Test
    public void testAddChallenge() throws Exception {
        AddChallengeDto addChallengeDto = new AddChallengeDto("Type1", "Category1", 10);
        ChallengeDto challengeDto = ChallengeDto.builder()
                .id(1)
                .type("Type1")
                .ageCategory("Category1")
                .noParticipants(10)
                .build();

        when(challengeService.addChallenge(any(AddChallengeDto.class))).thenReturn(challengeDto);

        mockMvc.perform(post("/api/challenges")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"type\":\"Type1\", \"ageCategory\":\"Category1\", \"noParticipants\":10}"))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/challenges/1"))
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testGetChallengeById() throws Exception {
        ChallengeDto challengeDto = ChallengeDto.builder()
                .id(1)
                .type("Type1")
                .ageCategory("Category1")
                .noParticipants(10)
                .build();

        when(challengeService.getChallengeById(1)).thenReturn(challengeDto);

        mockMvc.perform(get("/api/challenges/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testUpdateChallenge() throws Exception {
        ChallengeDto challengeDto = ChallengeDto.builder()
                .id(1)
                .type("Type1")
                .ageCategory("Category1")
                .noParticipants(10)
                .build();

        when(challengeService.updateChallenge(any(ChallengeDto.class))).thenReturn(challengeDto);

        mockMvc.perform(put("/api/challenges")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":1, \"type\":\"Type1\", \"ageCategory\":\"Category1\", \"noParticipants\":10}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testDeleteChallenge() throws Exception {
        doNothing().when(challengeService).deleteChallenge(1);

        mockMvc.perform(delete("/api/challenges/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testGetAllChallenges() throws Exception {
        ChallengeDto challengeDto1 = ChallengeDto.builder()
                .id(1)
                .type("Type1")
                .ageCategory("Category1")
                .noParticipants(10)
                .build();

        ChallengeDto challengeDto2 = ChallengeDto.builder()
                .id(2)
                .type("Type2")
                .ageCategory("Category2")
                .noParticipants(20)
                .build();

        List<ChallengeDto> challenges = Arrays.asList(challengeDto1, challengeDto2);

        when(challengeService.getAllChallenges()).thenReturn(challenges);

        mockMvc.perform(get("/api/challenges"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));
    }
}
