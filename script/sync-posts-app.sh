#!/bin/bash

# Display in a Terminal window with nice formatting
osascript <<EOF
tell application "Terminal"
    activate
    do script "cd /Users/tylercarter/Repositories/tylerhcarter.github.io && node script/sync-posts.js && echo '' && echo 'Press any key to close...' && read -n 1 && exit"
end tell
EOF
