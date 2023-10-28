---
layout: page
title: Support
---
We offer a number of ways you can get support. APIs.io is an open source project, depending on the free time of a handful of people, so we lean on GitHub to support of the work, but we still recognize that LinkedIn is still a viable social network. However, most of the ongoing work and conversations around this project will occur via the discussions forum.

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

If you have any questions, find the channel that works for your and make yourself heard. I'd make sure you explore the discussions first, but don't hesitate to start a new discussion, leave an issue on one of the projects. We are just getting started with this project and want to hear from the community before we invest in any new work, so share your thoughts.