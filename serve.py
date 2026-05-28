"""
Simple HTTP server for the BSC IO Command Center Tableau Extension.

Usage:
    python serve.py

Then in Tableau Desktop:
    1. Drag an "Extension" object onto your dashboard
    2. Click "Access Local Extensions"
    3. Browse to: tableau-extension/bsc_io_command_center.trex
"""
import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n  Boston Scientific IO Command Center")
        print(f"  ====================================")
        print(f"  Server running at: http://localhost:{PORT}")
        print(f"  Extension URL:     http://localhost:{PORT}/tableau-extension/extension.html")
        print(f"  .trex file:        {DIRECTORY}/tableau-extension/bsc_io_command_center.trex")
        print(f"\n  To use in Tableau Desktop:")
        print(f"  1. Drag an 'Extension' object onto your dashboard")
        print(f"  2. Click 'Access Local Extensions'")
        print(f"  3. Browse to the .trex file above")
        print(f"\n  Press Ctrl+C to stop.\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Server stopped.")
            sys.exit(0)
