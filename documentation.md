---
layout: page
title: APIs.io APIs
---
The APIs.io web site is powered by APIs, so it makes sense to publish the APIs for others to use. The one you are probably interested in is the APIs.io Search API, as the others are designed to operate the search engine. But, you never know, so we made sure and publish all of them here for you to explore. 

{% assign apisjson = site.data.apisjson-product %}
<div class="container">
    <div class="row">

        {% for api in apisjson.apis %}
        <div class="col-sm-4">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ api.name }}</h5>
                <p class="card-text">{{ api.description }}</p>
                <a href="{{ api.humanURL }}" class="btn btn-primary">Go</a>
            </div>
            </div>
        </div>    
        {% endfor %}

    </div>
</div>

APIs.io is about making APIs available via search, but it is also designed to demonstrate a high bar for how you can run an API using APIs.json is not just the index, but a rating system. Because of this we are interested in providing as many of the success API platform building blocks as possible.