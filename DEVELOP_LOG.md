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
