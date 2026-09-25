---
layout: portfolio
title: 황시준 (Sijune Hwang)
subtitle: LLM-based Agentic AI for Software Engineering
permalink: /portfolio/research/
sitemap: false
robots: noindex, nofollow
description: >-
  황시준, 한양대학교 정보보호학과 석사과정. 취약점의 인과 지식과 멀티에이전트 추론을 결합한 소프트웨어 취약점 탐지 연구.
---

**Blog:** [https://ghkdtlwns987.github.io](https://ghkdtlwns987.github.io/)  

취약 코드와 패치 코드의 미세한 차이를 구별하기 위해, **취약점의 인과 지식을 구조화하고 LLM의 검색·추론·검증 과정을 설계**합니다. 지식그래프와 역할별 에이전트를 결합한 취약점 탐지 프레임워크를 연구하고, 코드 쌍 평가와 구성 요소 제거 실험으로 효과를 검증하고 있습니다.


- **CLEAR · ASE 2026 채택 · 공동 1저자** — 인과 지식그래프와 멀티에이전트 추론을 결합한 취약점 탐지 프레임워크
- **CRAFT · TDSC 투고 · 1저자** — 취약점 유형별 지식 표현과 전문가 추론으로 확장한 후속 연구
- **석사학위 논문** — 취약·패치 코드 쌍 평가를 통한 기존 탐지 방법의 판단 특성과 실패 패턴 분석

**Research Keywords**: LLM · Knowledge Graph · RAG · Multi-Agent Reasoning · Software Security

[연구 개요](#research-overview) · [CLEAR](#clear) · [CRAFT](#craft) · [학위논문](#pairwise-evaluation) · [특허](#patent) · [연구과제](#research-project)

## 01. Research Overview
{: #research-overview }

**핵심 질문: LLM이 코드의 유사성을 넘어, 취약점이 발생하고 제거되는 조건을 구별하려면 무엇이 필요한가?**

취약 코드와 이를 수정한 코드는 대부분의 구조가 동일합니다. 따라서 개별 코드의 취약 여부를 맞히는 성능만으로는, 모델이 보안에 영향을 주는 작은 변화에 적절히 반응하는지 확인하기 어렵습니다.

이 문제를 다음 세 가지 관점에서 연구했습니다.

| 연구 | 핵심 질문 | 결과물 |
|:--|:--|:--|
| Pairwise Evaluation | 취약 버전과 패치 버전을 모두 올바르게 판단하는가? | 코드 쌍 기반 비교 실험과 실패 패턴 분석 |
| CLEAR | 취약점의 인과 지식을 제공하면 판단이 개선되는가? | VCKG와 검색·검증 기반 멀티에이전트 프레임워크 |
| CRAFT | 취약점 유형에 맞게 지식과 추론을 달리하면 더 개선되는가? | CTVKG와 유형별 전문가 추론 프레임워크 |

## 02. Research Outputs

### 02-1. CLEAR
{: #clear }

**Causal Context-Based Agentic Reasoning for Vulnerability Detection**

**IEEE/ACM International Conference on Automated Software Engineering (ASE 2026) · Accepted**  
**저자 역할: 공동 1저자**

[논문 (arXiv)](https://arxiv.org/abs/2608.03134) · [학회 페이지](https://conf.researchr.org/details/ase-2026/ase-2026-research-track/227/CLEAR-Causal-Context-Based-Agentic-Reasoning-for-Vulnerability-Detection)

> **대표 성과:** PrimeVul에서 P-C 19.17%를 달성했으며, SOTA 라고 알려져 있는 VulTrial대비 **성능을 130.7% 개선**했습니다.

#### 문제 정의

1. 기존 딥러닝 및 LLM 기반 탐지 방법은 구조적으로 유사한 취약 코드와 패치 코드를 구별하는 데 한계가 있었습니다. 외부 지식을 검색하더라도 현재 코드와 관련성이 낮은 증거가 포함되면 추론을 방해할 수 있습니다.

2. Retrieval Noise, Reasoning Bias 를 해결하기 위해 취약점 정보를 인과 단위로 분리해 Knowledge Graph 형태로 제작했습니다. 나아가, 별도의 Agent 를 배치해, 관련 없는 정보는 필터링되도록 설계했습니다.

따라서 본 논문은 **취약점의 발생 원인과 수정 논리를 구조화하고, 관련 있는 증거를 선별해 추론에 전달하는 방법**을 연구했습니다.

#### 방법론: Causal Knowledge + Agentic Reasoning

{% include paper-figure.html src="portfolio/CLEAR_Overview.png" alt="CLEAR의 지식그래프 구축 및 멀티에이전트 추론 흐름" caption="CLEAR: 인과 지식그래프 구축 → 관련 증거 검색·필터링 → 가설 생성·검증·최종 판정" print="wide" %}

**1. 취약점 정보를 인과 지식으로 구조화**

취약점의 정보를 네 가지 인과 요소로 분리하고, CWE 분류 정보와 함께 **Vulnerability Causal Knowledge Graph (VCKG)**로 표현했습니다.

| 인과 요소 | 표현하는 정보 |
|:--|:--|
| Entrypoint · 진입 지점 | 외부 입력이 유입되는 실행 지점이나 인터페이스 |
| Precondition · 사전 조건 | 취약점이 도달·발현하기 위해 필요한 상태와 조건 |
| Root Cause · 근본 원인 | 취약점을 발생시키는 논리적 오류 |
| Fix Intent · 수정 의도 | 취약점의 원인이나 발생 조건을 제거하는 패치의 논리 |

개별 사례의 Local VCKG를 구성한 뒤, 의미적으로 유사한 노드를 연결하는 Neighborhood Integration과 사례 간 인과 관계를 연결하는 Global Integration을 수행했습니다. 임베딩 유사성과 인과 관계를 함께 고려해 다른 취약점 사례의 지식도 활용하도록 구성했습니다.

{% include paper-figure.html src="portfolio/clear-5-vckg-design.png" alt="VCKG의 인과 요소와 관계 설계" caption="VCKG의 노드·관계 구조: 진입 지점, 사전 조건, 근본 원인, 수정 의도 및 CWE" %}

<details markdown="1">

{% include paper-figure.html src="portfolio/clear-1-local-vckg.png" alt="개별 취약점의 Local VCKG 구성 예시" caption="1. Local VCKG: 개별 취약점의 인과 요소와 관계 구성" %}

{% include paper-figure.html src="portfolio/clear-2-neighborhood.png" alt="의미적으로 관련된 노드의 연결 과정" caption="2. Neighborhood Integration: 관련 인과 노드의 의미적 연결" %}

{% include paper-figure.html src="portfolio/clear-3-global-edge.png" alt="서로 다른 취약점 사례 간 인과 관계 연결" caption="3. Global Integration: 사례 간 인과 관계 연결" %}

</details>

**2. 관련 증거의 선택적 검색과 필터링**

Collector Agent는 분석 대상 코드의 인과 요소를 바탕으로 VCKG에서 관련 맥락을 검색합니다. 검색 결과를 그대로 전달하지 않고, 현재 코드와의 논리적 관련성을 검토해 불필요한 증거를 제거합니다. 이를 통해 검색 잡음이 후속 추론에 유입되는 것을 줄이도록 설계했습니다.

{% include paper-figure.html src="portfolio/clear-4-causal-retrieval.png" alt="분석 대상 코드에 필요한 인과 맥락 검색 및 필터링" caption="Selective Retrieval: 현재 코드와 관련 있는 인과 증거를 선별" %}

**3. 역할별 멀티에이전트 추론**

| 에이전트 | 역할 |
|:--|:--|
| Collector | 인과 맥락 검색 및 관련성이 낮은 증거 필터링 |
| Claim | 선별된 증거를 근거로 취약점 가설 생성 |
| Critic | 가설의 전제와 코드의 실제 조건을 대조하며 반박·검증 |
| Judge | 가설과 반론, 증거를 종합해 취약 여부와 원인 판정 |

**구현 도구:** Python · LangChain · GPT-4o-mini · all-MiniLM-L6-v2 임베딩

#### Evaluation

1. SOTA 모델 대비 130.7% 성능이 향상되었음을 확인했습니다.

2. Graph Quality 검증 결과, 인과관계 특징을 띄고, 의미적인 문맥이 반영된 Graph 임을 확인했습니다.

#### Conclusion
- 취약점 지식을 4단계의 인과지식으로 분해해 Knowledge Graph로 구조화한 최초의 연구입니다.
- SOTA 모델 대비 130.7% 성능 향상을 보였습니다.
- 해당 연구는 IEEE/ACM International Conference on Automated Software Engineering 2026에 최종 채택되었습니다.

<next></next>

### 02-2. CRAFT
{: #craft }

**Causality-aware Reasoning and Adaptive Framework for Vulnerability Types**

**IEEE Transactions on Dependable and Secure Computing (TDSC) · Submitted**  
**저자 역할: 1저자 · 원문 비공개**

> **대표 성과:** PrimeVul에서 비교 기준인 CLEAR 대비 P-C **27.15% 상대 개선**을 확인하고, 별도로 구축한 CVE-Pair 데이터셋에서 일반화 성능을 검증했습니다.

#### 문제 정의

CLEAR의 후속 연구에서는 취약점마다 발생 원리와 판단에 필요한 정보가 다르다는 점에 주목했습니다. 상태 변화에 따른 결함과 권한·보안 정책 위반은 확인해야 할 조건이 다르므로, 공통된 인과 표현과 추론 방식만으로는 유형별 특성을 충분히 반영하기 어렵습니다.

이에 **취약점 유형에 따라 지식 표현과 전문가의 추론 방식을 함께 조정하는 방법**을 연구했습니다.

#### 방법론: Causality-Typed Knowledge + Expert Reasoning

취약점을 **State · Execution · Constraint · Policy**의 네 가지 인과 유형으로 재분류하고, 유형별 정보를 표현하는 **Causality-Typed Vulnerability Knowledge Graph (CTVKG)**를 설계했습니다. 여기에 **Expert–Claim–Critic–Judge** 추론 파이프라인을 결합해, 유형별 전문가의 분석을 바탕으로 주장 구성·비판적 검토·최종 판정을 수행하도록 했습니다.

| 구분 | CLEAR | CRAFT |
|:--|:--|:--|
| 지식 표현 | 공통 인과 요소 기반 VCKG | 네 가지 인과 유형을 반영한 CTVKG |
| 추론 구성 | 검색 증거 기반 Claim–Critic–Judge | 유형별 Expert 분석을 결합한 Claim–Critic–Judge |
| 검증 초점 | 인과 지식이 탐지 판단에 미치는 효과 | 유형별 표현과 전문가 추론의 추가 기여 |

#### Evaluation

- **탐지 성능:** PrimeVul의 11개 CWE를 대상으로 CLEAR 대비 P-C 27.15% 상대 개선을 확인했습니다.
- **외부 데이터 평가:** 독립적으로 구축한 CVE-Pair 데이터셋에서도 일반화 성능을 검증했습니다.
- **구성 요소 분석:** 인과 유형별 표현을 제거한 실험에서 P-C가 21.31에서 2.99로 하락했습니다. 전문가 기반 추론의 기여도 별도로 분석했습니다.

#### Conclusion
- 문제에 맞는 지식 표현과 에이전트 역할 설계의 효과를 정량적으로 검증한 후속 프레임워크를 제안했습니다.
- 이전 연구인 CLEAR 대비 27.15% 성능 향상을 달성했습니다.
- IEEE Transactions on Dependable and Secure Computing 에 제출한 상태입니다.

<next></next>

### 02-3. Pairwise Evaluation
{: #pairwise-evaluation }

**An Empirical Study of Vulnerability Detection under Pairwise Evaluation**  
석사학위 연구

#### 문제 정의

개별 코드의 Accuracy나 F1-score만으로는 모델이 보안에 영향을 주는 코드 변화에 반응하는지 충분히 확인하기 어렵습니다. 취약 버전은 맞히더라도 패치된 버전을 계속 취약하다고 판단할 수 있기 때문입니다.

이 연구에서는 **동일 함수의 취약 버전과 패치 버전을 함께 평가해, 기존 방법의 식별 능력과 실패 패턴을 분석**했습니다.

#### 방법론: Vulnerable–Patched Pairwise Evaluation

코드 쌍의 예측 결과를 다음 네 가지 유형으로 구분하고, Pretrained Code Model, LLM, RAG, Multi-Agent 방법론을 비교했습니다.

| 지표 | 예측 결과 | 해석 |
|:--|:--|:--|
| P-C · Correct | 취약 → 취약 / 패치 → 정상 | 두 버전 모두 올바르게 판단 |
| P-V · Vulnerable | 취약 → 취약 / 패치 → 취약 | 패치 이후에도 취약하다고 판단 |
| P-B · Benign | 취약 → 정상 / 패치 → 정상 | 원래 취약점도 탐지하지 못함 |
| P-R · Reversed | 취약 → 정상 / 패치 → 취약 | 두 버전의 판단이 뒤바뀜 |

또한 **VPS = P-C − P-R**을 활용해 올바른 판단과 역전된 판단을 함께 분석했습니다.

#### Evaluation

기존 방법들이 일반적인 분류 성능과 별개로 취약 코드와 패치 코드를 모두 올바르게 구별하는 데 한계가 있음을 확인했습니다. 이를 통해 **개별 샘플의 탐지 성능과 함께, 보안 관련 코드 변화에 대한 판단의 일관성을 평가할 필요**를 제시했습니다.

이 평가 관점은 CLEAR와 CRAFT의 성능을 검증하고, 탐지 실패가 어떤 형태로 발생하는지 해석하는 기준으로 이어집니다.

## 03. Patent
{: #patent }

| 항목 | 내용 |
|:--|:--|
| 발명의 명칭 | 지식 그래프에 기반한 소프트웨어 취약점 탐지 방법 및 이를 위한 컴퓨터 장치 |
| 출원번호 | 10-2025-0199398 |
| 출원일 | 2025.12.15 |
| 상태 | 출원 |
| 발명자 | 황시준 |

## 04. Research Project
{: #research-project }

**거대 언어 모델 기반 안드로이드 취약점 탐지 및 자동 수리**

| 항목 | 내용 |
|:--|:--|
| 지원기관 | (재)한국연구재단 |
| 참여기간 | 2025.08.01 ~ |
| 역할 | 참여연구원 |

### 과제 목표

LLM의 코드 이해와 맥락 분석 능력을 활용해 안드로이드 앱의 취약점을 자동으로 탐지하고 수리하는 기술을 연구합니다.

### 수행 범위와 연계 성과

과제 내 **취약점 탐지를 위한 인과 지식 표현과 LLM 추론 구조 연구**에 참여했습니다. 취약점 정보를 진입 지점·사전 조건·근본 원인·수정 의도의 네 가지 요소로 구조화하고, 지식그래프를 탐지 추론에 연결했습니다.

관련 결과물인 **CLEAR는 ASE 2026에 채택**되었습니다. 탐지 성능과 비교 기준은 위 CLEAR 항목에 정리했습니다.
