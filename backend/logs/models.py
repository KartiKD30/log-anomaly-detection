from django.db import models
import datetime

class OTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        return datetime.datetime.now(datetime.timezone.utc) - self.created_at < datetime.timedelta(minutes=5)