# Data flow
Input text -> parser -> feature extraction -> hypothesis scoring/softmax -> risk model -> narrative/report -> frontend widgets.
Protected mode branch: frontend encrypts payload (.lccsec.json) -> backend validates metadata only -> no plaintext persistence.
