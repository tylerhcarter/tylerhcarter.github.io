#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Configuration
const OBSIDIAN_DIR = "/Users/tylercarter/Documents/Local/Writing";
const POSTS_DIR = path.join(__dirname, "..", "_posts");

// ANSI color codes for pretty output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
  dim: "\x1b[2m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Parse YAML front matter from markdown content
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { frontMatter: {}, body: content };
  }

  const frontMatterText = match[1];
  const body = match[2];
  const frontMatter = {};

  // Parse YAML front matter (simple parser)
  frontMatterText.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // Convert boolean strings
      if (value === "true") value = true;
      if (value === "false") value = false;

      frontMatter[key] = value;
    }
  });

  return { frontMatter, body };
}

// Generate front matter string
function generateFrontMatter(frontMatter) {
  const lines = ["---"];

  // Ensure required fields
  if (!frontMatter.layout) {
    frontMatter.layout = "post";
  }

  // Add front matter fields
  Object.entries(frontMatter).forEach(([key, value]) => {
    // Skip 'publish' field as it's only for sync control
    if (key === "publish") return;

    if (
      typeof value === "string" &&
      (value.includes(":") || value.includes("#"))
    ) {
      lines.push(`${key}: "${value}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  });

  lines.push("---");
  return lines.join("\n");
}

// Generate Jekyll filename from title and date
function generateJekyllFilename(frontMatter, originalFilename) {
  // Get date
  let date;
  if (frontMatter.date) {
    date = new Date(frontMatter.date);
  } else {
    date = new Date();
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Get title slug
  let slug;
  if (frontMatter.title) {
    slug = frontMatter.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  } else {
    // Use original filename without extension
    slug = path
      .basename(originalFilename, ".md")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  return `${year}-${month}-${day}-${slug}.md`;
}

// Find all markdown files recursively
function findMarkdownFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        // Skip hidden directories and Obsidian config
        if (!entry.name.startsWith(".")) {
          traverse(fullPath);
        }
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

// Main sync function
function syncPosts() {
  log("\n🔄 Starting blog post sync...", "blue");
  log(`📁 Obsidian directory: ${OBSIDIAN_DIR}`, "dim");
  log(`📁 Posts directory: ${POSTS_DIR}\n`, "dim");

  // Check if directories exist
  if (!fs.existsSync(OBSIDIAN_DIR)) {
    log(`❌ Error: Obsidian directory not found: ${OBSIDIAN_DIR}`, "red");
    process.exit(1);
  }

  if (!fs.existsSync(POSTS_DIR)) {
    log(`❌ Error: Posts directory not found: ${POSTS_DIR}`, "red");
    process.exit(1);
  }

  // Find all markdown files
  const markdownFiles = findMarkdownFiles(OBSIDIAN_DIR);
  log(`📄 Found ${markdownFiles.length} markdown file(s)\n`, "dim");

  let syncedCount = 0;
  let skippedCount = 0;

  for (const filePath of markdownFiles) {
    const relativePath = path.relative(OBSIDIAN_DIR, filePath);
    const content = fs.readFileSync(filePath, "utf8");
    const { frontMatter, body } = parseFrontMatter(content);

    // Check if file should be published
    if (frontMatter.publish !== true) {
      log(
        `⏭️  Skipping: ${relativePath} (publish: ${frontMatter.publish || "not set"})`,
        "dim",
      );
      skippedCount++;
      continue;
    }

    // Generate Jekyll filename
    const jekyllFilename = generateJekyllFilename(frontMatter, filePath);
    const targetPath = path.join(POSTS_DIR, jekyllFilename);

    // Generate new content with proper front matter
    const newFrontMatter = generateFrontMatter(frontMatter);
    const newContent = `${newFrontMatter}\n${body}`;

    // Write to posts directory
    fs.writeFileSync(targetPath, newContent, "utf8");

    log(`✅ Synced: ${relativePath} → ${jekyllFilename}`, "green");
    syncedCount++;
  }

  log(`\n📊 Summary:`, "blue");
  log(`   ✅ Synced: ${syncedCount}`, "green");
  log(`   ⏭️  Skipped: ${skippedCount}`, "yellow");
  log(`\n✨ Done!\n`, "blue");
}

// Run the sync
try {
  syncPosts();
} catch (error) {
  log(`\n❌ Error: ${error.message}`, "red");
  console.error(error);
  process.exit(1);
}
