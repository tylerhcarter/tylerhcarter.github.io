---
layout: page
title: Professional Achievements
permalink: /achievements/
---

Below is a list of the various professional achievements I've worked towards in my past jobs.

{% assign sorted_achievements = site.achievements | sort: 'order' %}
{% for achievement in sorted_achievements %}

## [{{ achievement.title }}]({{ achievement.url }})

**Languages:** {{ achievement.languages }}

{{ achievement.summary }}

[Read more →]({{ achievement.url }})

---
{% endfor %}
