# RestorePhotos.io

A site that restores people in old photos, specifically faces.

## Todos v1

- [x] Get initial API route to work
- [x] Figure how to feed API an image from the UI
- [x] Create the UI for uploading an image
- [x] Add header with an image icon, restorephotos.io, then a GitHub icon with the repo at the top right
- [x] Footer with links to Next.js, Vercel, and Replicate
- [x] Improve how hero section looks using Untitled UI / Tailwind UI
- [x] Add a new section from Tailwind/Untitled UI to show some examples

## Todos v2

- [x] Improve the landing page design
- [x] Add a new "generate" page with the file picker
- [x] Make it work for real

## Todos v3

- [ ] Implement some kind of loading state
- [ ] Add Framer Motion for smooth animations when switching states
- [ ] Add an OG card, write out README, add to templates marketplace
- [ ] Share on Twitter along with link to templates marketplace and a couple tweets
- [ ] Maybe add "restore your own photos" somewhere in the header to link to the relevant page
- [ ] Add FAQ section to the bottom

## Todos v4

- [ ] Migrate to S3 + filepond (use s3 code I have)
- [ ] Add examples to `/restore` page
- [ ] Maybe try migrating to `/app` directory
- [ ] Add v2 to vercel examples and link to that one instead (maybe)
- [ ] Implement share page
  - [ ] Use Vercel OG to dynamically generate an image that contains the old and new pics
  - [ ] Create a hash and store it in redis along with links to the old and new photos
  - [ ] With this new hash, create a new dynamic page that has a link back to the original in the header and just shows the photos side by side
- [ ] Add toggle to be able to restore both face photos and other old photos using swinr model
