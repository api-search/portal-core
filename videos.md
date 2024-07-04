---
layout: page
title: Videos
---
# {{ page.title }}
These are some videos we have  made and organized to help you better understand APIs, the discovery of APis, but also why discovery matters to both API producers and consumers.

{% assign videos = site.data.videos %}
<div class="container">
    <div class="row">

        {% for video in videos %}
        <div class="col-sm-6">
            <div class="card">
            <div class="card-body">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/{{ video.id }}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            </div>
        </div>    
        {% endfor %}

    </div>
</div>
<br>
We will be adding new videos as we can, recording different webinars, discussions, and other relevant conversations to share here, so check back to see what has been added.