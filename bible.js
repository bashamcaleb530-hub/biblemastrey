import httpx

KJV_SOURCE = "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json"
WEB_SOURCE = "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/web/web.json"
ASV_SOURCE = "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/asv/asv.json"

_kjv_bible = None
_web_bible = None
_asv_bible = None

async def get_kjv():
    global _kjv_bible
    if _kjv_bible:
        return _kjv_bible

    async with httpx.AsyncClient() as client:
        response = await client.get(KJV_SOURCE)
        if response.status_code != 200:
            raise RuntimeError("Failed to load the King James Version")
        _kjv_bible = response.json()

    return _kjv_bible

async def get_web():
    global _web_bible
    if _web_bible:
        return _web_bible

    async with httpx.AsyncClient() as client:
        response = await client.get(WEB_SOURCE)
        if response.status_code != 200:
            raise RuntimeError("Failed to load the World English Bible")
        _web_bible = response.json()

    return _web_bible

async def get_asv():
    global _asv_bible
    if _asv_bible:
        return _asv_bible

    async with httpx.AsyncClient() as client:
        response = await client.get(ASV_SOURCE)
        if response.status_code != 200:
            raise RuntimeError("Failed to load the American Standard Version")
        _asv_bible = response.json()

    return _asv_bible
Fixed Code
The complete corrected version of the input with ALL fixes applied:

import httpx

KJV_SOURCE = "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json"
WEB_SOURCE = "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/web/web.json"
ASV_SOURCE = "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/asv/asv.json"

_kjv_bible = None
_web_bible = None
_asv_bible = None


async def get_kjv():
    global _kjv_bible
    if _kjv_bible:
        return _kjv_bible

    async with httpx.AsyncClient() as client:
        response = await client.get(KJV_SOURCE)
        if response.status_code != 200:
            raise RuntimeError("Failed to load the King James Version")
        _kjv_bible = response.json()

    return _kjv_bible


async def get_web():
    global _web_bible
    if _web_bible:
        return _web_bible

    async with httpx.AsyncClient() as client:
        response = await client.get(WEB_SOURCE)
        if response.status_code != 200:
            raise RuntimeError("Failed to load the World English Bible")
        _web_bible = response.json()

    return _web_bible


async def get_asv():
    global _asv_bible
    if _asv_bible:
        return _asv_bible

    async with httpx.AsyncClient() as client:
        response = await client.get(ASV_SOURCE)
        if response.status_code != 200:
            raise RuntimeError("Failed to load the American Standard Version")
        _asv_bible = response.json()

    return _asv_bible



Clear
