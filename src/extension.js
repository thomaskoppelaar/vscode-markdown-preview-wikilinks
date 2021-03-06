'use strict'
const vscode = require('vscode')
const _ = require('lodash')
const sanitize = require('sanitize-filename')
 
function PageNameGenerator(label) {

    console.log(`PageNameGen: ${label}`)

    return label.split('/').map(function(pathSegment) {

        // remove file path extension
        pathSegment = pathSegment.replace(/\.[^/.]+$/, "");

        // clean up unwanted characters and replace with a -
        pathSegment = _.deburr(pathSegment);
        pathSegment = pathSegment.replace(/[^\w\s]/g, '-');

        // slugify
        pathSegment = pathSegment.split(" ").join("-");
        return pathSegment.toLowerCase();
      
    }).join('/');
}

function postProcessPageName(pageName) {

    console.log(`postprocess: ${pageName}`)

    pageName = pageName.trim();

	// Sanitize filenames and slugify
    pageName = pageName.split('/').map(sanitize).join('/');
    pageName = pageName.split(/\s+/).join('-');
    return pageName;

}
  
function postProcessLabel(label) {
    console.log(`postprocesslabel : ${label}`)


	label = label.trim();
	
	// Remove filename extension
	// label = label.replace(/\.[^/.]+$/, "");
	
	// De-slugify and add matching brackets
    label = label.replace(/(?<!\\)-/, " ");
    label = label.replace(/\\-/, "-");

    // label = label.split("-").join(" ");
    if (vscode.workspace.getConfiguration("markdown-wiki-links-preview").get('showextension')) {
        label += vscode.workspace.getConfiguration("markdown-wiki-links-preview").get('urisuffix');
    }

    switch (vscode.workspace.getConfiguration("markdown-wiki-links-preview").get('previewlabelstyling')) {
        case "[[label]]":
            return `[[${label}]]`;
        case "[label]":
            return `[${label}]`;
        case "label":
            return label;
    }
    ;
}


function activate(context) {
    return {
        extendMarkdownIt(md) {
            return md.use(
                
                require('@thomaskoppelaar/markdown-it-wikilinks')({ 
                    generatePageNameFromLabel: PageNameGenerator, 
                    postProcessPageName: postProcessPageName, 
                    postProcessLabel: postProcessLabel,
                    uriSuffix: `${vscode.workspace.getConfiguration("markdown-wiki-links-preview").get('urisuffix')}`,
                    description_then_file: vscode.workspace.getConfiguration("markdown-wiki-links-preview").get("descriptionthenfile"),
                    separator: vscode.workspace.getConfiguration("markdown-wiki-links-preview").get("WikiLinksSeparator"),
                }));
        }
    };
}
exports.activate = activate;
exports.PageNameGenerator = PageNameGenerator;
exports.postProcessPageName = postProcessPageName;
exports.postProcessLabel = postProcessLabel;

