---
layout: page
title: APIs.io APIs
---
# {{ page.title }}
The APIs.io web site is powered by APIs, so it makes sense to publish the APIs for others to use. The one you are probably interested in is the APIs.io Search API, as the others are designed to operate the search engine. But, you never know, so we made sure and publish all of them here for you to explore. 

{% assign apisjson = site.data.apisjson %}
<hr>
{% for api in apisjson.apis %}

## {{ api.name }}
{{ api.description }}

- humanURL: [{{ api.humanURL }}]({{ api.humanURL }})
- baseURL: [{{ api.baseURL }}]({{ api.baseURL }})

## Tags
{% for tag in api.tags %}
- {{ tag }}{% endfor %}

{% for property in api.properties %}
    {% if property.type == 'OpenAPI' %}

        {% assign file = property.url | replace: '_data/','' | replace: '.yml','' %}
        {% for data in site.data %}
            {% if file == data[0] %}
                {% assign openapi = data[1] %}
            {% endif %}
        {% endfor %}

    {% endif %}
{% endfor %}

## Operations
{% for path in openapi.paths %}{% for method in path[1] %}
<strong>{{ method[1].summary }}</strong> <i>({{ method[0] | upcase }}) [{{ path[0] }}]({{ api.baseURL }}{{ path[0] }})</i> - {{ method[1].description }}

{% if method[1].parameters %}
**Parameters**
{% for property in method[1].parameters %}
- {{ property.name }}{% endfor %}
{% endif %}

{% if method[1].requestBody.content['application/json'].example %}
**Example Request**
<textarea id="{{ path[0] }}/{{ method[0] }}-request" style="margin: 10px; padding: 5px; height: 250px; overflow: auto; color:#000; border: 1px solid #000; width: 100%;">
{{ method[1].requestBody.content['application/json'].example | jsonify }}
</textarea>
<script>
    var example = JSON.parse(document.getElementById("{{ path[0] }}/{{ method[0] }}-request").innerHTML);
    document.getElementById("{{ path[0] }}/{{ method[0] }}-request").innerHTML = JSON.stringify(example, null, 2);
</script>
{% endif %}

{% if method[1].responses['200'].content['application/json'].example %}
**Example Response**
<textarea id="{{ path[0] }}/{{ method[0] }}-response" style="margin: 10px; padding: 5px; height: 250px; overflow: auto; color:#000; border: 1px solid #000; width: 100%;">
{{ method[1].responses['200'].content['application/json'].example | jsonify }}
</textarea>
<script>
    var example = JSON.parse(document.getElementById("{{ path[0] }}/{{ method[0] }}-response").innerHTML);
    document.getElementById("{{ path[0] }}/{{ method[0] }}-response").innerHTML = JSON.stringify(example, null, 2);
</script>
{% endif %}
{% if method[1].responses['201'].content['application/json'].example %}
**Example Response**
<textarea id="{{ path[0] }}/{{ method[0] }}-response" style="margin: 10px; padding: 5px; height: 250px; overflow: auto; color:#000; border: 1px solid #000; width: 100%;">
{{ method[1].responses['201'].content['application/json'].example | jsonify }}
</textarea>
<script>
    var example = JSON.parse(document.getElementById("{{ path[0] }}/{{ method[0] }}-response").innerHTML);
    document.getElementById("{{ path[0] }}/{{ method[0] }}-response").innerHTML = JSON.stringify(example, null, 2);
</script>
{% endif %}

{% endfor %}
{% endfor %}

<hr>
{% endfor %}
<br>
APIs.io is about making APIs available via search, but it is also designed to demonstrate a high bar for how you can run an API using APIs.json is not just the index, but a rating system. Because of this we are interested in providing as many of the success API platform building blocks as possible.