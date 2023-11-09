#!/bin/bash

# Helper for customizing the element plus package
# Base directory to search
BASE_DIR="./src/components"
# Define file patterns
declare -a FILE_PATTERNS=(-name '*.vue' -o -name '*.ts' -o -name '*.tsx')

function replace_text_in_files() {
  local search_text=$1
  local replace_text=$2
  if [[ -z "$search_text" || -z "$replace_text" ]]; then
    echo "Usage: replace_text_in_files 'search_text' 'replace_text' 'file_pattern'"
    return 1
  fi

    # macOS sed requires an empty string after the -i option to indicate in-place editing with no backup.
    # Use double quotes around the variable substitutions
    # '.bak' files will be created as backups.
    # find "$BASE_DIR" -type f \( "${FILE_PATTERNS[@]}" \) -exec sed -i'' "s|$search_text|$replace_text|g" {} +
    find "$BASE_DIR" -type f \( "${FILE_PATTERNS[@]}" \) -exec sh -c 'sed -i ".bak" "s|$1|$2|g" "$0"' {} "$search_text" "$replace_text" \;

    # prints each filename. Noisy
    # find "$BASE_DIR" -type f \( "${FILE_PATTERNS[@]}" \) -exec sh -c 'echo "Processing file: $1"; sed -i ".bak" "s|$2|$3|g" "$1"' _ {} "$search_text" "$replace_text" \;

}

function delete_backup_files() {
  # This function will delete all .bak files in the base directory and its subdirectories.
  find "$BASE_DIR" -type f -name '*.bak' -exec rm {} +
}

function delete_test_directories() {
  # This function will delete all directories named "__tests__" in the base directory and its subdirectories.
  find "$BASE_DIR" -type d -name '__tests__' -exec rm -rf {} +
}

function batch_replace() {
    local replacements=("${!1}")

  for replacement in "${replacements[@]}"; do
    local search_text=$(echo "$replacement" | cut -d '|' -f1)
    local replace_text=$(echo "$replacement" | cut -d '|' -f2)
    
    # Use double quotes for sed and only escape double quotes inside the string
    search_text=$(echo "$search_text" | sed 's|"|\\"|g')
    replace_text=$(echo "$replace_text" | sed 's|"|\\"|g')

   # Print the search and replace strings being used
    echo "Replacing: $search_text with: $replace_text"

    replace_text_in_files "$search_text" "$replace_text"
  done
}

# An array of search-replace pairs
replacements_set1=(
  "from '@element-plus/utils'|from '/@/utils'"
  "from '@element-plus/constants'|from '/@/constants'"
  "from '@element-plus/hooks'|from '/@/hooks'"
  "from '@element-plus/directives'|from '/@/directives'"
  "from '@element-plus/locale'|from '/@/locale'"
  "from '@element-plus/components|from '/@/components"
  "from '@ctrl/tinycolor'|from '@datadayrepos/tinycolor'"
  "from '@popperjs/core'|from '@datadayrepos/popperts'"
  "from 'async-validator'|from '@datadayrepos/asyncvalidator'"
  "from 'csstype'|from '/@/csstype'"
  "type { MaybeRef } from '@vueuse/core'|type { MaybeRef } from '@datadayrepos/usevueshared'"
  "from '@vueuse/shared'|from '@datadayrepos/usevueshared'"
  "from '@vueuse/core'|from '@datadayrepos/usevuecore'"
  "from 'lodash-unified'|from '@datadayrepos/lodashts'"
)
#   "from '@element-plus/icons-vue'|from '@element-plus/icons-vue'"

replacements_set2=( 
  "search3|replace3"
  "search4|replace4"
)

function create_styles_directories() {

  # Find all direct subdirectories of $BASE_DIR and create a "styles" directory if it doesn't exist
  for dir in "$BASE_DIR"/*/; do
    if [ -d "$dir" ]; then  # Check if it is a directory
      local style_dir="${dir}styles"
      if [ ! -d "$style_dir" ]; then
        echo "Creating directory: $style_dir"
        mkdir "$style_dir"
      else
        echo "Directory already exists: $style_dir"
      fi
    fi
  done
}

# USAGE
# chmod +x import.sh
# ./import.sh --batchreplace

# Check for the passed argument to decide which function to call
case "$1" in
    # batch text changes ./import.sh --batchreplace
  --batchreplace)
    batch_replace "replacements_set1[@]"
    delete_backup_files
    ;;
    # deletebakcup files ./import.sh --delbak
  --delbak)
    delete_backup_files
    ;;
    # styles dir ./import.sh --stylesdir
  --stylesdir)
    create_styles_directories
    ;;
    # deletes test dir ./import.sh --deltest
  --deltest)
    delete_test_directories
    ;;
  *)
    echo "Usage: $0 --batchreplace | --stylesdir"
    exit 1
    ;;
esac