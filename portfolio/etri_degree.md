---
layout: portfolio
title: "An Empirical Study of Vulnerability Detection under Pairwise Evaluation"
subtitle: Master thesis
permalink: /portfolio/etri_degree/
anonymous: true
sitemap: false
robots: noindex, nofollow
description: >-
  Pairwise Evaluation of AI-based vulnerability detection — VPS ,  P-C / P-V / P-B / P-R.
---

### Abstract

Learning-based software vulnerability detection has advanced rapidly with deep learning, pretrained code models, and large language models (LLMs). Although these approaches have reported promising performance, they are commonly evaluated by treating vulnerable and benign functions as independent samples. Such evaluation characterizes overall classification performance but does not directly assess whether a detector can distinguish a vulnerable function from its corresponding patched version, which may differ by only a small security-relevant modification.

This thesis presents an empirical study of software vulnerability detection under vulnerable–patched pairwise evaluation. We evaluate representative approaches spanning pretrained code models, direct LLM reasoning, retrieval-augmented detection, and multi-agent reasoning. For each vulnerable–patched pair, predictions are jointly categorized into four outcomes: Pairwise Correct (P-C), Pairwise Vulnerable (P-V), Pairwise Benign (P-B), and Pairwise Reversed (P-R). We additionally use the Vulnerability Pairwise Score (VPS), defined as P-C minus P-R, to characterize pairwise discrimination.

Our evaluation on PrimeVul reveals that existing detectors have limited ability to distinguish vulnerable functions from their patched counterparts. The highest P-C among the evaluated approaches is only 8.77%, indicating that none correctly distinguishes even 10% of the evaluated pairs. P-V is also the dominant failure mode for several approaches, reaching up to 95.84%. Although different model families exhibit distinct pairwise failure patterns, no evaluated paradigm consistently achieves reliable vulnerable–patched discrimination. Moreover, conventional classification performance does not fully characterize these pairwise behaviors.

These findings show that independent function-level evaluation can obscure important failure behaviors of vulnerability detectors. Vulnerable–patched pairwise evaluation provides a complementary perspective by examining whether model predictions respond appropriately to security-relevant code changes, highlighting the importance of considering such relationships when evaluating learning-based vulnerability detection systems.

---

### Problem Definition

**기존 취약점 탐지 모델은 취약점과 관련된 미세한 코드 차이를 실제로 식별하고 있는가?**

기존 AI 기반 소프트웨어 취약점 탐지 모델은 높은 분류 성능을 보여왔지만, 이러한 성능이 모델이 실제 취약점의 원인이 되는 코드 차이를 식별한 결과인지는 별도로 확인할 필요가 있습니다.

실제 취약점 패치는 전체 코드를 변경하는 것이 아니라 취약점과 관련된 일부 코드만 수정하는 경우가 많습니다. 따라서 동일 함수의 취약 버전과 패치 버전은 대부분의 코드 구조와 기능을 공유하며, 취약점과 직접적으로 관련된 미세한 코드 차이만 존재합니다.

이러한 환경에서 모델이 코드의 의미나 취약점의 원인을 충분히 파악하지 못하고 데이터에 존재하는 표면적인 코드 패턴에 의존한다면, 개별 샘플에서는 높은 성능을 보이더라도 취약 코드와 패치 코드를 정확하게 구별하지 못할 수 있습니다.

본 연구에서는 이러한 문제의식을 바탕으로 기존 AI 기반 취약점 탐지 방법들을 직접 실험하고, 모델이 취약점과 관련된 미세한 코드 변화를 실제로 식별할 수 있는지 Pairwise 관점에서 분석했습니다.

## Research Question

**기존 AI 기반 취약점 탐지 모델은 표면적인 코드 패턴을 넘어, 취약 코드와 패치 코드 사이의 미세한 차이를 정확하게 구별할 수 있는가?**

동일 함수의 취약 버전과 패치 버전을 함께 평가하여 모델이 단순히 개별 샘플의 특징을 기반으로 분류하는 것이 아니라, 실제 취약점과 관련된 코드 변화에 따라 판단을 올바르게 변경하는지 분석했습니다.

---

### Pairwise Evaluation

동일 함수의 취약 버전과 패치 버전을 하나의 Pair로 구성하여 기존 취약점 탐지 방법들을 평가했습니다.

취약 버전과 패치 버전은 대부분의 코드가 동일하기 때문에 두 버전을 모두 정확하게 판단하기 위해서는 모델이 취약점과 관련된 미세한 코드 차이를 식별해야 합니다.

모델이 하나의 Pair에 대해 내린 두 번의 판단을 다음 네 가지 유형으로 구분했습니다.

| Type | Vulnerable Code | Patched Code | Description |
| --- | --- | --- | --- |
| **P-C (Correct)** | Vulnerable | Benign | 두 버전을 정확하게 구별 |
| **P-V (Vulnerable)** | Vulnerable | Vulnerable | 두 버전을 모두 취약으로 판단 |
| **P-B (Benign)** | Benign | Benign | 두 버전을 모두 정상으로 판단 |
| **P-R (Reversed)** | Benign | Vulnerable | 취약 여부를 반대로 판단 |

이를 통해 단순한 개별 샘플의 분류 정확도를 넘어, 모델이 실제 보안과 관련된 코드 변화에 민감하게 반응하는지 분석했습니다.

---

### Experimental Results

다양한 AI 기반 취약점 탐지 방법을 동일한 Pairwise 환경에서 직접 비교, 분석했습니다.

실험 결과, 기존 방법들은 개별 샘플에 대한 일반적인 분류 성능과 달리 동일 함수의 취약 버전과 패치 버전을 동시에 정확하게 구별하는 데 상당한 한계를 보였습니다.

많은 경우 모델이 취약 코드와 패치 코드에 동일한 예측을 내렸으며, 일부에서는 취약 코드를 정상으로 판단하면서 패치된 코드를 오히려 취약하다고 판단하는 Reversed Prediction도 확인했습니다.

이러한 결과는 기존 모델이 높은 분류 성능을 보이더라도 취약점과 직접적으로 관련된 미세한 코드 차이를 충분히 식별하지 못하고, 코드의 표면적인 특징에 의존하여 판단할 가능성이 있음을 보여줍니다.

---

### What Did We Find?

기존 취약점 탐지 모델은 높은 분류 성능에도 불구하고 취약 코드와 패치 코드 사이의 미세한 차이를 구별하는 데 한계를 보였습니다.

취약 코드와 패치 코드는 대부분의 코드 구조와 기능이 동일하기 때문에 두 버전을 정확하게 구별하려면 단순한 코드 패턴이 아니라 실제로 취약점을 발생시키거나 제거하는 코드 변화를 식별해야 합니다.

Pairwise 환경에서 기존 방법들을 직접 분석한 결과, 일반적인 분류 성능만으로는 이러한 능력을 충분히 확인하기 어렵다는 것을 확인했습니다.

이를 통해 AI 기반 취약점 탐지 기술을 평가하고 실제 보안 분석에 활용하기 위해서는 단순히 취약 여부를 맞히는 것뿐 아니라, 모델이 표면적인 코드 특징을 넘어 취약점과 관련된 미세한 코드 변화를 구별할 수 있는지 함께 검증해야 한다는 점을 확인했습니다.

---