from pathlib import Path
from datetime import timedelta

import environ
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables
env = environ.Env(DEBUG=(bool, False))

ENVIRONMENT = os.getenv('DJANGO_ENV', 'development')  
env_file = os.path.join(BASE_DIR, f'.env.{ENVIRONMENT}')
environ.Env.read_env(env_file)

SECRET_KEY = env('SECRET_KEY')
MASTER_KEY = env('MASTER_KEY')
DEBUG = env('DEBUG')

# Allow frontend React host
ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

# ---------------------------- #
#       INSTALLED APPS         #
# ---------------------------- #
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'django_filters',
    'corsheaders',

    # Your Apps
    'users',
    'patients',
    'doctors',
    'families',
]

# ---------------------------- #
#         MIDDLEWARE           #
# ---------------------------- #
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    # CORS Middleware (must be on top)
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# ---------------------------- #
#          DATABASE            #
# ---------------------------- #
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ---------------------------- #
#    AUTH PASSWORD SETTINGS    #
# ---------------------------- #
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ---------------------------- #
#       CUSTOM USER MODEL      #
# ---------------------------- #
AUTH_USER_MODEL = "users.CustomUser"

# ---------------------------- #
#     CORS CONFIGURATION       #
# ---------------------------- #
from corsheaders.defaults import default_headers, default_methods

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = list(default_headers) + [
    "access-control-allow-origin",
]

CORS_ALLOW_METHODS = list(default_methods)

# ---------------------------- #
#     REST + JWT SETTINGS      #
# ---------------------------- #
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend"
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=90),
}
