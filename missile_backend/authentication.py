from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions

class PrefixlessTokenAuthentication(TokenAuthentication):
    keyword = 'Token'

    def authenticate(self, request):
        auth = request.META.get('HTTP_AUTHORIZATION', b'')
        if isinstance(auth, str):
            auth = auth.encode('iso-8859-1')
        
        auth = auth.split()

        if not auth:
            return None

        if len(auth) == 1:
            # Allow raw token without prefix
            try:
                token = auth[0].decode()
            except UnicodeError:
                msg = 'Invalid token header. Token string should not contain invalid characters.'
                raise exceptions.AuthenticationFailed(msg)
            return self.authenticate_credentials(token)

        if len(auth) == 2:
            # Standard "Token <key>" format
            if auth[0].lower() != self.keyword.lower().encode():
                return None
            try:
                token = auth[1].decode()
            except UnicodeError:
                msg = 'Invalid token header. Token string should not contain invalid characters.'
                raise exceptions.AuthenticationFailed(msg)
            return self.authenticate_credentials(token)

        return None
