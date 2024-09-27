import os

secret_key = os.urandom(24).hex()
print(f"Your secret key is: {secret_key}")