# css-var-editor
A [dat.gui](https://github.com/dataarts/dat.gui) editor which will detect all
root css variables of a site and presents them in the editor.
From there you can preview you changes.

![Example](./docs/example.png)

## Install


Add this to your index.html

    <script src="https://unpkg.com/css-var-editor"></script>
    
and at the bottom you call

    <script>
        cssVarEditor();
    </script>

## Example 

[Demo](https://faebeee.github.io/css-var-editor/index.html)


## API

    cssVarUi(keyFilterRegex?: RegExp, container?: Element, stylesheets: StyleSheet[] | StyleSheetList = document.styleSheets)


`keyFilterRegex` you can filter all variables so only wanted vars appear in the editor

`container` Define where the dat.gui instance should be appended

`stylesheets` by default all documents stylesheet gets scanned. If you want only specific files to 
be scanned, you can pass your own array here
