# Blog Post Sync Script

## Overview

The `sync-posts.js` script automatically syncs markdown files from your Obsidian vault to your Jekyll blog's `_posts` directory.

## Usage

### Option 1: Use the macOS Application (Easiest)

Double-click **"Sync Blog Posts"** in your Applications folder. A Terminal window will open showing the sync progress.

### Option 2: Run from Command Line

Run the script manually whenever you want to sync new or updated posts:

```bash
node script/sync-posts.js
```

Or from the repository root:

```bash
./script/sync-posts.js
```

## How It Works

The script:

1. **Scans** your Obsidian directory (`/Users/tylercarter/Documents/Local/Writing`) for all markdown files
2. **Checks** each file's front matter for `publish: true`
3. **Syncs** only files marked with `publish: true` to the `_posts` directory
4. **Converts** filenames to Jekyll's required format: `YYYY-MM-DD-title.md`
5. **Preserves** all content while ensuring proper front matter formatting

## Marking Files for Publishing

To sync a file from your Obsidian vault, add `publish: true` to its front matter:

```yaml
---
title: My Awesome Blog Post
date: 2025-01-15
publish: true
---

Your content here...
```

### Required Front Matter Fields

- **title**: The post title (used to generate the filename slug)
- **date**: Publication date (defaults to today if not specified)
- **publish**: Must be `true` to sync (file is skipped if false or missing)

### Optional Fields

- **layout**: Defaults to `post` if not specified
- Any other Jekyll front matter fields you need

## Examples

### Publishing a New Post

1. Create a markdown file in your Obsidian vault
2. Add front matter with `publish: true`:
   ```yaml
   ---
   title: Getting Started with Node.js
   date: 2025-01-15
   publish: true
   ---
   
   Node.js is a powerful JavaScript runtime...
   ```
3. Run `node script/sync-posts.js`
4. The file will be synced to `_posts/2025-01-15-getting-started-with-nodejs.md`

### Keeping a Draft Private

Simply omit `publish: true` or set it to `false`:

```yaml
---
title: Work in Progress
date: 2025-01-15
publish: false
---

This won't be synced until you change publish to true.
```

## Output

The script provides colored output showing:
- ✅ **Synced files**: Files successfully copied to `_posts`
- ⏭️ **Skipped files**: Files without `publish: true`
- 📊 **Summary**: Total count of synced and skipped files

## Configuration

To change the Obsidian directory location, edit the `OBSIDIAN_DIR` constant in `sync-posts.js`:

```javascript
const OBSIDIAN_DIR = '/Users/tylercarter/Documents/Local/Writing';
```

## macOS Application

A macOS application has been created at `/Users/tylercarter/Applications/Sync Blog Posts.app`. 

**To use:**
1. Navigate to your Applications folder
2. Double-click "Sync Blog Posts"
3. A Terminal window will open and show the sync progress
4. Press any key to close when done

The app is a simple wrapper that runs the Node.js script in a Terminal window with colored output.

## Notes

- The script will **overwrite** existing files in `_posts` with the same Jekyll filename
- Subdirectories in your Obsidian vault are supported
- Hidden directories (starting with `.`) are automatically ignored
- The `publish` field is removed from the synced file's front matter
