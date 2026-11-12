---
layout: portfolio
title: 황시준(Sijune Hwang)
subtitle: 
permalink: /portfolio/research/
sitemap: false
robots: noindex, nofollow
description: >-
  황시준, 한양대학교 정보보호학과 석사과정. 외부 지식과 Multi-Agent Reasoning을 활용한 Agentic AI 연구 포트폴리오.
---

## LLM-based Agentic AI for Software Engineering

외부 지식과 Multi-Agent Reasoning을 활용하여 LLM의 분석과 판단을 보완하고, 복잡한 문제를 스스로 해결할 수 있는 **Agentic AI** 시스템을 연구합니다.

**Research Keywords**

- Large Language Model
- Agentic AI
- Multi-Agent Reasoning
- Knowledge Graph
- Retrieval Augmented Generation (RAG)
- Software Engineering

# 01. Research Overview

## Research Question

**LLM이 필요한 지식을 활용하고 스스로 추론, 검증하며 문제를 해결하려면 무엇이 필요한가?**

Retrieval-Augmented Generation (RAG)과 Multi-Agent Reasoning을 활용하여, LLM이 문제 해결에 필요한 외부 지식을 탐색하고 여러 Agent의 추론과 검증을 통해 신뢰할 수 있는 결과를 도출하는 Agentic AI를 연구합니다.

LLM은 다양한 문제에서 뛰어난 성능을 보이지만, 모델이 가진 지식과 단일 추론 과정에만 의존할 경우 문제를 판단하는 데 필요한 정보를 충분히 활용하지 못하거나 잘못된 결론에 도달할 수 있습니다.

저는 이러한 한계를 보완하기 위해 **문제 해결에 필요한 지식을 어떻게 구조화하고 검색할 것인지**, **여러 Agent가 어떤 역할을 맡아 추론하고 검증할 것인지**에 집중했습니다.

주요 연구로는 소프트웨어 취약점 탐지를 다루었습니다. 취약 코드와 패치 코드는 구조적으로 매우 유사하기 때문에 코드의 표면적인 특징만으로는 취약 여부를 정확하게 판단하기 어렵습니다.

이에 코드 자체만을 분석하는 것을 넘어 취약점이 발생하는 원인과 조건을 구조화하고, 필요한 지식을 선택적으로 검색하여 여러 Agent가 서로 다른 관점에서 분석하고 검증하는 Agentic AI 시스템을 설계했습니다.

이를 통해 특정 문제에 LLM을 단순히 적용하는 것이 아니라, 문제 해결에 필요한 지식과 추론,검증 과정을 함께 설계함으로써 LLM의 판단을 보완하는 방법을 연구하고 있습니다.

# 02. Publications

## 02_1. CLEAR: Causal Context-Based Agentic Reasoning for Vulnerability Detection

**IEEE/ACM International Conference on Automated Software Engineering (ASE 2026)**

