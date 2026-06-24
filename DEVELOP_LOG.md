# Create React app

```bash
pnpm create next-app@latest oss-wiki --yes
cd oss-wiki
pnpm dev
```

# Convert .web to .ogg

Download [vgmstream-cli](https://github.com/vgmstream/vgmstream/releases)

```bash
mkdir -p ogg

for f in *.wem; do
  vgmstream-cli "$f" -o "ogg/${f%.wem}.ogg"
done
```

# Parse en.subtitles

```bash
pnpm add -D tsx

# run this at project root
pnpm parse-sbutitles
```


# Match subtitles

Matching subtitles to each level.

For example: [data/level/heroes1_1/index.mdx](https://github.com/qiekn/ootss/blob/main/data/levels/heroes1_1/index.mdx)

```mdx
---
title: "Warrior Heroes 1"
subtitles:
    - warrior_heroes1_start
    - warrior_heroes1_start_end
---
```

Manually match the subtitle IDs (`warrior_heroes1_start`, `warrior_heroes1_start_end`).
