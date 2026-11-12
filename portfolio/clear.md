---
layout: portfolio
title: "CLEAR: Causal Context-Based Agentic Reasoning for Vulnerability Detection"
subtitle: IEEE/ACM International Conference on Automated Software Engineering 
permalink: /portfolio/clear/
anonymous: true
sitemap: false
robots: noindex, nofollow
---

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

취약점별 원인과 조건을 **Local VCKG**로 구조화한 뒤,  
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

### What Did We Find?

취약 코드와 패치 코드를 Pair로 구성하여 모델이 두 코드의 미세한 차이를 얼마나 잘 구분하는지 평가했습니다.

그 결과 구조화된 인과 지식을 선택적으로 제공하고 여러 Agent가 분석 결과를 검증하는 방법이 LLM의 취약점 판단을 개선할 수 있음을 확인했습니다.

### Research Contribution

- Vulnerability Causal Knowledge Graph 제안
- Selective Knowledge Retrieval 구조 설계
- LLM Multi-Agent Reasoning Pipeline 구현
- SOTA 대비 약 **130.7%** 성능 개선