- [Paper Link(arXiv)](https://arxiv.org/pdf/2608.03134)
- [Conference Link](https://conf.researchr.org/details/ase-2026/ase-2026-research-track/227/CLEAR-Causal-Context-Based-Agentic-Reasoning-for-Vulnerability-Detection)

### Problem Definition

기존 LLM은 왜 취약 코드와 패치 코드를 혼동하는가?

취약 코드와 이를 수정한 패치 코드는 대부분의 코드 구조가 동일하고 코드의 일부분만 변경됩니다. 기존의 Deep Learning 기법들은 이러한 미세한 차이를 제대로 식별하기 어렵고, LLM 역시 코드의 표면적인 패턴에 의존하기 때문에 미세한 차이를 구별하기 어렵습니다.

이를 보완하기 위해 RAG, Single-Agent, Multi-Agent 등의 방법론이 고안되었지만, 기존 RAG는 검색된 정보를 단순히 제공하기 때문에 현재 코드와 관련성이 낮은 정보가 추론 과정에 포함될 수 있었습니다.

## Research Question

**LLM에게 취약점이 발생하는 원인과 관계를 구조화된 지식으로 제공하면 LLM의 추론 성능이 향상되지 않을까?**
### Methodology

**Causal Knowledge + Agentic Reasoning**

CLEAR는 취약점 탐지를 단순한 코드 패턴 분류가 아니라, **취약점이 발생하는 원인과 조건을 근거로 판단하는 문제**로 접근했습니다. 이를 위해 취약점 발생 원인과 관련 요소 간 관계를 구조화한 **Vulnerability Causal Knowledge Graph (VCKG)**를 설계하고, 현재 코드 분석에 필요한 인과 지식을 선택적으로 검색하여 Multi-Agent Reasoning의 근거로 활용했습니다.

{% include paper-figure.html src="portfolio/CLEAR_Overview.png" alt="CLEAR Overview — VCKG construction and Multi-agent Reasoning" caption="CLEAR Overview: VCKG Construction -> Causal Knowledge Retrieval -> Multi-Agent Reasoning" %}

### 1. Causal Knowledge Construction

취약점별 원인과 조건을 **Local VCKG**로 구조화한 뒤,<br>
관련 취약점의 지식을 **Neighborhood -> Global** 단계로 연결하여  
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
  caption="VCKG Construction: Local -> Neighborhood -> Global"
%}

#### 최종 제작된 VCKG

위 과정을 거쳐 구축된 Vulnerability Causal Knowledge Graph입니다.

{% include paper-figure.html src="portfolio/clear-5-vckg-design.png" alt="Design of Vulnerability Causal Knowledge Graph" caption="최종 제작된 VCKG" width="480" %}

### 2. Selective Knowledge Retrieval

구축된 VCKG 전체를 LLM에게 제공하는 대신,
**현재 분석 대상과 관련된 Causal Context를 선택적으로 검색**하여 불필요한 정보가 추론 과정에 포함되는 것을 줄였습니다.

{% include paper-figure.html src="portfolio/clear-4-causal-retrieval.png" alt="Causal Context Retrieval" caption="Causal Context Retrieval — 분석에 필요한 인과 지식 선택" width="420" %}

### 3. Multi-Agent Reasoning

검색된 Causal Context를 기반으로 여러 Agent가 역할을 나누어 취약 여부를 분석하고 검증하도록 추론 과정을 설계했습니다.

- **Collector Agent** : Causal Context 수집
- **Claim Agent** : 분석 결과 및 가설 생성
- **Critic Agent** : 가설 반박,검증
- **Judge Agent** : 분석 결과를 종합하여 최종 판단

### 무엇을 증명했는가?

취약 코드와 패치 코드를 Pair로 구성하여 모델이 두 코드의 미세한 차이를 얼마나 잘 구분할 수 있는지 평가했으며, 제안한 VCKG를 수동 검증했습니다.  
그 결과 Knowledge Graph의 품질과 제안 방법론이 LLM의 판단을 개선할 수 있음을 확인했습니다.

### Research Contribution

- 최초의 Vulnerability Causal Knowledge Graph 제안
- Selective Knowledge Retrieval 구조 설계
- LLM Multi-Agent Reasoning Pipeline 구현
- SOTA 대비 약 **130.7%** 성능 개선

---

<next></next>
## 02_2. CRAFT: Causality-aware Reasoning and Adaptive Framework for Vulnerability Types

**IEEE Transactions on Dependable and Secure Computing (TDSC)** — Submitted  
Paper Link: Under Review / Not Publicly Available

### Problem Definition

서로 다른 원인의 취약점을 일반화해 분석하는 것이 최선인가?

CLEAR에서는 취약점의 인과관계를 구조화하고 Multi-Agent Reasoning과 결합함으로써 기존 최고 성능 방법론을 큰 폭으로 상회했습니다. 그러나 후속 분석에서 취약점마다 발생 원인과 판단에 필요한 정보가 서로 다르다는 점에 주목했습니다.

예를 들어 프로그램의 상태 변화에서 발생하는 취약점과 권한,보안 정책 위반으로 발생하는 취약점은, 확인해야 할 정보와 추론 방식이 다릅니다. 따라서 모든 취약점을 하나의 인과 구조와 동일한 추론 방식으로 분석하는 CLEAR 구조에는 한계가 있다고 판단했습니다.

## Research Question

**취약점의 발생 메커니즘에 따라 지식 표현과 Agent의 추론 방식을 다르게 설계하면 어떨까?**

### Methodology

**Causality-Typed Knowledge + Expert Reasoning**

취약점의 발생 메커니즘을 네 가지 Causality Type으로 재분류했고, 각 유형에 필요한 지식을 구조화하기 위해 **Causality-Typed Vulnerability Knowledge Graph (CTVKG)**를 설계했습니다. 또한 취약점 유형에 따라 전문화된 Agent가 분석하도록 Multi-Agent Reasoning 구조를 고도화했습니다.

### 무엇을 증명했는가?

CLEAR 대비 Pairwise Correct Prediction (P-C) **27.15%** 상대 개선을 확인했습니다. Ablation Study를 통해 제안 방법이 각각 성능 향상에 기여한다는 점도 정량적으로 검증했습니다. 이는 문제에 맞게 Agent의 역할과 정보 흐름을 설계하는 것이 중요하다는 점을 시사합니다.

<next></next>
## 02_3. An Empirical Study of Vulnerability Detection under Pairwise Evaluation
Master’s Thesis

### Problem Definition

기존 평가 방식은 AI 기반 소프트웨어 취약점 탐지 모델의 실제 식별 능력을 충분히 검증하고 있는가?

기존 연구에서는 취약 코드와 정상 코드를 독립적인 Sample로 평가하고 Accuracy, F1-score 등의 지표로 성능을 측정하는 경우가 많습니다. 그러나 실제 취약점 패치는 대부분의 코드가 유지된 상태에서 일부 보안 관련 코드만 변경되기 때문에, 이러한 평가만으로는 모델이 취약점을 제거한 코드 변화에 적절하게 반응하는지 충분히 확인하기 어렵습니다.

### Research Question

취약 코드와 패치 코드를 하나의 Pair로 평가하면 기존 평가에서 드러나지 않는 취약점 탐지 모델의 판단 특성과 실패 패턴을 확인할 수 있지 않을까?

### Methodology

Vulnerable–Patched Pairwise Evaluation

동일 함수의 취약 버전과 패치 버전을 하나의 Pair로 구성하고, 모델이 두 버전을 정확하게 구별하는지를 평가했습니다.

예측 결과를 **P-C (Correct), P-V (Vulnerable), P-B (Benign), P-R (Reversed)**의 네 유형으로 구분하고, 올바른 판단과 역전된 판단의 차이를 측정하는 **VPS (Vulnerability Pairwise Score)**를 활용하여 Pretrained Code Model, LLM, RAG, Multi-Agent 등 다양한 취약점 탐지 방법론을 비교했습니다.

### 무엇을 증명했는가?

실험 결과, 기존 방법들은 일반적인 분류 성능과 별개로 취약 코드와 패치 코드를 동시에 정확하게 구별하는 데 상당한 한계가 있음을 확인했습니다.

이를 통해 AI 기반 취약점 탐지 기술을 평가할 때 단순한 개별 Sample의 탐지 정확도뿐만 아니라, 보안에 영향을 주는 코드 변화에 모델의 판단이 적절하게 반응하는지를 함께 검증할 필요가 있음을 제시했습니다.

# 03. Patent

| 항목 | 내용 |
|:--|:--|
| 연구과제 명 | 지식 그래프에 기반한 소프트웨어 취약점 탐지 방법 및 이를 위한 컴퓨터 장치 |
| 출원번호 | 10-2025-0199398 |
| 출원일 | 2025.12.15 |
| 상태 | 출원 |
| 발명자 | 황시준 |

<br>
<br>
# 04. Research Projects

| 항목 | 내용 |
|:--|:--|
| 과제명 | 거대 언어 모델 기반 안드로이드 취약점 탐지 및 자동 수리 |
| 발주기관명 | (재)한국연구재단 |
| 연구기간 | 2025.08.01 ~ |
| 역할 | 참여연구원 |

### 연구 목표

거대 언어모델(LLM)의 맥락, 코드 이해 능력이 향상됨에 따라, 이를 활용하여 안드로이드 앱 내 취약점을 자동으로 탐지하고 수리하는 연구.

### 수행 내용

- 취약점을 4개의 인과관계로 구조화
- 구조화한 인과관계를 인과지식 그래프로 구현
- 최신 SOTA 모델 대비 130.7% 성능 향상
- IEEE/ACM International Conference on Automated Software Engineering 2026 Accepted
