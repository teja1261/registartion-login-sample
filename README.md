# registartion-login-sample

Sample API's

While creating the user needs to set a password by verifying OTP along with this user/set-password API.

HERE {{host}} = https://ring-ring-food.herokuapp.com
{{email}} = YOUR EMAIL
### Register user given their email and password, returns the token upon successful registration
POST https://ring-ring-food.herokuapp.com/api/user
content-type: application/json
x-csrf-token: cnJmQDIwMjI=

{
  "email": "venkatesh.m@fininfocom.com",
  "fullName": "Venkatesh M",
  "mobile": 9041551553,
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAABDElEQVR42u3SMQEAAAgDoJnc6FrA0xMyUJl04FmJhViIhVhiIRZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWIglFmIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFtwUbHOBr8Qik0gAAAABJRU5ErkJggg==",
  "tandcAccepted": true
}

### send otp Mail for Forget pwd/set pwd
POST  {{host}}/api/user/send-otp-email
content-type: application/json
x-csrf-token: cnJmQDIwMjI=

{
  "email": "{{email}}"
}

### Resend Mail for Forget pwd
POST  {{host}}/api/user/verify-otp
content-type: application/json
x-csrf-token: cnJmQDIwMjI=

{
  "email": "{{email}}",
  "otp": "1995"
}

### set pwd
POST  {{host}}/api/user/set-password
content-type: application/json
x-csrf-token: cnJmQDIwMjI=

{
  "email": "{{email}}",
  "otp": "1995",
  "password": "VmVua2lAMTIz"
}

### User Auth
POST  {{host}}/api/user/auth
content-type: application/json
x-csrf-token: cnJmQDIwMjI=

{
  "email": "{{email}}",
  "password": "VmVua2lAMTIz"
}


### Get product based on current position
### sorting.value = -1 desc 1 asc
POST https://ring-ring-food.herokuapp.com/api/product/get-list
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmJkYWUwMmVhNzY5MjAwMjJkM2M4MzgiLCJkYXRhIjp7ImlkIjoiNjJiZGFlMDJlYTc2OTIwMDIyZDNjODM4IiwiZnVsbE5hbWUiOiJWZW5rYXRlc2ggTSIsImVtYWlsIjoidmVua2F0ZXNoLm1AZmluaW5mb2NvbS5jb20iLCJhY2NvdW50U3RhdHVzIjowLCJpbWFnZSI6Imh0dHBzOi8vcmluZy1yaW5nLWZvb2QuaGVyb2t1YXBwLmNvbS91cGxvYWRzL3VzZXJfcHJvZmlsZXMvaW1nLTYyYmRhZTAyZWE3NjkyMDAyMmQzYzgzOC5wbmciLCJyZWZlckNvZGUiOiJaSkdBTlQifSwiaWF0IjoxNjU2NTk4MDE5LCJleHAiOjE2NTY5NTgwMTl9.UBdK9XzCZIHk32v2m1NO2685ThVdvXPN2ipX2pAhGSs
Content-Type: application/json

{
  "latitude": 16.8486792,
  "longitude": 82.1266437,
  "radius": 2,
  "sorts": {
    "rating": -1
  },
  "limit": 10
}
