<?php

/**
 * Returns the paths of all files in all directories recursively.
 *
 * @param string $pattern
 * @param bool $flags
 * @return array
 */
function recursiveGlob($pattern, $flags = false)
{
    $files = glob($pattern, $flags);
    foreach (glob(dirname($pattern) . '/*', GLOB_ONLYDIR | GLOB_NOSORT) as $dir) {
        $files = array_merge($files, recursiveGlob($dir . '/' . basename($pattern), $flags));
    }
    return $files;
}

/**
 * Gets the number of extensions for all files in a specific directory, including subfolders.
 *
 * @param string $pattern
 * @return array
 */
function getExtensions($pattern)
{
    $extensions = [];
    foreach (recursiveGlob($pattern) as $path) {
        $ext = pathinfo($path, PATHINFO_EXTENSION);
        empty($extensions[$ext]) ? $extensions[$ext] = 1 : $extensions[$ext]++;
    }
    return $extensions;
}

print_r(getExtensions($argv[1]));