---
layout: page
title: Authentication
---
The authentication of the APIs.io is done via a token passed into a header name `X-api-key`, providing the gateway what it needs to authenticate you. To obtain a token, just head over to your [GitHub settings and generate a personal access token](https://github.com/settings/tokens) within minimal viable access to your GitHub profile--which we will then verify and add as API key for the APIs.io API.

{% include authentication.html %}

Your API key will get you access to make more API calls to the APIs.io search API. We will add other API calls you can make to disable your token, access usage logs, and other capabilities over time, but we wanted to make it as easy as possible for anyone to authenticate with the APis.io, without having to sign up for yet another account.