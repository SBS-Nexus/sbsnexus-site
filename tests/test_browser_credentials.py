"""Prevent the retired shared maintenance credential returning to a browser bundle."""
import hashlib
import re
import unittest
from pathlib import Path


class BrowserCredentialBoundary(unittest.TestCase):
    def test_retired_service_credential_is_absent_from_client_sources(self):
        source = Path(__file__).resolve().parents[1] / "src"
        for path in source.rglob("*"):
            if path.suffix not in {".ts", ".tsx"}:
                continue
            for _, value in re.findall(r"([\"'])([^\"'\\\n]+)\1", path.read_text()):
                fingerprint = hashlib.sha256(value.encode()).hexdigest()[:16]
                self.assertNotEqual(fingerprint, "b68884a7776b3d45", str(path.relative_to(source)))
