---
layout: portfolio
title: "Portfolio"
permalink: /portfolio/lg_research/
anonymous: true
sitemap: false
robots: noindex, nofollow
---

> **핵심 한 줄** — 취약점의 원인과 수정 의도를 지식그래프로 구조화하고, 필요한 인과관계만 검색해 다중 에이전트의 판단 근거로 제공한 연구입니다.

## Problem Definition

### 기존 LLM은 왜 취약 코드와 패치 코드를 혼동하는가?

취약 코드와 패치 코드는 대부분의 구조를 공유합니다. 몇 줄의 수정으로 위험이 해소되더라도, 코드의 표면적 유사성에 의존하는 모델은 두 버전을 모두 취약하다고 판단할 수 있습니다. 중요한 것은 **어떤 조건에서 결함이 발생하고, 패치가 그 조건을 어떻게 바꾸었는지**입니다.

일반적인 RAG는 외부 지식을 제공하지만, 검색된 문서 조각이 현재 코드의 취약 원인과 어떤 관계인지 명시하지 않으면 관련성이 낮은 정보까지 추론에 섞일 수 있습니다. CLEAR는 취약점 탐지를 코드 패턴 분류가 아닌 **인과관계에 근거한 판단 문제**로 재정의했습니다.

## Research Question

> 취약점의 발생 조건/근본 원인/수정 의도를 구조화된 지식으로 제공하고, 해당 코드와 관련된 경로만 검색한다면 LLM이 취약 버전과 패치 버전을 더 정확히 구별할 수 있을까?

## Methodology — Causal Knowledge + Agentic Reasoning

CLEAR는 **Vulnerability Causal Knowledge Graph(VCKG)**를 오프라인으로 구축하고, 분석 대상 코드에 필요한 인과 맥락을 선택적으로 검색합니다. 이후 Collector, Claim, Critic, Judge 에이전트가 검색된 근거를 사용해 가설을 만들고 반박/검증한 뒤 최종 판단을 내립니다.

{% include paper-figure.html src="portfolio/CLEAR_Overview.png" alt="VCKG 구축, 인과 맥락 검색, 다중 에이전트 검증으로 이어지는 CLEAR 전체 구조" caption="CLEAR: 그래프 구축 → 관련 인과 지식 검색 → 다중 에이전트 검증" %}

### 1. Causal Knowledge Construction — 도메인 지식을 그래프 스키마로 표현

VCKG는 취약점의 핵심 요소를 **Entrypoint, Precondition, Root Cause, Fix Intent, CWE**의 다섯 노드 유형으로 표현합니다. Entrypoint는 외부 입력이 들어오는 지점, Precondition은 결함이 발현되는 조건, Root Cause는 근본적인 논리 오류, Fix Intent는 패치가 제거하려는 위험을 나타냅니다. 특히 Root Cause와 Fix Intent의 관계는 거의 같은 두 코드가 왜 서로 다른 보안 상태를 갖는지 설명하는 근거가 됩니다.

소스 코드, CVE 설명, 패치 정보를 취약점별 **Local VCKG**로 정리한 뒤, 의미적으로 연결되는 요소를 **Neighborhood**, 서로 다른 사례의 유사한 인과 요소를 **Global** 단계에서 연결했습니다. 이 과정에서 단편적인 취약점 설명을 여러 사례에 재사용할 수 있는 구조화된 지식으로 바꾸었습니다.

{% include paper-figure-panel.html
  cols=3
  src1="portfolio/clear-1-local-vckg.png"
  cap1="Local VCKG — 사례별 원인/조건/수정 의도 표현"
  alt1="Local Vulnerability Causal Knowledge Graph"
  src2="portfolio/clear-2-neighborhood.png"
  cap2="Neighborhood — 관련 인과 요소 연결"
  alt2="Neighborhood Edge Integration"
  src3="portfolio/clear-3-global-edge.png"
  cap3="Global — 사례 간 지식 확장"
  alt3="Global Edge Integration"
  caption="취약점 사례에서 재사용 가능한 인과 지식으로 확장하는 과정"
%}

{% include paper-figure.html src="portfolio/clear-5-vckg-design.png" alt="VCKG 노드와 관계 유형" caption="VCKG의 노드/관계 설계" width="480" %}

### 2. Selective Knowledge Retrieval — 현재 판단에 필요한 맥락만 검색

구축한 그래프 전체를 프롬프트에 넣지 않았습니다. 현재 분석 중인 코드와 연결되는 **Causal Context**를 선택해 제공하고, 에이전트가 취약점의 발생 조건과 수정 의도를 근거로 판단하도록 했습니다. 이는 문서의 표면적 유사성만으로 조각을 가져오는 검색보다, **검색된 정보가 왜 현재 판단에 필요한지**를 추적할 수 있게 합니다.

{% include paper-figure.html src="portfolio/clear-4-causal-retrieval.png" alt="VCKG에서 현재 코드와 관련된 인과 맥락을 선택하는 과정" caption="Causal Context Retrieval — 관련 인과 경로의 선택적 검색" width="420" %}

