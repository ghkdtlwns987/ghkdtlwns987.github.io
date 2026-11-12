---
layout: portfolio
title: 황시준(Sijune Hwang)
subtitle:
permalink: /portfolio/security/
sitemap: false
robots: noindex, nofollow
description: >-
  황시준, 정보보호학과 석사과정. 취약점 분석·침해대응과 LLM 기반 취약점 탐지 연구를 정리한 정보보호 포트폴리오.
---

## Software Security & Incident Response

소프트웨어 취약점을 공격자의 관점에서 분석하고, 로그와 아티팩트를 연결해 침해 경로를 재구성해 온 경험을 바탕으로 정보보호 업무에 기여하고자 합니다. 대학원에서는 이 경험을 Knowledge Graph와 Multi-Agent Reasoning 기반 취약점 탐지 연구로 확장했습니다.

**Research Keywords**

- Software Security
- Vulnerability Analysis
- Incident Response
- Large Language Model
- Agentic AI
- Knowledge Graph

## Index

[00. Why Information Security](#why-security)  
[01. Research Overview](#research-overview)  
[02. Publications](#publications)  
   - [CLEAR: Causal Context-Based Agentic Reasoning for Vulnerability Detection](#clear)  
   - [CRAFT: Causality-aware Reasoning and Adaptive Framework for Vulnerability Types](#craft)  
   - [An Empirical Study of Vulnerability Detection under Pairwise Evaluation](#empirical-study)  
[03. Projects](#projects)  
   - [3.1 Unreal Engine 퍼징 기반 취약점 분석](#unreal)  
   - [3.2 침해사고 분석 및 대응](#hccc)  
   - [3.3 보안 실습 환경 구축 및 교육](#teaching)  
[04. Skills](#skills)  
[05. Awards](#awards)

<next></next>
# 00. Why Information Security {#why-security}

정보보호는 새로운 공격 기법을 아는 것만으로 충분하지 않다고 생각합니다. 서비스와 시스템이 실제로 어떻게 구성되어 있는지를 이해하고, 취약점이 어떤 조건에서 공격으로 이어지는지를 재현·검증한 뒤, 그 결과를 조치와 운영에 연결해야 합니다.

저는 소프트웨어 취약점 분석을 통해 공격 표면을 찾고 재현 가능한 조건으로 검증해 왔으며, 침해사고 분석에서는 웹 서버와 엔드포인트에 남은 증거를 시간순으로 연결해 공격 경로를 재구성했습니다. 분석에서 그치지 않고 확인된 취약점을 수정하고 방화벽·IPS·WAF를 구성해 대응 환경까지 만들었습니다.

대학원에서는 이 관점을 AI 기반 분석으로 확장했습니다. 취약 코드와 패치 코드처럼 겉모습은 비슷하지만 보안 의미는 다른 입력을, 모델이 원인과 조건을 근거로 구별하도록 Knowledge Graph와 Multi-Agent Reasoning을 설계했습니다. 탐지 결과 자체보다 **왜 그렇게 판단했는지, 패치 이후 조건이 실제로 바뀌었는지를 검증하는 일**이 중요하다는 점을 확인했습니다.

금융 서비스와 같이 가용성과 신뢰가 중요한 환경에서는, 발견한 문제를 일회성 진단으로 남기지 않고 재현 조건·영향 범위·대응 조치를 함께 정리하는 분석이 필요하다고 생각합니다. 취약점 분석, 침해 대응, 보안 인프라 운영, AI 기반 분석 경험을 바탕으로 서비스의 위험을 찾고 검증하며 재발하지 않도록 만드는 정보보호 업무에 기여하고 싶습니다.

<next></next>
# 01. Research Overview {#research-overview}

## Research Question

**취약점과 침해 흔적을 표면적인 패턴이 아니라 원인과 조건으로 설명할 수 있는가?**

취약점 탐지와 침해 분석 모두, 단편적인 신호만으로는 실제 위험을 판단하기 어렵습니다. 취약 코드와 패치 코드는 대부분의 구조를 공유하고, 침해 흔적은 서버 로그·엔드포인트 아티팩트·악성 실행파일에 나뉘어 있습니다.

저는 이러한 문제를 해결하기 위해 다음 세 가지에 집중했습니다.

- 취약점 또는 침해가 **어떤 조건에서 성립하는지** 구조화할 것
- 여러 증거를 **교차 확인**해 시도·정황과 확인된 사실을 구분할 것
- 분석 결과를 **재현 가능한 절차와 대응**으로 남길 것

대학원 연구에서는 취약점의 진입 지점, 사전 조건, 근본 원인, 수정 의도를 Knowledge Graph로 표현하고, 현재 코드와 관련된 지식만 검색해 여러 Agent가 가설을 만들고 반박·검증하도록 설계했습니다.

이를 통해 특정 도구의 탐지 결과에 의존하기보다, 원인과 조건을 근거로 판단하고 그 판단을 다시 검증하는 분석 방식을 연구하고 있습니다.

| 역량 | 근거 경험 | 정보보호 업무와의 연결 |
|:--|:--|:--|
| 취약점 분석·검증 | Unreal Engine 퍼징 및 코드 감사, 취약점 탐지 연구 | 서비스·소스코드의 취약점을 발견하고 원인을 검증 |
| 침해 분석·대응 | 웹 서버와 Windows PC의 침해 흔적 분석, 웹 취약점 조치 | 로그·아티팩트를 연결해 공격 경로를 재구성하고 대응책 수립 |
| 보안 인프라 구성·운영 | 실습 환경 구축, 웹 서비스 보안 정책 적용 및 운영 | 시스템 구성과 보호 조치의 적정성 검토 |
| AI 활용·평가 | 인과 지식그래프와 LLM 에이전트 기반 취약점 탐지 연구 | AI 기반 분석 방법을 설계하고 탐지 결과를 검증 |

<next></next>
# 02. Publications {#publications}

## CLEAR: Causal Context-Based Agentic Reasoning for Vulnerability Detection {#clear}

**IEEE/ACM International Conference on Automated Software Engineering (ASE 2026)** · First Author

- [Paper Link (arXiv)](https://arxiv.org/pdf/2608.03134)
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
관련 취약점의 지식을 **Neighborhood → Global** 단계로 연결하여
다양한 취약점에서 활용할 수 있는 인과 지식으로 확장했습니다.

{% include paper-figure-panel.html
  cols=3
  src1="portfolio/clear-1-local-vckg.png"
  cap1="1. Local VCKG — 취약점별 원인과 조건 구조화"
  alt1="Local Vulnerability Causal Knowledge Graph Example"
  src2="portfolio/clear-2-neighborhood.png"
  cap2="2. Neighborhood Integration — 관련 취약점 간 지식 연결"
  alt2="Neighborhood Edge Integration"
  src3="portfolio/clear-3-global-edge.png"
  cap3="3. Global Integration — 전역 인과 지식으로 확장"
  alt3="Global Edge Integration"
  caption="VCKG Construction: Local → Neighborhood → Global"
%}

#### 최종 제작된 VCKG

{% include paper-figure.html src="portfolio/clear-5-vckg-design.png" alt="Design of Vulnerability Causal Knowledge Graph" caption="최종 제작된 VCKG" width="480" %}

### 2. Selective Knowledge Retrieval

구축된 VCKG 전체를 LLM에게 제공하는 대신, **현재 분석 대상과 관련된 Causal Context를 선택적으로 검색**하여 불필요한 정보가 추론 과정에 포함되는 것을 줄였습니다.

{% include paper-figure.html src="portfolio/clear-4-causal-retrieval.png" alt="Causal Context Retrieval" caption="Causal Context Retrieval — 분석에 필요한 인과 지식 선택" width="420" %}

### 3. Multi-Agent Reasoning

검색된 Causal Context를 기반으로 여러 Agent가 역할을 나누어 취약 여부를 분석하고 검증하도록 추론 과정을 설계했습니다.

- **Collector Agent**: Causal Context 수집
- **Claim Agent**: 분석 결과 및 가설 생성
- **Critic Agent**: 가설 반박 및 검증
- **Judge Agent**: 분석 결과를 종합하여 최종 판단

### 무엇을 증명했는가?

취약 코드와 패치 코드를 Pair로 구성하여 모델이 두 코드의 미세한 차이를 얼마나 잘 구분하는지 평가했습니다. PrimeVul에서 Pair-Correct(P-C) **19.17%**, 기존 Multi-Agent SOTA 대비 **130.7%** 상대 개선을 확인했습니다.

탐지 성능뿐 아니라 **패치 후 달라진 조건을 올바르게 판단하는지**를 함께 검증해야 함을 확인한 연구입니다.

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

CLEAR를 통해 인과 지식과 Multi-Agent Reasoning이 LLM의 판단을 보완할 수 있음을 확인했습니다. 그러나 후속 분석에서 취약점마다 발생 원인과 판단에 필요한 정보가 서로 다르다는 점에 주목했습니다.

프로그램의 상태 변화에서 발생하는 취약점과 권한·보안 정책 위반으로 발생하는 취약점은 확인해야 할 정보와 추론 방식이 다릅니다. 모든 취약점을 하나의 인과 구조와 동일한 추론 방식으로 분석하는 데에는 한계가 있다고 판단했습니다.

## Research Question

**취약점의 발생 메커니즘에 따라 지식 표현과 Agent의 추론 방식을 다르게 설계하면 어떨까?**

### Methodology

**Causality-Typed Knowledge + Expert Reasoning**

취약점의 발생 메커니즘을 네 가지 Causality Type으로 재분류하고, 각 유형에 필요한 지식을 구조화한 **Causality-Typed Vulnerability Knowledge Graph (CTVKG)**를 설계했습니다.

- **State**: 프로그램 상태 변화
- **Execution**: 실행 흐름과 연산 과정
- **Constraint**: 입력, 경계 및 조건 위반
- **Policy**: 권한 및 보안 정책 위반

또한 취약점 유형에 특화된 Expert가 분석하고, Claim·Critic·Judge가 결과를 검증하도록 Multi-Agent Reasoning 구조를 확장했습니다.

### 무엇을 증명했는가?

CLEAR 대비 Pairwise Correct Prediction (P-C) **27.15%** 상대 개선을 확인했습니다. Typed Representation을 제거했을 때 P-C가 **21.31에서 2.99**로 크게 감소하여, 문제 유형에 적합한 지식 표현이 판단 성능에 중요하다는 점을 확인했습니다.

---

<next></next>
## An Empirical Study of Vulnerability Detection under Pairwise Evaluation {#empirical-study}

**Master's Thesis**, Department of Information Security

### Problem Definition

**기존 AI 기반 취약점 탐지 기술은 취약 코드와 패치 코드의 미세한 차이를 실제로 식별하고 있는가?**

기존 방법은 높은 분류 성능을 보여왔지만, 그 성능이 실제 취약점의 원인이 되는 코드 차이를 식별한 결과인지는 별도로 확인할 필요가 있습니다. 동일 함수의 취약 버전과 패치 버전은 대부분의 구조와 기능을 공유하며, 보안과 관련된 미세한 차이만 존재하는 경우가 많습니다.

### Research Question

**기존 취약점 탐지 방법은 동일 함수의 취약 버전과 패치 버전을 동시에 정확하게 구별할 수 있는가?**

### Methodology

PrimeVul의 Pairwise Evaluation을 기반으로 기존 AI 기반 취약점 탐지 방법을 재평가했습니다. 동일 함수의 취약 버전과 패치 버전을 하나의 Pair로 구성하고, 두 코드에 대한 예측을 함께 분석했습니다.

- **P-C (Correct)**: 취약 버전은 취약, 패치 버전은 정상으로 올바르게 판단
- **P-V (Vulnerable)**: 두 버전을 모두 취약으로 판단
- **P-B (Benign)**: 두 버전을 모두 정상으로 판단
- **P-R (Reversed)**: 취약 버전과 패치 버전을 반대로 판단

### 무엇을 확인했는가?

기존 방법들은 일반적인 분류 성능과 달리, 취약 버전과 패치 버전을 동시에 정확하게 구별하는 데 한계가 있었습니다. AI 기반 탐지를 평가할 때 분류 성능뿐 아니라 **모델이 실제 보안 관련 코드 변화를 식별하는지**를 함께 검증해야 한다는 점을 실증적으로 분석했습니다.

<next></next>
# 03. Projects {#projects}

## 3.1 Unreal Engine 퍼징 기반 취약점 분석 {#unreal}

**2021.07 ~ 2022.03** · 차세대 보안리더 양성 프로그램(BoB) 10기 취약점 분석 트랙

| 항목 | 내용 |
|:--|:--|
| 목표 | Unreal Engine 파일 파서와 Pixel Streaming 기능의 공격면을 분석하고 실제 취약점을 발견·검증 |
| 역할 | 퍼징 환경 구축, AFL++ 계측, 코드 감사, PoC 작성 |
| 사용 기술 | C/C++, AFL++, Clang/LLVM, Unreal Engine, WinDbg/GDB, Linux |

대형 엔진의 기본 빌드 환경에는 퍼징 도구를 그대로 적용하기 어려웠습니다. UnrealBuildTool을 수정해 AFL++ Instrumentation을 적용하고, 리소스 파일 파서와 Pixel Streaming의 입력 지점을 대상으로 퍼징과 코드 감사를 병행했습니다. 발견한 문제는 재현 가능한 PoC로 검증했습니다.

**결과**

- Remote Code Execution 2건, Denial of Service 1건 발굴
- Epic Games Bug Bounty **$17,500**
- 탐지 결과 자체보다 재현 조건, 영향 범위, 원인 코드를 확인하는 것이 취약점 분석의 핵심임을 확인

---

## 3.2 침해사고 분석 및 대응 {#hccc}

**2022.09** · HCCC 침해대응·분석 경진대회 우수상

| 항목 | 내용 |
|:--|:--|
| 목표 | 웹 서버와 Windows PC에 남은 증거를 연결해 침해 경로를 재구성하고 취약점을 조치 |
| 역할 | 웹 서버·PC 침해 흔적 분석, 웹 취약점 조치, 방어 환경 구성 |
| 사용 기술 | Apache·SSH 로그, Windows 이벤트·파일 아티팩트, PHP·SQL, Docker, iptables, Snort 3, ModSecurity |

공격 흔적이 서버 로그, PC 이벤트, 악성 실행파일에 나뉘어 있어 한 자료만으로는 전체 흐름을 설명하기 어려웠습니다. 웹셸 실행·리버스 셸·권한 상승·백도어·DB 조작 정황을 서버 증거로 연결하고, PC에서는 다운로드·실행·지속성·C2 연결 흔적을 시간순으로 대조했습니다. 전송의 **시도·정황**과 **성공이 확인된 사실**은 구분했습니다.

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
- 확인된 웹 취약점에 입력 처리·업로드·접근 정책 수정
- Docker 기반 Firewall / IPS / WAF 환경 구축 (iptables / Snort 3 / ModSecurity)

단일 취약점만 분석하는 것이 아니라 초기 침투부터 권한 상승과 후속 행위까지 연결하여 공격 경로를 재구성하고, 분석 결과를 바탕으로 방어 환경까지 구성했습니다.

---

## 3.3 보안 실습 환경 구축 및 교육 {#teaching}

**2022.01 ~ 2023.07** · 정보보안 강사

| 항목 | 내용 |
|:--|:--|
| 목표 | 보안 인프라 설정을 암기하는 대신 상황에 맞게 원리를 적용하도록 교육 |
| 역할 | 실습 환경 구성, 강의 자료 제작, 실습·문제풀이 지도 |
| 사용 기술 | VMware, Linux, Apache, 방화벽, 웹 보안 실습 환경 |

VMware 기반 정보보안 실습 환경을 구축하고 Web Hacking / Pwnable / Reversing 커리큘럼을 설계했습니다. 풀이 순서만 외우는 문제를 줄이기 위해 설명과 실습 문제를 반복적으로 수정했습니다.

지도 학생이 사이버보안 지방 기능경기대회에서 금·은·동·장려상, 전국대회에서 은상과 장려상을 받았고, 국제 기능올림픽 출전을 지도했습니다. 기술적 내용을 재현 가능한 절차로 문서화하고, 상대의 이해 수준에 맞게 설명하는 경험을 쌓았습니다.

<next></next>
# 04. Skills {#skills}

## 학습 이력

| 구분 | 기간 | 내용 |
|:--|:--|:--|
| 컴퓨터공학 전공 | 2018.03 ~ 2024.02 | 운영체제, 네트워크, 프로그래밍, 데이터베이스 기반의 시스템 이해 |
| 정보보호 대학원 연구 | 2025.03 ~ 2027.02 예정 | 소프트웨어 취약점 탐지, 취약·패치 코드 쌍 평가, LLM·지식그래프 기반 분석 |
| 차세대 보안리더 양성 프로그램 취약점 분석 트랙 | 2021.07 ~ 2022.03 | 퍼징, 코드 감사, 취약점 재현·검증을 Unreal Engine 분석에 적용 |

## 지식·기술·도구

활용 수준은 주관적인 상·중·하 대신 **직접 수행한 작업**으로 적었습니다.

| 분야 | 지식·기술·도구 | 활용 근거 |
|:--|:--|:--|
| 취약점 분석 | C/C++, AFL++, Clang/LLVM, WinDbg/GDB | Unreal Engine 빌드 시스템에 퍼징 계측을 적용하고 파일 파서·네트워크 컴포넌트를 분석 |
| 침해 분석 | Linux·Apache 로그, Windows 이벤트·파일 아티팩트 | 웹 서버와 PC의 침해 흔적을 교차 분석해 공격 흐름을 재구성 |
| 보안 조치 | PHP·SQL, iptables, Snort 3, ModSecurity | 웹 취약점 수정과 방화벽·IPS·WAF 구성 |
| AI 기반 분석 | Python, LangChain, GPT-4o-mini, 지식그래프 | 취약점 인과 지식의 검색·필터링·추론·평가 |
| 보안 인프라 | Linux, VMware, Apache, 방화벽·SSL/TLS | 보안 실습 환경과 웹 서비스 운영 환경을 구성하고 보안 설정을 적용 |

<next></next>
# 05. Awards {#awards}

### 웹 취약점 분석 경진대회 대상

**2022.09.28** · KOSPO

공공기관 웹 서비스를 대상으로 취약점을 분석하고 실제 공격 가능성을 검증했습니다.

- 웹 애플리케이션 공격 표면 분석
- 입력값 처리 과정의 취약점 점검
- 인증 및 인가 로직 분석
- 취약점 발생 조건 및 공격 가능성 검증

자동화 도구의 탐지 결과에만 의존하지 않고, 발견한 취약점이 어떤 조건에서 발생하며 실제 공격으로 연결될 수 있는지를 직접 검증하는 데 집중했습니다.

---

### HCCC 침해대응·분석 경진대회 우수상

**2022.09.30** · 한국전력

웹 서비스와 시스템을 대상으로 침해사고의 공격 흐름을 재현하고 로그와 시스템 아티팩트를 분석했습니다. 분석 결과를 바탕으로 취약점 조치와 Docker 기반 방어 환경 구성까지 수행했습니다.
