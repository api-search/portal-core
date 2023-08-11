---
layout: page
title: Road Map
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

{% assign road_maps = site.data.road-map %}
<div class="container">
    <div class="row">

        {% for road_map in road_maps %}
        <div class="col-sm-11.1">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ road_map.date }} - {{ road_map.name }}</h5>
                <p class="card-text">{{ road_map.description }}</p>
            </div>
            </div>
        </div>    
        {% endfor %}

    </div>
</div>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.