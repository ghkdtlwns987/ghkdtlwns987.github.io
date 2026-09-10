---
layout: portfolio
title: 황시준(Sijune Hwang)
subtitle:
permalink: /portfolio/karrot/
sitemap: false
robots: noindex, nofollow
description: >-
  황시준, 정보보호학과 석사과정. Software Security와 LLM 기반 취약점 분석을 연구하며 Agentic AI Security에 관심을 두고 있습니다.
---

## Security & Agentic AI

소프트웨어 취약점을 공격자의 관점에서 분석해 온 경험과 LLM 기반 취약점 탐지 연구를 바탕으로, 외부 지식과 Multi-Agent Reasoning을 활용한 **Agentic AI의 분석과 검증**을 연구합니다.

**Blog:** [https://ghkdtlwns987.github.io](https://ghkdtlwns987.github.io/)

**Research Keywords**

- Software Security
- Large Language Model
- Agentic AI
- Multi-Agent Reasoning
- Knowledge Graph
- Retrieval Augmented Generation (RAG)

## Index

1. [00. Why Karrot](#why-karrot)
2. [01. Research Overview](#research-overview)
3. [02. Publications](#publications)
   - [CLEAR](#clear)
   - [CRAFT](#craft)
4. [03. Research Projects](#research-projects)
5. [04. Projects](#projects)
   - [4.1 교내 라이브 코딩 시스템](#live-coding)
   - [4.2 AI 기반 Malware Detection MSA](#malware-detection)
6. [05. Awards](#awards-certifications)

<next></next>
# 00. Why Karrot {#why-karrot}

당근의 AI 기능을 안전하게 만들기 위해서는 새로운 공격 기법을 아는 것뿐 아니라 실제 AI 기능이 어떤 구조로 동작하는지를 이해하고 공격 가능성을 반복적으로 검증할 수 있어야 한다고 생각합니다.

저는 소프트웨어 취약점 분석을 통해 공격 표면을 찾고 공격 경로를 검증하는 경험을 쌓았으며, LLM 연구에서는 Retrieval, Knowledge Graph, Multi-Agent Reasoning과 Verification을 직접 설계하고 구현했습니다.

이를 바탕으로 당근의 AI 기능을 Prompt부터 Retrieval, Agent, Tool, Output까지 하나의 시스템으로 바라보고 공격/방어자의 관점에서 발생 가능한 시나리오를 정의하고 검증하고 싶습니다. 나아가  발견한 문제를 일회성 진단 결과로 남기지 않고 반복 가능한 테스트와 평가 방법으로 만들어 AI 기능 개발 과정에서 지속적으로 활용할 수 있는 Red Teaming 체계를 구축하는 데 기여하고 싶습니다.

AI Security에는 아직 업계 전체가 답을 찾아가는 중인 문제가 많다는 것을 알고 있습니다. 저는 "완벽한 답"을 미리 갖고 오기보다, 당근의 서비스와 조직 상황을 이해하며 팀과 함께 지금 상황에 맞는 최선의 답을 찾아가는 과정에 기여하고 싶습니다.

<next></next>
# 01. Research Overview {#research-overview}

## Research Question

**LLM은 취약 코드와 패치 코드의 미세한 차이를 이해하고 정확하게 판단할 수 있는가?**

LLM을 활용한 소프트웨어 취약점 탐지를 연구하며, 모델이 단순한 코드 패턴에 의존하는 것이 아니라 취약점이 발생하는 원인과 조건을 근거로 판단할 수 있는 방법을 연구했습니다.

취약 코드와 이를 수정한 패치 코드는 대부분의 코드 구조가 동일하고 보안과 관련된 일부 코드만 변경됩니다. 기존 방법들은 이러한 미세한 차이를 정확하게 구별하는 데 어려움이 있었고, LLM 역시 코드의 표면적인 특징에 의존할 경우 취약점이 발생하는 원인과 조건을 충분히 고려하지 못할 수 있습니다.

또한 RAG를 통해 외부 보안 지식을 제공하더라도 현재 분석 대상과 관련성이 낮은 정보가 검색되면 오히려 LLM의 판단을 방해할 수 있습니다.

저는 이러한 문제를 해결하기 위해 **취약점이 발생하는 원인과 조건을 어떻게 구조화할 것인지**, **현재 분석에 필요한 지식을 어떻게 선택할 것인지**, **LLM의 판단을 어떻게 다시 검증할 것인지**에 집중했습니다.

이를 위해 Knowledge Graph, RAG, Multi-Agent Reasoning을 결합하여 필요한 보안 지식을 선택적으로 검색하고 여러 Agent가 서로 다른 역할로 분석과 검증을 수행하는 Agentic AI 시스템을 설계했습니다.

<next></next>
# 02. Publications {#publications}

## CLEAR: Causal Context-Based Agentic Reasoning for Vulnerability Detection {#clear}

**IEEE/ACM International Conference on Automated Software Engineering (ASE 2026)**

- [Paper Link(arXiv)](https://arxiv.org/pdf/2608.03134)
- [Conference Link](https://conf.researchr.org/details/ase-2026/ase-2026-research-track/227/CLEAR-Causal-Context-Based-Agentic-Reasoning-for-Vulnerability-Detection)

### Problem Definition

**기존 LLM은 왜 취약 코드와 패치 코드를 혼동하는가?**

취약 코드와 이를 수정한 패치 코드는 대부분의 코드 구조가 동일하고 코드의 일부분만 변경됩니다. 기존 Deep Learning 기반 방법은 이러한 미세한 차이를 식별하는 데 어려움이 있으며, LLM 역시 코드의 표면적인 패턴에 의존할 경우 취약점이 발생하는 원인과 조건을 충분히 고려하지 못할 수 있습니다.

RAG를 활용하면 외부 보안 지식을 제공할 수 있지만, 검색된 정보를 그대로 제공하면 현재 코드와 관련성이 낮은 정보까지 추론 과정에 포함되어 LLM의 판단을 방해할 수 있습니다.

따라서 취약점 탐지를 단순한 코드 패턴 분류가 아니라 **취약점이 발생하는 원인과 조건을 근거로 판단하는 문제**로 접근했습니다.

## Research Question

**LLM에게 취약점이 발생하는 원인과 관계를 구조화된 지식으로 제공하면 LLM의 추론 성능이 향상되지 않을까?**

### Methodology

**Causal Knowledge + Agentic Reasoning**

취약점 발생 원인과 관련 요소 간 관계를 구조화한 **Vulnerability Causal Knowledge Graph (VCKG)**를 설계하고, 현재 코드 분석에 필요한 인과 지식을 선택적으로 검색하여 Multi-Agent Reasoning의 근거로 활용했습니다.

{% include paper-figure.html src="portfolio/CLEAR_Overview.png" alt="CLEAR Overview" caption="CLEAR Overview" %}

### 1. Causal Knowledge Construction

취약점별 원인과 조건을 **Local VCKG**로 구조화한 뒤,<br>
관련 취약점의 지식을 **Neighborhood -> Global** 단계로 연결하여
다양한 취약점에서 활용할 수 있는 인과 지식으로 확장했습니다.

{% include paper-figure-panel.html
  cols=3
  src1="portfolio/clear-1-local-vckg.png"
  cap1="1. Local VCKG - 취약점별 원인과 조건 구조화"
  alt1="Local Vulnerability Causal Knowledge Graph Example"
  src2="portfolio/clear-2-neighborhood.png"
  cap2="2. Neighborhood Integration — 관련 취약점 간 지식 연결"
  alt2="Neighborhood Edge Integration"
  src3="portfolio/clear-3-global-edge.png"
  cap3="3. Global Integration — 전역 인과 지식으로 확장"
  alt3="Global Edge Integration"
  caption="VCKG Construction: Local -> Neighborhood -> Global"
%}

#### 최종 제작된 VCKG

위 과정을 거쳐 구축된 Vulnerability Causal Knowledge Graph입니다.

{% include paper-figure.html src="portfolio/clear-5-vckg-design.png" alt="Design of Vulnerability Causal Knowledge Graph" caption="최종 제작된 VCKG" width="480" %}

### 2. Selective Knowledge Retrieval

구축된 VCKG 전체를 LLM에게 제공하는 대신, **현재 분석 대상과 관련된 Causal Context를 선택적으로 검색**하여 불필요한 정보가 추론 과정에 포함되는 것을 줄였습니다.

{% include paper-figure.html src="portfolio/clear-4-causal-retrieval.png" alt="Causal Context Retrieval" caption="Causal Context Retrieval — 분석에 필요한 인과 지식 선택" width="420" %}

### 3. Multi-Agent Reasoning

검색된 Causal Context를 기반으로 여러 Agent가 역할을 나누어 취약 여부를 분석하고 검증하도록 추론 과정을 설계했습니다.

- **Collector Agent** : Causal Context 수집
- **Claim Agent** : 분석 결과 및 가설 생성
- **Critic Agent** : 가설 반박 및 검증
- **Judge Agent** : 분석 결과를 종합하여 최종 판단

### 무엇을 증명했는가?

취약 코드와 패치 코드를 Pair로 구성하여 모델이 두 코드의 미세한 차이를 얼마나 잘 구분하는지 평가했습니다.

그 결과 구조화된 인과 지식을 선택적으로 제공하고 여러 Agent가 분석 결과를 검증하는 방법이 LLM의 취약점 판단을 개선할 수 있음을 확인했습니다.

### Research Contribution

- Vulnerability Causal Knowledge Graph 제안
- Selective Knowledge Retrieval 구조 설계
- LLM Multi-Agent Reasoning Pipeline 구현
- SOTA 대비 약 **130.7%** 성능 개선

---




<next></next>
## CRAFT: Causality-aware Reasoning and Adaptive Framework for Vulnerability Types {#craft}

**IEEE Transactions on Dependable and Secure Computing (TDSC)** — Submitted

Paper Link: Under Review / Not Publicly Available

### Problem Definition

**서로 다른 원인으로 발생하는 취약점을 동일한 방식으로 분석하는 것이 최선인가?**

CLEAR를 통해 인과 지식과 Multi-Agent Reasoning이 LLM의 판단을 보완할 수 있음을 확인했습니다. 그러나 후속 분석에서 취약점마다 발생 원인과 판단에 필요한 정보가 서로 다르다는 점에 주목했습니다. 예를 들어 프로그램의 상태 변화에서 발생하는 취약점과 권한 및 보안 정책 위반으로 발생하는 취약점은 확인해야 할 정보와 추론 방식이 다릅니다.

이에 모든 취약점을 하나의 방식으로 분석하는 대신, **취약점의 발생 메커니즘에 따라 필요한 지식과 Agent의 분석 관점을 달리해야 한다**고 판단했습니다.

## Research Question

**취약점의 발생 메커니즘에 따라 지식 표현과 Agent의 추론 방식을 다르게 설계하면 어떨까?**

### Methodology

**Causality-Typed Knowledge + Expert Reasoning**

취약점의 발생 메커니즘을 네 가지 Causality Type으로 재분류하고, 각 유형에 필요한 지식을 구조화한 **Causality-Typed Vulnerability Knowledge Graph (CTVKG)**를 설계했습니다.

- **State** : 프로그램 상태 변화
- **Execution** : 실행 흐름과 연산 과정
- **Constraint** : 입력, 경계 및 조건 위반
- **Policy** : 권한 및 보안 정책 위반

또한 취약점 유형에 특화된 Expert가 분석하고, Claim, Critic, Judge가 결과를 검증하도록 Multi-Agent Reasoning 구조를 확장했습니다.

### 무엇을 증명했는가?

CLEAR 대비 Pairwise Correct Prediction (P-C) **27.15% 상대 개선**을 확인했습니다. 특히 Typed Representation을 제거했을 때 P-C가 **21.31에서 2.99**로 크게 감소하여, 문제 유형에 적합한 지식 표현이 실제 판단 성능에 중요한 역할을 한다는 점을 확인했습니다.

# 03. Research Projects {#research-projects}

| 항목 | 내용 |
|:--|:--|
| 과제명 | 거대 언어 모델 기반 안드로이드 취약점 탐지 및 자동 수리 |
| 발주기관명 | (재)한국연구재단 |
| 연구기간 | 2025.08.01 ~ |
| 역할 | 참여연구원 |

### 연구 목표

거대 언어모델의 코드 및 맥락 이해 능력을 활용하여 안드로이드 앱 내 취약점을 자동으로 탐지하고 수리하는 연구입니다.

### 수행 내용

- 취약점을 발생 메커니즘에 따라 네 가지 인과 유형으로 구조화
- 구조화된 인과관계를 Knowledge Graph로 구현
- LLM 기반 취약점 탐지 및 Multi-Agent Reasoning 연구
- 관련 연구 IEEE/ACM Automated Software Engineering 2026 채택

<next></next>
# 04. Projects {#projects}

## 4.1 교내 라이브 코딩 시스템 구축 및 운영 {#live-coding}
기한 : 2021.01 ~ 2023.09(PL)

교내 과제와 시험에 실제 사용되는 온라인 코드 채점 시스템의 Web / DB / Worker 환경을 구축하고 약 3년간 운영했습니다.

### Infrastructure & Security

- Ubuntu 기반 Web / DB / Worker 서버 구축
- SSL 적용 및 Firewall 정책 구성
- In / Out Traffic 통제
- DB Backup 자동화
- 장애 알림 및 서버 관리 자동화
- PHP 기반 기존 서비스의 보안 취약점 점검 및 수정

### Problem Solving

서비스 이용이 집중되는 과정에서 DB 작업 부하로 인해 DB와 Worker 간 동기화를 담당하는 Manager 프로세스가 종료되는 문제가 발생했습니다.

데이터 처리 구조와 요청 흐름을 분석한 뒤 **MySQL Replication**을 적용했습니다. Master에서 Create, Update, Delete를 처리하고 Slave에서 Read를 처리하도록 역할을 분리하여 DB 요청을 분산하고 시스템을 안정화했습니다.

실제 사용되는 서비스를 장기간 운영하며 인프라 구축, 보안 설정, 운영 자동화부터 장애 분석과 시스템 구조 개선까지 경험했습니다.

## 4.2 AI 기반 Malware Detection MSA {#malware-detection}

**Infrastructure**

AI 모델이 분석한 악성 시그니처 결과를 사용자에게 제공하는 Microservice Architecture 기반 서비스를 개발했습니다.

{% include paper-figure.html src="portfolio/malware-detection-infra.png" alt="AI 기반 Malware Detection 인프라 도식도" caption="AI 기반 Malware Detection Infrastructure" width="720" print="wide" %}

- Docker 기반 서비스 Containerization
- Kubernetes 기반 서비스 배포
- Jenkins 기반 CI / CD Pipeline 구축
- GitOps 기반 배포 환경 구성
- Prometheus / Grafana 기반 Monitoring

컨테이너 기반 다중 서비스 환경에서 서버 세션에 의존하지 않도록 JWT 기반 인증 구조를 적용했습니다.

또한 토큰 탈취 가능성을 고려해 인증 서버에서 발급 정보를 Redis에 저장하고 인증 요청 시 사용자 정보와 대조하도록 설계했습니다.

Kubernetes 배포 과정에서는 기존 Spring Cloud 기반 구성이 정상적으로 동작하지 않는 문제를 경험했습니다.  
Kubernetes와 CNI Network의 동작 방식을 분석하고 기존 구조를 배포 환경에 맞게 수정했습니다.

<next></next>
# 05. Awards & Certifications {#awards-certifications}

## Awards

### 웹 취약점 분석 경진대회 대상

**2022.09.28**

공공기관 웹 서비스를 대상으로 취약점을 분석하고 실제 공격 가능성을 검증했습니다.

- 웹 애플리케이션 공격 표면 분석
- 입력값 처리 과정의 취약점 점검
- 인증 및 인가 로직 분석
- 취약점 발생 조건 및 공격 가능성 검증
- 취약점의 보안 영향 분석

자동화 도구의 탐지 결과에만 의존하지 않고, 발견한 취약점이 어떤 조건에서 발생하며 실제 공격으로 연결될 수 있는지를 직접 검증하는 데 집중했습니다.

---

### HCCC 침해대응/분석 경진대회 우수상

**2022.09.30**

웹 서비스와 시스템을 대상으로 침해사고의 공격 흐름을 재현하고 로그와 시스템 아티팩트를 분석했습니다.

{% include paper-figure-panel.html
  cols=2
  src1="hccc/hccc1.png"
  cap1="침해사고 분석 개요"
  alt1="침해사고 분석 개요"
  src2="hccc/hccc2.png"
  cap2="공격 경로 및 로그 분석"
  alt2="공격 경로 및 로그 분석"
  src3="hccc/hccc3.png"
  cap3="침해 행위 분석"
  alt3="침해 행위 분석"
  src4="hccc/hccc4.png"
  cap4="대응 및 보안 강화"
  alt4="대응 및 보안 강화"
  caption="HCCC 침해사고 대응"
%}
**Attack Chain**

SQL Injection → File Upload → WebShell → Reverse Shell → Privilege Escalation → Persistence

**주요 수행 내용**

- 웹 취약점 분석 및 공격 흐름 재현
- Linux / Windows 로그 및 시스템 아티팩트 분석
- WebShell / Reverse Shell 흔적 분석
- Dirty Pipe (CVE-2022-0847) 기반 권한 상승 과정 분석
- Docker 기반 Firewall / IPS / WAF 환경 구축
- iptables / Snort3 / ModSecurity를 활용한 탐지 및 방어 환경 구성

단일 취약점만 분석하는 것이 아니라 초기 침투부터 권한 상승과 후속 행위까지 연결하여 공격 경로를 재구성하고, 분석 결과를 바탕으로 방어 환경까지 구성했습니다.

---