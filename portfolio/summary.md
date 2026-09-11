---
layout: portfolio
title: Summary
subtitle: Copy & paste summaries
permalink: /portfolio/summary/
anonymous: true
sitemap: false
robots: noindex, nofollow
description: >-
  Degree · CLEAR · CRAFT · Project · 특허 · Career summaries for copy & paste.
---

## Index

1. [An Empirical Study of Vulnerability Detection under Pairwise Evaluation](#degree)
2. [CLEAR: Causal Context-Based Agentic Reasoning for Vulnerability Detection](#clear)
3. [CRAFT: Causality-aware Reasoning and Adaptive Framework for Vulnerability Types](#craft)
4. [Project](#project)
5. [특허](#patent)
6. [Career](#career)

---

## An Empirical Study of Vulnerability Detection under Pairwise Evaluation {#degree}

기존 AI 기반 소프트웨어 취약점 탐지 기술의 평가 방식이 실제 취약점 식별 능력을 충분히 검증하고 있는지 분석한 실증 연구입니다. 기존 연구에서는 취약 코드와 정상 코드를 독립적인 샘플로 평가하는 경우가 많지만, 실제 취약점 패치는 일부 보안 관련 코드만 변경되므로 모델이 취약점의 원인을 이해하지 못하고 코드의 표면적 특징에 의존하더라도 높은 성능을 보일 수 있다는 문제에 주목했습니다.

이를 검증하기 위해 동일 함수의 취약 버전과 패치 버전을 하나의 Pair로 구성하고, 모델이 두 버전을 정확히 구별하는지를 평가하는 Pairwise Evaluation을 수행했습니다. 예측 결과를 P-C(Correct), P-V(Vulnerable), P-B(Benign), P-R(Reversed)의 네 유형으로 구분하고, 올바른 판단과 역전된 판단의 차이를 측정하는 VPS(Vulnerability Pairwise Score)를 활용해 다양한 취약점 탐지 방법을 비교했습니다.

실험 결과, 기존 방법들은 일반적인 분류 성능과 달리 취약 코드와 패치 코드를 동시에 정확하게 구별하는 데 상당한 한계가 있음을 확인했습니다. 이를 통해 AI 기반 취약점 탐지 기술을 실제 보안 점검에 적용하기 위해서는 단순 탐지 정확도뿐 아니라 보안에 영향을 주는 코드 변화와 취약점의 원인을 구별하는 능력까지 검증해야 함을 제시했습니다.

해당 연구는 현재 IEEE Transactions on Dependable and Secure Computing 에 제출한 상태입니다.

---

## CLEAR: Causal Context-Based Agentic Reasoning for Vulnerability Detection {#clear}

기존 AI 기반 소프트웨어 취약점 탐지 기술이 코드의 표면적인 특징에 의존하여 취약 코드와 패치 코드를 정확하게 구별하지 못하는 문제를 해결하기 위한 연구입니다. 취약점은 특정 코드 패턴만으로 발생하는 것이 아니라 여러 원인과 조건이 결합되어 발생하므로, LLM이 취약점을 판단할 때 이러한 인과관계를 함께 고려해야 한다는 점에 주목했습니다.

이를 위해 취약점의 발생 원인과 조건, 관련 요소 간 관계를 구조화한 **Vulnerability Causal Knowledge Graph(VCKG)**를 구축했습니다. 분석 대상과 관련된 인과 지식만 선택적으로 검색하여 불필요한 정보가 추론을 방해하는 것을 줄이고, Collector, Claim, Critic, Judge로 역할을 분리한 Multi-Agent Reasoning을 통해 취약점 분석 결과를 단계적으로 생성하고 검증하도록 설계했습니다.

실험 결과, SOTA 방법론 대비 130.7% 성능 향상을 기록했습니다. 이를 통해 단순히 외부 보안 지식을 LLM에 제공하는 것을 넘어, 취약점의 원인과 조건을 구조화하고 현재 분석에 필요한 지식을 선택적으로 활용하며 여러 Agent가 판단을 검증하는 방식이 취약 코드와 패치 코드의 미세한 차이를 구별하는 데 효과적임을 확인했습니다.

이러한 성과를 인정받아 IEEE/ACM International Conference on Automated Software Engineering 2026 에 최종 Accept 되었습니다.

---

## CRAFT: Causality-aware Reasoning and Adaptive Framework for Vulnerability Types {#craft}

기존 인과 지식 기반 취약점 탐지 방법이 서로 다른 원인으로 발생하는 취약점을 동일한 지식과 추론 방식으로 분석한다는 한계를 개선하기 위한 연구입니다. 실제 소프트웨어 취약점은 프로그램의 상태 변화, 실행 과정, 입력 조건, 보안 정책 등 서로 다른 메커니즘으로 발생하므로, 취약점의 특성에 따라 판단에 필요한 지식과 분석 관점도 달라져야 한다는 점에 주목했습니다.

이를 위해 취약점의 발생 메커니즘을 State, Execution, Constraint, Policy의 네 가지 Causality Type으로 구분하고, 유형별 인과 지식을 구조화한 **Causality-Typed Vulnerability Knowledge Graph(CTVKG)**를 설계했습니다. 또한 취약점 유형에 특화된 Expert Agent가 서로 다른 관점에서 코드를 분석하고, Collector, Claim, Critic, Judge가 분석 결과를 단계적으로 생성하고 검증하는 Causality-aware Multi-Agent Reasoning 구조를 구축했습니다.

실험 결과, PrimeVul에서 CLEAR 대비 Pairwise Correct Prediction(P-C)을 27.15% 상대 개선했으며, VPS 역시 -4.20에서 11.85로 16.05%p 향상되었습니다. 또한 Typed Representation을 제거했을 때 P-C가 21.31에서 2.99로 크게 감소했습니다. 이를 통해 모든 취약점을 동일하게 분석하는 것보다 발생 메커니즘에 따라 지식을 구조화하고 유형에 적합한 Agent가 분석·검증하는 방식이 취약점 판단 성능을 높이는 데 효과적임을 확인했습니다.

---

## Project {#project}

### 거대 언어 모델 기반 안드로이드 취약점 자동 탐지 연구

- 프로젝트기관: (재)한국연구재단
- 기간: 2026-04 ~ 2027-03
- 역할: 연구원

대규모 언어 모델(LLM)을 활용한 거대 언어 모델 기반 안드로이드 취약점 자동 탐지 연구를 수행했습니다. 기존 SOTA 모델 대비 130.7% 성능 향상을 보였으며, IEEE/ACM International Conference on Automated Software Engineering 에 최종 Accept 되었습니다.

### 침해대응/분석 경진대회

- 프로젝트기관: 한국전력공사
- 기간: 2022-09 ~ 2022-09
- 역할: PE

실제 침해사고 유형과 대응 방안을 직접 경험했습니다.
수행한 내역은 다음과 같습니다.

- 웹 취약점 분석 및 공격 흐름 재현
- Linux / Windows 로그 및 시스템 아티팩트 분석
- WebShell / Reverse Shell 흔적 분석
- Dirty Pipe (CVE-2022-0847) 기반 권한 상승 과정 분석
- Docker 기반 Firewall / IPS / WAF 환경 구축
- iptables / Snort3 / ModSecurity를 활용한 탐지 및 방어 환경 구성

해당 대회에서 우수한 성적을 거두어 우수상을 수상했습니다.

---

## 특허 {#patent}

### 지식 그래프에 기반한 소프트웨어 취약점 탐지 방법 및 이를 위한 컴퓨터 장치

- 구분: 특허
- 출원번호: 10-2025-0199398
- 출원국가: 대한민국
- 출원일: 2025.12.15

소프트웨어 취약점 탐지 성능을 향상시키기 위해 취약점의 발생 원인과 조건을 구조화된 인과 지식으로 표현하고, 이를 지식 그래프로 구축하여 취약점 분석에 활용하는 방법을 제안했습니다. 소스코드와 취약점 정보를 기반으로 취약점의 원인, 조건 및 관련 요소 간 관계를 추출하고 그래프 형태로 구조화함으로써, 기존 탐지 방식이 코드의 표면적인 특징에 의존하는 한계를 보완하고자 했습니다. 구축된 지식 그래프는 취약점 탐지 과정에서 관련 지식을 검색하고 분석하는 데 활용할 수 있도록 설계했습니다.

---

## Career {#career}

### 유핀테크허브

- 고용형태: 정규
- 기간: 2023-10-31 ~ 2024-12-04
- 근무부서: 정보보안팀
- 최종직위: 사원

자사 클라우드 인프라 및 정보보안 업무를 수행했습니다. 또한, 미국 서비스 출시를 위한 us-west-2 region 인프라를 설계하고 운용했습니다.
