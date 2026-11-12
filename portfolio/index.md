---
layout: default
title: Portfolio
permalink: /portfolio/
sitemap: false
robots: noindex, nofollow
description: >-
  연구 포트폴리오 · 지원서용 자료
---

<div class="hero">
  <h1>Portfolio</h1>
  {% include page-lead.html page="portfolio" %}
</div>

<section>
  <h2>Items</h2>
  <div class="card-grid card-grid--uniform">
    {% for item in site.data.portfolio.items %}
    <article class="card portfolio-card">
      <a href="{{ item.url | relative_url }}" class="portfolio-card-link">
        <p class="portfolio-card-meta">{{ item.meta }}</p>
        <h3 class="portfolio-card-title">{{ item.title }}</h3>
        <p class="portfolio-card-summary">{{ item.summary }}</p>
        <span class="portfolio-card-cta">Open →</span>
      </a>
    </article>
    {% endfor %}
  </div>
</section>
