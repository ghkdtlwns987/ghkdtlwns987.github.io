---
layout: portfolio
title: 황시준(Sijune Hwang)
subtitle:
permalink: /portfolio/hyundai/
sitemap: false
robots: noindex, nofollow
description: >-
  황시준, 정보보호학과 석사과정. Software Security와 LLM 기반 취약점 분석을 연구하며 Agentic AI Security에 관심을 두고 있습니다.
---

## Security & Agentic AI

소프트웨어 취약점을 공격자의 관점에서 분석해 온 경험과 LLM 기반 취약점 탐지 연구를 바탕으로, 외부 지식과 Multi-Agent Reasoning을 활용한 **Agentic AI의 분석과 검증**을 연구합니다.

**Research Keywords**

- Software Security
- Large Language Model
- Agentic AI
- Multi-Agent Reasoning
- Knowledge Graph
- Retrieval Augmented Generation (RAG)

## Index

[00. Why Hyundai](#why-hyundai)  
[01. Research Overview](#research-overview)  
[02. Publications](#publications)  
   - [CLEAR: CLEAR: Causal Context-Based Agentic Reasoning for Vulnerability Detection](#clear)  
   - [CRAFT: Causality-aware Reasoning and Adaptive Framework for Vulnerability Types](#craft)  
   - [An Empirical Study of Vulnerability Detection under Pairwise Evaluation](#emperical-study)  

<next></next>
# 00. Why Hyundai {#why-hyundai}

현대자동차는 차량뿐만 아니라 IT 인프라와 클라우드, 전기차 충전시스템, 로보틱스 등 서로 다른 기술과 시스템이 연결되면서 보안의 대상과 범위도 함께 확장되고 있습니다. 저는 이러한 환경에서 **새로운 기술과 서비스가 만들어질 때 발생할 수 있는 취약점과 공격 경로를 분석하고, 실제 위험으로 이어지기 전에 검증하고 개선하는 Security Engineer**로 기여하고 싶습니다. 소프트웨어 취약점 분석을 통해 공격 가능성을 검증해 왔으며, 실제 서비스의 서버와 네트워크를 구축, 운영하면서 시스템 구조와 운영 환경을 이해해 왔습니다. 대학원에서는 이러한 경험을 AI 기반 취약점 분석으로 확장하여 Knowledge Graph와 Multi-Agent Reasoning을 활용한 분석 및 검증 기술을 연구했습니다. 현대자동차에서는 이러한 경험을 바탕으로 차량과 IT 자산의 구조를 이해하고, 새로운 취약점과 위협이 어떤 조건에서 실제 공격으로 연결될 수 있는지 분석하고 싶습니다. 나아가 반복적인 취약점 분석과 검증 과정에 AI를 활용하여 보안 담당자의 판단을 지원할 수 있는 기술로 발전시키고 싶습니다. 궁극적으로는 **새로운 기술의 도입과 보안이 따로 움직이지 않는 환경**을 만드는 데 기여하고 싶습니다. 현대자동차가 새로운 기술과 서비스를 확장할 때 그 변화에서 발생하는 보안 문제를 먼저 발견하고, 기술의 발전과 함께 보안 수준도 지속적으로 높일 수 있는 Security Engineer가 되겠습니다.

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

CLEAR 대비 Pairwise Correct Prediction (P-C) **27.15% 상대 개선**을 확인했습니다. 특히 Typed Representation을 제거했을 때 P-C가 **21.31%에서 2.99%**로 크게 감소하여, 문제 유형에 적합한 지식 표현이 실제 판단 성능에 중요한 역할을 한다는 점을 확인했습니다.

next></next>

## An Empirical Study of Vulnerability Detection under Pairwise Evaluation {#empirical-study}

**Master's Thesis**

### Problem Definition

**기존 AI 기반 취약점 탐지 기술은 취약 코드와 패치 코드의 미세한 차이를 실제로 식별하고 있는가?**

기존 AI 기반 취약점 탐지 기술은 높은 분류 성능을 보여왔지만, 이러한 성능이 실제 취약점의 원인이 되는 코드 차이를 식별한 결과인지는 별도로 확인할 필요가 있습니다. 실제 취약점 패치는 전체 코드를 변경하기보다 보안과 관련된 일부 코드만 수정하는 경우가 많습니다. 따라서 동일 함수의 취약 버전과 패치 버전은 대부분의 구조와 기능을 공유하며, 취약점과 직접적으로 관련된 미세한 차이만 존재합니다.

### Research Question

**기존 취약점 탐지 방법은 동일 함수의 취약 버전과 패치 버전을 동시에 정확하게 구별할 수 있는가?**

### Methodology

PrimeVul에서 제시한 Pairwise Evaluation을 기반으로 다양한 기존 AI 기반 취약점 탐지 방법을 직접 재평가했습니다. 동일 함수의 취약 버전과 패치 버전을 하나의 Pair로 구성하고, 두 코드에 대한 예측 결과를 함께 분석하여 모델이 실제 보안 관련 코드 변화를 식별하고 있는지 확인했습니다.

예측 결과는 다음 네 가지 유형으로 분석했습니다.
- **P-C (Correct)** : 취약 버전은 취약, 패치 버전은 정상으로 올바르게 판단
- **P-V (Vulnerable)** : 두 버전을 모두 취약으로 판단
- **P-B (Benign)** : 두 버전을 모두 정상으로 판단
- **P-R (Reversed)** : 취약 버전과 패치 버전을 반대로 판단

### 무엇을 확인했는가?

실험 결과 기존 방법들은 일반적인 분류 성능과 달리, 취약 버전과 패치 버전을 동시에 정확하게 구별하는 데 상당한 한계가 있음을 재확인했습니다. 이를 통해 AI 기반 취약점 탐지 기술을 평가할 때 단순한 분류 성능뿐만 아니라, **모델이 실제 취약점과 관련된 코드 변화를 식별하고 있는지 함께 검증해야 한다는 점**을 실증적으로 분석했습니다.