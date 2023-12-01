---
layout: page
title: Plans
---
The search endpoint for APIs.io is wide open, but to integrate the API into your application we offer two plans, the basic entry level for the search, and the verified, which is what we use to administrate the search engine.

{% assign plans = site.data.plans %}
<div class="container">
    <div class="row">

        {% for plan in plans %}
        <div class="col-sm-6">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ plan.name }}</h5>
                <p class="card-text">{{ plan.description }}</p>
                <p><strong>Entries:</strong></p>
                <ul>
                {% for entries in plan.entries %}
                    <li>{{ entries.label }} - {{ entries.name }} ({{ entries.limit }} {{ entries.metric }}/{{ entries.timeframe }})</li>
                {% endfor %}
                </ul>
                <p><strong>Elements:</strong></p>
                <ul>
                {% for elements in plan.elements %}
                    <li>{{ elements.name }}</li>
                {% endfor %}
                </ul>                
            </div>
            </div>
        </div>    
        {% endfor %}

    </div>
</div>

If you don't know which plan is right for us, just visit our support page and drop us a line, and we will talk more about what you are looking to do and we can add custom tiers and access tokens to get you the access you need.