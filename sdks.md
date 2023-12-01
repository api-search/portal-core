---
layout: page
title: SDKs
---
We offer a suite of auto-generated SDKs, using the [OpenAPI](https://search-docs.apis.io/openapi.yml) for the APIs.io Search API to generate client SDKs in the following languages.

{% assign sdks = site.data.sdks %}
<div class="container">
    <div class="row">

        {% for sdk in sdks %}
        <div class="col-sm-11.1">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ sdk.name }}</h5>
                <p class="card-text">{{ sdk.description }}</p>
                <a href="{{ sdk.link }}" class="btn btn-primary">Go</a>
            </div>
            </div>
        </div>    
        {% endfor %}

    </div>
</div>
<br>
If there is a specific language you'd like to see an SDK for, or another platform, let us know, or see if you can use the OpenAPI to generate what you need using another 3rd party service.