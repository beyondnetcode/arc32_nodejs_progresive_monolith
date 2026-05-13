#!/usr/bin/env python3
import os
import sys

REPLACEMENTS = {
    "ÃƒÂ³": "ó", "ÃƒÂ¡": "á", "ÃƒÂ©": "é", "ÃƒÂ": "í", "ÃƒÂº": "ú", "ÃƒÂ±": "ñ",
    "Ãƒâ€œ": "Ó", "Ãƒâ€˜": "Ñ", "Ãƒâ€°": "É", "ÃƒÂ": "á", "Ãƒï¿½": "Á", "ÃƒÅ¡": "Ú",
    "Ã³": "ó", "Ã¡": "á", "Ã©": "é", "Ã": "í", "Ãº": "ú", "Ã±": "ñ", "Ã“": "Ó",
    "Ã‘": "Ñ", "Ã‰": "É", "Ã°Å¸â€œÅ“": "📜", "Ã°Å¸â€œâ€ž": "📄", "Ã°Å¸â€ºÂ¡Ã¯Â¸Â": "🛡️",
    "Ã°Å¸Â â€ºÃ¯Â¸Â": "🏛️", "Ã°Å¸Å¸Â¢": "🟢", "Ã°Å¸Å¸Â¡": "🟡", "Ã°Å¸â€ Â´": "🔴",
    "Ã°Å¸â€ºÂ Ã¯Â¸Â": "🛠️", "Ã°Å¸â€œË†": "📈", "Ã°Å¸â€œ": "📜", "Ã°Å¸â": "🛠️",
    "â€œ": "“", "â€": "”", "â€™": "'"
}

def scan_and_repair(root_dir):
    print(f"[*] Scanning Markdown encoding in: {root_dir}")
    repaired_count = 0
    for root, dirs, files in os.walk(root_dir):
        if any(skip in root for skip in [".git", "node_modules", "bin", "obj"]): continue
        for file in files:
            if file.lower().endswith(".md"):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "rb") as f: content_bytes = f.read()
                    text = content_bytes.decode("utf-8", errors="replace")
                    orig = text
                    for k, v in REPLACEMENTS.items(): text = text.replace(k, v)
                    if text != orig:
                        with open(file_path, "w", encoding="utf-8", newline="\n") as f: f.write(text)
                        print(f"[+] Repaired: {file_path}")
                        repaired_count += 1
                except Exception as e: print(f"[!] Error: {e}")
    print(f"[*] Scan Complete. Repaired {repaired_count} files.")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, "..", ".."))
    scan_and_repair(sys.argv[1] if len(sys.argv) > 1 else project_root)
