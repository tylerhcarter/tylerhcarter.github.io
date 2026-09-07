---
layout: default
title: "Newsletters"
permalink: /newsletters/
---
These are the email newsletters I'm currently subscribed to.

{% for n in site.data.newsletters -%}
{% if n.Status == "Confirmed" -%}
- {% if n.Website %}[{{ n.Newsletter }}](https://{{ n.Website }}){% else %}{{ n.Newsletter }}{% endif %}
{% endif -%}
{% endfor %}
