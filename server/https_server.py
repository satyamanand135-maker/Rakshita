#!/usr/bin/env python3
"""
Simple HTTPS server for Rakshita development
Creates self-signed certificate and serves files over HTTPS
"""

import http.server
import ssl
import socketserver
import os
import sys
from datetime import datetime, timedelta
import subprocess

class HTTPSHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for cross-origin requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom logging with timestamp
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

def create_self_signed_cert():
    """Create a self-signed certificate for HTTPS"""
    print("🔐 Creating self-signed certificate for HTTPS...")
    
    try:
        # Try using OpenSSL command (if available)
        subprocess.run([
            'openssl', 'req', '-x509', '-newkey', 'rsa:4096', '-keyout', 'server.key',
            '-out', 'server.crt', '-days', '365', '-nodes', '-subj',
            '/C=US/ST=State/L=City/O=Rakshita/CN=localhost'
        ], check=True, capture_output=True)
        print("✅ Certificate created using OpenSSL")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("⚠️ OpenSSL not available, using Python cryptography...")
        
    try:
        # Fallback: Use Python cryptography library
        from cryptography import x509
        from cryptography.x509.oid import NameOID
        from cryptography.hazmat.primitives import hashes, serialization
        from cryptography.hazmat.primitives.asymmetric import rsa
        import ipaddress
        
        # Generate private key
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
        )
        
        # Create certificate
        subject = issuer = x509.Name([
            x509.NameAttribute(NameOID.COUNTRY_NAME, "US"),
            x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, "State"),
            x509.NameAttribute(NameOID.LOCALITY_NAME, "City"),
            x509.NameAttribute(NameOID.ORGANIZATION_NAME, "Rakshita"),
            x509.NameAttribute(NameOID.COMMON_NAME, "localhost"),
        ])
        
        cert = x509.CertificateBuilder().subject_name(
            subject
        ).issuer_name(
            issuer
        ).public_key(
            private_key.public_key()
        ).serial_number(
            x509.random_serial_number()
        ).not_valid_before(
            datetime.utcnow()
        ).not_valid_after(
            datetime.utcnow() + timedelta(days=365)
        ).add_extension(
            x509.SubjectAlternativeName([
                x509.DNSName("localhost"),
                x509.DNSName("127.0.0.1"),
                x509.DNSName("192.168.1.3"),
                x509.IPAddress(ipaddress.IPv4Address("127.0.0.1")),
                x509.IPAddress(ipaddress.IPv4Address("192.168.1.3")),
            ]),
            critical=False,
        ).sign(private_key, hashes.SHA256())
        
        # Write certificate and key to files
        with open("server.crt", "wb") as f:
            f.write(cert.public_bytes(serialization.Encoding.PEM))
        
        with open("server.key", "wb") as f:
            f.write(private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.PKCS8,
                encryption_algorithm=serialization.NoEncryption()
            ))
        
        print("✅ Certificate created using Python cryptography")
        return True
        
    except ImportError:
        print("❌ Python cryptography library not available")
        print("💡 Install with: pip install cryptography")
        return False
    except Exception as e:
        print(f"❌ Failed to create certificate: {e}")
        return False

def start_https_server(port=8443):
    """Start HTTPS server"""
    
    # Check if certificate exists, create if not
    if not (os.path.exists('server.crt') and os.path.exists('server.key')):
        if not create_self_signed_cert():
            print("❌ Could not create SSL certificate")
            print("💡 Falling back to HTTP server...")
            return start_http_server(port=8000)
    
    try:
        # Create HTTPS server
        with socketserver.TCPServer(("0.0.0.0", port), HTTPSHandler) as httpd:
            # Create SSL context
            context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
            context.load_cert_chain('server.crt', 'server.key')
            
            # Wrap socket with SSL
            httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
            
            print(f"🚀 HTTPS Server started successfully!")
            print(f"📱 Local access: https://localhost:{port}")
            print(f"📱 Network access: https://192.168.1.3:{port}")
            print(f"🔐 Using self-signed certificate (you'll see security warnings)")
            print(f"⚠️  Click 'Advanced' → 'Proceed to localhost' in your browser")
            print(f"📱 On phone: Accept the security warning to continue")
            print(f"⏹️  Press Ctrl+C to stop the server")
            print("-" * 60)
            
            httpd.serve_forever()
            
    except Exception as e:
        print(f"❌ HTTPS server failed: {e}")
        print("💡 Falling back to HTTP server...")
        return start_http_server(port=8000)

def start_http_server(port=8000):
    """Fallback HTTP server"""
    try:
        with socketserver.TCPServer(("0.0.0.0", port), HTTPSHandler) as httpd:
            print(f"🌐 HTTP Server started (fallback)")
            print(f"📱 Local access: http://localhost:{port}")
            print(f"📱 Network access: http://192.168.1.3:{port}")
            print(f"⚠️  Note: Location services may not work over HTTP on mobile")
            print(f"⏹️  Press Ctrl+C to stop the server")
            print("-" * 60)
            
            httpd.serve_forever()
            
    except Exception as e:
        print(f"❌ Server failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("🛡️ Rakshita HTTPS Development Server")
    print("=" * 60)
    
    try:
        start_https_server(8443)
    except KeyboardInterrupt:
        print("\n⏹️ Server stopped by user")
    except Exception as e:
        print(f"\n❌ Server error: {e}")
        sys.exit(1)