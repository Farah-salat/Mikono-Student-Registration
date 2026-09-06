import os
from dotenv import load_dotenv
from urllib.parse import urlparse

load_dotenv()


class Config:
    # Railway provides DATABASE_URL environment variable
    DATABASE_URL = os.getenv('DATABASE_URL')

    if DATABASE_URL:
        # Parse Railway's DATABASE_URL
        parsed = urlparse(DATABASE_URL)
        DB_HOST = parsed.hostname
        DB_USER = parsed.username
        DB_PASSWORD = parsed.password
        DB_NAME = parsed.path.lstrip('/')
        DB_PORT = parsed.port or 3306
    else:
        # Local development
        DB_HOST = os.getenv('DB_HOST', 'localhost')
        DB_USER = os.getenv('DB_USER', 'root')
        DB_PASSWORD = os.getenv('DB_PASSWORD', '')
        DB_NAME = os.getenv('DB_NAME', 'mikono_vtc')
        DB_PORT = 3306

    FLASK_PORT = int(os.getenv('PORT', 5000))

    @classmethod
    def get_db_config(cls):
        return {
            'host': cls.DB_HOST,
            'user': cls.DB_USER,
            'password': cls.DB_PASSWORD,
            'database': cls.DB_NAME,
            'port': cls.DB_PORT,
            'autocommit': True
        }
