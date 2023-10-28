---
layout: page
title: Authentication
---
The authentication of the APIs.io is done via a token passed into the header via X-api-key property, providing the gateway what it needs to authenticate you. We will be providing (soon) a service where you can authenticate with GitHub, Google, or LinkedIn via OAuth and use the resulting token as the API key for the API.

We will keep authentication simple for the API, providing two simple plans, with a third administrative and partner layer that allows access to the engine, linting, rating, and other APIs that make the platform operation. Our goal is to make it as easy as possible to onboard and begin working with the APIs, and we'll add analytics, and other capabilities as they are needed.