# --- Assets (Webpack Encore) -------------------------------------------------
# Node 12: the version the site was last built with (Encore 0.28).
FROM node:12-bullseye AS assets
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY webpack.config.js ./
COPY assets ./assets
RUN yarn build

# --- Runtime base (PHP 7.4 + Apache) ----------------------------------------
# PHP 7.4 because the project is still on Symfony 4.2.
FROM php:7.4-apache AS base

COPY --from=mlocati/php-extension-installer:2 /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_mysql intl opcache zip

# Apache serves public/ and honours its .htaccess (symfony/apache-pack).
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri 's#/var/www/html#${APACHE_DOCUMENT_ROOT}#g' /etc/apache2/sites-available/*.conf \
 && printf '<Directory ${APACHE_DOCUMENT_ROOT}>\n    AllowOverride All\n</Directory>\n' > /etc/apache2/conf-available/symfony.conf \
 && echo 'ServerName localhost' > /etc/apache2/conf-available/servername.conf \
 && a2enconf symfony servername && a2enmod rewrite \
 && mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY docker/php.ini $PHP_INI_DIR/conf.d/zz-app.ini

ENV APP_ENV=prod APP_DEBUG=0
WORKDIR /var/www/html

# --- Build: dependencies, assets, cache --------------------------------------
FROM base AS build
# Composer 2.2 LTS: symfony/flex 1.12 (2021) is not compatible with newer Composer 2.x.
COPY --from=composer:2.2 /usr/bin/composer /usr/local/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

COPY composer.json composer.lock symfony.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-progress --no-interaction

COPY . .
COPY --from=assets /app/public/build public/build
# The permissions are normalised here, so the image does not depend on the
# umask of the machine that cloned the repository: the code is read-only for
# Apache, only var/ (cache, logs) is writable.
# No cache:warmup here: in Symfony 4.2 it stores empty annotations for entities
# using @ApiFilter (its throwing autoloader trips on optional classes), which
# breaks /api/users. The cache is built by the first request instead.
RUN composer dump-autoload --no-dev --classmap-authoritative \
 && php bin/console cache:clear --no-warmup \
 && php bin/console assets:install public \
 && chown -R root:root . && chmod -R u=rwX,go=rX . \
 && chown -R www-data:www-data var

# --- Final image -------------------------------------------------------------
FROM base
COPY --from=build /var/www/html /var/www/html

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS -o /dev/null http://localhost/fr || exit 1
