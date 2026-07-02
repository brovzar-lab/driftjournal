# DriftJournal — Google Play Store Listing

Adapted from App Store metadata (APPU-217) for Google Play Store format.

---

## App Details

**App name** (max 50 chars — 29 chars ✓)
```
DriftJournal — Voice Thoughts
```

**Short description** (max 80 chars — 77 chars ✓)
```
Voice journal with AI clustering. Capture thoughts. Resurface what matters.
```

**Full description** (max 4,000 chars)

```
DriftJournal captures what your mind generates throughout the day — one voice note at a time — then uses AI to find the patterns you didn't know were there.

VOICE-FIRST BY DESIGN
No typing. No friction. Just tap and speak. DriftJournal records your thought in seconds, transcribes it automatically, and files it away. The best ideas arrive when you can't stop to write them down. Now you never have to.

AI CLUSTERING THAT THINKS LIKE YOU
Every thought you capture gets analyzed and grouped with similar ones — not by you, by DriftJournal's AI. Over time you'll see themes emerge: the project consuming you, the ideas clustering around a recurring problem. Insight without effort.

MORNING RESURFACE
Each morning, DriftJournal surfaces two thoughts from your recent history that deserve a second look. The idea you captured at 11pm that you forgot by morning. The theme recurring for two weeks. Nothing gets lost.

YOUR DATA STAYS YOURS
DriftJournal doesn't train models on your thoughts. Your recordings and transcriptions stay private. We use AI to process your data — not to collect it.

BUILT FOR HOW YOUR MIND ACTUALLY WORKS
Most journaling apps expect you to sit down and reflect. DriftJournal works with the scattered, fast-moving way thoughts actually arrive. A voice memo in the parking lot. A half-formed idea before sleep. A question mid-meeting.

PREMIUM — UNLIMITED CAPTURES
Free tier: 10 captures per day. Upgrade to Premium for unlimited captures, priority AI clustering, and early access to new features. $4.99/month — cancel any time.

---

Privacy Policy: [Required before submission — obtain URL from CEO/CMO]
```

---

## Store Settings

| Field | Value |
|---|---|
| Category | Productivity |
| Content rating | Everyone |
| Target audience | 18+ (journaling / thought capture) |
| Privacy policy URL | **Required** — obtain from CEO/CMO before submission |
| App access | All functions available without login (demo mode); account optional |

---

## Screenshots Required (Android)

Play Store requires at least 2 screenshots. Recommended: 4–8 screenshots.

**Phone screenshots** — 16:9 or 9:16 aspect ratio, min 320px on short side, max 3840px.
Recommended: 1080×1920px or 1440×2560px.

Use the same 5 scenes from APPU-217 — adapt to Android UI chrome:

1. **Home — Clustered Thoughts Feed** — show 5 cluster cards, thought count, dark nav bar
2. **Capture — Active Recording** — mic button with pulse animation, waveform, timer
3. **Cluster Visualization** — 6 organic bubble clusters on dark canvas
4. **Resurface — Morning Resurface** — 2 thought cards with cluster badges
5. **Premium Upgrade** — PaywallModal with free vs. Premium comparison, $4.99/mo CTA

**Feature graphic** — 1024×500px banner (required for Play Store). Use dark `#0f0e17` background with the DriftJournal wordmark and the tagline "Capture & Resurface Your Mind."

---

## In-App Products (Google Play Console)

Must be created in Play Console before testing billing:

| Product ID | Type | Price | Description |
|---|---|---|---|
| `com.lemaa.driftjournal.premium_monthly` | Subscription | $4.99/month | DriftJournal Premium — unlimited captures |

**Trial period**: 7 days free (recommended — match App Store)

---

## Pre-Launch Checklist

- [ ] Privacy Policy URL obtained and committed to store listing
- [ ] `google-services.json` — real values (from Firebase Console, Android app `com.lemaa.driftjournal`)
- [ ] EAS project linked: `npx eas init` → update `extra.eas.projectId` in `app.json`
- [ ] Android keystore generated: `npx eas credentials --platform android`
- [ ] RevenueCat Android app created in RevenueCat dashboard → API key → set `EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY` in EAS secrets
- [ ] Play Console app created at play.google.com/console → package `com.lemaa.driftjournal`
- [ ] In-app subscription product created in Play Console (see above)
- [ ] Play Store service account JSON (`play-store-service-account.json`) — generate in Google Cloud IAM → store in repo root (gitignored)
- [ ] Feature graphic uploaded (1024×500px)
- [ ] Screenshots uploaded (min 2, recommended 5)
- [ ] Content rating questionnaire completed in Play Console
- [ ] App access declaration completed (all functions accessible in demo mode)
- [ ] `eas build --platform android --profile production` — triggers AAB build
- [ ] `eas submit --platform android` — uploads AAB to internal testing track
- [ ] Install from internal testing track on real Android device and run QA
- [ ] Promote to production (or staged rollout at 10%)
