---
layout: page
title: Support
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

{% assign supports = site.data.support %}
<div class="container">
    <div class="row">

        {% for support in supports %}
        <div class="col-sm-4">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ support.name }}</h5>
                <p class="card-text">{{ support.description }}</p>
                <a href="{{ support.link }}" class="btn btn-primary">Go</a>
            </div>
            </div>
        </div>    
        {% endfor %}

    </div>
</div>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.