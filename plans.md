---
layout: page
title: Plans
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

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

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.