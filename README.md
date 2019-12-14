# Nginx example

Example of configuring nginx as a reverse proxy of nextjs.

nginx takes care of serving all the static assets, including the static generated websites (html files). The setup will compress all assets at build time to save cpu and gzip the nextjs responses on the fly, as per the nextjs recommendation since nginx is more efficient for that work than node.

## How to use

clone the repo then run to check the site in development mode (without nginx):

```bash
yarn
yarn dev
```

create docker image that contains nginx and all the configuration:

```bash
yarn docker:image
yarn docker:start

open localhost:3000
```

## The idea behind the example

Documentation recommends having a proxy in front of next to handle compression in a more efficient way.
This example creates a docker image with nginx and the app running inside it.
If you don't want to use docker you can check the nginx configuration in `.docker/nginx`.

Note that next.config.js has nextjs compression disabled, since it's going to be managed by nginx.


## How it works

Docker image uses (s6 overlay)[https://github.com/just-containers/s6-overlay] to run nginx and nextjs in the same container. The image is self contained, you could modify it if you want to volume mount the app code.

At build time all generated static assets like js bundles and html pages are gzipped. Also since nextjs creates a random route for some of those assets (see (build_id)[https://github.com/zeit/next.js#configuring-the-build-id]), the generated BUILD_ID is passed as environment variable to nginx so it has the proper paths to the files.

