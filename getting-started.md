---
layout: page
title: Getting Started
---
We work to try and make it as easy as possible for you to get started using the APIs.io search engine, providing you with the following steps to follow.

{% assign steps = site.data.getting-started %}
<div class="container">
    <div class="row">

        {% for step in steps %}
        <div class="col-sm-11.1">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ step.step }}) {{ step.name }}</h5>
                <p class="card-text">{{ step.description }}</p>
                <a href="{{ step.url }}" class="btn btn-primary">Go</a>
            </div>
            </div>
        </div>    
        {% endfor %}

    </div>
</div>
<br>
Our goal is to get you started with the APis.io API, but also provide a simple example of a machine and human readable set of getting started steps that any other API producer can follow along with their APi.
