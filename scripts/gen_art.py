#!/usr/bin/env python3
"""Generate NovaVoice landing-page artwork via Gemini 3.1 Flash Image.

Reads GOOGLE_AI_STUDIO from innovaasWebsite/.env.local. Writes images into public/generated/.
Brand: Innovaas "infrastructure-grade dark" system — ink #05080e base, signal orange #f25c05.
"""
import os, json, base64, urllib.request, urllib.error, pathlib, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENV = ROOT.parent / "innovaasWebsite" / ".env.local"
OUT = ROOT / "public" / "generated"
OUT.mkdir(parents=True, exist_ok=True)

key = None
for line in ENV.read_text().splitlines():
    if line.startswith("GOOGLE_AI_STUDIO="):
        key = line.split("=", 1)[1].strip().strip('"').strip("'")
if not key:
    raise SystemExit("GOOGLE_AI_STUDIO not found in " + str(ENV))

MODEL = "gemini-3.1-flash-image"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={key}"

BRAND = (
    "Brand art direction: infrastructure-grade dark aesthetic. Deep blue-black background "
    "(#05080e to #0a0f18), restrained use of a single brand accent — signal orange #f25c05 / #ff6f1a — "
    "as glowing light only. Cinematic, premium, high-end editorial, subtle film grain, volumetric light, "
    "shallow depth of field, photorealistic where photographic. Absolutely no text, no words, no letters, "
    "no logos, no watermarks, no UI elements."
)

JOBS = [
    ("hero-signal", "16:9",
     "An abstract cinematic visualization of a voice/sound waveform rendered as flowing strands of "
     "glowing orange light, traveling left-to-right through a vast dark infrastructure of thin "
     "interconnected network nodes and hairline data lines receding into depth. The waveform is the hero — "
     "luminous, precise, alive — set against an almost-black blue void. Telecom backbone meets audio signal. "
     "Moody, expensive, atmospheric, lots of negative space on the left for text overlay."),
    ("overview-agent", "4:3",
     "A single glowing orange spherical node — an AI voice agent — suspended in a dark network, with "
     "concentric soundwave rings radiating outward and thin orange signal lines connecting to faint distant "
     "nodes representing calls being answered and routed. Minimal, elegant, futuristic, deep blacks, one warm "
     "orange light source, strong negative space."),
    ("ind-home-services", "3:2",
     "Cinematic editorial photograph of a professional HVAC / plumbing tradesperson in a clean work uniform "
     "taking a phone call on a jobsite at dusk, phone to ear, focused and confident. Dark moody environment, "
     "a single warm orange rim-light catching the subject, deep shadows, shallow depth of field, premium "
     "commercial photography. Realistic human, natural skin tones."),
    ("ind-restaurant", "3:2",
     "Cinematic editorial photograph of a restaurant owner / host standing at the pass of a dimly lit upscale "
     "restaurant, taking a reservation on the phone, warm and welcoming. Dark moody interior, single warm "
     "orange accent light, bokeh of restaurant lights behind, shallow depth of field, premium commercial "
     "photography. Realistic human, natural skin tones."),
    ("ind-veterinary", "3:2",
     "Cinematic editorial photograph of a veterinary clinic receptionist on a phone call at a dark, modern "
     "front desk with a calm dog beside them, attentive and caring. Dark moody environment, single warm orange "
     "accent light, deep shadows, shallow depth of field, premium commercial photography. Realistic human and "
     "animal, natural tones."),
]


def gen(name, aspect, prompt):
    body = {
        "contents": [{"parts": [{"text": f"{prompt}\n\n{BRAND}"}]}],
        "generationConfig": {"imageConfig": {"aspectRatio": aspect}},
    }
    data = json.dumps(body).encode()
    for attempt in range(3):
        try:
            req = urllib.request.Request(URL, data=data, headers={"Content-Type": "application/json"})
            r = urllib.request.urlopen(req, timeout=180)
            d = json.load(r)
            parts = d["candidates"][0]["content"]["parts"]
            for p in parts:
                inline = p.get("inlineData") or p.get("inline_data")
                if inline:
                    raw = base64.b64decode(inline["data"])
                    ext = "jpg" if "jpeg" in (inline.get("mimeType") or inline.get("mime_type") or "jpeg") else "png"
                    path = OUT / f"{name}.{ext}"
                    path.write_bytes(raw)
                    print(f"OK  {name}.{ext}  {len(raw)//1024}KB  ({aspect})")
                    return
            print(f"NO-IMAGE {name}: {json.dumps(d)[:300]}")
            return
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:300]
            print(f"HTTP {e.code} {name} attempt {attempt+1}: {msg}")
            if e.code in (429, 500, 503):
                time.sleep(5 * (attempt + 1)); continue
            return
        except Exception as e:
            print(f"ERR {name} attempt {attempt+1}: {e}")
            time.sleep(3); continue


if __name__ == "__main__":
    only = os.environ.get("ONLY")
    for name, aspect, prompt in JOBS:
        if only and name != only:
            continue
        gen(name, aspect, prompt)
    print("DONE")
