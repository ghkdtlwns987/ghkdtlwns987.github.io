---
layout: portfolio
title: "CRAFT: Causality-aware Reasoning and Adaptive Framework for Vulnerability Types"
subtitle: IEEE Transactions on Dependable and Secure Computing — Submitted
permalink: /portfolio/craft/
anonymous: true
sitemap: false
robots: noindex, nofollow
description: >-
  Causality-aware Reasoning and Adaptive Framework for Vulnerability Types — CTVKG · Expert Agents.
---

### Problem Definition

**서로 다른 원인으로 발생하는 취약점을 동일한 지식과 추론 방식으로 분석하는 것이 최선인가?**

CLEAR 연구에서는 취약점의 원인과 조건을 구조화한 Causal Knowledge를 LLM에게 제공하고 Multi-Agent Reasoning을 통해 분석과 검증을 수행하면 취약점 탐지 성능을 개선할 수 있음을 확인했습니다.

그러나 후속 분석 과정에서 취약점마다 발생하는 원인과 판단에 필요한 정보가 서로 다르다는 점에 주목했습니다. 프로그램의 상태 변화로 발생하는 취약점과 실행 흐름, 입력 조건, 권한 및 보안 정책 위반으로 발생하는 취약점은 분석 과정에서 확인해야 하는 정보와 관계가 다릅니다.

따라서 모든 취약점을 하나의 지식 구조와 동일한 추론 방식으로 분석하면 각 취약점의 발생 메커니즘을 충분히 반영하기 어렵다고 판단했습니다.

이에 취약점을 발생 메커니즘에 따라 유형화하고, 유형별로 필요한 지식과 추론 관점을 다르게 구성하는 적응형 취약점 탐지 방법을 연구했습니다.

## Research Question

**취약점의 발생 메커니즘에 따라 지식 표현과 Agent의 추론 방식을 다르게 설계하면 취약점 판단을 개선할 수 있는가?**

취약점을 하나의 동일한 문제로 다루는 대신 발생 원인을 Causality Type으로 구분하고, 각 유형에 적합한 지식과 Expert Agent를 활용하여 취약 코드와 패치 코드의 차이를 분석하도록 설계했습니다.

---

### Causality Type

취약점 사례에서 반복적으로 나타나는 발생 원인과 조건을 분석하여 취약점의 메커니즘을 다음 네 가지 Causality Type으로 구분했습니다.

| Type | Analysis Perspective | Description |
| --- | --- | --- |
| **State** | State Change | 프로그램의 상태와 상태 변화에서 발생하는 취약점 |
| **Execution** | Execution Flow | 실행 흐름과 연산 과정에서 발생하는 취약점 |
| **Constraint** | Input / Boundary | 입력값, 경계 및 조건 위반으로 발생하는 취약점 |
| **Policy** | Security Policy | 권한, 접근 통제 및 보안 정책 위반으로 발생하는 취약점 |

이를 통해 모든 취약점에 동일한 분석 관점을 적용하는 대신 현재 취약점의 발생 메커니즘에 적합한 관점에서 원인과 조건을 분석할 수 있도록 했습니다.

---

### Causality-Typed Vulnerability Knowledge Graph

유형별 취약점 분석에 필요한 지식을 제공하기 위해 **CTVKG (Causality-Typed Vulnerability Knowledge Graph)**를 설계했습니다.

취약점 정보를 단순하게 저장하는 것이 아니라 취약점의 원인과 조건, 관련 요소의 관계를 Causality Type에 따라 구조화했습니다.

또한 취약점별 지식을 Local → Neighbor → Global 단계로 확장하여 개별 취약점에서 추출한 인과관계를 관련 취약점과 연결하고, 반복적으로 나타나는 취약점 메커니즘을 활용할 수 있도록 구성했습니다.

이를 통해 Agent가 전체 보안 지식을 동일하게 사용하는 것이 아니라 현재 분석하는 취약점 유형과 관련된 인과 지식을 추론 근거로 활용하도록 했습니다.

---

### Causality-aware Multi-Agent Reasoning

CTVKG에서 제공된 지식을 기반으로 여러 Agent가 역할을 나누어 취약점을 분석하고 검증하도록 Multi-Agent Reasoning 구조를 설계했습니다.

분석 과정은 크게 다음 역할로 구성됩니다.

- **Collector Agent** : 분석 대상과 관련된 Causal Context 수집
- **Expert Agents** : Causality Type에 따라 서로 다른 관점에서 취약점 분석
- **Claim Agent** : 분석 결과를 바탕으로 취약 여부와 근거 생성
- **Critic Agent** : Claim의 근거와 논리적 오류를 반박하고 검증
- **Judge Agent** : 분석 및 검증 결과를 종합하여 최종 판단

특히 Expert Agent가 모든 취약점을 동일한 관점으로 분석하지 않고, State / Execution / Constraint / Policy에 따라 필요한 정보와 관계에 집중하여 분석하도록 한 것이 기존 접근과의 핵심적인 차이입니다.

이를 통해 지식 검색부터 분석, 주장 생성, 반박, 최종 판단까지 단계적으로 검증하는 구조를 구성했습니다.

---

### Experimental Results

CRAFT의 효과를 검증하기 위해 취약 코드와 이를 수정한 패치 코드를 Pair로 구성하여 모델이 두 버전을 동시에 정확하게 구별하는지를 평가했습니다.

실험 결과, PrimeVul 데이터셋에서 CRAFT는 VPS **11.85**를 기록했으며, 기존 CLEAR의 **-4.20** 대비 **16.05%p** 향상된 결과를 보였습니다.

또한 Pairwise Correct Prediction(P-C)은 CLEAR 대비 **27.15%** 상대 개선되었습니다.

이는 단순히 더 많은 지식을 LLM에게 제공하는 것보다 취약점의 발생 메커니즘에 맞게 지식을 구조화하고 적절한 추론 관점을 선택하는 것이 취약점 판단에 중요함을 보여줍니다.

---

### What Did We Find?

모든 취약점을 동일한 방식으로 분석하는 것보다 취약점의 발생 메커니즘에 따라 지식과 추론 방식을 달리하는 것이 효과적이었습니다.

소프트웨어 취약점은 모두 동일한 원인으로 발생하지 않습니다. 어떤 취약점은 프로그램의 상태 변화에서 발생하고, 다른 취약점은 실행 과정이나 입력 조건, 권한 및 보안 정책의 위반에서 발생합니다.

CRAFT는 이러한 차이를 Causality Type으로 구조화하고, 각 유형에 적합한 지식과 Expert Agent를 선택하여 분석하는 Adaptive Reasoning 구조를 적용했습니다.

실험을 통해 취약점의 특성을 고려한 Typed Knowledge와 Expert Reasoning이 취약 코드와 패치 코드의 미세한 차이를 구별하는 데 중요한 역할을 한다는 것을 확인했습니다.

---

### Research Contribution

- 취약점 발생 메커니즘을 State / Execution / Constraint / Policy의 네 가지 Causality Type으로 구조화
- 유형별 인과관계를 표현하는 Causality-Typed Vulnerability Knowledge Graph (CTVKG) 설계
- 취약점 유형에 따라 분석 관점을 달리하는 Expert Agent 기반 Adaptive Reasoning 제안
- Collector → Expert → Claim → Critic → Judge 기반 Multi-Agent 분석 및 검증 구조 설계
- CLEAR 대비 Pairwise Correct Prediction(P-C) **27.15%** 상대 개선