FROM            node:10.13.0

# Create app directory
RUN             mkdir -p /var/code/
WORKDIR         /var/code/
COPY            ./ /var/code/

# Install external dependencies.
RUN              yarn install

# Ensure we have node-sass compatible with environment
RUN              npm rebuild node-sass

# Start the development server
CMD              [ "yarn", "start" ]