### 3. Multi-Agent Reasoning — 근거를 검토하는 추론 파이프라인

| Agent | 역할 |
|---|---|
| **Collector** | 현재 코드에 필요한 인과 맥락을 수집 |
| **Claim** | 코드와 검색된 근거를 바탕으로 취약 여부에 대한 가설 생성 |
| **Critic** | 가설의 빈틈과 반례를 검토 |
| **Judge** | 근거와 반박을 종합해 최종 판단 |

역할 분담의 목적은 에이전트 수를 늘리는 데 있지 않습니다. **어떤 인과 조건이 실제 코드에서 충족되는지**를 근거와 함께 검토해, 그럴듯하지만 검증되지 않은 결론을 줄이는 데 있습니다.

## Evaluation — 무엇이 개선되었는가?

동일 함수의 취약 버전과 패치 버전을 한 쌍으로 평가했습니다. **Pair-Correct(P-C)**는 두 버전을 모두 올바르게 판별한 비율로, 모델이 단순히 취약점 키워드에 반응하는지와 실제 수정 효과를 구별하는지를 가릅니다.

| PrimeVul 평가 | P-C |
|---|---:|
| VulTrial — 비교 기준 | 8.31% |
| CLEAR | **19.17%** |

**CLEAR는 PrimeVul의 P-C에서 VulTrial 대비 130.7% 상대 개선**을 보였습니다. VCKG 없이 에이전트만 사용하면 P-C는 8.08%로 낮아졌고, 유사한 그래프 조각을 단일 에이전트에 제공하는 방식도 전체 파이프라인보다 낮은 성능을 보였습니다. 이는 **지식의 인과 구조와 이를 검토하는 추론 방식이 함께 필요하다**는 실험적 근거입니다.

## What I Bring to Ontology Intelligence Tech Cell

| 팀의 연구 과제 | CLEAR에서 검증한 경험 | 기업 지식으로 확장할 연구 질문 |
|---|---|---|
| **Knowledge Graph 생성/구조화** | 원천 자료에서 다섯 유형의 인과 요소를 추출하고 Local → Neighborhood → Global 그래프로 통합 | 문서/테이블/DB에서 추출한 개체와 관계를 도메인 스키마에 어떻게 정렬할 것인가? |
| **Graph 기반 검색과 QA** | 현재 질의에 필요한 Causal Context를 선택해 LLM 추론의 근거로 제공 | 여러 관계를 거친 검색 결과가 질문에 충분하고 관련성이 있는지 어떻게 검증할 것인가? |
| **신뢰할 수 있는 추론** | Claim–Critic–Judge가 근거를 상호 검토하고, 쌍별 평가/제거 실험으로 기여를 검증 | 검색된 경로의 근거와 답변의 논리적 일관성을 어떤 기준으로 검사할 것인가? |
| **Applied Research** | 평가의 허점을 문제로 정의하고, 그래프 설계/검색/추론/실험으로 연결 | 실제 사용 환경의 실패 사례를 연구 가설과 재현 가능한 평가로 어떻게 바꿀 것인가? |

**CLEAR는 취약점이라는 한 도메인에서, 흩어진 자료를 관계가 있는 지식으로 바꾸고 필요한 근거만 검색해 답을 검증한 사례**입니다. LG AI연구원이 다루는 기업 지식에서도 문서/표/DB 사이의 의미 관계를 모델링하고, 근거가 추적 가능한 답을 만드는 데 이 연구 경험을 적용할 수 있습니다.

### 다음 단계: 형식적 Ontology와 제품 환경으로 확장

CLEAR의 VCKG는 도메인별 노드/관계를 설계한 **인과 지식그래프**입니다. 이를 RDF/OWL 기반 온톨로지 구현이나 SHACL 제약 검증을 완료한 연구로 소개하지는 않습니다. 기업 데이터에 적용할 때는 먼저 개체/관계 유형을 정식 스키마에 매핑하고, 관계의 정의역/치역 및 필수 조건을 검증하는 연구가 필요합니다. 그다음 GraphRAG의 검색 경로 품질과 답변 근거성을 평가하고, 오프라인 그래프 구축/온라인 검색/추론 단계를 서비스/API 환경에서 분리해 실험하고 싶습니다.

## Research Contribution

- 취약점의 **Entrypoint → Precondition → Root Cause → Fix Intent**를 표현하는 VCKG 제안
- 사례 내부와 사례 사이의 인과 지식을 연결하는 그래프 구축 방식 설계
- 관련 인과 맥락의 선택적 검색과 Collector–Claim–Critic–Judge 추론 파이프라인 구현
- 취약 코드/패치 코드 쌍별 평가 및 제거 실험을 통해 각 구성 요소의 효과 검증

**Paper:** [CLEAR: Causal Context-Based Agentic Reasoning for Vulnerability Detection](https://arxiv.org/abs/2608.03134) / [ASE 2026 Research Track](https://conf.researchr.org/track/ase-2026/ase-2026-research-track)
